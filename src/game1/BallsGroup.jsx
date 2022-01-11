import { useState, useEffect, useRef, useReducer } from "react";
import Indicator from "../UI/Indicator";

let ACTION_TYPE = {
  MOVE: "MOVE",
  RESET: "RESET",
  TRANSITION: "TRANSITION",
};

let moveReduce = (state, action) => {
  let newState;
  switch (action.type) {
    case ACTION_TYPE.MOVE:
      newState = {
        ...state,
      };

      newState[action.payload.id] = {
        ...newState[action.payload.id],
        move: true,
        x: action.payload.x,
        y: action.payload.y,
        zIndex: action.payload.zIndex ? action.payload.zIndex : 300,
        animate: action.payload.animate ? action.payload.animate : "",
      };
      break;
    case ACTION_TYPE.RESET:
      newState = {
        ...state,
      };

      newState[action.payload.id] = {
        ...newState[action.payload.id],
        move: false,
        x: 0,
        y: 0,
        transition: action.payload.transition,
        zIndex: 1,
      };
      break;
    case ACTION_TYPE.TRANSITION:
      newState = {
        ...state,
      };

      newState[action.payload.id] = {
        ...newState[action.payload.id],
        transition: action.payload.transition,
      };

      break;
    default:
      newState = state;
  }

  return newState;
};

const BallsGroup = ({
  refList,
  containerIndex,
  blueDropRef,
  verbID1,
  verbID2,
  list,
  lineOpacity,
  returnDone,
  index,
  lineIndex,
  secondPart,
  returnBallPos,
  helpMove,
  moveFinger,
  level,
  setLevel,
  setHelpMove,
}) => {
  let initState = [];

  for (let index in list) {
    initState[index] = {
      move: false,
      x: 0,
      y: 0,
      transition: 0,
      zIndex: 1,
      animate: "",
    };
  }

  let showAnimationList = [];

  for (let i = 0; i < list.length; i++) {
    showAnimationList[i] = false;
  }

  const [moveState, dispatchMove] = useReducer(moveReduce, initState);
  const [isDone, setIsDone] = useState({ complete: false, withDelay: false });
  const [showAnimation, setShowAnimation] = useState(showAnimationList);
  const [indicator, setIndicator] = useState({
    active: false,
    wrong: false,
  });

  const verbRef = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  let transitionDuration = 200;

  useEffect(() => {
    returnBallPos((prev) => {
      let list = [...prev];
      list[index] = [
        verbRef[verbID1].current.getBoundingClientRect().left,
        verbRef[verbID1].current.getBoundingClientRect().top,
      ];

      return list;
    });
  }, [moveState, index, returnBallPos, verbID1]);

  useEffect(() => {
    if (!helpMove || level !== index) return;
    const containerStyle =
      refList[containerIndex].current.getBoundingClientRect();
    let initX1 = verbRef[verbID1].current.getBoundingClientRect().left;
    let initY1 = verbRef[verbID1].current.getBoundingClientRect().bottom;
    let initX2 = verbRef[verbID2].current.getBoundingClientRect().left;
    let initY2 = verbRef[verbID2].current.getBoundingClientRect().bottom;

    let widthMove = verbRef[verbID1].current.offsetWidth;

    let resultX1 =
      containerStyle.left - initX1 + (containerStyle.width / 2 - widthMove);
    let resultY1 = containerStyle.bottom - initY1 - widthMove * lineIndex;

    let resultX2 = containerStyle.left - initX2 + containerStyle.width / 2;
    let resultY2 = containerStyle.bottom - initY2 - widthMove * lineIndex;

    moveFinger([initX1 + 35, initY1 - 35]);

    setTimeout(() => {
      setTransition(verbID2, 200);

      dispatchMove({
        type: ACTION_TYPE.MOVE,
        payload: {
          id: verbID2,
          x: initX1 - initX2 + widthMove,
          y: 0,
          zIndex: 1000,
        },
      });
    }, 1000);

    setTimeout(() => {
      setTransition(verbID1, 1000);
      setTransition(verbID2, 1000);

      moveFinger([
        containerStyle.left + (containerStyle.width / 2 - widthMove / 2 - 10),
        containerStyle.bottom - widthMove / 2 - widthMove * lineIndex,
      ]);

      dispatchMove({
        type: ACTION_TYPE.MOVE,
        payload: {
          id: verbID1,
          x: resultX1,
          y: resultY1,
          zIndex: 1000,
        },
      });

      dispatchMove({
        type: ACTION_TYPE.MOVE,
        payload: {
          id: verbID2,
          x: resultX2,
          y: resultY2,
          zIndex: 1000,
        },
      });
      setLevel((prev) => prev + 1);

      setTimeout(() => {
        setIndicator((prev) => {
          return { ...prev, active: true, wrong: false };
        });
      }, 1500);

      setTimeout(() => {
        let showList = [];
        for (let i in list) {
          setTransition(i, transitionDuration);

          if (+i === verbID1 || +i === verbID2) {
            showList[i] = true;
          } else {
            showList[i] = false;
          }
        }
        setShowAnimation(showList);

        setTimeout(() => {
          returnDone({ line: false }, index + 1);
          moveFinger("init");

          setHelpMove(false);

          setTimeout(() => {
            moveFinger(false);
          }, 0);
        }, 500);
      }, 1500);
    }, 1200);
  }, [helpMove]);

  useEffect(() => {
    if (isDone.complete && isDone.withDelay) {
      setTimeout(() => {
        setIndicator({ active: true, wrong: false });

        setTimeout(() => {
          setIndicator((prev) => {
            return { ...prev, active: false };
          });
        }, 1000);
        returnDone({ line: false, word: true }, index);

        let showList = [];
        for (let i in list) {
          setTransition(i, transitionDuration);

          if (+i === verbID1 || +i === verbID2) {
            showList[i] = true;
          } else {
            showList[i] = false;
          }
        }
        setShowAnimation(showList);

        setTimeout(() => {
          returnDone({ line: false }, index + 1);
          setLevel((prev) => prev + 1);
        }, 500);
      }, 5600);
    } else if (isDone.complete && !isDone.withDelay) {
      setIndicator({ active: true, wrong: false });

      setTimeout(() => {
        setIndicator((prev) => {
          return { ...prev, active: false };
        });
      }, 1000);
      setTimeout(() => {
        returnDone({ line: false, word: true }, index);

        let showList = [];
        for (let i in list) {
          setTransition(i, transitionDuration);

          if (+i === verbID1 || +i === verbID2) {
            showList[i] = true;
          } else {
            showList[i] = false;
          }
        }
        setShowAnimation(showList);

        setTimeout(() => {
          returnDone({ line: false }, index + 1);
          setLevel((prev) => prev + 1);
        }, 500);
      }, transitionDuration);
    }
  }, [isDone]);

  useEffect(() => {
    if (!lineOpacity) {
      let showList = [];
      for (let i in list) {
        setTransition(i, transitionDuration);

        showList[i] = true;
      }
      setShowAnimation(showList);
    }
  }, [lineOpacity]);

  // Set Transition
  const setTransition = (id, transition) => {
    dispatchMove({
      type: ACTION_TYPE.TRANSITION,
      payload: {
        id,
        transition,
      },
    });
  };

  const handleMove = (initEvent, id) => {
    if (isDone.complete) return;

    setTransition(id, 0);

    let verbInterval;
    let initX1;
    let initX2;
    let initY1;
    let initY2;
    let widthMove = verbRef[verbID1].current.offsetWidth;

    // Move func

    const changePosition = (
      index = id,
      x,
      y,
      transition = "",
      zIndex = false,
      animate = ""
    ) => {
      dispatchMove({
        type: ACTION_TYPE.MOVE,
        payload: {
          id: index,
          x,
          y,
          transition,
          zIndex,
          animate,
        },
      });
    };

    // Reset
    const resetElement = (transition, identificator = id) => {
      dispatchMove({
        type: ACTION_TYPE.RESET,
        payload: {
          id: identificator,
          transition,
        },
      });

      setIndicator({ active: true, wrong: true });

      setTimeout(() => {
        setIndicator((prev) => {
          return { ...prev, active: false };
        });
      }, 1000);
    };

    if (id === verbID1 || id === verbID2) {
      let id1 = id === verbID1 ? verbID1 : verbID2;
      let id2 = id === verbID1 ? verbID2 : verbID1;

      initX1 = verbRef[verbID1].current.getBoundingClientRect().left;
      initX2 = verbRef[verbID2].current.getBoundingClientRect().left;
      initY1 = verbRef[verbID1].current.getBoundingClientRect().bottom;
      initY2 = verbRef[verbID2].current.getBoundingClientRect().bottom;

      setTransition(id2, 100);

      const moveElement = () => {
        let multiply = id === verbID1 ? 1 : -1;

        let x =
          verbRef[id1].current.getBoundingClientRect().left -
          verbRef[id2].current.getBoundingClientRect().left +
          widthMove * multiply +
          parseFloat(verbRef[id2].current.style.left);
        let y = parseFloat(verbRef[id1].current.style.top);

        changePosition(id2, x, y, "", 299);
      };

      moveElement();

      verbInterval = setInterval(() => {
        moveElement();
      }, 100);
    }

    const mouseMove = (event) => {
      let x = event.clientX - initEvent.clientX + moveState[id].x;
      let y = event.clientY - initEvent.clientY + moveState[id].y;

      changePosition(id, x, y);
    };

    document.addEventListener("mousemove", mouseMove);

    const mouseUp = (endEvent) => {
      document.removeEventListener("mousemove", mouseMove);

      if (id !== verbID1 && id !== verbID2) {
        resetElement(transitionDuration);
        setTimeout(() => {
          resetElement(0);
        }, transitionDuration);
      } else {
        const containerStyle =
          refList[containerIndex].current.getBoundingClientRect();
        const blueDropStyle = blueDropRef.current.getBoundingClientRect();
        const secondElementID = id === verbID1 ? verbID2 : 1;

        let resultX1 =
          containerStyle.left - initX1 + (containerStyle.width / 2 - widthMove);
        let resultY1 = containerStyle.bottom - initY1;

        let resultX2 = containerStyle.left - initX2 + containerStyle.width / 2;
        let resultY2 = containerStyle.bottom - initY2;

        const checkIsElementInDropArea = (cursorEvent, container) => {
          return (
            cursorEvent.clientX > container.left &&
            cursorEvent.clientX < container.right &&
            cursorEvent.clientY > container.top &&
            cursorEvent.clientY < container.bottom
          );
        };

        if (checkIsElementInDropArea(endEvent, containerStyle)) {
          setIsDone({ complete: true, withDelay: false });
          clearInterval(verbInterval);
          setTransition(id, transitionDuration);

          //Left Element
          changePosition(verbID1, resultX1, resultY1 - widthMove * lineIndex);

          //   Right Element
          changePosition(verbID2, resultX2, resultY2 - widthMove * lineIndex);
        } else if (checkIsElementInDropArea(endEvent, blueDropStyle)) {
          setIsDone({ complete: true, withDelay: true });
          clearInterval(verbInterval);
          setTransition(verbID1, 1000);

          const getBlueDropPoint = (initX, initY) => {
            let x;
            let y = blueDropStyle.bottom - initY;

            if (containerIndex === 0) {
              x = blueDropStyle.left - initX - 15;
            } else if (containerIndex === 1) {
              x =
                blueDropStyle.left +
                blueDropStyle.width / 2 -
                widthMove / 2 -
                initX;
            } else if (containerIndex === 2) {
              x = blueDropStyle.right - initX - 40;
            }

            return [x, y];
          };

          const [x1, y1] = getBlueDropPoint(initX1, initY1);

          changePosition(verbID1, x1, y1, "", 1);

          setTimeout(() => {
            let y1 = containerStyle.top - initY1;
            let zIndex = 200;
            let changeResultX1 = resultX1;
            let animate = "rotate";

            if (containerIndex === 1) {
              changeResultX1 =
                containerStyle.left -
                initX1 +
                (containerStyle.width / 2 - widthMove / 2);

              zIndex = 300;
              animate = "spin";
            } else if (containerIndex === 2) {
              y1 -= 30;

              animate = "reverse-rotate";
            }

            changePosition(verbID1, changeResultX1, y1, "", zIndex, animate);

            setTimeout(() => {
              setTransition(verbID1, 300);
              changePosition(
                verbID1,
                resultX1,
                resultY1 - widthMove * lineIndex
              );

              setTimeout(() => {
                setTransition(verbID2, 1000);

                const [x2, y2] = getBlueDropPoint(initX2, initY2);

                changePosition(verbID2, x2, y2, "", 1);

                setTimeout(() => {
                  let y2 = containerStyle.top - initY2 - 30;
                  let changeResultX2 = resultX2;
                  if (containerIndex === 1) {
                    changeResultX2 =
                      containerStyle.left -
                      initX2 +
                      (containerStyle.width / 2 - widthMove / 2);
                  } else if (containerIndex === 2) {
                    y1 += 30;

                    animate = "reverse-rotate";
                  }

                  changePosition(
                    verbID2,
                    changeResultX2,
                    y2,
                    "",
                    zIndex,
                    animate
                  );

                  setTimeout(() => {
                    setTransition(verbID2, 300);

                    changePosition(
                      verbID2,
                      resultX2,
                      resultY2 - widthMove * lineIndex
                    );
                  }, 1000);
                }, 1000);
              }, 1000);
            }, 1000);
          }, 1000);
        } else {
          clearInterval(verbInterval);
          resetElement(transitionDuration);
          resetElement(transitionDuration, secondElementID);

          setTimeout(() => {
            resetElement(0);
            resetElement(0, secondElementID);
          }, transitionDuration);
        }
      }

      document.removeEventListener("mouseup", mouseUp);
    };

    document.addEventListener("mouseup", mouseUp);
  };

  return (
    <>
      <div
        className={`balls ${lineOpacity ? "opacity" : ""} ${
          secondPart ? "secondPart-ball" : ""
        }`}
      >
        {list.map((wordObj, index) => (
          <figure
            className={`ball ${showAnimation[index] ? "show" : ""} ${
              moveState[index].animate
            } `}
            style={{
              left: moveState[index].x,
              top: moveState[index].y,
              transitionDuration: `${moveState[index].transition}ms`,
              zIndex: moveState[index].zIndex,
            }}
            onMouseDown={(e) => handleMove(e, index)}
            key={index}
            ref={verbRef[index] !== "" ? verbRef[index] : null}
          >
            <span className="shadow"></span>
            {containerIndex === 1 &&
              (index === verbID1 || index === verbID2) && (
                <p className="fake-text">{wordObj.text}</p>
              )}
            <div className="text">{wordObj.text}</div>
          </figure>
        ))}
      </div>
      <Indicator active={indicator.active} wrong={indicator.wrong} />
    </>
  );
};

export default BallsGroup;
