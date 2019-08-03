import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import useTimeout from "../hooks/useTimeout";

const fall = keyframes`
  from {
    opacity: 1;
    transform: translateY(-6em); 
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
  animation: ${fall} ${({ speed }) => ( 240 / speed ) * 1000}ms linear;
  opacity: 0;
  position: fixed;
  top: 0;
  border-radius: 1em;
  transition: background 0.3s ease;
  will-change: transform, opacity;
`;

export default function Square({
  squareData,
  onMount,
  onCollision,
  speed = 5000
}) {
  const [moving, setMoving] = useState(false);
  const collision = useTimeout(
    ((window.innerHeight - 130) * ( 240 / speed ) * 1000) / window.innerHeight
  );

  if (collision) {
    onCollision(squareData);
  }

  useEffect(() => {
    onMount(squareData);
    setMoving(true);
  }, [onMount, squareData]);

  return <Wrapper color={squareData.color} speed={speed} moving={moving} />;
}
