import React, { useRef, useState, useEffect } from "react";
import Indicator from "../UI/Indicator";

const box = [
  { text: "du", answer: 0 },
  {
    text: "ihr",
    answer: 1,
  },
  { text: "Sie", answer: 2 },
];

const FormPart = ({
  setStep,
  finished,
  setFinished,
  formBoxRefs,
  dropRefs,
  customHelp,
}) => {
  const [activeIndicator, setActiveIndicator] = useState([]);

  const handleMove = (initEvent, index) => {
    const element = initEvent.target;
    element.style.transition = "0s";

    const initX = element.getBoundingClientRect().left;
    const initY = element.getBoundingClientRect().top;

    const cursorX = initX - initEvent.clientX;
    const cursorY = initY - initEvent.clientY;

    element.style.zIndex = 10;

    const moveEvent = (moveEvent) => {
      element.style.left = moveEvent.clientX - initX + cursorX + "px";
      element.style.top = moveEvent.clientY - initY + cursorY + "px";
    };

    const endMove = (endEvent) => {
      const dropZone = dropRefs[index].current.getBoundingClientRect();

      element.style.transition = "0.25s linear";

      if (
        endEvent.clientX > dropZone.left &&
        endEvent.clientX < dropZone.right &&
        endEvent.clientY > dropZone.top &&
        endEvent.clientY < dropZone.bottom
      ) {
        element.style.left =
          dropZone.left +
          (dropZone.width - element.getBoundingClientRect().width) / 2 -
          initX +
          "px";
        element.style.top = dropZone.top - initY + "px";
        setActiveIndicator(["correct"]);

        setFinished((prev) => {
          prev[index] = true;

          return [...prev];
        });
      } else {
        element.style.left = 0 + "px";
        element.style.top = 0 + "px";
        setActiveIndicator(["wrong"]);
      }

      element.style.zIndex = 1;
      document.removeEventListener("mousemove", moveEvent);
      document.removeEventListener("mouseup", endMove);
    };

    document.addEventListener("mousemove", moveEvent);
    document.addEventListener("mouseup", endMove);
  };

  useEffect(() => {
    let isDone = true;

    for (let i = 0; i < finished.length; i++) {
      if (!finished[i]) {
        isDone = false;
        break;
      }
    }

    if (isDone) {
      setStep(1);
    }
  }, [finished]);

  useEffect(() => {
    if (customHelp) {
      let index;

      for (let i = 0; i < finished.length; i++) {
        if (!finished[i]) {
          index = i;
          break;
        }
      }

      const element = formBoxRefs[index].current;

      const initX = element.getBoundingClientRect().left;
      const initY = element.getBoundingClientRect().top;

      const dropZone = dropRefs[index].current.getBoundingClientRect();

      element.style.transition = "1s linear";

      element.style.left =
        dropZone.left +
        (dropZone.width - element.getBoundingClientRect().width) / 2 -
        initX +
        "px";
      element.style.top = dropZone.top - initY + "px";
      setActiveIndicator(["correct"]);

      setTimeout(() => {
        element.style.transition = "0.25s linear";
        setFinished((prev) => {
          prev[index] = true;

          return [...prev];
        });
      }, 1250);
    }
  }, [customHelp]);

  return (
    <>
      <div className="drop-zone">
        <div className="blank"></div>
        <div className="top single-box double">informell</div>
        <div className="top single-box">formell</div>
        <div className="blank"></div>
        <div className="drop single-box" ref={dropRefs[0]}>
          <p>Singular</p>
        </div>
        <div className="drop single-box" ref={dropRefs[1]}>
          <p>Plurar</p>
        </div>
        <div className="drop single-box" ref={dropRefs[2]}>
          <p>Singular/Plurar</p>
        </div>
      </div>

      <div className="interactive-boxes">
        {box.map((item, index) => (
          <div
            className={`box ${!finished[index] && "enable"}`}
            onMouseDown={(e) => {
              if (finished[index]) return;
              handleMove(e, index);
            }}
            ref={formBoxRefs[index]}
            style={{ left: 0, top: 0 }}
          >
            {item.text}-Form
          </div>
        ))}
      </div>

      <Indicator active={activeIndicator} />
    </>
  );
};

export default FormPart;
