import React, { useState, useEffect, useRef } from "react";
import "../css/game5.css";
import DropZone from "../assets/img/SVG/subtract.svg";
import Arrow from "../assets/img/SVG/arrow.svg";
import Indicator from "../UI/Indicator";
import Part2Game5 from "./Part2Game5";
import StatusBar from "../UI/StatusBar";

const lineList = [
  {
    top: 566,
    words: ["Man", "die Regel", "vifleißigel"],
    diagonalID: 0,
  },
  {
    top: 487.5,
    words: ["In Sätzen", "ich", "die Satz- klammer"],
    diagonalID: 2,
  },
  {
    top: 408.5,
    words: ["In Sätzen", "hier", "blaue Jetons"],
    diagonalID: 1,
  },
  {
    top: 330,
    words: ["Ich", "in der Übung", "viel"],
    diagonalID: 2,
  },
  {
    top: 251.5,
    words: ["Ich", "im Unter- richt", "Gram- matik"],
    diagonalID: 0,
  },
];

const leftPos = [358.5, 515.5, 594.5];

const verbPos = [436.5, 673];

const optionList = [
  [
    { word: "hat", correctID: 0 },
    { word: "gelernt", correctID: 1, diagonal: true },
  ],
  [
    { word: "finden", correctID: 1 },
    { word: "kann", correctID: 0, diagonal: true },
    { word: "klickt" },
    { word: "an" },
  ],
  [
    { word: "möchte" },
    { word: "klickt", correctID: 0 },
    { word: "erfahren" },
    { word: "üben" },
    { word: "habe" },
    { word: "an", correctID: 1 },
  ],
  [
    { word: "möchte" },
    { word: "erfahren", correctID: 1 },
    { word: "üben" },
    { word: "habe", correctID: 0, diagonal: true },
  ],
  [
    { word: "möchte", correctID: 0 },
    { word: "üben", correctID: 1, diagonal: true },
  ],
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

for (let i = 0; i < optionList.length; i++) {
  shuffleArray(optionList[i]);
}

const Game5 = () => {
  const [level, setLevel] = useState(0);
  const dropRef = useRef(null);
  const arrowRefs = [useRef(null), useRef(null)];
  const [indicator, setIndicator] = useState({
    active: false,
    wrong: false,
  });
  const [verbOnPosition, setVerbOnPosition] = useState(0);
  const [preventMove, setPreventMove] = useState(false);

  const positionCircles = (level) => {
    const options = Array.from(
      document.querySelectorAll(".option")[level].children
    );

    if (options.length === 0) return;

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
        35 +
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
    if (level === 0) animateCircleShow(level);
  }, []);

  useEffect(() => {
    if (level === 5) {
      dropRef.current.style.top = "-100px";
      setInfoText("Finde zwei neue Sätze. Tipp: Lies diagonal.");
      setInfoOverlay(true);

      let cloneList = Array.from(
        document.querySelectorAll(".clone-circle")[0].children
      );

      for (let i = 0; i < cloneList.length; i++) {
        cloneList[i].style.transition = "1000ms linear";
        cloneList[i].style.top =
          parseFloat(cloneList[i].style.top) - 100 + "px";
      }

      for (let j = 0; j < optionList.length; j++) {
        const options = Array.from(
          document.querySelectorAll(".option")[j].children
        );

        for (let i = 0; i < options.length; i++) {
          options[i].style.transition = "1000ms linear";

          options[i].style.top = parseFloat(options[i].style.top) - 100 + "px";
        }
      }
    }
  }, [level]);

  const moveToDropPosition = (element, arrowID) => {
    if (verbOnPosition === 1) setPreventMove(true);

    let cloneElement = element.cloneNode(true);
    cloneElement.style.left = element.getBoundingClientRect().left + "px";
    cloneElement.style.top = element.getBoundingClientRect().top + "px";
    cloneElement.style.zIndex = -1;

    element.remove();

    positionCircles(level);

    document.querySelector(".clone-circle").appendChild(cloneElement);

    setTimeout(() => {
      cloneElement.style.transition = "200ms";
      cloneElement.style.zIndex = "-1";
      cloneElement.style.left = verbPos[arrowID] + "px";
    }, 100);

    setIndicator({ active: true, wrong: false });

    setTimeout(() => {
      cloneElement.style.transition = "1000ms";
      cloneElement.style.top = lineList[level].top + "px";

      let currentVerbOnPosition;
      setVerbOnPosition((prev) => {
        currentVerbOnPosition = prev + 1;
        return prev + 1;
      });

      if (currentVerbOnPosition === 2) {
        setTimeout(() => {
          setVerbOnPosition(0);

          setTimeout(() => {
            if (level === 4) {
              setTimeout(() => {
                setLevel(5);
              }, 1000);
            }

            if (level + 1 === 1) {
              setLevel((prev) => prev + 1);
              animateCircleShow(level + 1);
            } else {
              if (level + 1 < 5) {
                const options = Array.from(
                  document.querySelectorAll(".option")[level].children
                );

                for (let i = 0; i < options.length; i++) {
                  options[i].style.transition = "200ms";

                  options[i].style.left =
                    dropRef.current.getBoundingClientRect().left +
                    dropRef.current.getBoundingClientRect().width / 2 -
                    35 +
                    "px";
                }

                setTimeout(() => {
                  setLevel((prev) => prev + 1);
                  animateCircleShow(level + 1);
                }, 100);
              }
            }
            setPreventMove(false);

            setTimeout(() => {
              setPreventHelp(false);
            }, 1000);
          }, 100);
        }, 100);
      }
    }, 500);
  };

  const handleMove = (initEvent) => {
    if (preventMove) return;

    initEvent.target.style.zIndex = "1000";

    let initTop = initEvent.target.getBoundingClientRect().top;

    const moveElement = (moveEvent) => {
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

    document.addEventListener("mousemove", moveElement);

    const stopMoveElement = (endEvent) => {
      document.removeEventListener("mousemove", moveElement);
      document.removeEventListener("mouseup", stopMoveElement);

      let arrowID = initEvent.target.getAttribute("correctid");

      if (
        arrowID !== null &&
        endEvent.clientX >
          arrowRefs[arrowID].current.getBoundingClientRect().left &&
        endEvent.clientX <
          arrowRefs[arrowID].current.getBoundingClientRect().right &&
        endEvent.clientY >=
          arrowRefs[arrowID].current.getBoundingClientRect().top
      ) {
        setPreventHelp(true);

        moveToDropPosition(initEvent.target, arrowID);
      } else {
        initEvent.target.style.transition = "200ms";
        initEvent.target.style.top = "0px";

        positionCircles(level);

        setIndicator({ active: true, wrong: true });

        setTimeout(() => {
          initEvent.target.style.transition = "0ms";
        }, 200);
      }

      setTimeout(() => {
        setIndicator({ active: false, wrong: false });
      }, 1000);
    };

    document.addEventListener("mouseup", stopMoveElement);
  };

  const [diagonalSolution, setDiagonalSolution] = useState(false);

  const showDiagonalSolution = () => {
    setDiagonalSolution(true);

    let diagonalCircle = Array.from(document.querySelectorAll(".diagonal"));

    console.log(diagonalCircle);

    for (let i = 0; i < diagonalCircle.length; i++) {
      diagonalCircle[i].style.backgroundColor = "#EB6400";
    }
  };

  const [part2, setPart2] = useState(false);
  const [infoText, setInfoText] = useState(
    <p>
      Bilde Sätze. Leg die Jetons mit Satzklammer an die <br /> richtige
      Position.
    </p>
  );
  const [infoOverlay, setInfoOverlay] = useState(true);
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [helpFingerPosition, setHelpFingerPosition] = useState([]);
  const [preventHelp, setPreventHelp] = useState(false);

  useEffect(() => {
    if (part2) return;

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
      let element;
      let arrowID;

      for (let i = 0; i < optionList[level].children.length; i++) {
        arrowID = optionList[level].children[i]?.getAttribute("correctid");

        if (arrowID !== null) {
          element = optionList[level].children[i];
          break;
        }
      }

      arrowID = +arrowID;

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

      setTimeout(() => {
        setHelpFingerPosition([
          arrowRefs[arrowID].current.getBoundingClientRect().left +
            arrowRefs[arrowID].current.getBoundingClientRect().width / 2,
          arrowRefs[arrowID].current.getBoundingClientRect().top +
            arrowRefs[arrowID].current.getBoundingClientRect().height / 2,
        ]);

        element.style.left = verbPos[arrowID] + "px";
        element.style.top =
          arrowRefs[arrowID].current.getBoundingClientRect().top -
          arrowRefs[arrowID].current.getBoundingClientRect().height / 2 -
          initTop +
          "px";

        setIndicator({ active: true, wrong: false });

        setTimeout(() => {
          moveToDropPosition(element, arrowID);

          setIndicator({ active: false, wrong: false });

          setTimeout(() => {
            setHelpFingerPosition("init");
            setHelpFingerPosition(false);
            setPreventHelp(false);
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
      {!part2 && (
        <div
          className="game5"
          style={{
            transition: "500ms",
            opacity: level === 6 ? 0 : 1,
          }}
        >
          {optionList.map((option, optionIndex) => (
            <div
              className="option"
              style={{
                opacity: optionIndex <= level ? 1 : 0,
                pointerEvents: optionIndex === level ? "inherit" : "none",
                transition: optionIndex < 2 ? "500ms" : "0ms",
              }}
            >
              {option.map((option) => (
                <div
                  className={`circle ${option.diagonal ? "diagonal" : ""}`}
                  correctid={option.correctID}
                  onMouseDown={handleMove}
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
          {
            <div
              className="arrows"
              style={{ visibility: level < 5 ? "" : "hidden" }}
            >
              <img src={Arrow} ref={arrowRefs[0]} alt="" />
              <img src={Arrow} ref={arrowRefs[1]} alt="" />
            </div>
          }
          <div className="clone-circle"></div>
          <div className="circles">
            {lineList.map((line, lineIndex) => (
              <div className="line">
                {line.words.map((word, wordIndex) => (
                  <div
                    className="circle"
                    style={{
                      top:
                        level >= 5
                          ? line.top - 100
                          : lineIndex <= level
                          ? line.top
                          : 160,
                      left: leftPos[wordIndex],
                      opacity: lineIndex <= level ? 1 : 0,
                      transitionDuration: level >= 5 ? "1000ms" : "500ms",
                      backgroundColor:
                        diagonalSolution && wordIndex === line.diagonalID
                          ? "#EB6400"
                          : "#788287",
                    }}
                  >
                    {word}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="drop-zone">
            <img src={DropZone} ref={dropRef} alt="" />
          </div>

          {level >= 5 && !diagonalSolution && !part2 && (
            <div className="button" onClick={showDiagonalSolution}>
              Lösung zeigen
            </div>
          )}
          {diagonalSolution && (
            <div
              className="button"
              onClick={() => {
                setLevel(6);
                setTimeout(() => {
                  setPart2(true);
                  setInfoText(
                    <p>
                      Bilde Sätze. Leg die Jetons an die richtigen Positionen.
                    </p>
                  );
                  setInfoOverlay(true);
                }, 500);
              }}
            >
              Weiter Üben
            </div>
          )}
        </div>
      )}
      <div className="game5">
        {part2 && (
          <Part2Game5
            helpOverlay={helpOverlay}
            setHelpFingerPosition={setHelpFingerPosition}
          />
        )}
      </div>
      <Indicator active={indicator.active} wrong={indicator.wrong} />
      <StatusBar
        infoText={infoText}
        infoOverlay={infoOverlay}
        setInfoOverlay={setInfoOverlay}
        setHelpOverlay={setHelpOverlay}
        helpFingerPosition={helpFingerPosition}
      />
    </>
  );
};

export default Game5;
