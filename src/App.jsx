import React from "react";
import Main from "./components/Main";
import {ProvideAuth} from "./hooks/auth.hook";
import './App.scss';

function App() {
  return (
    <ProvideAuth>
      <Main />
    </ProvideAuth>
  );
}
export default App;