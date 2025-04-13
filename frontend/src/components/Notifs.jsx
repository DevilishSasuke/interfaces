import React, { useEffect, useState } from "react";

const Notifications = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/notifications");

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, event.data ]);
    };

    return () => ws.close();
  }, []);

  return (
    <div style={{ position: "fixed", bottom: 0, right: 0, padding: "1rem", background: "#f9f9f9" }}>
      <h4>Уведомления</h4>
      {messages.map((msg, idx) => (
        <div key={idx} style={{ marginBottom: "0.5rem" }}>{msg}</div>
      ))}
    </div>
  );
};

export default Notifications;
