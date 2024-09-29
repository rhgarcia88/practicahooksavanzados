import React from 'react';
import './App.css';
import useCurrentTime from './customHooks/useCurrentTime';
import Timer from './components/Timer/Timer';
import Calculator from './components/Calculator/Calculator';

function App() {
const currentTime = useCurrentTime();

  return (
    <div className="app">
      <Timer time={currentTime.toLocaleTimeString()}/>
      <Calculator/>
    </div>
  )
}

export default App
