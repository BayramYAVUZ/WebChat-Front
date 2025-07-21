import React, { useMemo } from 'react';
import ReactWebChat from 'botframework-webchat';

function App() {
 
  const directLine = useMemo(() => {
    return window.WebChat.createDirectLine({
      token: process.env.REACT_APP_BOT_SECRET
    });
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <ReactWebChat directLine={directLine} />
    </div>
  );
}

export default App;
