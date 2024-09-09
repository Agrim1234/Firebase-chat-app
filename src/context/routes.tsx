import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import AuthStack from './authStack';

export default function Routes() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}