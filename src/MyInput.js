//css in js
import { useEffect, useRef, useState } from "react";

import styled from "styled-components";
function delay() {
  // 여기에 딜레이 이후 실행될 코드 작성
  setTimeout(() => {}, 500); // 500 밀리초(0.5초) 후에 delayedFunction 호출
}

export const MyInput = () => {
  const inputEl = useRef(null);

  const handleClick = (e) => {
    console.dir(e.target, { depth: null });
    const range = document.createRange();
    const selection = window.getSelection();

    // 클릭한 위치의 노드와 offset을 이용하여 Range 설정
    // 클릭한 위치의 노드와 offset을 이용하여 Range 설정
    const targetNode = e.target.childNodes[0]; // 수정된 부분
    const offset = getCaretCharacterOffsetWithin(targetNode); // 수정된 부분

    range.setStart(e.target.firstChild, offset);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);

    inputEl.current.focus();
  };

  const getCaretCharacterOffsetWithin = (element) => {
    let caretOffset = 0;
    const doc = element.ownerDocument || element.document;
    const win = doc.defaultView || doc.parentWindow;
    const sel = win.getSelection();
    console.dir(win.getSelection(), { depth: null });
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }

    return caretOffset;
  };

  return (
    <div>
      <EditInput
        ref={inputEl}
        contentEditable="true"
        onClick={handleClick}
        style={{ border: "1px solid #ccc", minHeight: "50px", padding: "8px" }}
      >
        Click me to move the cursor.
      </EditInput>
    </div>
  );
};

const Row = styled.div`
  width: 150px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid black;
`;

const EditInput = styled.div`
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 넘치는 부분을 숨김 */
  white-space: nowrap; /* 텍스트가 줄 바꿈되지 않도록 설정 */
  text-align: center;
  &:focus {
    outline: none;
    font-size: 16px;
    border-bottom: 1px solid #726262;
  }
  overflow: hidden; /* 넘치는 컨텐츠를 숨기는 속성 */
  border: none;
`;
