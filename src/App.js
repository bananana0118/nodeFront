import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SnackPage from "./SnackPage";

function App() {
  const [contents, setContents] = useState("");
  const navigate = useNavigate();
  return (
    <Continer>
      <NavBar>
        <Menu onClick={() => navigate("/")}>간식대장</Menu>
        <Menu onClick={() => navigate("/list")}>간식목록</Menu>
        <Menu onClick={() => navigate("/favorite")}>즐겨찾기</Menu>
      </NavBar>
      <Body>
        <Routes>
          <Route element={<SnackPage />} path="/"></Route>
          <Route element={<div>list</div>} path="/list"></Route>
          <Route element={<div>favorite</div>} path="/favorite"></Route>
        </Routes>
      </Body>
    </Continer>
  );
}

export default App;

const Continer = styled.div`
  width: 100%;
  height: 100%;
`;
const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10%;

  justify-content: center;
  align-items: center;
  color: white;
  height: 50px;
  background-color: black;
`;
const Body = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
`;
const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100px;
  font-size: 1.2rem;
  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;
