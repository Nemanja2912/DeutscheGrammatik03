import React from "react";

import "../css/game2.css";
import DragElement from "../UI/DragElement";
import Ball from "./../UI/Ball";
import Container from "./Container";
import Group from "./Group";
import { useState, useEffect, useReducer, createRef, useRef } from "react";
import wordList from "./wordList/wordList";
import StatusBar from "../UI/StatusBar";

let ballActiveList = [];
let ballActiveStatus = [];

for (let i = 0; i < wordList.length; i++) {
  ballActiveList[i] = [];
  ballActiveStatus[i] = [];
  for (let j = 0; j < wordList[i].length; j++) {
    ballActiveList[i][j] = false;
    ballActiveStatus[i][j] = true;
  }
}

const Game2 = () => {
  const [lineLevel, setLineLevel] = useState(0);
  const [ballLength, setballLength] = useState(0);
  const [ballActive, setBallActive] = useState(ballActiveList);
  const [ballStatus, setBallStatus] = useState(ballActiveStatus);
  const [buttonShow, setButtonShow] = useState(false);
  const [verbCircle, setVerbCircle] = useState({
    opacity: 0,
    left: "50%",
    top: 0,
    height: 0,
    width: 0,
    borderWidth: 25,
    transition: 200,
  });
  const [activeContainer, setActiveContainer] = useState(0);
  const containerRef = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const dropZoneRef = useRef(null);
  const ballRefs = React.useRef([]);

  ballRefs.current = wordList.map((container, i) => {
    return container.map((_, j) => ballRefs[j] ?? createRef());
  });

  useEffect(() => {
    setVerbCircle((prev) => {
      return {
        ...prev,
        top: dropZoneRef.current.getBoundingClientRect().bottom,
      };
    });
  }, []);

  //SetBallPosition
  const setBallPosition = () => {
    let ballList = Array.from(document.querySelectorAll(".ballClone"));

    for (let i = 0; i < ballList.length; i++) {
      ballList[i].style.transition = "200ms";

      ballList[i].style.left =
        dropZoneRef.current.getBoundingClientRect().left +
        dropZoneRef.current.getBoundingClientRect().width / 2 +
        80 * (i - ballList.length / 2) +
        "px";
      ballList[i].style.top =
        dropZoneRef.current.getBoundingClientRect().top +
        14 -
        (8 + 6 * Math.floor(Math.abs(i - (ballList.length - 1) / 2)) - 1) *
          Math.abs(i - (ballList.length - 1) / 2) +
        "px";

      setTimeout(() => {
        ballList[i].style.transition = "0ms";
      }, 200);
    }

    setballLength(ballList.length);

    console.log(ballList.length);
  };

  //SetVerbCirclePosition
  const setVerbCirclePosition = (contIndex) => {
    let ballList = Array.from(document.querySelectorAll(".ballClone"));

    let validIndex = ballList.length - 1;

    if (
      ballList.length !== 0 &&
      Array.from(ballList[validIndex].classList).findIndex(
        (el) => el === "lastChild"
      ) !== -1
    ) {
      validIndex--;
    }

    if (contIndex < 1) {
      setVerbCircle((prev) => {
        return {
          ...prev,
          opacity: 0,
        };
      });

      setTimeout(() => {
        setVerbCircle((prev) => {
          return {
            ...prev,
            left: "50%",
            top: dropZoneRef.current.getBoundingClientRect().bottom,
            height: 0,
            width: 0,
            borderWidth: 25,
          };
        });
      }, 200);
    } else {
      setTimeout(() => {
        setVerbCircle({
          left: document.querySelector(".verb1").getBoundingClientRect().left,
          top:
            dropZoneRef.current.getBoundingClientRect().bottom -
            ((document.querySelector(".verb2").getBoundingClientRect().right -
              document.querySelector(".verb1").getBoundingClientRect().left -
              50) *
              0.25 +
              (20 + 6 * validIndex) * 2 +
              5 +
              validIndex * 11),
          width:
            document.querySelector(".verb2").getBoundingClientRect().right -
            document.querySelector(".verb1").getBoundingClientRect().left,
          borderWidth: 20 + 5 * validIndex,
          transition: 200,
          opacity: 1,
        });
      }, 200);
    }
  };

  //

  const activeMovement = (
    e,
    ball,
    contIndex,
    ballIndex,
    initX,
    initY,
    followingBall,
    preventMove = false
  ) => {
    if (preventMove) return;
    preventMove = true;

    let el = e ? e.target : ball;

    ball.style.zIndex = "1000000";

    setActiveContainer(+ball.getAttribute("containerIndex"));
    const moveElement = (moveEvent) => {
      el.style.left = moveEvent.clientX - 40 + "px";
      el.style.top = moveEvent.clientY - 40 + "px";

      if (contIndex === 1) {
        followingBall.style.zIndex = "1000000";
        if (
          Array.from(el.classList).findIndex((word) => word === "verb1") >= 0
        ) {
          document.querySelector(".verb2").style.left =
            moveEvent.clientX + 40 + "px";
          document.querySelector(".verb2").style.top =
            moveEvent.clientY - 40 + "px";
        } else {
          document.querySelector(".verb1").style.left =
            moveEvent.clientX - 120 + "px";
          document.querySelector(".verb1").style.top =
            moveEvent.clientY - 40 + "px";
        }
      }
    };

    document.addEventListener("mousemove", moveElement);

    const endMoveElement = (endEvent) => {
      document.removeEventListener("mousemove", moveElement);
      document.removeEventListener("mouseup", endMoveElement);

      if (
        endEvent.clientX >
          containerRef[contIndex].current.getBoundingClientRect().left &&
        endEvent.clientX <
          containerRef[contIndex].current.getBoundingClientRect().right &&
        endEvent.clientY >
          containerRef[contIndex].current.getBoundingClientRect().top &&
        endEvent.clientY <
          containerRef[contIndex].current.getBoundingClientRect().bottom
      ) {
        ball.style.transition = "200ms";
        ball.style.left = initX + "px";
        ball.style.top = initY + "px";

        let ballList = Array.from(document.querySelectorAll(".ballClone"));

        let statusBallList = [...ballStatus];

        if (
          (contIndex === 1 || contIndex === 0) &&
          ballList[1]?.getAttribute("ballindex")
        ) {
          for (let i = 0; i < ballStatus.length; i++) {
            if (i === 1 || i === 0) {
              let switchBallIndex = +ballList[1]?.getAttribute("ballindex");

              switch (switchBallIndex) {
                case 0:
                case 1:
                case 6:
                case 7:
                case 12:
                case 13:
                  statusBallList[1][0] = true;
                  statusBallList[1][1] = true;
                  statusBallList[1][6] = true;
                  statusBallList[1][7] = true;
                  statusBallList[1][12] = true;
                  statusBallList[1][13] = true;
                  break;
                case 2:
                case 3:
                case 8:
                case 9:
                case 14:
                case 15:
                  statusBallList[1][2] = true;
                  statusBallList[1][3] = true;
                  statusBallList[1][8] = true;
                  statusBallList[1][9] = true;
                  statusBallList[1][14] = true;
                  statusBallList[1][15] = true;
                  break;
                case 4:
                case 5:
                case 10:
                case 11:
                case 16:
                case 17:
                  statusBallList[1][4] = true;
                  statusBallList[1][5] = true;
                  statusBallList[1][10] = true;
                  statusBallList[1][11] = true;
                  statusBallList[1][16] = true;
                  statusBallList[1][17] = true;
                  break;
                default:
                  statusBallList = [...statusBallList];
              }
            } else {
              for (let j = 0; j < ballStatus[i].length; j++) {
                if (!ballActive[i][j]) statusBallList[i][j] = true;
              }
            }
          }
        }

        for (let i = 0; i < ballList.length; i++) {
          if (
            ballList[i] === undefined ||
            +ballList[i].getAttribute("containerindex") < contIndex
          )
            continue;

          let ballIndex = +ballList[i].getAttribute("ballIndex");
          let containerIndex = +ballList[i].getAttribute("containerindex");

          ballList[i].style.transition = "200ms";

          if (
            +ballList[i].getAttribute("containerindex") === contIndex ||
            activeContainer === 1
          ) {
            ballList[i].style.left =
              ballRefs.current[containerIndex][
                ballIndex
              ].current?.getBoundingClientRect().left + "px";
            ballList[i].style.top =
              ballRefs.current[containerIndex][
                ballIndex
              ].current?.getBoundingClientRect().top + "px";
          } else {
            if (i === ballList.length - 1 && contIndex !== 0) continue;

            ballList[i].style.transform = `scale(0.55)`;

            ballList[i].style.left =
              ballRefs.current[containerIndex][
                ballIndex
              ].current.getBoundingClientRect().left -
              18.4 +
              "px";
            ballList[i].style.top =
              ballRefs.current[containerIndex][
                ballIndex
              ].current.getBoundingClientRect().top -
              18.4 +
              "px";
          }

          setTimeout(() => {
            setBallActive((prev) => {
              let list = [...prev];
              list[containerIndex][ballIndex] = false;

              return list;
            });
            ballList[i].remove();

            setBallPosition();
          }, 200);
        }

        setTimeout(() => {
          preventMove = false;
          setTimeout(() => {
            let ballList = Array.from(document.querySelectorAll(".ballClone"));

            // if (ballList.length === ballLength) {
            console.log("in");
            setVerbCirclePosition(ballList.length - 2);
            // }

            setButtonShow(ballLength === 1 || ballLength > 3);
          }, 200);
        }, 200);
        setBallStatus(statusBallList);
      } else {
        let copyList = [...ballStatus];
        if (contIndex === 1) {
          switch (ballIndex) {
            case 0:
            case 1:
            case 6:
            case 7:
            case 12:
            case 13:
              copyList[1][0] = false;
              copyList[1][1] = false;
              copyList[1][6] = false;
              copyList[1][7] = false;
              copyList[1][12] = false;
              copyList[1][13] = false;
              break;
            case 2:
            case 3:
            case 8:
            case 9:
            case 14:
            case 15:
              copyList[1][2] = false;
              copyList[1][3] = false;
              copyList[1][8] = false;
              copyList[1][9] = false;
              copyList[1][14] = false;
              copyList[1][15] = false;
              break;
            case 4:
            case 5:
            case 10:
            case 11:
            case 16:
            case 17:
              copyList[1][4] = false;
              copyList[1][5] = false;
              copyList[1][10] = false;
              copyList[1][11] = false;
              copyList[1][16] = false;
              copyList[1][17] = false;
              break;
            default:
              copyList = [...copyList];
          }

          switch (ballIndex) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 6:
            case 7:
            case 12:
            case 13:
              copyList[2][0] = false;
              copyList[2][1] = false;
              copyList[2][2] = false;
              copyList[2][3] = false;
              break;
            case 4:
            case 5:
              copyList[2][0] = false;
              copyList[2][2] = false;
              copyList[2][3] = false;
              break;
            case 8:
            case 9:
            case 14:
            case 15:
              copyList[2][1] = false;
              copyList[2][2] = false;
              copyList[2][3] = false;
              break;
            case 10:
            case 11:
              copyList[2][1] = false;
              copyList[2][3] = false;
              break;
            case 16:
            case 17:
              copyList[2][0] = false;
              copyList[2][1] = false;
              copyList[2][2] = false;
              break;

            default:
              copyList = [...copyList];
          }

          switch (ballIndex) {
            case 0:
            case 1:
            case 4:
            case 5:
              copyList[3][0] = false;
              copyList[3][2] = false;
              copyList[3][3] = false;
              break;
            case 2:
            case 3:
              copyList[3][0] = false;
              copyList[3][3] = false;
              break;
            case 6:
            case 7:
            case 16:
            case 17:
              copyList[3][0] = false;
              copyList[3][1] = false;
              copyList[3][2] = false;
              copyList[3][3] = false;
              break;
            case 8:
            case 9:
              copyList[3][1] = false;
              copyList[3][2] = false;
              break;
            case 10:
            case 11:
              copyList[3][2] = false;
              copyList[3][3] = false;
              break;
            case 12:
            case 13:
              copyList[3][0] = false;
              copyList[3][1] = false;
              copyList[3][3] = false;
              break;
            case 14:
            case 15:
              copyList[3][0] = false;
              copyList[3][1] = false;
              copyList[3][2] = false;
              break;
            default:
              copyList = [...copyList];
          }

          switch (ballIndex) {
            case 0:
            case 1:
              copyList[4][0] = false;
              copyList[4][1] = false;
              copyList[4][2] = false;
              copyList[4][3] = false;
              break;
            case 2:
            case 3:
            case 8:
            case 9:
            case 12:
            case 13:
            case 14:
            case 15:
              copyList[4][1] = false;
              break;
            case 6:
            case 7:
              copyList[4][1] = false;
              copyList[4][2] = false;
              break;
            default:
              copyList = [...copyList];
          }
        }

        setBallStatus(copyList);

        setBallPosition();

        if (contIndex > 0) {
          setTimeout(() => {
            setVerbCirclePosition(contIndex);
          }, 200);
        }

        let ballList = Array.from(document.querySelectorAll(".ballClone"));

        let validIndex = ballList.length - 1;

        setButtonShow(
          +ballList[ballList.length - 2]?.getAttribute("containerindex") !== 1
        );

        if (
          Array.from(ballList[validIndex].classList).findIndex(
            (el) => el === "lastChild"
          ) !== -1
        ) {
          validIndex--;
        }

        let nextContainerIndex =
          +ballList[validIndex].getAttribute("containerindex") + 1;

        let stop = false;

        for (let i = nextContainerIndex; i < 5; i++) {
          if (stop) break;
          for (let j = 0; j < ballActiveStatus[i].length; j++) {
            if (ballActiveStatus[i][j]) {
              stop = true;
              nextContainerIndex = i;
              break;
            }
          }
        }

        if (!stop) {
          setActiveContainer(5);
          setButtonShow(true);
        } else {
          setActiveContainer(nextContainerIndex);
        }

        if (followingBall) followingBall.style.zIndex = "1000";
        ball.style.zIndex = "1000";
        preventMove = false;
      }
    };

    document.addEventListener("mouseup", endMoveElement);
  };

  //

  const handleCopyElement = (initEvent, contIndex, ballIndex) => {
    if (!ballStatus[contIndex][ballIndex]) return;
    let followingBall;

    let ball = initEvent.target.cloneNode(true);

    ball.style.opacity = "1";
    ball.style.position = "absolute";
    ball.style.cursor = "pointer";
    ball.style.zIndex = "1000000";
    ball.style.left =
      initEvent.clientX -
      initEvent.target.getBoundingClientRect().width / 2 +
      "px";
    ball.style.top =
      initEvent.clientY -
      initEvent.target.getBoundingClientRect().width / 2 +
      "px";

    ball.setAttribute("containerIndex", contIndex);
    ball.setAttribute("ballIndex", ballIndex);
    ball.classList.add("ballClone");

    if (contIndex === 1) {
      let followingIndex;
      if (ballIndex % 2 === 0) {
        followingIndex = ballIndex + 1;
      } else {
        followingIndex = ballIndex - 1;
      }

      followingBall = document
        .querySelector(`.element1${followingIndex}`)
        .children[0].cloneNode(true);
      followingBall.style.opacity = "1";
      followingBall.style.position = "absolute";
      followingBall.style.cursor = "pointer";
      followingBall.style.zIndex = "1000000";

      if (ballIndex % 2 === 0) {
        followingBall.style.left = initEvent.clientX + 40 + "px";
        followingBall.style.top = initEvent.clientY - 40 + "px";
        followingBall.classList.add("ballClone", "lastChild", "verb2");
        ball.classList.add("verb1");
      } else {
        followingBall.style.left = initEvent.clientX - 120 + "px";
        followingBall.style.top = initEvent.clientY - 40 + "px";
        followingBall.classList.add("ballClone", "verb1");
        ball.classList.add("lastChild", "verb2");
      }

      followingBall.setAttribute("containerIndex", contIndex);
      followingBall.setAttribute("ballIndex", followingIndex);

      document.getElementById("clone-div").appendChild(followingBall);

      setBallActive((prev) => {
        let list = [...prev];
        list[contIndex][followingIndex] = true;

        return list;
      });
    }
    setBallActive((prev) => {
      let list = [...prev];
      list[contIndex][ballIndex] = true;

      return list;
    });

    const initX = initEvent.target.getBoundingClientRect().left;
    const initY = initEvent.target.getBoundingClientRect().top;

    if (activeContainer === 1 && ballIndex % 2 === 0) {
      document.getElementById("clone-div").insertBefore(ball, followingBall);
    } else if (activeContainer > 1) {
      document
        .getElementById("clone-div")
        .insertBefore(ball, document.querySelector(".lastChild"));
    } else {
      document.getElementById("clone-div").appendChild(ball);
    }

    let preventMove = false;

    ball.addEventListener("mousedown", (e) => {
      activeMovement(
        e,
        ball,
        contIndex,
        ballIndex,
        initX,
        initY,
        followingBall,
        preventMove
      );
    });

    if (followingBall) {
      followingBall.addEventListener("mousedown", (e) => {
        activeMovement(
          e,
          ball,
          contIndex,
          ballIndex,
          initX,
          initY,
          followingBall,
          preventMove
        );
      });
    }

    activeMovement(
      false,
      ball,
      contIndex,
      ballIndex,
      initX,
      initY,
      followingBall,
      preventMove
    );
  };

  const svgRef = useRef(null);

  const handleSubmit = () => {
    svgRef.current.style.opacity = 0;

    setTimeout(() => {
      svgRef.current.style.transition = "500ms";

      if (lineLevel < 2) {
        svgRef.current.style.opacity = 1;
      }

      setTimeout(() => {
        svgRef.current.style.transition = "0ms";
      }, 500);
    }, 1000);

    const copySvg = svgRef.current.cloneNode(true);
    copySvg.style.opacity = 1;
    copySvg.style.transition = "1000ms";
    copySvg.style.position = "absolute";
    copySvg.style.left = svgRef.current.getBoundingClientRect().left + "px";
    copySvg.style.top = svgRef.current.getBoundingClientRect().top + "px";
    copySvg.style.transformOrigin = "left";

    copySvg.classList.add(`copySvg${lineLevel}`);

    setTimeout(() => {
      if (lineLevel < 2) {
        copySvg.style.left = 0 + "px";
        copySvg.style.top = 325 + 115 * lineLevel + "px";
        copySvg.style.height =
          svgRef.current.getBoundingClientRect().height / 2 + "px";
        copySvg.style.width =
          svgRef.current.getBoundingClientRect().width / 2 + "px";
      } else {
        const moveCopySvg = (copySvg, lineLevel) => {
          copySvg.style.left =
            window.innerWidth / 2 -
            svgRef.current.getBoundingClientRect().width / 2 / 2 +
            "px";
          copySvg.style.top = 125 + 200 * lineLevel + "px";
          copySvg.style.height =
            svgRef.current.getBoundingClientRect().height / 2 + "px";
          copySvg.style.width =
            svgRef.current.getBoundingClientRect().width / 2 + "px";
        };

        moveCopySvg(document.querySelector(".copySvg0"), 0);
        moveCopySvg(document.querySelector(".copySvg1"), 1);
        moveCopySvg(copySvg, 2);
      }
    }, 0);

    document.querySelector(".svg-copy").appendChild(copySvg);

    let ballList = Array.from(document.querySelectorAll(".ballClone"));

    if (lineLevel < 2) {
      for (let i = 0; i < ballList.length; i++) {
        ballList[i].style.transition = "1000ms";

        ballList[i].style.cursor = "default";
        ballList[i].style.width = "40px";
        ballList[i].style.height = "40px";
        ballList[i].style.fontSize = "7px";
        ballList[i].style.left =
          0 +
          (ballList[i].getBoundingClientRect().left -
            svgRef.current.getBoundingClientRect().left) /
            2 +
          "px";
        ballList[i].style.top =
          325 +
          115 * lineLevel +
          (ballList[i].getBoundingClientRect().top -
            svgRef.current.getBoundingClientRect().top) /
            2 +
          "px";

        setTimeout(() => {
          ballList[i].replaceWith(ballList[i].cloneNode(true));
        }, 1000);

        ballList[i].className = `cloneBallDone${lineLevel}`;
      }
    } else {
      const finalPositionBall = (ballList, lineLevel) => {
        for (let i = 0; i < ballList.length; i++) {
          ballList[i].style.transition = "1000ms";

          ballList[i].style.cursor = "default";
          ballList[i].style.width = "40px";
          ballList[i].style.height = "40px";
          ballList[i].style.fontSize = "7px";

          if (lineLevel === 2) {
            ballList[i].style.left =
              window.innerWidth / 2 -
              svgRef.current.getBoundingClientRect().width / 2 / 2 +
              (ballList[i].getBoundingClientRect().left -
                svgRef.current.getBoundingClientRect().left) /
                2 +
              "px";
            ballList[i].style.top =
              125 +
              200 * lineLevel +
              (ballList[i].getBoundingClientRect().top -
                svgRef.current.getBoundingClientRect().top) /
                2 +
              "px";
          } else {
            ballList[i].style.left =
              parseFloat(ballList[i].style.left) +
              window.innerWidth / 2 -
              svgRef.current.getBoundingClientRect().width / 2 / 2 +
              "px";
            ballList[i].style.top =
              125 +
              200 * lineLevel +
              parseFloat(ballList[i].style.top) -
              325 -
              115 * lineLevel +
              "px";
          }

          setTimeout(() => {
            ballList[i].replaceWith(ballList[i].cloneNode(true));
          }, 1000);
        }
      };

      let ballList1 = Array.from(document.querySelectorAll(".cloneBallDone0"));
      let ballList2 = Array.from(document.querySelectorAll(".cloneBallDone1"));

      finalPositionBall(ballList1, 0);
      finalPositionBall(ballList2, 1);
      finalPositionBall(ballList, 2);
    }

    if (ballList.length >= 3) {
      let validIndex = ballList.length - 1;

      if (
        Array.from(ballList[validIndex].classList).findIndex(
          (el) => el === "lastChild"
        ) !== -1
      ) {
        validIndex--;
      }

      const copyHalfCircle = document
        .querySelector(".verb-half-circle")
        .cloneNode(true);

      copyHalfCircle.style.transition = 1000 + "ms";
      copyHalfCircle.style.zIndex = -lineLevel - 1;

      copyHalfCircle.classList.add(`cloneHalfCircle${lineLevel}`);

      document
        .querySelector(`.clone-verb-circle${lineLevel}`)
        .appendChild(copyHalfCircle);

      if (lineLevel < 2) {
        copyHalfCircle.style.left =
          (ballList[1].getBoundingClientRect().left -
            svgRef.current.getBoundingClientRect().left) /
            2 +
          "px";

        copyHalfCircle.style.top =
          325 + 115 * lineLevel - 35 * (validIndex - 2) + "px";
      } else {
        copyHalfCircle.style.left =
          (ballList[1].getBoundingClientRect().left -
            svgRef.current.getBoundingClientRect().left) /
            2 +
          window.innerWidth / 2 -
          svgRef.current.getBoundingClientRect().width / 2 / 2 +
          "px";

        copyHalfCircle.style.top =
          95 +
          200 * lineLevel +
          (325 +
            115 * lineLevel -
            35 * (validIndex - 2) -
            325 -
            115 * lineLevel) +
          "px";
      }

      copyHalfCircle.style.width =
        (ballList[ballList.length - 1].getBoundingClientRect().left -
          svgRef.current.getBoundingClientRect().left) /
          2 -
        (ballList[1].getBoundingClientRect().left -
          svgRef.current.getBoundingClientRect().left) /
          2 +
        40 +
        "px";
      copyHalfCircle.style.height =
        (ballList[ballList.length - 1].getBoundingClientRect().left -
          svgRef.current.getBoundingClientRect().left) /
          2 -
        (ballList[1].getBoundingClientRect().left -
          svgRef.current.getBoundingClientRect().left) /
          2 +
        40 +
        "px";

      copyHalfCircle.style.borderWidth =
        parseFloat(copyHalfCircle.style.borderWidth) / 3 + "px";

      copyHalfCircle.querySelector(".cut").style.borderWidth =
        verbCircle.borderWidth + "px";
      copyHalfCircle.querySelector(".cut").style.width =
        verbCircle.width + 10 + "px";
      copyHalfCircle.querySelector(".cut").style.height =
        verbCircle.width / 2.41 + "px";
      copyHalfCircle.querySelector(".cut").style.top =
        -verbCircle.borderWidth + "px";
      copyHalfCircle.querySelector(".cut").style.left =
        -verbCircle.borderWidth - 10 + "px";

      setVerbCircle({
        opacity: 0,
        left: "50%",
        top: dropZoneRef.current.getBoundingClientRect().bottom,
        height: 0,
        width: 0,
        borderWidth: 25,
      });
    }

    if (lineLevel === 2) {
      const moveHalfCircle = (copyHalfCircle, lineLevel) => {
        copyHalfCircle.style.left =
          parseFloat(copyHalfCircle.style.left) +
          window.innerWidth / 2 -
          svgRef.current.getBoundingClientRect().width / 2 / 2 +
          "px";

        copyHalfCircle.style.top =
          125 +
          200 * lineLevel +
          (parseFloat(copyHalfCircle.style.top) - 325 - 115 * lineLevel) +
          "px";
      };

      if (document.querySelector(".cloneHalfCircle0")) {
        moveHalfCircle(document.querySelector(".cloneHalfCircle0"), 0);
      }

      if (document.querySelector(".cloneHalfCircle1")) {
        moveHalfCircle(document.querySelector(".cloneHalfCircle1"), 1);
      }
    }

    setBallStatus((prev) => {
      let list = [...prev];

      for (let i = 0; i < list.length; i++) {
        if (i === 1) continue;

        for (let j = 0; j < list[i].length; j++) {
          if (!ballActive[i][j]) {
            list[i][j] = true;
          } else {
            list[i][j] = false;
          }
        }
      }

      return list;
    });
    setLineLevel((prev) => prev + 1);
    setButtonShow(false);
    setActiveContainer(5);

    setTimeout(() => {
      setActiveContainer(0);
    }, 1250);
  };

  //BAR
  const [helpFingerPosition, setHelpFingerPosition] = useState([]);
  const [helpOverlay, setHelpOverlay] = useState();

  useEffect(() => {
    if (helpOverlay) {
      let element;
      let stop = false;

      let containerIndex;
      let ballIndex;

      if (!buttonShow) {
        for (let i = activeContainer; i < ballStatus.length; i++) {
          if (stop) break;

          for (let j = 0; j < ballStatus.length; j++) {
            if (ballStatus[i][j]) {
              element = document.querySelector(`.element${i}${j}`);

              containerIndex = i;
              ballIndex = j;

              stop = true;
              break;
            }
          }
        }

        setHelpFingerPosition([
          element.getBoundingClientRect().left + 30,
          element.getBoundingClientRect().top + 30,
        ]);

        let ball = element.children[0].cloneNode(true);

        ball.style.opacity = "1";
        ball.style.position = "absolute";
        ball.style.cursor = "pointer";
        ball.style.zIndex = "10000";

        ball.style.left = element.getBoundingClientRect().left + "px";
        ball.style.top = element.getBoundingClientRect().top + "px";

        ball.setAttribute("containerIndex", containerIndex);
        ball.setAttribute("ballIndex", ballIndex);
        ball.classList.add("ballClone");

        if (activeContainer > 1) {
          document
            .getElementById("clone-div")
            .insertBefore(ball, document.querySelector(".lastChild"));
        } else {
          document.getElementById("clone-div").appendChild(ball);
        }

        ball.style.transition = "linear 1000ms";

        setTimeout(() => {
          setHelpFingerPosition([
            svgRef.current.getBoundingClientRect().left +
              svgRef.current.getBoundingClientRect().width / 2,
            svgRef.current.getBoundingClientRect().top,
          ]);

          ball.style.left =
            svgRef.current.getBoundingClientRect().left +
            svgRef.current.getBoundingClientRect().width / 2 -
            30 +
            "px";
          ball.style.top =
            svgRef.current.getBoundingClientRect().top - 30 + "px";

          setBallActive((prev) => {
            let list = [...prev];
            list[containerIndex][ballIndex] = true;

            return list;
          });
          // setBallStatus((prev) => {
          //   let list = [...prev];
          //   list[containerIndex][ballIndex] = false;

          //   return list;
          // });

          setTimeout(() => {
            setHelpFingerPosition("init");
            setHelpFingerPosition(false);

            //

            setBallPosition();

            if (containerIndex > 0) {
              setTimeout(() => {
                setVerbCirclePosition(containerIndex);
              }, 200);
            }

            let ballList = Array.from(document.querySelectorAll(".ballClone"));

            let validIndex = ballList.length - 1;

            setButtonShow(
              +ballList[ballList.length - 2]?.getAttribute("containerindex") !==
                1
            );

            if (
              Array.from(ballList[validIndex].classList).findIndex(
                (el) => el === "lastChild"
              ) !== -1
            ) {
              validIndex--;
            }

            let nextContainerIndex =
              +ballList[validIndex].getAttribute("containerindex") + 1;

            let stop = false;

            for (let i = nextContainerIndex; i < 5; i++) {
              if (stop) break;
              for (let j = 0; j < ballActiveStatus[i].length; j++) {
                if (ballActiveStatus[i][j]) {
                  stop = true;
                  nextContainerIndex = i;
                  break;
                }
              }
            }

            if (!stop) {
              setActiveContainer(5);
              setButtonShow(true);
            } else {
              setActiveContainer(nextContainerIndex);
            }

            ball.style.zIndex = "1000";

            //

            ball.addEventListener("mousedown", (e) => {
              activeMovement(
                e,
                ball,
                containerIndex,
                ballIndex,
                element.getBoundingClientRect().left,
                element.getBoundingClientRect().top,
                false,
                false
              );
            });
          }, 1250);
        }, 1250);
      } else {
        const button = document.querySelector(".submitButton");
        const buttonStyle = button.getBoundingClientRect();

        setHelpFingerPosition([
          buttonStyle.left + buttonStyle.width / 2,
          buttonStyle.top + buttonStyle.height / 2,
        ]);

        setTimeout(() => {
          button.click();
          setHelpFingerPosition("init");
          setHelpFingerPosition(false);
        }, 1250);
      }
    }
  }, [helpOverlay]);

  return (
    <>
      <StatusBar
        infoText={
          <p>
            Bilde Sätze. Nimm die Kugeln aus dem Kasten und leg <br /> sie in
            die Schale.
          </p>
        }
        helpFingerPosition={helpFingerPosition}
        setHelpOverlay={setHelpOverlay}
      />
      <div className="game2">
        {
          <div
            className="wrapper"
            style={{
              position: "relative",
              top: lineLevel < 3 ? 0 : -500,
              transition: "1000ms",
            }}
          >
            <Group>
              {wordList.map((container, containerIndex) => (
                <Container
                  inLine={containerIndex === 1 ? 6 : 2}
                  inRow={containerIndex === 1 ? 3 : 2}
                  active={containerIndex === activeContainer}
                  containerRef={containerRef[containerIndex]}
                >
                  {container.map((word, wordIndex) => {
                    return (
                      <div
                        className={`element ${`element${containerIndex}${wordIndex}`}`}
                        style={{
                          position: "relative",
                          left: word.x,
                          top: word.y,
                          zIndex: word.zIndex,
                          transition: `${word.transition}ms`,
                          cursor:
                            containerIndex === activeContainer &&
                            ballStatus[containerIndex][wordIndex]
                              ? "pointer"
                              : "default",
                          borderRadius: "50%",
                          opacity: ballActive[containerIndex][wordIndex]
                            ? 0
                            : ballStatus[containerIndex][wordIndex]
                            ? 1
                            : 0.5,
                        }}
                        ref={ballRefs.current[containerIndex][wordIndex]}
                        onMouseDown={(event) => {
                          if (containerIndex !== activeContainer) return;
                          handleCopyElement(event, containerIndex, wordIndex);
                        }}
                      >
                        <Ball
                          color={containerIndex === 1 ? "#3FA0C8" : "#8D9599"}
                        >
                          {word}
                        </Ball>
                      </div>
                    );
                  })}
                </Container>
              ))}
            </Group>
          </div>
        }

        <div id="clone-div"></div>

        <div className="svg-copy"></div>
        <div className="drop-zone" ref={dropZoneRef}>
          <svg
            ref={svgRef}
            width="585"
            height="130"
            viewBox="0 0 685 130"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M684.561 26.5884C583.244 93.8771 464.344 129.815 342.718 129.91C221.092 130.006 102.135 94.2556 0.712799 27.1263L17.9111 1.14221C114.226 64.891 227.193 98.8412 342.693 98.7504C458.194 98.6595 571.107 64.5315 667.322 0.631348L684.561 26.5884Z"
              fill="#C4C4C4"
            />
          </svg>

          <div className="circle"></div>
        </div>

        <div
          className="verb-half-circle"
          style={{
            opacity: verbCircle.opacity,
            left: verbCircle.left,
            width: verbCircle.width,
            height: verbCircle.width,
            top: verbCircle.top,
            borderWidth: verbCircle.borderWidth,
            transition: verbCircle.transition + "ms",
          }}
        >
          <div
            className="cut"
            style={{
              borderWidth: verbCircle.borderWidth,
              width: verbCircle.width + 10,
              height: verbCircle.width / 2.41,
              top: -verbCircle.borderWidth,
              left: -verbCircle.borderWidth - 10,
              transition: verbCircle.transition + "ms",
            }}
          ></div>
        </div>
        <div className="clone-verb-circle0"></div>
        <div className="clone-verb-circle1"></div>
        <div className="clone-verb-circle2"></div>
        {buttonShow && (
          <p className="button submitButton" onClick={handleSubmit}>
            Weiter
          </p>
        )}
      </div>
    </>
  );
};

export default Game2;
