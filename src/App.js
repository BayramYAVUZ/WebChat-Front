import React, { useEffect, useState } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import { FluentThemeProvider } from 'botframework-webchat-fluent-theme';
import axios from 'axios';
import './App.css';
import { CopilotKit } from '@copilotkit/react-core';
import { CopilotChat } from '@copilotkit/react-ui';

const BACKEND_URL = "https://fastapi-bot-backend-943817890910.europe-west1.run.app";

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
        const response = await axios.get(`${BACKEND_URL}/get_token`);
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
      {directLine ? ( //WebChat
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

      {token && ( // Copilot
        <div style={{ marginTop: '2rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
          <h3>CopilotKit Destekli Asistan</h3>
          <CopilotKit
            runtimeUrl={`${BACKEND_URL}/api/messages`}
            token={token}
            headers={{ Authorization: `Bearer ${token}` }}
          >
            <CopilotChat
              placeholder="Copilot'a bir şey sor..."
              labels={{ assistant: 'Bot', user: 'Sen' }}
              autoFocus={false}
              style={{ minHeight: 150 }}
            />
          </CopilotKit>
        </div>
      )}
    </div>
  );
};

export default App;

