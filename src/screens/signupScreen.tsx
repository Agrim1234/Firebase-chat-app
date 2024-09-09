import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Title } from 'react-native-paper';

import FormButton from '../components/formButton';
import FormInput from '../components/formInput';
import { AuthContext } from '../context/authProvider';
import Loading from '../components/loading';
import { auth, db } from '../firebase/index';
import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'firebase/auth';


export default function SignupScreen({ navigation }: any) {
    const [displayName, setDisplayName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState(false)


    //const { register, loading } = useContext(AuthContext);
    //const auth = getAuth(app);
    const register = async (displayName: string, email: string, password: string) => {
        //setLoading(true);
        try {
            console.log('user sign up started')
            const userCredential = await createUserWithEmailAndPassword(
                auth, email, password);

            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: displayName
                });
            }

            console.log('user signup happening')
            // Signed-in Firebase user
            const currentUser = userCredential.user;

            console.log("Firebase user created: ", currentUser);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }

    if (loading) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <Title style={styles.titleText}>Let's get started!</Title>
            <FormInput
                labelName='Display Name'
                value={displayName}
                autoCapitalize='none'
                onChangeText={(userDisplayName: React.SetStateAction<string>) => setDisplayName(userDisplayName)}
            />
            <FormInput
                labelName='Email'
                value={email}
                autoCapitalize='none'
                onChangeText={(userEmail: React.SetStateAction<string>) => setEmail(userEmail)}
            />
            <FormInput
                labelName='Password'
                value={password}
                secureTextEntry={true}
                onChangeText={(userPassword: React.SetStateAction<string>) => setPassword(userPassword)}
            />
            <FormButton
                title='Signup'
                modeValue='contained'
                labelStyle={styles.loginButtonLabel}
                onPress={() => register(displayName, email, password)}
            />
            <FormButton
                title={'back'}
                modeValue='contained'
                size={30}
                style={styles.navButton}
                onPress={() => navigation.goBack()}
            >
            </FormButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 24,
        marginBottom: 10
    },
    loginButtonLabel: {
        fontSize: 22
    },
    navButtonText: {
        fontSize: 18
    },
    navButton: {
        marginTop: 10,
        backgroundColor: '#000000'
    }
})