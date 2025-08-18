import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactWebChat from 'botframework-webchat';
import { FluentThemeProvider } from 'botframework-webchat-fluent-theme';
import { createDirectLine } from 'botframework-webchat';

function App() {
  const [directLine, setDirectLine] = useState(null);

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/get_token`)
      .then(res => {
        const token = res.data.token;
        if (token) {
          const dl = createDirectLine({ token, webSocket: true });
          setDirectLine(dl);
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
          />
        </FluentThemeProvider>
      )}
    </div>
  );
}

export default App;
