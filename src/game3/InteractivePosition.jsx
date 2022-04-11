import React, { useState, useRef, useEffect } from "react";
import Indicator from "../UI/Indicator";
import StatusBar from "../UI/StatusBar";

const InteractivePosition = ({ display }) => {
  const blankRef = useRef(null);
  const elementRef = useRef(null);

  const [finished, setFinished] = useState(false);

  const [infoText, setInfoText] = useState(<>Zieh die Wörter in die Lücken.</>);
  const [infoOverlay, setInfoOverlay] = useState(false);
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [helpFingerPosition, setHelpFingerPosition] = useState("init");
  const [preventHelp, setPreventHelp] = useState(false);

  const [animationStep, setAnimationStep] = useState(-1);

  useEffect(() => {
    if (display && animationStep === -1) {
      setAnimationStep(0);

      setTimeout(() => {
        setAnimationStep(1);
      }, 2000);
    }
  }, [display]);

  const handleMove = (initEvent, index) => {
    const element = initEvent.target;
    element.style.transition = "0s linear";

    const initX = element.getBoundingClientRect().left;
    const initY = element.getBoundingClientRect().top;

    const cursorX = initX - initEvent.clientX;
    const cursorY = initY - initEvent.clientY;

    element.style.zIndex = 10;

    const moveElement = (moveEvent) => {
      element.style.left = moveEvent.clientX - initX + cursorX + "px";
      element.style.top = moveEvent.clientY - initY + cursorY + "px";
    };

    const endMove = (endEvent) => {
      document.removeEventListener("mousemove", moveElement);
      document.removeEventListener("mouseup", endMove);

      const dropZone = blankRef.current.getBoundingClientRect();
      element.style.transition = "0.25s linear";
      element.style.zIndex = "1";

      if (
        index === 0 &&
        endEvent.clientX > dropZone.left &&
        endEvent.clientX < dropZone.right &&
        endEvent.clientY > dropZone.top &&
        endEvent.clientY < dropZone.bottom
      ) {
        element.style.left = dropZone.left - initX + "px";
        element.style.top = dropZone.top - initY + "px";

        setFinished(true);
      } else {
        element.style.left = 0 + "px";
        element.style.top = 0 + "px";
      }
    };

    document.addEventListener("mousemove", moveElement);
    document.addEventListener("mouseup", endMove);
  };

  useEffect(() => {
    if (helpOverlay) {
      setHelpFingerPosition([
        elementRef.current.getBoundingClientRect().left +
          elementRef.current.getBoundingClientRect().width / 2,
        elementRef.current.getBoundingClientRect().top +
          elementRef.current.getBoundingClientRect().height / 2,
      ]);

      setTimeout(() => {
        setHelpFingerPosition([
          blankRef.current.getBoundingClientRect().left +
            blankRef.current.getBoundingClientRect().width / 2,
          blankRef.current.getBoundingClientRect().top +
            blankRef.current.getBoundingClientRect().height / 2,
        ]);

        const element = elementRef.current;

        const initX = element.getBoundingClientRect().left;
        const initY = element.getBoundingClientRect().top;

        element.style.transition = "1s linear";
        element.style.zIndex = "100";
        element.style.left =
          blankRef.current.getBoundingClientRect().left - initX + "px";
        element.style.top =
          blankRef.current.getBoundingClientRect().top - initY + "px";

        setTimeout(() => {
          setFinished(true);
          setHelpFingerPosition("init");
        }, 1250);
      }, 1250);
    }
  }, [helpOverlay]);

  return (
    <>
      <div
        className="interactive-position"
        style={{
          opacity: display ? 1 : 0,
          pointerEvents: display ? "initial" : "none",
        }}
      >
        <div
          className="sentences"
          style={{
            opacity: animationStep >= 0 ? 1 : 0,
            transition: "0.5s linear",
          }}
        >
          <p>Fahr geradeaus!</p>
          <p>Steigt ein!</p>
          <p>Erzählen Sie!</p>
        </div>

        <div
          className={`drop-zone ${!finished && "enable"}`}
          style={{
            opacity: animationStep >= 1 ? 1 : 0,
            transition: animationStep >= 2 ? "0s linear" : "0.5s linear",
          }}
        >
          <div className="line">
            <p>Im Imperativ-Satz steht das Verb auf</p>
            <div className="blank" ref={blankRef}></div>
            <div className="p">.</div>
          </div>
          <div className="move-element">
            <p ref={elementRef} onMouseDown={(e) => handleMove(e, 0)}>
              Position 1
            </p>
            {!finished && (
              <p onMouseDown={(e) => handleMove(e, 1)}>Position 2</p>
            )}
          </div>
        </div>
      </div>

      <Indicator />
      <div
        className="status-wrapper"
        style={{
          opacity: display ? 1 : 0,
          pointerEvents: display ? "initial" : "none",
        }}
      >
        <StatusBar
          infoText={infoText}
          infoOverlay={infoOverlay}
          setInfoOverlay={setInfoOverlay}
          setHelpOverlay={setHelpOverlay}
          preventHelp={finished}
          helpFingerPosition={helpFingerPosition}
        />
      </div>
    </>
  );
};

export default InteractivePosition;
