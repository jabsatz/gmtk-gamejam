import React, { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 600ms ease-in-out;
  user-select: none;
  text-align: center;
`;

const DeathText = styled.div`
  letter-spacing: 18px;
  font-size: 6em;
  font-weight: bold;
  color: white;
  line-height: 1;
  position: relative;
  display: inline-block;
  margin: 0.75em 0;
  text-align: center;
  font-family: "Bubblicious";
  text-shadow: -4px 5px 9px #ff444496;
`;

const FinalScore = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 2rem;
  color: white;
  user-select: none;
`;

export default function LoseScreen({ show, onAnimationEnd, score }) {
  useEffect(() => {
    if (show) {
      const tm = setTimeout(() => onAnimationEnd(), 4300);
      return () => clearTimeout(tm);
    }
  }, [onAnimationEnd, show]);
  return (
    <Wrapper show={show}>
      <DeathText>YOU DIED</DeathText>
      <FinalScore>Final score: {score}</FinalScore>
    </Wrapper>
  );
}
