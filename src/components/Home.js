import React, { useEffect } from "react";
import BaseButton from "./Button/Button";
import styled from "styled-components";
import Title from "./Title/Title";
import menuThemeSrc from "../assets/menuTheme.mp3";
import { Howl } from "howler";
import Mute from './Mute'

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    "title title title"
    ".  button ."
    ".  . .";
  grid-template-rows: 2fr 1fr 2fr;
  grid-template-columns: 2fr 1fr 2fr;
  height: 100%;
  background: black;
  padding: 1em;
  background-color: #330000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23270b57'/%3E%3Cstop offset='1' stop-color='%23330000'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%23FA3' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23FA3' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.16'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  border: 6px solid #eeebeb;
  overflow: hidden;
`;

const Button = styled(BaseButton)`
  grid-area: button;
  justify-self: center;
  align-self: center;
  width: 200%;
  margin-top: 2em;
`;

const menuTheme = new Howl({
  src: menuThemeSrc,
  loop: true,
  onfade: () => menuTheme.stop().volume(1)
});

export default function Home({ onStart }) {
  useEffect(() => {
    menuTheme.play();
    return () => menuTheme.fade(1, 0, 1000);
  }, []);
  return (
    <Wrapper>
      <Title />
      <Button onClick={() => setTimeout(() => onStart(), 1000)}>
        Start game
      </Button>
      <Mute onMute={() => menuTheme.volume() === 0 ? menuTheme.volume(1) : menuTheme.volume(0)} isMuted={menuTheme.volume() === 0}/>
    </Wrapper>
  );
}
