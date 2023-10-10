import React, { useState, useEffect, useCallback } from 'react';
import { DevSettings } from 'react-native';

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
        DevSettings.addMenuItem('Toggle Storybook', toggleStorybook);
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
