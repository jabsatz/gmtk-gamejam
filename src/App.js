import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: lightgray;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Bar = styled.div`
  height: 100px;
  background: red;
`;

function App() {
  return (
    <Wrapper>
      <Bar />
    </Wrapper>
  );
}

export default App;
