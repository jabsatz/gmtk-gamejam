import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../Config";
import Square from "./Square";
import ColorReference from "./ColorReference";
import Background from "./Background";
import Bar from "./Bar";
import LevelGenerator from "../utils/LevelGenerator";
import ScoreCounter from "./ScoreCounter";
import LoseScreen from "./LoseScreen";
import gameThemeOneSrc from "../assets/gameThemeOne.mp3";
import gameThemeTwoSrc from "../assets/gameThemeTwo.mp3";
import gameThemeThreeSrc from "../assets/gameThemeThree.mp3";
import deathThemeSrc from "../assets/deathTheme.mp3";
import { Howl } from "howler";

const Wrapper = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
`;

const gameThemeThree = new Howl({
  src: [gameThemeThreeSrc],
  onfade: () => gameThemeThree.stop().volume(1),
  loop: true
});
const gameThemeTwo = new Howl({
  src: [gameThemeTwoSrc],
  onfade: () => gameThemeTwo.stop().volume(1)
});
const gameThemeOne = new Howl({
  src: [gameThemeOneSrc],
  onfade: () => gameThemeOne.stop().volume(1)
});

const deathTheme = new Howl({
  src: deathThemeSrc,
  sprite: {
    trimmed: [2000, 4000]
  }
});

function Game({ onEnd }) {
  const [bpm, setBpm] = useState(100);
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

  const handleCollision = useCallback(collision => {
    if (collision.match) {
      console.log("hit");
      bgRef.current && bgRef.current.triggerPulse(collision.color);
      setScore(s => s + 1);
    } else {
      levelGenerator.current.stop();
      deathTheme.play("trimmed");
      deathTheme.fade(0, 1, 500);
      gameThemeOne.fade(1, 0, 1000);
      gameThemeTwo.fade(1, 0, 1000);
      gameThemeThree.fade(1, 0, 1000);
      setLoseFlag(true);
    }
    setTimeout(
      () => setSquares(squares => squares.filter(s => s.key !== collision.key)),
      500
    );
  }, []);

  useEffect(() => {
    levelGenerator.current.play(({ square, collision }) => {
      if (square) setSquares(squares => [...squares, square]);
      if (collision) {
        handleCollision(collision);
      } else {
        bgRef.current && bgRef.current.triggerPulse("# #555");
      }
    });
  }, [handleCollision]);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tm = setTimeout(() => {
      levelGenerator.current.startGame();
      gameThemeOne.play();
      setProgress(1);
    }, 1000);
    return () => clearTimeout(tm);
  }, []);

  useEffect(() => {
    if (progress === 1 && !loseFlag) {
      const tm = setTimeout(() => {
        gameThemeOne.fade(1, 0, 10000); //26000
        levelGenerator.current.pauseGame();
        setProgress(2);
      }, 93000); //77000
      return () => clearTimeout(tm);
    }
  }, [progress, loseFlag]);

  useEffect(() => {
    if (progress === 2 && !loseFlag) {
      const tm = setTimeout(() => {
        gameThemeTwo.play();
        setBpm(120);
        levelGenerator.current.setBPM(120);
        levelGenerator.current.startGame();
        setProgress(3);
      }, 5000);
      return () => clearTimeout(tm);
    }
  }, [progress, loseFlag]);

  useEffect(() => {
    if (progress === 3 && !loseFlag) {
      const tm = setTimeout(() => {
        levelGenerator.current.pauseGame();
        setProgress(4);
      }, 45500);
      return () => clearTimeout(tm);
    }
  }, [progress, loseFlag]);

  useEffect(() => {
    if (progress === 4 && !loseFlag) {
      const tm = setTimeout(() => {
        gameThemeTwo.stop();
        gameThemeThree.play();
        setBpm(140);
        levelGenerator.current.setBPM(140);
        levelGenerator.current.startGame();
        setProgress(5);
      }, 2500);
      return () => clearTimeout(tm);
    }
  }, [progress, loseFlag]);

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
    !loseFlag && setColorIndex(updateColorIndex);
  }, [loseFlag, updateColorIndex]);

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
      <ScoreCounter show={!loseFlag} score={score} />
      <Bar color={color} />
      <ColorReference colors={currentColorsSet} />
      <Background ref={bgRef} />
      <LoseScreen show={loseFlag} score={score} onAnimationEnd={onEnd} />
    </Wrapper>
  );
}

export default Game;
