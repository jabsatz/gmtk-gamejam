import React, { useState } from "react";
import BaseButton from "./Button/Button";
import styled, {css} from "styled-components";
import font from './../assets/Bubblicious.ttf'

const titleFont = css`
  @import url(${font});
`

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "title title title"
                       ".  button ."
                       ".  . .";
  grid-template-rows: 2fr 1fr 2fr;
  grid-template-columns: 2fr 1fr 2fr;
  height: 100%;
  background: black;
  padding: 1em;
`;

const Title = styled.h1`
  grid-area: title;
  font-family: 'Bubblicious';
  line-height: 1.5;
  color: white;
`

const Button = styled(BaseButton)`
  grid-area: button;
  justify-self: center;
  align-self: center;
`

export default function Home({ onStart }) {
  return (
    <Wrapper>
      <Title>
        The <span> amazing </span> adventures of the highly colorized falling squares and <span className="bottom-bar"> a bottom bar </span>
      </Title>
      <Button onClick={() => setTimeout(() => onStart(), 1000)}>
        Start game
      </Button>
    </Wrapper>
  );
}
