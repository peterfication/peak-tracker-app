import React from 'react';

import { STORYBOOK_ENABLED } from '@env';

import { AuthProvider } from './src/contexts/AuthContext';
import { HomeScreen } from './src/screens/HomeScreen';
import Storybook from './.storybook/Storybook';

export const App = () => {
  return (
    <AuthProvider>
      <HomeScreen />
    </AuthProvider>
  );
};

const defaultExport = STORYBOOK_ENABLED === 'true' ? Storybook : App;

if (STORYBOOK_ENABLED === 'true') {
  console.log('Running Storybook ...');
}

export default defaultExport;
