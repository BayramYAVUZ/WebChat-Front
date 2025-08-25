import React, { useState } from "react";
import { CopilotSidebar } from "@copilotkit/react-ui";
import { useMakeCopilotDocumentReadable } from "@copilotkit/react-core";

function App() {
  const [input, setInput] = useState("");
  const [streamedResponse, setStreamedResponse] = useState("");

  useMakeCopilotDocumentReadable({ "Latest Bot Response": streamedResponse });

  const handleSend = async () => {
    setStreamedResponse("");

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: input }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      setStreamedResponse((prev) => prev + chunk);
    }
  };

  return (
    <CopilotSidebar>
      <div style={{ padding: "2rem" }}>
        <h1>CopilotKit Chat</h1>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Mesaj yaz..."
          rows={3}
          style={{ width: "100%", padding: "10px" }}
        />
        <button onClick={handleSend} style={{ marginTop: "1rem" }}>
          Gönder
        </button>
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
          <strong>Yanıt:</strong>
          <p>{streamedResponse}</p>
        </div>
      </div>
    </CopilotSidebar>
  );
}

export default App;
