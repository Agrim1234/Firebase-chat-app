import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LoginScreen from '../screens/loginScreen';
import SignupScreen from '../screens/signupScreen';
import HomeScreen from '../screens/homeScreen';
import ChatScreen from '../screens/chatScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Signup' component={SignupScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Chat' component={ChatScreen} />
    </Stack.Navigator>
  );
}