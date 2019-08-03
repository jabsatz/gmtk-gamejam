import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { colors } from "../Config";
import Square from "./Square";
import ColorReference from "./ColorReference";
import Background from "./Background";
import Bar from "./Bar";
import LevelGenerator from "../utils/LevelGenerator";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
`;

const levelGenerator = new LevelGenerator(Object.values(colors));

function Game({ onEnd }) {
  const [currentColorsSet, setColors] = useState(Object.values(colors));

  const [colorIndex, setColorIndex] = useState(0);
  const [squares, setSquares] = useState([levelGenerator.getFirstSquare()]);
  const color = currentColorsSet[colorIndex];

  const handleCollision = useCallback(
    square => {
      if (square.color === color) {
        console.log("hit");
      } else {
        onEnd();
      }
      setSquares(squares => squares.filter(s => s.key !== square.key));
    },
    [color, onEnd]
  );

  const handleMount = useCallback(square => {
    if (square.timeToNext) {
      setTimeout(() => {
        setSquares(squares => [...squares, levelGenerator.getNextSquare()]);
      }, square.timeToNext);
    }
  }, []);

  const updateColorIndex = curr =>
    curr === currentColorsSet.length - 1 ? 0 : curr + 1;

  const handleTap = () => {
    setColorIndex(updateColorIndex);
    //TODO -> set next bar color
  };

  const handleKeyDown = e => console.log(e.key);

  return (
    <Wrapper onClick={handleTap} onKeyPress={handleKeyDown}>
      {squares.map(s => (
        <Square
          key={s.key}
          squareData={s}
          onMount={handleMount}
          onCollision={handleCollision}
          speed={3000}
        />
      ))}
      <Bar color={color} />
      <ColorReference colors={currentColorsSet} />
      <Background />
    </Wrapper>
  );
}

export default Game;
