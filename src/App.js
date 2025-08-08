import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import { FluentThemeProvider } from 'botframework-webchat-fluent-theme';

function App() {
  const [directLine, setDirectLine] = useState(null);

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/get_token`)
      .then(res => {
        const token = res.data.token;
        if (token) {
          const directLineInstance = createDirectLine({ token, webSocket: true });
          setDirectLine(directLineInstance);
        } else {
          console.error('Token yanıtında token bulunamadı:', res.data);
        }
      })
      .catch(err => console.error('Token alınamadı:', err));
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {!directLine ? (
        <div style={{ textAlign: 'center', paddingTop: '2rem' }}>Yükleniyor...</div>
      ) : (
        <FluentThemeProvider>
          <ReactWebChat
            directLine={directLine}
            userID="user1"
            username="Bayram"
            styleOptions={{
              backgroundColor: '#F3F2F1',
              bubbleBackground: '#E1DFDD',
              bubbleTextColor: '#000000',
              bubbleBorderRadius: 10,
              bubbleFromUserBackground: '#0078D4',
              bubbleFromUserTextColor: '#FFFFFF',
              bubbleFromUserBorderRadius: 10,
              primaryFont: '"Segoe UI", sans-serif',
              sendBoxBackground: '#FFFFFF',
              sendBoxButtonColor: '#0078D4',
              sendBoxTextColor: '#000000',
              sendBoxBorderTop: 'solid 1px #ccc',
              paddingRegular: 10,
              timestampColor: '#777777'
            }}
          />
        </FluentThemeProvider>
      )}
    </div>
  );
}

export default App;

