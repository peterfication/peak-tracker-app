import { Button, Text, View } from 'react-native-ui-lib';
import React, { useContext } from 'react';

import { AuthContext } from '../contexts/AuthContext';

export const HomeScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View flex paddingH-25 paddingT-120>
      <Text blue50 text20>
        Welcome
      </Text>
      <View marginT-100 center>
        <Button
          testID="logout-button"
          text70
          white
          background-orange30
          label="Logout"
          onPress={logout}
        />
      </View>
    </View>
  );
};
