/* istanbul ignore file */

import React, { useState, useEffect, useCallback } from 'react';
// We need to import directly from the file instead of from react-native
// because we need to mock this in the tests.
// @ts-expect-error It's falsely reported that DevSettings has no exported member addMenuItem,
// but there actually is: https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Utilities/DevSettings.d.ts
import { addMenuItem } from 'react-native/Libraries/Utilities/DevSettings';

export type StorybookProviderType = React.FC<{ children: React.ReactNode }>;

/**
 * This provider adds a "Toggle Storybook" item to the ReactNative developer menu but only
 * if the app is running in development mode.
 *
 * The ReactNative developer menu can be opened by shaking the device e.g. on Mac in the iOS
 * simulator press Cmd+Ctrl+Z.
 *
 * NOTE: If __DEV__ is false, nothing related to Storybook is rendered and this provider does
 * basically nothing.
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        addMenuItem('Toggle Storybook', toggleStorybook);
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
