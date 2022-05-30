import React, { useState, useRef, useEffect } from "react";
import Eraser from "../UI/Eraser";
import EraseWord from "./EraseWord";
import MoveWord from "./MoveWord";
import StatusBar from "./../UI/StatusBar";

const ErasePart = ({
  eraseObj,
  moveObj,
  text,
  increaseStep,
  showStatus,
  display,
}) => {
  const [moveIndicator, setMoveIndicator] = useState(false);

  const [finished, setFinished] = useState([false, false, false]);
  const [opacity, setOpacity] = useState([0, 0]);
  const [move, setMove] = useState(0);
  const [stopMove, setStopMove] = useState(false);

  const [disableEraser, setDisableEraser] = useState(false);

  const eraseBoxRefs = [useRef(null), useRef(null), useRef(null)];

  const [infoText, setInfoText] = useState(<>Zieh die Wörter in die Lücken.</>);
  const [infoOverlay, setInfoOverlay] = useState(false);
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [helpFingerPosition, setHelpFingerPosition] = useState("init");
  const [preventHelp, setPreventHelp] = useState(false);

  const [moveStopPoint, setMoveStopPoint] = useState(0);

  const [enableTransition, setEnableTransition] = useState(false);

  const [eraserPos, setEraserPos] = useState([100, 15]);

  const eraserRef = useRef(null);

  const handleMove = (initEvent) => {
    const element = initEvent.target;
    element.style.transition = "0s linear";

    const initX = element.getBoundingClientRect().left;
    const initY = element.getBoundingClientRect().top;

    const cursorX = initX - initEvent.clientX;
    const cursorY = initY - initEvent.clientY;

    let stylePosX = eraserPos[0];
    let stylePosY = eraserPos[1];

    stylePosX = stylePosX ? stylePosX : 0;
    stylePosY = stylePosY ? stylePosY : 0;

    element.style.zIndex = 10;

    const moveEvent = (moveEvent) => {
      setEraserPos([
        moveEvent.clientX - initX + cursorX + stylePosX,
        moveEvent.clientY - initY + cursorY + stylePosY,
      ]);

      for (let i = 0; i < eraseBoxRefs.length; i++) {
        const eraseZone = eraseBoxRefs[i].current.getBoundingClientRect();

        if (
          element.getBoundingClientRect().left +
            element.getBoundingClientRect().width / 2 >
            eraseZone.left &&
          element.getBoundingClientRect().left +
            element.getBoundingClientRect().width / 2 <
            eraseZone.right &&
          element.getBoundingClientRect().top > eraseZone.top &&
          element.getBoundingClientRect().top < eraseZone.bottom
        ) {
          if (i === 2) {
            setMoveIndicator(true);

            if (!stopMove) {
              setMove((prev) => {
                return prev + 0.8;
              });
            }
          } else {
            setMoveIndicator(false);

            setOpacity((prev) => {
              if (prev[i] >= 1) prev[i] = 1;
              else prev[i] += 0.025;

              return [...prev];
            });
          }
        }
      }
    };

    const endMove = (endEvent) => {
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
      increaseStep();
      setDisableEraser(true);
    }
  }, [finished]);

  useEffect(() => {
    for (let i = 0; i < opacity.length; i++) {
      if (opacity[i] === 1) {
        setFinished((prev) => {
          prev[i] = true;

          return [...prev];
        });
      }
    }

    if (stopMove) {
      setFinished((prev) => {
        prev[2] = true;

        return [...prev];
      });
    }
  }, [opacity, move, stopMove]);

  useEffect(() => {
    if (!helpOverlay) return;

    setHelpFingerPosition([
      eraserRef.current.getBoundingClientRect().left +
        eraserRef.current.getBoundingClientRect().width / 2,
      eraserRef.current.getBoundingClientRect().top +
        eraserRef.current.getBoundingClientRect().height / 2,
    ]);

    let index;

    for (let i = 0; i < finished.length; i++) {
      if (!finished[i]) {
        index = i;
        break;
      }
    }

    setTimeout(() => {
      setHelpFingerPosition([
        eraseBoxRefs[index].current.getBoundingClientRect().left +
          eraseBoxRefs[index].current.getBoundingClientRect().width / 2,
        eraseBoxRefs[index].current.getBoundingClientRect().top +
          eraseBoxRefs[index].current.getBoundingClientRect().height / 2 +
          eraserRef.current.getBoundingClientRect().height / 2,
      ]);

      const element = eraserRef.current;
      element.style.transition = "1s linear";

      const initX = element.getBoundingClientRect().left;
      const initY = element.getBoundingClientRect().top;

      let stylePosX = eraserPos[0];
      let stylePosY = eraserPos[1];

      stylePosX = stylePosX ? stylePosX : 0;
      stylePosY = stylePosY ? stylePosY : 0;

      element.style.zIndex = 10;

      setEraserPos([
        eraseBoxRefs[index].current.getBoundingClientRect().left +
          eraseBoxRefs[index].current.getBoundingClientRect().width / 2 -
          eraserRef.current.getBoundingClientRect().width / 2 -
          initX +
          stylePosX,
        eraseBoxRefs[index].current.getBoundingClientRect().top +
          eraseBoxRefs[index].current.getBoundingClientRect().height / 2 -
          initY +
          stylePosY,
      ]);

      if (index === 2) {
        setMoveIndicator(true);
      } else {
        setMoveIndicator(false);
      }

      setTimeout(() => {
        setEraserPos((prev) => {
          return [prev[0] - 100, prev[1]];
        });

        setHelpFingerPosition((prev) => {
          return [prev[0] - 100, prev[1]];
        });

        const quarterOpacity = (1 - opacity[index]) / 4;
        const thirdMove = (moveStopPoint - move - 0.01) / 3;

        if (index === 2) {
          setEnableTransition(true);
        }

        const calculate = (index) => {
          if (index !== 2) {
            setOpacity((prev) => {
              prev[index] = prev[index] + quarterOpacity;

              return [...prev];
            });
          } else {
            setMove((prev) => prev + thirdMove);
          }
        };

        calculate(index);

        setTimeout(() => {
          setEraserPos((prev) => {
            return [prev[0] + 100, prev[1]];
          });

          setHelpFingerPosition((prev) => {
            return [prev[0] + 100, prev[1]];
          });

          calculate(index);

          setTimeout(() => {
            setEraserPos((prev) => {
              return [prev[0] - 100, prev[1]];
            });

            setHelpFingerPosition((prev) => {
              return [prev[0] - 100, prev[1]];
            });

            calculate(index);

            setTimeout(() => {
              setHelpFingerPosition("init");

              if (index === 2) {
                setMove((prev) => prev + 0.1);
              } else {
                calculate(index);
              }
            }, 1250);
          }, 1250);
        }, 1250);
      }, 1250);
    }, 1250);
  }, [helpOverlay]);

  return (
    <>
      <div
        className="erase-part"
        style={{
          position: "relative",
          opacity: display ? 1 : 0,
          transition: "0.5s linear",
        }}
      >
        <div className="single-box blue main">IMPERATIV</div>
        {eraseObj.map((item, index) => (
          <div className="single-box blue" ref={eraseBoxRefs[index]}>
            <EraseWord text={item} opacity={opacity[index]} />
          </div>
        ))}

        <div className="single-box blue" ref={eraseBoxRefs[2]}>
          <MoveWord
            text={moveObj}
            move={move}
            disableMove={() => {
              setStopMove(true);
            }}
            stopPoint={moveStopPoint}
            transition={enableTransition}
            setStopPoint={setMoveStopPoint}
          />
        </div>
        <div className="single-box gray">Präsens</div>
        {text.map((item) => (
          <div className="single-box gray">{item}</div>
        ))}
        {!disableEraser && (
          <div
            className="wrapper"
            onMouseDown={handleMove}
            style={{
              position: "absolute",
              top: eraserPos[1],
              left: eraserPos[0],
              zIndex: 100,
            }}
            ref={eraserRef}
          >
            <Eraser move={moveIndicator} />
          </div>
        )}
      </div>
      <div
        className="status-wrapper"
        style={{
          opacity: showStatus ? 1 : 0,
          pointerEvents: showStatus ? "initial" : "none",
        }}
      >
        <StatusBar
          infoText={infoText}
          infoOverlay={infoOverlay}
          setInfoOverlay={setInfoOverlay}
          setHelpOverlay={setHelpOverlay}
          preventHelp={preventHelp}
          helpFingerPosition={helpFingerPosition}
        />
      </div>
    </>
  );
};

export default ErasePart;
