import React, { useMemo, useEffect } from 'react';
import ReactWebChat from 'botframework-webchat';
import axios from 'axios';

function App() {
  const directLine = useMemo(() => {
    return window.WebChat.createDirectLine({
     token: process.env.REACT_APP_BOT_SECRET
    });
  }, []);

  useEffect(() => {
    // Örnek backend çağrısı
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/health`)
      .then(res => console.log('Backend sağlıklı:', res.data))
      .catch(err => console.error('Backend bağlantı hatası:', err));
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <ReactWebChat directLine={directLine} />
    </div>
  );
}

export default App;
