import React, { useState, useRef } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  const connectWebSocket = () => {
    ws.current = new WebSocket("wss://webbapp.azurewebsites.net/ws");

    ws.current.onopen = () => {
      ws.current.send(input);
    };

    ws.current.onmessage = (event) => {
      if (event.data === "[DONE]") {
        ws.current.close();
        return;
      }
      setMessages((prev) => [...prev, event.data]);
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([]);
    connectWebSocket();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>💬 Azure WebSocket Chat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          placeholder="Mesaj yaz..."
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "70%", padding: 10, fontSize: 16 }}
        />
        <button type="submit" style={{ padding: 10, marginLeft: 10 }}>
          Gönder
        </button>
      </form>

      <div style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
        {messages.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
