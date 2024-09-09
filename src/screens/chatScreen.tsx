import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Button, StyleSheet, Text } from 'react-native';
import { app, db, auth } from '../firebase/index';
import { collection, getFirestore, getDocs, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';


//const db = getFirestore(app)

const ChatScreen = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [inputText, setInputText] = useState('');

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
        const q = query(collection(db, 'messages'));
        onSnapshot(q, (snapshot) => setMessages(
            snapshot.docs.map(doc => ({ ...doc.data(), createdAt: doc.data().createdAt.toDate() }))
        )
        );

    }

    const handleSend = async () => {
        const time = new Date();
        if (inputText.trim() && auth.currentUser) {
            const docRef = collection(db, 'messages')
            await addDoc(docRef, {
                text: inputText,
                createdAt: time,
                user: auth.currentUser.uid,
            });

            setMessages([...messages, { text: inputText, createdAt: time, user: auth.currentUser.uid }]);

            setInputText('');
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <View style={styles.message}>
                        <Text>{item.text}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
                inverted
            />
            <View style={styles.inputContainer}>
                <TextInput
                    value={inputText}
                    onChangeText={setInputText}
                    style={styles.input}
                />
                <Button title="Send" onPress={handleSend} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    message: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
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