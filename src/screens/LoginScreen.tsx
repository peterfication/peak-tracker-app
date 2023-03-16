import React from 'react';
import { Button, Colors, LoaderScreen, Text, View } from 'react-native-ui-lib';

/**
 * The login screen is a simple screen with a button that calls the login
 * function. The actual login happens via OpenID Connect in the AuthContext.
 *
 * @param login The login function that triggers the OpenID Connect workflow.
 */
export const LoginScreen = ({ login }: { login: () => Promise<void> }) => {
  return (
    <View testID="login-screen" flex paddingH-25 paddingT-120>
      <Text blue50 text20>
        Peak Tracker
      </Text>
      <View marginT-100 center>
        <Button
          testID="login-button"
          text70
          white
          background-orange30
          label="Login"
          onPress={login}
        />
      </View>
    </View>
  );
};

/**
 * This loading screen is shown when the auth state is not yet known,
 * in the sense that we don't know if the user is logged in or not
 * because the auth state is still loading from storage.
 */
export const LoginLoadingScreen = () => {
  return (
    <LoaderScreen
      testID="login-loading-screen"
      message="Loading ..."
      color={Colors.grey40}
    />
  );
};
