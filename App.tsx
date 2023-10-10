import React, { useState } from 'react';
import { addItem } from 'react-native-dev-menu';

import {
  ApolloProvider,
  AuthProvider,
  NavigationProvider,
} from '@app/providers';

import Storybook from './.storybook/Storybook';

/**
 * Add item to DevMenu (Cmd+D) to toggle between the app and Storybook.
 */
const addDevMenuItemForStorybook = (
  setShowStorybook: React.Dispatch<React.SetStateAction<boolean>>,
  showStorybook: boolean,
) => {
  addItem('Toggle Storybook', () => setShowStorybook(!showStorybook)).catch(
    error =>
      error instanceof Error &&
      console.error(
        `DevMenu.addItem "Toggle Storybook" error: ${error.toString()}`,
      ),
  );
};

export const App = () => {
  const [showStorybook, setShowStorybook] = useState(false);

  if (__DEV__) {
    addDevMenuItemForStorybook(setShowStorybook, showStorybook);

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
