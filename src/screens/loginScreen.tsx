import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';

import FormButton from '../components/formButton';
import FormInput from '../components/formInput';
import {  db, app, auth } from '../firebase/index';

import { signInWithEmailAndPassword, getAuth } from "firebase/auth";


export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  

  const loginUser = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, email, password);

      // Signed-in Firebase user
      const currentUser = userCredential.user;

      console.log("Firebase user logged in: ", currentUser);

      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
    } finally {
      console.log('done');
    }

  }


  return (
    <View style={styles.container}>
      <Title style={styles.titleText}>Welcome!</Title>
      <FormInput
        labelName='Email'
        value={email}
        autoCapitalize='none'
        onChangeText={(email: React.SetStateAction<string>) => setEmail(email)}
      />
      <FormInput
        labelName='Password'
        value={password}
        secureTextEntry={true}
        onChangeText={(userPassword: React.SetStateAction<string>) => setPassword(userPassword)}
      />
      <FormButton
        title='Login'
        modeValue='contained'
        labelStyle={styles.loginButtonLabel}
        onPress={() => loginUser(email, password)}
      />
      <FormButton
        title='Sign up here'
        modeValue='text'
        uppercase={false}
        labelStyle={styles.navButtonText}
        onPress={() => navigation.navigate('Signup')}
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
  },
  titleText: {
    fontSize: 24,
    marginBottom: 10
  },
  loginButtonLabel: {
    fontSize: 22
  },
  navButtonText: {
    fontSize: 16
  }
});