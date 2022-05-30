import React, { useEffect, createRef, useState } from "react";

const MoveWord = ({
  text,
  move,
  disableMove,
  stopPoint,
  setStopPoint,
  transition,
}) => {
  const wordRefs = text.map((el) => createRef());

  const [isMeasured, setIsMeasured] = useState(false);
  const [stopMove, setStopMove] = useState(false);
  const [movePos, setMovePos] = useState(0);

  useEffect(() => {
    if (stopMove) return;

    if (!isMeasured) {
      let breakPoint = 0;
      for (let i = 1; i <= text[0].position; i++) {
        breakPoint += wordRefs[i].current.getBoundingClientRect().width;
      }
      setStopPoint(breakPoint + 8);
      setIsMeasured(true);
    }

    if (move >= stopPoint && isMeasured) {
      setStopMove(true);
      disableMove();
      const parentElement = wordRefs[0].current.parentNode;

      const paddingLeft = parseFloat(
        window
          .getComputedStyle(parentElement, null)
          .getPropertyValue("padding-left")
      );

      wordRefs[1].current.style.left =
        parentElement.getBoundingClientRect().left -
        wordRefs[1].current.getBoundingClientRect().left +
        paddingLeft +
        "px";

      wordRefs[1].current.style.textTransform = "capitalize";

      const exclamation = document.createElement("p");
      exclamation.innerHTML = "!";
      exclamation.style.marginLeft = "-4px";

      wordRefs[wordRefs.length - 1].current.parentNode.append(exclamation);
    } else {
      setMovePos(move);
    }
  }, [move, isMeasured, setStopMove]);

  return (
    <>
      {text.map((item, index) => (
        <p
          style={{
            position: "relative",
            left: item.move ? 0 + movePos : 0,
            transition: item.move
              ? transition
                ? "1s linear"
                : "0s"
              : "0.25s linear",
            marginRight: 5,
          }}
          ref={wordRefs[index]}
        >
          {item.word}
        </p>
      ))}
    </>
  );
};

export default MoveWord;
