import React, { useState, useRef, useEffect } from "react";

import Image1 from "../assets/img/story5a.jpg";
import Image2 from "../assets/img/story2a.jpg";
import Image3 from "../assets/img/story1a.jpg";
import Indicator from "../UI/Indicator";
import StatusBar from "../UI/StatusBar";

const dropBoxes = [
  {
    dropText: "Tipp",
    image: Image1,
    description: "Geben Sie mir bitte eine Tüte!",
    answer: 2,
  },
  {
    dropText: "Aufforderung",
    image: Image2,
    description: "Probier mal dieses Kleid an!",
    answer: 0,
  },
  {
    dropText: "Bitte",
    image: Image3,
    description: "Fahr geradeaus!",
    answer: 1,
  },
];

const ImageInteractiveScreen = ({ display, nextLevel }) => {
  const dropRefs = [useRef(null), useRef(null), useRef(null)];
  const imageRefs = [useRef(null), useRef(null), useRef(null)];

  const [finished, setFinished] = useState([false, false, false]);

  const [activeIndicator, setActiveIndicator] = useState([]);

  const [infoText, setInfoText] = useState(
    <>Welche Funktionen haben die Sätze? Sortiere sie. </>
  );
  const [infoOverlay, setInfoOverlay] = useState(display);
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [helpFingerPosition, setHelpFingerPosition] = useState("init");
  const [preventHelp, setPreventHelp] = useState(false);

  const [showButton, setShowButton] = useState(false);

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
        element.style.top = dropZone.top + 50 - initY + "px";
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
    if (!helpOverlay) return;

    let index;

    for (let i = 0; i < finished.length; i++) {
      if (!finished[dropBoxes[i].answer]) {
        index = i;

        break;
      }
    }

    setHelpFingerPosition([
      imageRefs[index].current.getBoundingClientRect().left +
        imageRefs[index].current.getBoundingClientRect().width / 2,
      imageRefs[index].current.getBoundingClientRect().top +
        imageRefs[index].current.getBoundingClientRect().height / 2,
    ]);

    setTimeout(() => {
      let dropIndex = dropBoxes[index].answer;

      const dropZone = dropRefs[dropIndex].current.getBoundingClientRect();
      imageRefs[index].current.style.transition = "1s linear";

      const initX = imageRefs[index].current.getBoundingClientRect().left;
      const initY = imageRefs[index].current.getBoundingClientRect().top;

      imageRefs[index].current.style.left =
        dropZone.left +
        (dropZone.width -
          imageRefs[index].current.getBoundingClientRect().width) /
          2 -
        initX +
        "px";
      imageRefs[index].current.style.top = dropZone.top + 50 - initY + "px";

      setHelpFingerPosition([
        dropRefs[dropIndex].current.getBoundingClientRect().left +
          dropRefs[dropIndex].current.getBoundingClientRect().width / 2,
        dropRefs[dropIndex].current.getBoundingClientRect().top +
          dropRefs[dropIndex].current.getBoundingClientRect().height / 2,
      ]);

      setActiveIndicator(["correct"]);

      setFinished((prev) => {
        prev[dropIndex] = true;

        return [...prev];
      });

      setTimeout(() => {
        setHelpFingerPosition("init");
      }, 1250);
    }, 1250);
  }, [helpOverlay]);

  useEffect(() => {
    let isDone = true;

    for (let i = 0; i < finished.length; i++) {
      if (!finished[i]) {
        isDone = false;

        break;
      }
    }

    if (isDone) {
      setShowButton(true);
    }
  }, [finished]);

  return (
    <>
      <div className="screen-wrapper">
        <div
          className="image-interactive"
          style={{
            opacity: display ? 1 : 0,
            pointerEvents: display ? "initial" : "none",
          }}
        >
          <div className="drop-boxes">
            {dropBoxes.map((item, index) => (
              <div ref={dropRefs[index]} className="drop-box">
                {item.dropText}
              </div>
            ))}
          </div>
          <div className="images">
            {dropBoxes.map((item, index) => (
              <div
                ref={imageRefs[index]}
                className="image"
                onMouseDown={(e) => handleMove(e, item.answer)}
              >
                <img src={item.image} alt="" />
                <div className="description">{item.description}</div>
              </div>
            ))}
          </div>

          <div
            className="after-done-text"
            style={{ opacity: showButton ? 1 : 0 }}
          >
            Der Imperativ hat diese drei Funktionen.
          </div>

          {showButton && (
            <div className="button" onClick={nextLevel}>
              WEITER
            </div>
          )}
        </div>
      </div>

      <Indicator active={activeIndicator} />
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
          preventHelp={showButton}
          helpFingerPosition={helpFingerPosition}
        />
      </div>
    </>
  );
};

export default ImageInteractiveScreen;
