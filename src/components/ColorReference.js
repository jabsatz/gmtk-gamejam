import React from "react";
import styled from "styled-components";

const ColorsContainer = styled.div`
  box-shadow: 1px 2px 20px 4px #3535356b;
  display: flex;
  width: 100%;
  height: 4em;
  z-index: 1;
`;

const Color = styled.div`
  flex-grow: 1;
  background: ${({ color }) => color};
`;

export default function ColorReference({ colors }) {
  return (
    <ColorsContainer>
      {colors.map(color => (
        <Color color={color} key={color} />
      ))}
    </ColorsContainer>
  );
}
