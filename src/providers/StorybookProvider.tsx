import React, { useState, useEffect, useCallback } from 'react';
import { DevSettings } from 'react-native';

export type StorybookProviderType = React.FC<{ children: React.ReactNode }>;

/**
 * This provider adds a "Toggle Storybook" item to the ReactNative developer menu but only
 * if the app is running in development mode.
 *
 * The ReactNative developer menu can be opened by shaking the device e.g. on Mac in the iOS
 * simulator press Cmd+Ctrl+Z.
 */
export const StorybookProvider: StorybookProviderType = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
    const Storybook = require('../../.storybook/Storybook').default;

    if (showStorybook) {
      return <Storybook />;
    }
  }

  return children;
};
