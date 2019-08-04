import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../Config";
import Square from "./Square";
import ColorReference from "./ColorReference";
import Background from "./Background";
import Bar from "./Bar";
import LevelGenerator from "../utils/LevelGenerator";
import ScoreCounter from "./ScoreCounter";
import LoseScreen from './LoseScreen'

const Wrapper = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
`;

function Game({ onEnd, bpm, midi }) {
  const bgRef = useRef();
  const levelGenerator = useRef();
  const [currentColorsSet, setColors] = useState(Object.values(colors));
  const [colorIndex, setColorIndex] = useState(0);
  const color = currentColorsSet[colorIndex];
  if (!levelGenerator.current) {
    levelGenerator.current = new LevelGenerator(
      Object.values(colors),
      bpm,
      colorIndex
    );
  }

  const [squares, setSquares] = useState([]);
  const [loseFlag, setLoseFlag] = useState(false);

  const handleCollision = useCallback(
    collision => {
      if (collision.match) {
        console.log("hit");
        bgRef.current.triggerPulse(collision.color);
        midi.current.onHit();
        setScore(s => s + 1);
      } else {
        midi.current.onEnd();
        levelGenerator.current.stop();
        setLoseFlag(true);
      }
      setTimeout(() => setSquares(squares => squares.filter(s => s.key !== collision.key)), 500);
    },
    [onEnd, midi]
  );

  useEffect(() => {
    levelGenerator.current.play(({ square, collision }) => {
      if (square) setSquares(squares => [...squares, square]);
      if (collision) {
        handleCollision(collision);
      } else {
        bgRef.current.triggerPulse("# #555");
      }
    });
  }, [handleCollision]);

  useEffect(() => {
    setTimeout(() => {
      levelGenerator.current.startGame();
    }, 1000);
  }, []);

  const [score, setScore] = useState(0);

  const updateColorIndex = useCallback(
    curr => {
      const newColorIndex = curr === currentColorsSet.length - 1 ? 0 : curr + 1;
      levelGenerator.current.setBarColorIndex(newColorIndex);
      return newColorIndex;
    },
    [currentColorsSet.length]
  );

  const handleTap = useCallback(() => {
    setColorIndex(updateColorIndex);
  }, [updateColorIndex]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === "Space" || e.code === "Enter") {
        handleTap();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleTap]);

  return (
    <Wrapper onClick={handleTap}>
      {squares.map(s => (
        <Square key={s.key} color={s.color} bpm={bpm} />
      ))}
      <ScoreCounter score={score} />
      <Bar color={color} />
      <ColorReference colors={currentColorsSet} />
      <Background ref={bgRef} />
      <LoseScreen show={loseFlag} onAnimationEnd={() => onEnd()} />
    </Wrapper>
  );
}

export default Game;
