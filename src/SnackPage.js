import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { api } from "./api/api";
import { MyInput } from "./MyInput";
export default function SnackPage() {
  const [snackInfo, setSnackInfo] = useState({});
  const [snackList, setSnackList] = useState([]);
  const [editStatus, setEditStatus] = useState(0);
  const onChangeSnackInfo = (e) => {
    setSnackInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const onLoad = async () => {
    const result = await api.post("/posts/read");
    console.log(result.data.data);
    setSnackList([...result.data.data]);
  };

  const onClickAddSnack = async () => {
    const res = await api.post("/posts/write", snackInfo);
    onLoad();
    console.log(res.data);
  };

  const onClickDeleteSnack = async (e) => {
    console.log(e.target.id);
    await api.post("/posts/delete", { id: e.target.id });
    onLoad();
  };

  const dateConvert = (isoString) => {
    const dateObject = new Date(isoString);
    const date = dateObject.toLocaleDateString();
    const time = dateObject.toLocaleTimeString();

    return date + time;
  };

  useEffect(() => {
    onLoad();
  }, []);
  console.log(snackList);
  return (
    !!snackList && (
      <div>
        <Container>
          <AddBox>
            <div>과자 추가하기</div>
            <InputBox>
              <div>이름</div>
              <input
                name={"name"}
                value={snackInfo.name}
                onChange={(e) => onChangeSnackInfo(e)}
              />
            </InputBox>
            <InputBox>
              <div>링크</div>
              <input
                name={"link"}
                value={snackInfo.link}
                onChange={(e) => onChangeSnackInfo(e)}
              ></input>
            </InputBox>
            <button onClick={onClickAddSnack}>간식추가</button>
          </AddBox>
          <div>과자목록</div>
          <Table>
            <Row>이름</Row>
            <Row>링크</Row>
            <Row>날짜</Row>
            <Row>삭제</Row>
            {snackList.map((snack, id) => (
              <>
                <MyInput value={snack.name} />
                <MyInput value={snack.link} />
                <MyInput value={dateConvert(snack.date)} />
                <Row>
                  <DeleteButton id={snack.id} onClick={onClickDeleteSnack}>
                    X
                  </DeleteButton>
                </Row>
              </>
            ))}
          </Table>
        </Container>
      </div>
    )
  );
}

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid black;
`;

const AddBox = styled.div`
  display: flex;
  padding: 2%;
  margin: 2%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DeleteButton = styled.div`
  background-color: red;
  width: 1.6rem;
  height: 1.6rem;
  color: white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;
