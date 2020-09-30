import React from 'react';
import Main from './components/Main';
import { ProvideAuth } from './providers/AuthProvider';
import { UIProvider } from './providers/UIProvider';
import './App.scss';

function App() {
  return (
    <ProvideAuth>
      <UIProvider>
        <Main />
      </UIProvider>
    </ProvideAuth>
  );
}
export default App;
