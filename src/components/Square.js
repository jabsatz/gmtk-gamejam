import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fall = keyframes`
  from {
    opacity: 1;
    transform: translateY(-4em); 
  }
  to {
    opacity: 1;
    transform: translateY(${window.innerHeight}px);
  }
`;

const Wrapper = styled.div`
  background: ${({ color }) => color};
  height: 4em;
  width: 4em;
  animation: ${fall} ${({ speed }) => speed}ms linear;
  opacity: 0;
  position: fixed;
  top: 0;
  border-radius: 1em;
  transition: background 0.3s ease;
  will-change: transform, opacity;
`;

export default function Square({ color, bpm }) {
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    setMoving(true);
  }, []);

  return <Wrapper color={color} speed={(60 / bpm) * 3600} moving={moving} />;
}
