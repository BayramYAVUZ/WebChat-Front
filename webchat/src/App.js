import React, { useMemo } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import './App.css';

function App() {
  const directLineSecret = process.env.REACT_APP_DIRECT_LINE_SECRET;

  const directLine = useMemo(
    () =>
      createDirectLine({
        secret: directLineSecret
      }),
    [directLineSecret]
  );

  return (
    <div className="App" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ReactWebChat directLine={directLine} userID="user1" />
    </div>
  );
}

export default App;
