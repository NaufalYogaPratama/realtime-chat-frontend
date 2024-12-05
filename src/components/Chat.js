import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:2121");

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState("");
  const userId = new URLSearchParams(window.location.search).get("user"); // Ambil ID dari URL

  useEffect(() => {
    if (userId) {
      socket.emit("register", userId);

      socket.on("privateMessage", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

      return () => {
        socket.off("privateMessage");
      };
    }
  }, [userId]);

  const sendMessage = () => {
    if (message.trim() && receiver.trim()) {
      const msgData = {
        sender: userId,
        receiver: receiver,
        message: message,
      };

      socket.emit("privateMessage", msgData);
      setMessages((prevMessages) => [...prevMessages, msgData]);
      setMessage("");
    }
  };

  if (!userId) {
    return <h1>Error: No User ID provided in the URL!</h1>;
  }

  return (
    <div>
      <h1>Private Chat</h1>
      <div>
        <label>
          <strong>Your ID: </strong>
          <span>{userId}</span>
        </label>
      </div>
      <div>
        <label>
          <strong>Send to (Receiver ID): </strong>
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder="Masukkan ID penerima"
          />
        </label>
      </div>
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>
              <strong>
                {msg.sender} to {msg.receiver}:
              </strong>{" "}
              {msg.message}
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
