import React from 'react'
import styled from "styled-components";
import './Title.css'

const TitleWrapper = styled.div`
    grid-area: title;
`

const TitleText = styled.h1`
  font-family: 'Bubblicious';
  font-weight: normal;
  line-height: 1.5;
  color: white;
  text-align: center;
  font-size: 3.5em;
  margin-top: .2em;
  margin-bottom: 0;
`
const TitleBottomBar = styled.h4`
font-family: 'Montserrat';
font-weight: normal;
line-height: 1.5;
color: white;
margin: 0 auto;
text-align: center;
`

export default function Title() {
  const text = "SQUARES"
    return <TitleWrapper>
<TitleText>
        The <span> amazing </span> adventures of the highly colorized falling squares
      </TitleText>
      <div className="neon">
        <span className="gradient"></span>
        <span className="spotlight"></span>
      </div>

 <TitleBottomBar className="title-bottom-bar"> and a bottom bar </TitleBottomBar>

      </TitleWrapper>
}