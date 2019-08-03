import React from "react";
import styled from "styled-components";
import { useSpring, animated , config } from "react-spring";

const ColorsContainer = styled(animated.div)`
  box-shadow: 1px 2px 20px 4px #3535356b;
  display: flex;
  width: 100%;
  height: 4em;
  z-index: 1;
  will-change: transform, opacity;
`;

const Color = styled.div`
  flex-grow: 1;
  background: ${({ color }) => color};
`;

export default function ColorReference({ colors }) {

  const springProps = useSpring({
    transform: 'translateY(0px)',
    opacity: 1,
    from: { transform: 'translateY(50px)', opacity: 0 },
    config: config.stiff
  })

  return (
    <ColorsContainer style={springProps}>
      {colors.map(color => (
        <Color color={color} key={color} />
      ))}
    </ColorsContainer>
  );
}
