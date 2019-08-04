import React, {useEffect} from "react";
import styled from "styled-components";
import { useSpring } from 'react-spring'

const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    position: fixed;
    opacity: ${({show}) => show ? 1 : 0};
    transition: opacity 600ms ease-in-out;
`



export default function LoseScreen({show, onAnimationEnd}) {
    useEffect(() => {
        if(show) {
            setTimeout(() => onAnimationEnd(), 2000);
        }
    }, [])
    return <Wrapper show={show}> <div class="clip-text clip-text_one">YOU DIED</div> </Wrapper>
}