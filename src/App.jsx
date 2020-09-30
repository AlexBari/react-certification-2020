import React from 'react';
import Main from './components/Main';
import { ProvideAuth } from './providers/AuthProvider';

function App() {
  return (
    <ProvideAuth>
      <Main />
    </ProvideAuth>
  );
}
export default App;
