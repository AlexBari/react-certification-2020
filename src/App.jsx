import React from 'react';
import Main from './components/Main';
import { ProvideAuth } from './providers/ProvideAuth';
import './App.scss';

function App() {
  return (
    <ProvideAuth>
      <Main />
    </ProvideAuth>
  );
}
export default App;
