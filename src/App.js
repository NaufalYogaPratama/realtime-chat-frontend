import React from "react";
import "./App.css";
import Chat from "./components/Chat";
import MessageHistory from "./components/MessageHistory";

function App() {
  return (
    <div className="App">
      <MessageHistory />
      <Chat />
    </div>
  );
}

export default App;
