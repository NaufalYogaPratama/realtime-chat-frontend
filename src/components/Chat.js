import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:2121");
socket.emit("register", "user1");

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Mendengarkan pesan baru dari server
    socket.on("chatMessage", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Clean up ketika komponen di-unmount
    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const msgData = {
        sender: "User1",
        message: message,
      };

      // Mengirim pesan ke server
      socket.emit("chatMessage", msgData);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Real-Time Chat</h1>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>{msg.sender}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Tulis pesan..."
      />
      <button onClick={sendMessage}>Kirim</button>
    </div>
  );
}

export default Chat;
