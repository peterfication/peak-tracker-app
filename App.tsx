import React from 'react';
import { STORYBOOK_ENABLED } from '@env';

import { ApolloProvider } from '@app/contexts/ApolloProvider';
import { AuthProvider } from '@app/contexts/AuthContext';
import { HomeScreenWrapper } from '@app/screens/HomeScreen';

import Storybook from './.storybook/Storybook';

export const App = () => {
  return (
    <AuthProvider>
      <ApolloProvider>
        <HomeScreenWrapper />
      </ApolloProvider>
    </AuthProvider>
  );
};

const defaultExport = STORYBOOK_ENABLED === 'true' ? Storybook : App;

if (STORYBOOK_ENABLED === 'true') {
  console.log('Running Storybook ...');
}

export default defaultExport;
