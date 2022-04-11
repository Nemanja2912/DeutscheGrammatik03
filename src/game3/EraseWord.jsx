import React, { useEffect, createRef } from "react";

const EraseWord = ({ text, opacity }) => {
  const letterRefs = text.map((el) => createRef());

  useEffect(() => {
    if (opacity === 1) {
      let width = 0;

      const parentElement = letterRefs[0].current.parentNode;

      const paddingLeft = parseFloat(
        window
          .getComputedStyle(parentElement, null)
          .getPropertyValue("padding-left")
      );

      let lastIndex;

      for (let i = letterRefs.length - 1; i >= 0; i--) {
        if (!text[i].opacity) {
          lastIndex = i;
          break;
        }
      }

      for (let i = 0; i <= lastIndex; i++) {
        if (!text[i].opacity) {
          letterRefs[i].current.style.left =
            parentElement.getBoundingClientRect().left -
            letterRefs[i].current.getBoundingClientRect().left +
            width +
            paddingLeft +
            "px";

          if (text[i].newLetter) {
            letterRefs[i].current.innerHTML = text[i].newLetter;
          }

          if (width === 0) {
            letterRefs[i].current.style.textTransform = "uppercase";
          }

          if (i === lastIndex) {
            letterRefs[i].current.innerHTML += "!";
          }

          width += letterRefs[i].current.getBoundingClientRect().width;
        }
      }
    }
  }, [opacity]);
  return (
    <>
      {text.map((item, index) => (
        <p
          style={{
            position: "relative",
            opacity: item.blank ? 0 : item.opacity ? 1 - opacity : 1,
            left: 0,
            transition: item.opacity ? "0s" : "0.25s linear",
          }}
          className={`${!item.opacity && "move-letter"}`}
          ref={letterRefs[index]}
        >
          {item.letter}
        </p>
      ))}
    </>
  );
};

export default EraseWord;
