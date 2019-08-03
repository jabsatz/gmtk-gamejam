import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { colors, MIDI_ENABLED } from "../Config";
import Square from "./Square";
import ColorReference from "./ColorReference";
import Background from "./Background";
import Bar from "./Bar";
import LevelGenerator from "../utils/LevelGenerator";

import MidiSender from '../utils/MidiSender'

const Wrapper = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
`;

function Game({ onEnd, bpm }) {
  const levelGenerator = useRef(new LevelGenerator(Object.values(colors), bpm));
  const [currentColorsSet, setColors] = useState(Object.values(colors));

  const [colorIndex, setColorIndex] = useState(0);
  const [squares, setSquares] = useState(() => [levelGenerator.current.getFirstSquare()]);
  const color = currentColorsSet[colorIndex];

  const bgRef = useRef()


    /* MIDI TRY HARD STUFF */
    
    const Midi = useRef();
    if(!Midi.current) {
      Midi.current = new MidiSender(bpm, MIDI_ENABLED);
    }
    useEffect(() => {
      Midi.current.init()
    }, [])
    /* MIDI TRY HARD STUFF */
  
  const handleCollision = useCallback(
    square => {
      if (square.color === color) {
        console.log("hit");
        bgRef.current.triggerPulse(color)
        Midi.current.onHit()
      } else {
        Midi.current.onEnd()
        onEnd();
      }
      setSquares(squares => squares.filter(s => s.key !== square.key));
    },
    [color, onEnd] //onEnd]
  );

  const handleMount = useCallback(square => {
    if (square.timeToNext) {
      setTimeout(() => {
        setSquares(squares => [...squares, levelGenerator.current.getNextSquare()]);
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
          speed={bpm}
        />
      ))}
      <Bar color={color} />
      <ColorReference colors={currentColorsSet} />
      <Background ref={bgRef} />
    </Wrapper>
  );
}

export default Game;
