import React, { useEffect, useState, useRef } from 'react';
import { createDirectLine, renderWebChat } from 'botframework-webchat';
import axios from 'axios';

function App() {
  const [directLine, setDirectLine] = useState(null);
  const webchatRef = useRef(null);

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

  useEffect(() => {
    if (directLine && webchatRef.current) {
      renderWebChat(
        {
          directLine,
          styleOptions: {
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
          }
        },
        webchatRef.current
      );
    }
  }, [directLine]);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      {!directLine ? (
        <div style={{ textAlign: 'center', paddingTop: '2rem' }}>Yükleniyor...</div>
      ) : (
        <div ref={webchatRef} style={{ height: '100%', width: '100%' }} role="main" />
      )}
    </div>
  );
}

export default App;

