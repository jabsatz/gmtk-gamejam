import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  font-family: "Montserrat", sans-serif;
  font-size: 2rem;
  padding: 1em;
  color: white;
  flex-grow: 1;
  user-select: none;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 500ms ease-in-out;
`;

export default function ScoreCounter({ score, show }) {
  return <Wrapper show={show}>{score}</Wrapper>;
}
