import React from "react";
import styled from "styled-components";
import "./Title.css";

const TitleWrapper = styled.div`
  grid-area: title;
`;

const TitleText = styled.h1`
  font-family: "Bubblicious";
  font-weight: normal;
  line-height: 1;
  color: white;
  text-align: center;
  font-size: 2.5em;
  margin-top: 0.2em;
  margin-bottom: 0.4em;
  @media screen and (min-height: 667px) {
    font-size: 3.5em;
    line-height: 1.2em;
  }
`;
const TitleBottomBar = styled.h4`
  font-family: "Montserrat";
  font-weight: normal;
  line-height: 1;
  color: white;
  margin: 0 auto;
  text-align: center;
`;

export default function Title() {
  return (
    <TitleWrapper>
      <TitleText>
        The <span> amazing </span> adventures of the highly colorized falling
        squares
      </TitleText>
      <div className="neon">
        <span className="gradient" />
        <span className="spotlight" />
      </div>

      <TitleBottomBar className="title-bottom-bar">
        and a bottom bar
      </TitleBottomBar>
    </TitleWrapper>
  );
}
