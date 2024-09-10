import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Title } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';


import FormButton from '../components/formButton';

export default function HomeScreen({ navigation }: any) {

    const users = ['tom', 'harry', 'jerry', 'aman', 'muskan'];

    const handleLogout = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleBar}>
                <Title style={styles.pageTitle}>{'chatting app'}</Title>
                <Button
                    style={styles.buttonLogout}
                    onPress={handleLogout}
                    children={
                        <Text style={styles.pageTitle}>Logout</Text>
                    }                >
                </Button>
            </View>

            <View style={styles.friendsBar}>
                <Title>Friends</Title>
            </View>

            <View style={styles.userContainer}>
                {users.map((user) => (
                    <FormButton
                        modeValue='contained'
                        title={user}
                        onPress={() => navigation.navigate('Chat', { username : user, })}
                        key={user}
                    />
                ))}
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    friendsBar: {
        marginTop: 50,
        borderBottomColor: '#000',
        borderWidth: 1,
        height: 50,
        color: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    buttonLogout: {

    },
    pageTitle: {
        fontSize: 19,
        color: '#fff'
    },
    userContainer: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8
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
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
});