import React from 'react';
// import { STORYBOOK_ENABLED } from '@env';

import {
  ApolloProvider,
  AuthProvider,
  NavigationProvider,
} from '@app/providers';

// import Storybook from './.storybook/Storybook';

export const App = () => {
  return (
    <AuthProvider>
      <ApolloProvider>
        <NavigationProvider />
      </ApolloProvider>
    </AuthProvider>
  );
};

// const defaultExport = STORYBOOK_ENABLED === 'true' ? Storybook : App;

// if (STORYBOOK_ENABLED === 'true') {
//   console.log('Running Storybook ...');
// }

// export default defaultExport;
export default App;
