import React from "react";
import "./App.css";
import react_logo from "./assets/react.png";

import TechList from "./components/TechList";

function App() {
  return (
    <>
      <h1>ReactJS List</h1>
      <img src={react_logo} width="100" />
      <TechList />
    </>
  );
}

export default App;
