import React from "react";
import styled from "styled-components";

const BarElement = styled.div`
  height: 5em;
  width: 100%;
  box-shadow: 0px -5px 30px #0a0a0ab5;
  background: ${({ color }) => color};
  transition: all 0.3s ease;
  z-index: 0;
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
  return <BarElement color={color} />;
}
