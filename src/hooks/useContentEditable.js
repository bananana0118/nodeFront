import { useEffect, useRef, useState } from "react";

export const useContentEditable = (initialContent) => {
  const $contentEditable = useRef;
  const [content, _setContent] = useState(initialContent);

  const onInput = (e) => {
    _setContent(e.target.innerText);
  };

  const setContent = (newContent) => {
    if ($contentEditable.current) {
      $contentEditable.current.innerText = newContent;
      _setContent(newContent);
    }
  };

  useEffect(() => {
    setContent(initialContent);
  }, []);

  return { content, setContent, onInput, $contentEditable };
};
export const focusContentEditableTextToEnd = (element) => {
  if (element.innerText.length === 0) {
    element.focus();

    return;
  }

  const selection = window.getSelection();
  const newRange = document.createRange();
  newRange.selectNodeContents(element);
  newRange.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(newRange);
};
