import React, { useEffect, useState, useMemo, useRef } from 'react';
import axios from 'axios';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import { FluentThemeProvider } from 'botframework-webchat-fluent-theme';

function App() {
  const [token, setToken] = useState(null);
  const directLineRef = useRef(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_token`)
      .then(res => {
        const fetchedToken = res.data.token;
        if (fetchedToken) {
          console.log('Token alındı:', fetchedToken);
          setToken(fetchedToken);
        } else {
          console.error('Token yanıtında token bulunamadı:', res.data);
        }
      })
      .catch(err => {
        console.error('Token alınamadı:', err);
      });
  }, []);

  const directLine = useMemo(() => {
    if (token) {
      directLineRef.current = createDirectLine({
        token: token,
        webSocket: true,
      });
      console.log('DirectLine oluşturuldu');
      return directLineRef.current;
    }
  }, [token]);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {directLine ? (
        <FluentThemeProvider>
          <ReactWebChat
            directLine={directLine}
            userID="user1"
            username="Bayram"
            locale="tr-TR"
            styleOptions={{
              bubbleBorderRadius: 15,
              bubbleFromUserBorderRadius: 15,
              suggestedActionBorderRadius: 15,
              sendBoxBackground: '#ffffff',
              sendBoxTextColor: '#000000',
              sendBoxButtonColor: '#0078D4',
              backgroundColor: '#f3f2f1',
            }}
          />
        </FluentThemeProvider>
      ) : (
        <div style={{ textAlign: 'center', paddingTop: '2rem' }}>
          Yükleniyor...
        </div>
      )}
    </div>
  );
}

export default App;

