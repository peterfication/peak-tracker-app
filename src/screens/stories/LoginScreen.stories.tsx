import React from 'react';

import { Alert } from 'react-native';
import { ComponentStory } from '@storybook/react-native';

import { LoginScreen } from '../LoginScreen';

const LoginScreenMeta = {
  title: 'Login Screen',
  component: LoginScreen,
  argTypes: {},
  args: {},
};

export default LoginScreenMeta;

export const Basic: ComponentStory<typeof LoginScreen> = () => (
  <LoginScreen
    login={async () => {
      await new Promise(resolve => {
        setTimeout(resolve, 1);
      });
      Alert.alert('Login button clicked');
    }}
  />
);
