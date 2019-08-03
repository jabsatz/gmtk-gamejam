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
`;

export default function ScoreCounter({ score }) {
    return <Wrapper>{score}</Wrapper>
}