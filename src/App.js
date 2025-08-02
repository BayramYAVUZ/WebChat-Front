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
            bubbleBackground: '#0078d4',
            bubbleTextColor: 'white',
            userBubbleBackground: '#e6e6e6',
            userBubbleTextColor: 'black'
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


