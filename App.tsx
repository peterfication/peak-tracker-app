import React from 'react';

import { AuthProvider } from './src/contexts/AuthContext';
import { HomeScreen } from './src/screens/HomeScreen';

export const App = () => {
  return (
    <AuthProvider>
      <HomeScreen />
    </AuthProvider>
  );
};

export default App;
