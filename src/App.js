import React, { useEffect, useState } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import axios from 'axios';

function App() {
  const [directLine, setDirectLine] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.post(
          'https://fastapi-bot-backend-943817890910.europe-west1.run.app/get_token'
        );
        const token = res.data?.token;

        if (token) {
          const directLineInstance = createDirectLine({
            token,
            webSocket: true 
          });
          setDirectLine(directLineInstance);
        } else {
          console.error('Token yanıtında bulunamadı:', res.data);
        }
      } catch (err) {
        console.error('Token alınamadı:', err);
      }
    };

    fetchToken();
  }, []);

  if (!directLine) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
          fontWeight: 'bold'
        }}
      >
        Bot bağlanıyor...
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactWebChat
        directLine={directLine}
        styleOptions={{
          hideUploadButton: true,
          botAvatarInitials: '🤖',
          userAvatarInitials: '👤',
          bubbleBackground: '#0078d4',
          bubbleTextColor: 'white',
          userBubbleBackground: '#e6e6e6',
          userBubbleTextColor: 'black'
        }}
      />
    </div>
  );
}

export default App;
