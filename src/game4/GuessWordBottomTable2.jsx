import React, { useState, useEffect, useRef } from "react";
import GuessWordImproved from "../UI/GuessWordImproved";
import Indicator from "./../UI/Indicator";

const GuessWordBottomTable2 = ({
  singleFinished,
  guessBox,
  obj,
  activeButton,
  finished,
  setFinished,
  finishedElement,
  dropRef,
  answerIndex,
  setImageDone,
  imageDone,
  setBlankWidth,
  labelActive,
  help,
  moveRefs,
}) => {
  const [focusIndex, setFocusIndex] = useState(0);
  const [statusState, setStatusState] = useState([
    ["init"],
    ["init"],
    ["init"],
  ]);

  const [indicator, setIndicator] = useState([]);

  const refs = [useRef(null), useRef(null), useRef(null)];

  const [helpFocus, setHelpFocus] = useState([false, false, false]);

  useEffect(() => {
    if (help) {
      setHelpFocus((prev) => {
        prev[focusIndex] = true;

        return [...prev];
      });

      setTimeout(() => {
        setHelpFocus((prev) => {
          prev[focusIndex] = false;

          return [...prev];
        });
      }, 0);
    }
  }, [help]);

  const handleMove = (initEvent, index) => {
    const element = initEvent.target;
    element.style.transition = "0s linear";

    const initX = element.getBoundingClientRect().left;
    const initY = element.getBoundingClientRect().top;

    const cursorX = initX - initEvent.clientX;
    const cursorY = initY - initEvent.clientY;

    element.style.zIndex = 15;

    const moveEvent = (moveEvent) => {
      element.style.left = moveEvent.clientX - initX + cursorX + "px";
      element.style.top = moveEvent.clientY - initY + cursorY + "px";
    };

    const endMove = (endEvent) => {
      document.removeEventListener("mousemove", moveEvent);
      document.removeEventListener("mouseup", endMove);

      setTimeout(() => {
        element.style.zIndex = 1;
      }, 500);

      const dropZone = dropRef.current.getBoundingClientRect();

      if (
        endEvent.clientX > dropZone.left &&
        endEvent.clientX < dropZone.right &&
        endEvent.clientY > dropZone.top &&
        endEvent.clientY < dropZone.bottom &&
        answerIndex === index
      ) {
        element.style.left = 0;
        element.style.top = 0;

        setTimeout(() => {
          setBlankWidth(
            dropRef.current.children[0].getBoundingClientRect().width
          );
        }, 0);

        setImageDone();
      } else {
        element.style.transition = "0.25s linear";
        element.style.left = 0;
        element.style.top = 0;

        setIndicator(["wrong"]);
      }
    };

    document.addEventListener("mousemove", moveEvent);
    document.addEventListener("mouseup", endMove);
  };

  return (
    <div className="bottom bottom2">
      <div
        className="label"
        style={{
          backgroundColor: labelActive ? "#5ac8f5" : "#9aa1a5",
        }}
      >
        <p>
          Imperativ- <br /> Formen bilden
        </p>
      </div>
      {guessBox.map((label, index) => (
        <div
          className={`guess-box ${statusState[index][0] === "wrong" && "wrong"}
              ${singleFinished[index] && "correct"}`}
          onClick={() => setFocusIndex(index)}
        >
          <div className={`guess ${singleFinished[index] && "guess-done"}`}>
            {!finished && (
              <GuessWordImproved
                help={helpFocus[index]}
                word={obj[activeButton].guessImperativ[index]}
                letterWidth={15}
                status={statusState[index][0]}
                letterHeight={30}
                setStatus={(status) => {
                  setStatusState((prev) => {
                    prev[index] = [status];

                    return [...prev];
                  });

                  if (status === "correct") {
                    setFinished(index);

                    for (let i = 0; i < statusState.length; i++) {
                      if (statusState[i][0] !== "correct") {
                        setFocusIndex(i);

                        break;
                      }
                    }
                  }
                }}
                focus={index === focusIndex}
              />
            )}
            {finished && (
              <div
                className={`wrapper drag-element ${!imageDone && "drag"}`}
                onMouseDown={(event) => handleMove(event, index)}
                ref={answerIndex === index ? moveRefs : refs[index]}
              >
                {finishedElement[index]}
              </div>
            )}
          </div>
        </div>
      ))}
      <Indicator active={indicator} />
    </div>
  );
};

export default GuessWordBottomTable2;
