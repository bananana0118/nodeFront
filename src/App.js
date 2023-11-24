import { useState } from "react";
import styled from "styled-components";

function App() {
  const [contents, setContents] = useState();
  return (
    <Continer>
      <NavBar>
        <div>home</div>
        <div>간식대장</div>
        <div>최애간식</div>
        <div>붕어빵</div>
      </NavBar>
      <Body>{contents}</Body>
    </Continer>
  );
}

export default App;

const Continer = ``;
const NavBar = styled.div``;
const Body = styled.div``;
