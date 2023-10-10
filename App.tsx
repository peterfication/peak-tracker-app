import React from 'react';

import {
  ApolloProvider,
  AuthProvider,
  NavigationProvider,
  StorybookProvider,
} from '@app/providers';

export const App = () => {
  return (
    <StorybookProvider>
      <AuthProvider>
        <ApolloProvider>
          <NavigationProvider />
        </ApolloProvider>
      </AuthProvider>
    </StorybookProvider>
  );
};

export default App;
