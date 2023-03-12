import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [state, setState] = useState([]);
  React.useEffect(() => {
    // fetch('');
  }, [])
  return (
    <div>
      <h1>Tracker</h1>
      {state && state.map(s => <p>{s}</p>)}
    </div>
  );
}

export default App;
