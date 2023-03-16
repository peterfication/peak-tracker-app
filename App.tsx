import React from 'react';

import { AuthProvider } from './src/contexts/AuthContext';
import { HomeScreen } from './src/screens/HomeScreen';
import Storybook from './.storybook/Storybook';

export const App = () => {
  return (
    <AuthProvider>
      <HomeScreen />
    </AuthProvider>
  );
};

// export default App;
export default Storybook;
