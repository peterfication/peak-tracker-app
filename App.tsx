import React, { useState, useEffect, useCallback } from 'react';

import {
  ApolloProvider,
  AuthProvider,
  NavigationProvider,
} from '@app/providers';

export const App = () => {
  const [showStorybook, setShowStorybook] = useState(false);
  const toggleStorybook = useCallback(
    () => setShowStorybook(previousState => !previousState),
    [],
  );

  useEffect(
    () => {
      if (__DEV__) {
        // Add item to DevMenu (Cmd+D) to toggle between the app and Storybook.
        // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment
        const DevMenu = require('react-native-dev-menu');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
        DevMenu.addItem('Toggle Storybook', toggleStorybook);
      }
    },
    // We only want to run this hook once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (__DEV__) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    const Storybook = require('./.storybook/Storybook').default;

    if (showStorybook) {
      return <Storybook />;
    }
  }

  return (
    <AuthProvider>
      <ApolloProvider>
        <NavigationProvider />
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;
