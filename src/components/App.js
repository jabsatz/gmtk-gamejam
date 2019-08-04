import React, { useState } from "react";
import Game from "./Game";
import Home from "./Home";
import { createGlobalStyle } from "styled-components";

import font from "../assets/Bubblicious.ttf";

const TitleFont = createGlobalStyle`
  @font-face {
    font-family: 'Bubblicious';
    src: url(${font});
  }
`;

export default function App() {
  const [inGame, setInGame] = useState(false);

  return (
    <>
      <TitleFont />
      {inGame ? (
        <Game onEnd={() => setInGame(false)} />
      ) : (
        <Home onStart={() => setInGame(true)} />
      )}
    </>
  );
}
