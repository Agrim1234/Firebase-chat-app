import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';


import FormButton from '../components/formButton';

export default function HomeScreen({ navigation }: any) {

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
            <Title>{'chatting app'}</Title>
            <FormButton
                modeValue='contained'
                title='Logout'
                onPress={handleLogout}
            />

            <FormButton
                modeValue='contained'
                title='move to chat'
                onPress={() => navigation.navigate('Chat')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});