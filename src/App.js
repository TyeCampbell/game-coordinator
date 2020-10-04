import React from 'react';
import './App.css';
import TimedMission from './components/mission_timed';
import ControlPointMission from "./components/mission_control_point";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Choose Your Mission
        </p>
        <TimedMission/>
      </header>
    </div>
  );
}

export default App;
