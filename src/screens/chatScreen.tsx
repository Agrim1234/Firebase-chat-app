import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Button, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { db, auth, fileRef } from '../firebase/index';
import { collection, getFirestore, getDocs, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import ImagePicker, { launchImageLibrary, MediaType, PhotoQuality } from 'react-native-image-picker';
import Video from 'react-native-video';
import compress from 'react-native-compressor';
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather'
import { Appbar, Title } from 'react-native-paper';



//const db = getFirestore(app)

const ChatScreen = ({ route }: any) => {
    const [messages, setMessages] = useState<any[] | null>(null);
    const [inputText, setInputText] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const { username } = route.params;

    // useEffect(() => {
    //     const messageRef = collection(db, 'messages');
    //     const unsubscribe = () => {
    //         const messageSnapshot = getDocs(messageRef);
    //         const newMessages = messageSnapshot.docs.map(doc => ({
    //             id: doc.id,
    //             ...doc.data()
    //         }));
    //         setMessages(newMessages);
    //     }

    //     unsubscribe();

    //     return () => unsubscribe();
    // }, []);


    useEffect(() => {
        getAllMessages()
    }, []);

    const getAllMessages = async () => {
        // var msgList = []

        if (auth.currentUser !== null) {
            const q = query(collection(db, 'messages'));
            onSnapshot(q, (snapshot) => {
                setMessages(
                    snapshot.docs.filter((doc) => (
                        ((doc.data().with === username && doc.data().user === auth.currentUser?.uid) || (doc.data().with === auth.currentUser?.uid && doc.data().user === username))
                    ))

                )
            }
            )
            console.log(q);

        }

    }

    const handleSend = async () => {
        const time = new Date();
        if (inputText.trim() && auth.currentUser) {
            const docRef = collection(db, 'messages')
            await addDoc(docRef, {
                text: inputText,
                createdAt: time,
                user: auth.currentUser.uid,
                with: username
            });

            setMessages((messages !== null) ? [...messages, { text: inputText, createdAt: time, user: auth.currentUser.uid, with: username }] : [{ text: inputText, createdAt: time, user: auth.currentUser.uid, with: username }]);

            setInputText('');
        }
    };

    const handleMediaUpload = async (type: string) => {
        const time = new Date();

        const options = {
            mediaType: type as MediaType,
            quality: 1 as PhotoQuality,
        };


        launchImageLibrary(options, async response => {
            if (response.assets && auth.currentUser && response.assets[0].uri) {
                //const reference = storage.ref(`images/${Date.now()}`);

                //let mediaUri = response.assets[0].uri;

                // if (type === 'video') {
                //     const result = await compress.compressVideo(mediaUri, {
                //         quality: 'medium',
                //     });
                //     mediaUri = result.uri;
                // }

                await fileRef.putFile(response.assets[0].uri);
                const url = await fileRef.getDownloadURL();
                const dbRef = await collection(db, 'messages')

                await addDoc(dbRef, {
                    imageUrl: url,
                    mediaType: type,
                    createdAt: time,
                    user: auth.currentUser.uid,
                    with: username
                });

                setMessages((messages !== null) ? [...messages, { imageUrl: url, mediaType: type, createdAt: time, user: auth.currentUser.uid, with: username }] : [{ imageUrl: url, mediaType: type, createdAt: time, user: auth.currentUser.uid, with: username }]);
            }
        });

        setDropdownOpen(!dropdownOpen);

    };


    return (
        <View style={styles.container}>
            <View style={styles.titleBar}>
                <Title style={styles.pageTitle}>{username}</Title>
            </View>
            {messages !== null && <FlatList
                data={messages}
                style={styles.chatDisplay}
                renderItem={({ item }) => (
                    <View style={styles.message}>
                        {item.text && <Text>{item.text}</Text>}
                        {item.imageUrl && item.mediaType === 'photo' && (
                            <Image source={{ uri: item.imageUrl }} style={styles.image} />
                        )}
                        {item.imageUrl && item.mediaType === 'video' && (
                            <Video
                                source={{ uri: item.imageUrl }}
                                style={styles.media}
                                controls={true}
                                resizeMode="contain"
                            />
                        )}
                    </View>
                )}
                keyExtractor={(item) => item.createdAt}
            />}
            <View style={styles.inputContainer}>
                <TextInput
                    value={inputText}
                    onChangeText={setInputText}
                    style={styles.input}
                />
                <View style={styles.dropdownContainer}>
                    <Button title="Send Media" onPress={() => setDropdownOpen(!dropdownOpen)} />
                    {dropdownOpen && (
                        <View style={styles.dropdownMenu}>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleMediaUpload('photo')} >
                                <Icon style={styles.iconBtn} name="image" color="#000" size={40} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleMediaUpload('video')} >
                                <IconFeather style={styles.iconBtn} name="video" size={40} color="#000" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <Button title="Send" onPress={handleSend} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chatDisplay: {
        marginTop: 50,
        maxHeight: 800,
        overflow: 'scroll'
    },
    media: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 10,
    },
    container: {
        flex: 1,
    },
    dropdownContainer: {

    },
    pageTitle: {
        fontSize: 19,
        color: '#fff'
    },
    titleBar: {
        flex: 1,
        height: 50,
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        color: '#fff',
        backgroundColor: '#000',
        gap: 4,
        justifyContent: 'space-around',
        alignItems: 'center', width: '100%'
    },
    dropdownMenu: {
        position: 'absolute',
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'space-around',
        bottom: 40,
        height: 100,
        width: 60,
    },
    dropdownItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',

    },
    mediaUploadBtn: {
        height: 24,
        width: 24
    },
    message: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    iconBtn: {
        height: 43,
        width: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    inputContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 4,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        marginRight: 10,
        padding: 8,
    },
});

export default ChatScreen;