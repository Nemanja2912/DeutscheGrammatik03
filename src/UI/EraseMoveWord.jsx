import React, { useState, useRef, useEffect } from "react";
import Eraser from "../assets/img/SVG/moveEraser.svg";
import Box from "./Box";

import Finger from "../assets/img/blackFinger.png";

let interval;
let timeout;

const EraseWord = ({
  word,
  success,
  active = false,
  eraserRef,
  help = false,
}) => {
  const [eraserPos, setEraserPos] = useState([-35, 25]);
  const [moveX, setMoveX] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [disableHelp, setDisableHelp] = useState(false);
  const [activeHelp, setActiveHelp] = useState(false);

  const boxRef = useRef(null);
  const fingerRef = useRef(null);

  const moveElementRef = useRef(null);

  const eraseContainerStyle = {
    position: "relative",
  };

  const eraserStyle = {
    width: 100,
    position: "absolute",
    left: eraserPos[0],
    top: eraserPos[1],
    cursor: "pointer",
  };

  const wordStyle = {
    display: "flex",
  };

  const fingerStyle = {
    position: "absolute",
    width: 65,
    transform: "rotate(-45deg)",
    left: 35,
    top: 30,
    transition: "0.25s linear",
    opacity: activeHelp && !disableHelp ? 1 : 0,
    pointerEvents: "none",
  };

  const moveEraser = (initEvent) => {
    clearInterval(interval);

    const element = initEvent.target;

    element.style.transition = "0s";

    const elementX = element.getBoundingClientRect().left;
    const elementY = element.getBoundingClientRect().top;

    const initX = initEvent.clientX - elementX;
    const initY = initEvent.clientY - elementY;

    const styleX = eraserPos[0];
    const styleY = eraserPos[1];

    const moveElement = (moveEvent) => {
      const posX = moveEvent.clientX - elementX - initX + styleX;
      const posY = moveEvent.clientY - elementY - initY + styleY;

      const box = boxRef.current.getBoundingClientRect();

      if (
        element.getBoundingClientRect().left +
          element.getBoundingClientRect().width / 2 >
          box.left &&
        element.getBoundingClientRect().left +
          element.getBoundingClientRect().width / 2 <
          box.right &&
        element.getBoundingClientRect().top > box.top &&
        element.getBoundingClientRect().top < box.bottom
      ) {
        setMoveX((prev) => {
          const moveElementWidth = document.querySelector("#move-element");

          if (
            prev >=
            boxRef.current.getBoundingClientRect().width -
              moveElementWidth.getBoundingClientRect().width
          )
            return prev;

          return prev + 0.5;
        });
      }

      setEraserPos([posX, posY]);
    };

    const endMove = (endEvent) => {
      document.removeEventListener("mousemove", moveElement);
      document.removeEventListener("mouseup", endMove);
    };

    document.addEventListener("mousemove", moveElement);
    document.addEventListener("mouseup", endMove);
  };

  useEffect(() => {
    const moveElementWidth = document.querySelector("#move-element");

    if (
      moveX >=
        boxRef.current.getBoundingClientRect().width -
          moveElementWidth.getBoundingClientRect().width &&
      !isDone
    ) {
      for (let i = 0; i < boxRef.current.children.length; i++) {
        const element = boxRef.current.children[i];

        if (!word[i].move) {
          element.style.transition = "0.25s linear";
          element.style.left =
            boxRef.current.getBoundingClientRect().left -
            element.getBoundingClientRect().left +
            0 +
            "px";
        }
      }

      setTimeout(() => {
        success();
        setIsDone(true);
      }, 0);
    }
  }, [moveX]);

  const getHelp = () => {
    let move = true;
    setActiveHelp(true);

    interval = setInterval(() => {
      eraserRef.current.style.transition = "0.25s linear";
      if (move) {
        fingerRef.current.style.left = 100 + "px";

        setEraserPos((prev) => {
          prev[0] = 30;

          return [...prev];
        });
      } else {
        fingerRef.current.style.left = 35 + "px";

        setEraserPos((prev) => {
          prev[0] = -35;

          return [...prev];
        });
      }

      move = !move;
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setActiveHelp(false);
    }, 2000);
  };

  useEffect(() => {
    if (!disableHelp) {
      if (active) {
        if (!activeHelp && !help) {
          timeout = setTimeout(() => {
            getHelp();
          }, 2500);
        }
      } else {
        clearInterval(interval);
        clearTimeout(timeout);
      }
    } else {
      clearInterval(interval);
    }
  }, [active, activeHelp, disableHelp]);

  useEffect(() => {
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (help) {
      const moveElementWidth = document.querySelector("#move-element");

      moveElementRef.current.style.transition = "4s linear";

      setMoveX(
        boxRef.current.getBoundingClientRect().width -
          moveElementWidth.getBoundingClientRect().width -
          1
      );

      clearTimeout(timeout);
      clearInterval(interval);
      setActiveHelp(false);
      eraserRef.current.style.transition = "1s linear";
      setEraserPos([30, 25]);
      setTimeout(() => {
        setEraserPos((prev) => {
          prev[0] = -35;
          return [...prev];
        });
        setTimeout(() => {
          setEraserPos((prev) => {
            prev[0] = 30;
            return [...prev];
          });
          setTimeout(() => {
            setEraserPos((prev) => {
              prev[0] = -35;
              return [...prev];
            });
          }, 1000);
        }, 1000);
      }, 1000);
      setTimeout(() => {
        const moveElementWidth = document.querySelector("#move-element");

        setMoveX(
          boxRef.current.getBoundingClientRect().width -
            moveElementWidth.getBoundingClientRect().width
        );
      }, 4000);
    }
  }, [help]);

  return (
    <div className="eraseWord" style={eraseContainerStyle}>
      <Box opacity={true} success={isDone}>
        <div ref={boxRef} className="word" style={wordStyle}>
          {word.map((item, index) => {
            return (
              <p
                id={`${item.move && "move-element"}`}
                ref={item.move && moveElementRef}
                style={{
                  position: "relative",
                  left: item.move ? moveX : 0,
                  marginRight: word.length - 1 === index ? 0 : 10,
                }}
              >
                {item.word}
              </p>
            );
          })}
        </div>
      </Box>
      {!isDone && (
        <img
          onMouseDown={(e) => {
            moveEraser(e);
            setDisableHelp(true);
          }}
          style={eraserStyle}
          ref={eraserRef}
          src={Eraser}
          alt=""
        />
      )}

      <img src={Finger} ref={fingerRef} alt="" style={fingerStyle} />
    </div>
  );
};

export default EraseWord;
