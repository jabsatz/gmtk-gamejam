import React, { useState, useEffect, useRef } from "react";
import MidiSender from "../utils/MidiSender";
import { MIDI_ENABLED } from "../Config";
import Game from "./Game";
import Home from "./Home";


export default function App() {
  const [inGame, setInGame] = useState(false);
  const [bpm, setBpm] = useState(120);

  const midi = useRef();
    if(!midi.current) {
      midi.current = new MidiSender(bpm, MIDI_ENABLED);
      midi.current.init()
    }

  return inGame ? 
    <Game bpm={bpm} onEnd={() => setInGame(false)}  midi={midi} /> :
    <Home onStart={(bpm) => {
      setInGame(true)
      midi.current.onStart()
      if(bpm && !Number.isNaN(parseInt(bpm))) {
        setBpm(parseInt(bpm));
      } 
    }} />
}