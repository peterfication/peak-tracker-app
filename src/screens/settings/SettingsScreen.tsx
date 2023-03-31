import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native-ui-lib';

import { AuthContext } from '@app/contexts';

export const SettingsScreenWrapper = () => {
  const { logout } = useContext(AuthContext);

  return <SettingsScreen logout={logout} />;
};

export const SettingsScreen = ({ logout }: { logout: () => Promise<void> }) => {
  return (
    <View flex paddingH-25 paddingT-120>
      <Text blue50 text20>
        Settings
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
