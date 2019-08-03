import React, { useState } from "react";
import Game from "./Game";
import Home from "./Home";

export default function App() {
  const [inGame, setInGame] = useState(false);

  return inGame ? <Game onEnd={() => setInGame(false)} /> : <Home onStart={() => setInGame(true)} />
}