import React, { useRef, useState, useEffect } from "react";

import DropZone from "../assets/img/SVG/subtract.svg";
import Indicator from "../UI/Indicator";

const sentenceList = [
  {
    words: [
      {
        word: "Peter",
        allowed: [0, 2],
      },
      {
        word: "steht",
        allowed: [1],
      },
      {
        word: "sonntags",
        allowed: [0, 2],
      },
      {
        word: "spät",
        allowed: [3],
      },
      {
        word: "auf",
        allowed: [4],
      },
    ],
  },
  {
    words: [
      {
        word: "sie",
        allowed: [0, 2],
      },
      {
        word: "wollen",
        allowed: [1],
      },
      {
        word: "im Sommer",
        allowed: [0, 2],
      },
      {
        word: "nach Spanien",
        allowed: [3],
      },
      {
        word: "reisen",
        allowed: [4],
      },
    ],
  },
  {
    words: [
      {
        word: "meine Oma",
        allowed: [0, 2],
      },
      {
        word: "hat",
        allowed: [1],
      },
      {
        word: "gestern",
        allowed: [0, 2],
      },
      {
        word: "einen Kuchen",
        allowed: [3],
      },
      {
        word: "gebacken",
        allowed: [4],
      },
    ],
  },
  {
    words: [
      {
        word: "man",
        allowed: [0, 2],
      },
      {
        word: "darf",
        allowed: [1],
      },
      {
        word: "hier",
        allowed: [0, 2],
      },
      {
        word: "nicht",
        allowed: [3],
      },
      {
        word: "rauchen",
        allowed: [4],
      },
    ],
  },
  {
    words: [
      {
        word: "Frau Müller",
        allowed: [0, 2],
      },
      {
        word: "macht",
        allowed: [1],
      },
      {
        word: "die Bäckerei",
        allowed: [3, 2],
      },
      {
        word: "um 18 Uhr",
        allowed: [0, 2],
      },
      {
        word: "zu",
        allowed: [4],
      },
    ],
  },
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

for (let i = 0; i < sentenceList.length; i++) {
  shuffleArray(sentenceList[i].words);
}

const topPos = [573, 494, 415, 336, 257];

const Part2Game5 = ({ setHelpFingerPosition, helpOverlay }) => {
  const [level, setLevel] = useState(0);
  const [availablePos, setAvailablePos] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);
  const dropRef = useRef();

  const [indicator, setIndicator] = useState({
    active: false,
    wrong: false,
  });

  const positionCircles = () => {
    const options = Array.from(
      document.querySelectorAll(".option")[level].children
    );

    let width = options[0].getBoundingClientRect().width * options.length;

    for (let i = 0; i < options.length; i++) {
      options[i].style.transition = "200ms";

      setTimeout(() => {
        options[i].style.transition = "0ms";
      }, 200);

      options[i].style.left =
        dropRef.current.getBoundingClientRect().left +
        dropRef.current.getBoundingClientRect().width / 2 -
        width / 2 +
        70 * i +
        "px";
    }
  };

  let animateCircleShow = (level) => {
    const options = Array.from(
      document.querySelectorAll(".option")[level].children
    );

    let width = options[0].getBoundingClientRect().width * options.length;

    for (let i = 0; i < options.length; i++) {
      options[i].style.transition = "200ms";

      options[i].style.left =
        dropRef.current.getBoundingClientRect().left +
        dropRef.current.getBoundingClientRect().width / 2 -
        width / 2 +
        "px";

      setTimeout(() => {
        options[i].style.left =
          dropRef.current.getBoundingClientRect().left +
          dropRef.current.getBoundingClientRect().width / 2 -
          width / 2 +
          70 * i +
          "px";

        setTimeout(() => {
          options[i].style.transition = "0ms";
        }, 200);
      }, 200);
    }
  };

  useEffect(() => {
    animateCircleShow(level);
  }, []);

  const moveToDropPosition = (element, leftPosIndex, leftPos) => {
    let cloneElement = element.cloneNode(true);
    cloneElement.style.left = element.getBoundingClientRect().left + "px";
    cloneElement.style.top = element.getBoundingClientRect().top + "px";
    cloneElement.style.zIndex = -1;

    if (+leftPosIndex === 0) {
      cloneElement.style.textTransform = "capitalize";
    } else if (+leftPosIndex === 1 || +leftPosIndex === 4) {
      cloneElement.style.backgroundColor = "#5ac8f5";
    }

    document.querySelector(".clone-circle").appendChild(cloneElement);

    setTimeout(() => {
      cloneElement.style.transition = "200ms";
      cloneElement.style.left = leftPos[leftPosIndex] + "px";

      setTimeout(() => {
        cloneElement.style.transition = "500ms";
        cloneElement.style.top = topPos[level] + "px";
      }, 300);
    }, 100);

    element.remove();
  };

  const handleMove = (initEvent) => {
    let initTop = initEvent.target.getBoundingClientRect().top;
    let newAvailablePos = [...availablePos];

    const moveCircle = (moveEvent) => {
      if (
        moveEvent.clientY +
          initEvent.target.getBoundingClientRect().height / 2 +
          10 <
        dropRef.current.getBoundingClientRect().top
      ) {
        initEvent.target.style.top =
          moveEvent.clientY -
          initTop -
          initEvent.target.getBoundingClientRect().height / 2 +
          "px";
      }

      initEvent.target.style.left =
        moveEvent.clientX -
        initEvent.target.getBoundingClientRect().width / 2 +
        "px";
    };

    document.addEventListener("mousemove", moveCircle);

    const endMoveCircle = (endEvent) => {
      document.removeEventListener("mousemove", moveCircle);
      document.removeEventListener("mouseup", endMoveCircle);

      let leftPos = [358.5, 436.5, 515.5, 594.5, 673];

      let returnToInitPos = true;

      let leftPosIndex;

      let allowed = initEvent.target.getAttribute("allowed").split(",");

      for (let j = 0; j < allowed.length; j++) {
        if (
          availablePos[allowed[j]] &&
          endEvent.clientX > leftPos[allowed[j]] &&
          endEvent.clientX <
            leftPos[allowed[j]] +
              initEvent.target.getBoundingClientRect().width &&
          endEvent.clientY > dropRef.current.getBoundingClientRect().top - 60
        ) {
          leftPosIndex = allowed[j];

          returnToInitPos = false;

          newAvailablePos[allowed[j]] = false;

          setAvailablePos(newAvailablePos);
          break;
        }
      }

      if (returnToInitPos) {
        initEvent.target.style.transition = "200ms";
        initEvent.target.style.top = 0 + "px";

        setIndicator({ active: true, wrong: true });

        setTimeout(() => {
          setIndicator({ active: false, wrong: false });
        }, 1000);

        setTimeout(() => {
          initEvent.target.style.transition = "200ms";
        }, 200);
      } else {
        let element = initEvent.target;

        setIndicator({ active: true, wrong: false });

        setTimeout(() => {
          setIndicator({ active: false, wrong: false });
        }, 1000);

        moveToDropPosition(element, leftPosIndex, leftPos);
      }

      let isDone = true;

      for (let i = 0; i < newAvailablePos.length; i++) {
        if (newAvailablePos[i]) {
          isDone = false;
          break;
        }
      }

      if (isDone) {
        setAvailablePos([true, true, true, true, true]);

        setTimeout(() => {
          let newLevel;
          setLevel((prev) => {
            newLevel = prev + 1;
            return prev + 1;
          });

          if (newLevel < 5) animateCircleShow(newLevel);
          else setPreventHelp(true);
        }, 500);
      } else {
        positionCircles();
      }
    };

    document.addEventListener("mouseup", endMoveCircle);
  };

  const [preventHelp, setPreventHelp] = useState(false);

  useEffect(() => {
    let optionList = Array.from(document.querySelectorAll(".option"));
    if (preventHelp) {
      setHelpFingerPosition("init");
      setTimeout(() => {
        setHelpFingerPosition(false);
      }, 10);
      return;
    }

    if (helpOverlay) {
      setPreventHelp(true);
      let element = optionList[level].children[0];

      if (!element) return;

      element.style.transition = "1000ms linear";

      let initTop = element.getBoundingClientRect().top;
      element.style.top = "0px";

      setHelpFingerPosition([
        element.getBoundingClientRect().left +
          element.getBoundingClientRect().width / 2,
        element.getBoundingClientRect().top +
          element.getBoundingClientRect().height / 2,
      ]);

      let leftPos = [358.5, 436.5, 515.5, 594.5, 673];
      let allowed = element.getAttribute("allowed").split(",");
      let leftPosIndex = allowed[0];
      let newAvailablePos = [...availablePos];

      for (let j = 0; j < allowed.length; j++) {
        if (availablePos[allowed[j]]) {
          leftPosIndex = allowed[j];

          newAvailablePos[allowed[j]] = false;

          setAvailablePos(newAvailablePos);
          break;
        }
      }

      setTimeout(() => {
        setHelpFingerPosition([
          leftPos[leftPosIndex] + 35,
          dropRef.current.getBoundingClientRect().top - 45,
        ]);

        element.style.left = leftPos[leftPosIndex] + "px";
        element.style.top =
          dropRef.current.getBoundingClientRect().top - 80 - initTop + "px";

        setIndicator({ active: true, wrong: false });

        setTimeout(() => {
          moveToDropPosition(element, leftPosIndex, leftPos);

          setTimeout(() => {
            setHelpFingerPosition("init");
            setHelpFingerPosition(false);
            setIndicator({ active: false, wrong: false });

            let isDone = true;

            for (let i = 0; i < newAvailablePos.length; i++) {
              if (newAvailablePos[i]) {
                isDone = false;
                break;
              }
            }

            if (isDone) {
              setAvailablePos([true, true, true, true, true]);

              setTimeout(() => {
                let newLevel;
                setLevel((prev) => {
                  newLevel = prev + 1;
                  return prev + 1;
                });

                if (newLevel < 5) {
                  animateCircleShow(newLevel);
                  setTimeout(() => {
                    setPreventHelp(false);
                  }, 500);
                }
              }, 500);
            } else {
              positionCircles();
              setTimeout(() => {
                setPreventHelp(false);
              }, 500);
            }
          }, 1500);
        }, 1000);
      }, 1250);
    } else {
      setHelpFingerPosition("init");
      setTimeout(() => {
        setHelpFingerPosition(false);
      }, 250);
    }
  }, [helpOverlay]);

  return (
    <>
      <div className="part2">
        {sentenceList.map((option, optionIndex) => (
          <div
            key={optionIndex}
            className="option"
            style={{
              opacity: optionIndex <= level ? 1 : 0,
              pointerEvents: optionIndex === level ? "inherit" : "none",
              transition: "500ms",
            }}
          >
            {option.words.map((option, index) => (
              <div
                key={index}
                className="circle"
                correctid={option.correctID}
                onMouseDown={handleMove}
                allowed={option.allowed}
                style={{
                  opacity:
                    optionIndex !== level && option.correctID === undefined
                      ? "0"
                      : "1",
                }}
              >
                {option.word}
              </div>
            ))}
          </div>
        ))}
        <div className="drop-zone">
          <img src={DropZone} ref={dropRef} alt="" />
        </div>
        <div className="clone-circle"></div>
      </div>
      <Indicator active={indicator.active} wrong={indicator.wrong} />
    </>
  );
};

export default Part2Game5;
