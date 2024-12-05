import React, { useState, useEffect } from "react";
import axios from "axios";

function MessageHistory() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Mengambil riwayat pesan dari API
    axios
      .get("http://localhost:2121/messages")
      .then((response) => {
        setMessages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);

  return (
    <div>
      <h2>Riwayat Pesan</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageHistory;
