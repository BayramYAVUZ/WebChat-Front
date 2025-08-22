import React, { useEffect, useState } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import { FluentThemeProvider } from 'botframework-webchat-fluent-theme';
import axios from 'axios';
import './App.css';

const App = () => {
  const [token, setToken] = useState(null);
  const [directLine, setDirectLine] = useState(null);

  const styleOptions = {
    bubbleBorderRadius: 12,
    bubbleFromUserBorderRadius: 12,
    suggestedActionBorderRadius: 12,
    hideUploadButton: false,
    sendBoxBackground: '#ffffff',
    sendBoxTextColor: '#000000',
    backgroundColor: '#f3f2f1',
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/get_token`
        );
        const fetchedToken = response.data.token;
        setToken(fetchedToken);
        const line = createDirectLine({ token: fetchedToken, webSocket: true });
        setDirectLine(line);
      } catch (err) {
        console.error('Token alınamadı:', err);
      }
    };

    fetchToken();
  }, []);

  return (
    <div className="webchat-container">
      {directLine ? (
        <FluentThemeProvider>
          <ReactWebChat
            directLine={directLine}
            userID="user1"
            username="Bayram"
            locale="tr-TR"
            styleOptions={styleOptions}
          />
        </FluentThemeProvider>
      ) : (
        <div className="webchat-loading">Yükleniyor...</div>
      )}
    </div>
  );
};

export default App;
