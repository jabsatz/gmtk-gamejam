import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../Config";
import Square from "./Square";
import ColorReference from "./ColorReference";
import Background from "./Background";
import Bar from "./Bar";
import LevelGenerator from "../utils/LevelGenerator";
import ScoreCounter from "./ScoreCounter";

const Wrapper = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
`;

function Game({ onEnd, bpm, midi }) {
    const bgRef = useRef()
    const levelGenerator = useRef();
    if(!levelGenerator.current) {
      levelGenerator.current = new LevelGenerator(Object.values(colors), bpm)
    }
    useEffect(() => {
        levelGenerator.current.play((square) => {
          if(square) setSquares(squares => [...squares, square])
          bgRef.current.triggerPulse("# #555")
        }) 
    }, [])


  
  const [currentColorsSet, setColors] = useState(Object.values(colors));

  const [colorIndex, setColorIndex] = useState(0);
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      levelGenerator.current.startGame();
    }, 1000)
  }, [])

  const color = currentColorsSet[colorIndex];

  

  const [score, setScore] = useState(0);

  
  const handleCollision = useCallback(
    square => {
      if (square.color === color) {
        console.log("hit");
        bgRef.current.triggerPulse(color)
        midi.current.onHit()
        setScore(s => s + 1);
      } else {
        midi.current.onEnd()
        levelGenerator.current.stop()
        onEnd();
      }
      setSquares(squares => squares.filter(s => s.key !== square.key));
    },
    [color, onEnd]
  );

  const updateColorIndex = curr =>
    curr === currentColorsSet.length - 1 ? 0 : curr + 1;

  const handleTap = useCallback(() => {
    setColorIndex(updateColorIndex);
  }, []);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === "Space" || e.code === "Enter") {
        handleTap();
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])


  

  return (
    <Wrapper onClick={handleTap}>
      {squares.map(s => (
        <Square
          key={s.key}
          squareData={s}
          onMount={handleMount}
          onCollision={handleCollision}
          speed={bpm}
        />
      ))}
      <ScoreCounter score={score} />
      <Bar color={color} />
      <ColorReference colors={currentColorsSet} />
      <Background ref={bgRef} />
    </Wrapper>
  );
}

export default Game;
