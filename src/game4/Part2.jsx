import React, { useState, useEffect, useRef } from "react";
import Indicator from "../UI/Indicator";

const Part2 = ({
  helpOverlay,
  setHelpFingerPosition,
  children,
  setLevel,
  verbID,
}) => {
  const [indicator, setIndicator] = useState({
    active: false,
    wrong: false,
  });
  const [verbElement, setVerbElement] = useState({
    left: window.innerWidth - 200,
    width: 150,
  });
  const [opacity, setOpacity] = useState(true);
  const [preventMove, setPreventMove] = useState(false);

  const circleRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(false);
    }, 0);
  }, []);

  const handleCircleMove = (initEvent) => {
    if (preventMove) return;

    let prevPos = initEvent.clientX;
    let moveSide;

    let sentence = document.querySelector(".sentence");

    let initWidth = initEvent.target.offsetWidth;
    let initLeft = verbElement.left;
    let width;
    let left;

    let widthBreakMax = sentence.offsetWidth;
    let widthBreakMin = 150;

    let initEventLeft = initEvent.clientX;
    let initEventLeftWidth = initEvent.clientX;

    let right =
      initEvent.clientX >
      initEvent.target.getBoundingClientRect().right - initWidth / 2;

    let prevSide;

    const moveElemenet = (moveEvent) => {
      if (moveEvent.clientX > prevPos) moveSide = "right";
      else if (moveEvent.clientX < prevPos) moveSide = "left";

      prevPos = moveEvent.clientX;

      for (let i = 0; i < sentence.children.length; i++) {
        if (right) {
          if (
            moveEvent.clientX >
              sentence.children[i].getBoundingClientRect().left &&
            moveEvent.clientX <
              sentence.children[i].getBoundingClientRect().left +
                sentence.children[i].offsetWidth
          ) {
            sentence.children[i].style.backgroundColor = "#c7c7c7";
          } else if (
            initEvent.target.getBoundingClientRect().left +
              verbElement.width / 5 / 2 >
              sentence.children[i].getBoundingClientRect().left &&
            initEvent.target.getBoundingClientRect().left +
              verbElement.width / 5 / 2 <
              sentence.children[i].getBoundingClientRect().left +
                sentence.children[i].offsetWidth
          ) {
            sentence.children[i].style.backgroundColor = "#c7c7c7";
          } else {
            sentence.children[i].style.backgroundColor = "transparent";
          }
        } else {
          if (
            moveEvent.clientX >
              sentence.children[i].getBoundingClientRect().left &&
            moveEvent.clientX <
              sentence.children[i].getBoundingClientRect().left +
                sentence.children[i].offsetWidth
          ) {
            sentence.children[i].style.backgroundColor = "#c7c7c7";
          } else if (
            initEvent.target.getBoundingClientRect().right -
              verbElement.width / 5 / 2 >
              sentence.children[i].getBoundingClientRect().left &&
            initEvent.target.getBoundingClientRect().right -
              verbElement.width / 5 / 2 <
              sentence.children[i].getBoundingClientRect().left +
                sentence.children[i].offsetWidth
          ) {
            sentence.children[i].style.backgroundColor = "#c7c7c7";
          } else {
            sentence.children[i].style.backgroundColor = "transparent";
          }
        }
      }

      if (right) {
        width = moveEvent.clientX - initEventLeftWidth + initWidth;
        left = moveEvent.clientX - initEventLeft + initLeft;

        if (width < widthBreakMax && width >= widthBreakMin) {
          setVerbElement((prev) => {
            return { ...prev, width };
          });

          initLeft = initEvent.target.offsetLeft;

          initEventLeft = moveEvent.clientX;
        } else {
          if (moveSide !== prevSide) {
            initEventLeftWidth = moveEvent.clientX;
          }
          prevSide = moveSide;

          initWidth = initEvent.target.getBoundingClientRect().width;
          setVerbElement((prev) => {
            return { ...prev, left };
          });
        }
      } else {
        width = initWidth - (moveEvent.clientX - initEventLeft);

        if (width < widthBreakMax && width >= widthBreakMin) {
          setVerbElement((prev) => {
            return {
              ...prev,
              width,
              left: moveEvent.clientX - initEvent.clientX + initLeft,
            };
          });
        } else {
          initEventLeft = moveEvent.clientX;
          initWidth = initEvent.target.getBoundingClientRect().width;
          setVerbElement((prev) => {
            return {
              ...prev,
              left: moveEvent.clientX - initEvent.clientX + initLeft,
            };
          });
        }
      }
    };

    document.addEventListener("mousemove", moveElemenet);

    const endMoveElement = (endEvent) => {
      document.removeEventListener("mousemove", moveElemenet);
      document.removeEventListener("mouseup", endMoveElement);

      let correct = 0;

      for (let i = 0; i < sentence.children.length; i++) {
        if (sentence.children[i].style.backgroundColor !== "transparent") {
          sentence.children[i].style.backgroundColor = sentence.children[
            i
          ].getAttribute("verb")
            ? "#A0C814"
            : "#EB6400";

          if (sentence.children[i].getAttribute("verb")) {
            correct++;
          }
        }
      }

      if (correct < 2) {
        setIndicator({ active: true, wrong: true });
      } else {
        setIndicator({ active: true, wrong: false });

        setPreventMove(true);

        setTimeout(() => {
          setOpacity(true);
          setTimeout(() => {
            setLevel((prev) => prev + 1);
          }, 1000);
        }, 1000);
      }

      setTimeout(() => {
        setIndicator({ active: false, wrong: false });
      }, 1000);
    };

    document.addEventListener("mouseup", endMoveElement);
  };

  useEffect(() => {
    if (helpOverlay && !preventMove) {
      setPreventMove(true);
      let sentence = document.querySelector(".sentence");

      setHelpFingerPosition([
        circleRef.current.getBoundingClientRect().left +
          verbElement.width / 5 / 2 -
          10,
        circleRef.current.getBoundingClientRect().top + 10,
      ]);

      setTimeout(() => {
        for (let i = 0; i < sentence.children.length; i++) {
          sentence.children[i].style.backgroundColor = "transparent";
        }
        setHelpFingerPosition([
          sentence.children[verbID].getBoundingClientRect().left,
          circleRef.current.getBoundingClientRect().top + 10,
        ]);

        circleRef.current.style.transition = "1000ms linear";

        setVerbElement((prev) => {
          return {
            ...prev,
            left: sentence.children[verbID].getBoundingClientRect().left,
          };
        });

        setTimeout(() => {
          sentence.children[verbID].style.backgroundColor = "#A0C814";
        }, 1000);

        setTimeout(() => {
          setHelpFingerPosition([
            circleRef.current.getBoundingClientRect().right -
              verbElement.width / 5 / 2 -
              10,
            circleRef.current.getBoundingClientRect().top + 10,
          ]);

          setTimeout(() => {
            setHelpFingerPosition([
              sentence.children[
                sentence.children.length - 1
              ].getBoundingClientRect().right -
                sentence.children[
                  sentence.children.length - 1
                ].getBoundingClientRect().width /
                  2,
              circleRef.current.getBoundingClientRect().top + 10,
            ]);

            setVerbElement((prev) => {
              return {
                ...prev,
                width:
                  sentence.children[
                    sentence.children.length - 1
                  ].getBoundingClientRect().right -
                  sentence.children[verbID].getBoundingClientRect().left -
                  15,
              };
            });

            setTimeout(() => {
              sentence.children[
                sentence.children.length - 1
              ].style.backgroundColor = "#A0C814";

              setIndicator({ active: true, wrong: false });
              setOpacity(true);
              setHelpFingerPosition("init");
              setHelpFingerPosition(false);

              setTimeout(() => {
                setLevel((prev) => prev + 1);
                setIndicator({ active: false, wrong: false });
              }, 1000);
            }, 1000);
          }, 1250);
        }, 1250);
      }, 1250);
    }
  }, [helpOverlay]);

  return (
    <>
      <div
        className="part2"
        style={{ opacity: opacity ? 0 : 1, transition: "1000ms" }}
      >
        <div className="wrapper">
          <div className="sentence">{children}</div>
        </div>
        <div
          className="rectangle"
          style={{
            left: verbElement.left,
            width: verbElement.width,
            height: verbElement.width / 1.8,
            borderBottomLeftRadius: verbElement.width / 1.8,
            borderBottomRightRadius: verbElement.width / 1.8,
            borderWidth: verbElement.width / 5,
          }}
          onMouseDown={handleCircleMove}
          ref={circleRef}
        ></div>
      </div>
      <Indicator active={indicator.active} wrong={indicator.wrong} />
    </>
  );
};

export default Part2;
