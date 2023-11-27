import React, { useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4009');

const Client1 = () => {
  const [data, setData] = useState('');
  

  return (
    <div>
      <input type="text" value={data} onChange={(e) => setData(e.target.value)} />
      
      <button>Send Data to Server</button>
    </div>
  );
};

export default Client1;
