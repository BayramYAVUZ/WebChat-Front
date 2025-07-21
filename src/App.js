import React, { useMemo, useEffect } from 'react';
import ReactWebChat from 'botframework-webchat';
import axios from 'axios';

function App() {
  const directLine = useMemo(() => {
    return window.WebChat.createDirectLine({
      token: "4Dii0jSaEzqbXAXwYyYXk6IKWljb3SE5U5n5YeH7oJ432ZY1IPjwJQQJ99BGAC5RqLJAArohAAABAZBS1gBj.G4GF3r6Ualt6l2pTl9SnxNdrFPHrxNSHYwenyv5k8rUlhhZusOHtJQQJ99BGAC5T7U2AArohAAABAZBS1B1i"
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
