import React, { useEffect, useState } from 'react';
import ReactWebChat from 'botframework-webchat';
import axios from 'axios';

function App() {
  const [directLine, setDirectLine] = useState(null);

  useEffect(() => {
    // Backend'den Direct Line token al
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_token`)
      .then(res => {
        const token = res.data.token;
        setDirectLine(window.WebChat.createDirectLine({ token }));
      })
      .catch(err => console.error('Token alınamadı:', err));
  }, []);

  if (!directLine) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div style={{ height: '100vh' }}>
      <ReactWebChat directLine={directLine} />
    </div>
  );
}

export default App;

