import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const BarElement = styled(animated.div)`
  height: 5em;
  width: 100%;
  box-shadow: 0px -5px 30px #0a0a0ab5;
  transition: all 0.3s ease;
  z-index: 0;
  will-change: transform, opacity, background;
  clip-path: polygon(
    0 0,
    4% 3.5%,
    8% 6%,
    20% 10%,
    35% 15%,
    43% 18%,
    50% 19%,
    57% 18%,
    65% 15%,
    80% 10%,
    92% 6%,
    96% 3.5%,
    100% 0,
    100% 100%,
    0 100%
  );
`;

export default function Bar({ color }) {
  const props = useSpring({
    background: color,
    transform: "translateY(0px)",
    opacity: 1,
    from: { transform: "translateY(50px)", opacity: 0 }
  });

  return <BarElement style={props} />;
}
