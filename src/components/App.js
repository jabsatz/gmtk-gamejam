import React, { useState, useEffect } from "react";
import Game from "./Game";
import Home from "./Home";


export default function App() {
  const [inGame, setInGame] = useState(false);
  const [bpm, setBpm] = useState(120);

  return inGame ? 
    <Game bpm={bpm} onEnd={() => setInGame(false)} /> :
    <Home onStart={(bpm) => {
      setInGame(true)
      if(bpm && !Number.isNaN(parseInt(bpm))) {
        setBpm(parseInt(bpm));
      } 
    }} />
}