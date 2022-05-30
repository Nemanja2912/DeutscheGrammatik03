import React, { useRef, useState, useEffect, createRef } from "react";

import "../css/game4.css";
import GuessWordImproved from "../UI/GuessWordImproved";
import Keyboard2 from "../UI/Keyboard2";
import GuessWordBottomTable from "./GuessWordBottomTable";
import GuessWordBottomTable2 from "./GuessWordBottomTable2";
import ImageDropZone from "./ImageDropZone";

import Image1 from "../assets/img/U_helfen.jpg";
import Image2 from "../assets/img/U_kommen.jpg";
import Image3 from "../assets/img/U_bringen.jpg";
import Image4 from "../assets/img/U_nehmen.jpg";
import Image5 from "../assets/img/U_fahren.jpg";
import StatusBar from "./../UI/StatusBar";

const obj = [
  {
    text: "helfen",
    guess: ["hilfst", "helft", "helfen"],
    finished: [
      <p className="done">
        <span className="bold">h</span>
        <span className="bold light">i</span>
        <span className="bold">lfst</span>
      </p>,
      <p className="done">helft</p>,
      <p className="done">helfen</p>,
    ],
    guessImperativ: ["Hilf", "Helft", "Helfen Sie"],
    finished2: [<p>Hilf</p>, <p>Helft</p>, <p>Hilfen Sie</p>],
  },
  {
    text: "kommen",
    guess: ["kommst", "kommt", "kommen"],
    finished: [
      <p className="done">kommst</p>,
      <p className="done">kommt</p>,
      <p className="done">kommen</p>,
    ],
    guessImperativ: ["Komm", "Kommt", "Kommen Sie"],
    finished2: [<p>Komm</p>, <p>Kommt</p>, <p>Kommen Sie</p>],
  },
  {
    text: "bringen",
    guess: ["bringst", "bringt", "bringen"],
    finished: [
      <p className="done">bringst</p>,
      <p className="done">bringt</p>,
      <p className="done">bringen</p>,
    ],
    guessImperativ: ["Bring", "Bringt", "Bringen Sie"],
    finished2: [<p>Bring</p>, <p>Bringt</p>, <p>Bringen Sie</p>],
  },
  {
    text: "nehmen",
    guess: ["nimmst", "nehmt", "nehmen"],
    finished: [
      <p className="done">
        <span className="bold">n</span>
        <span className="bold light">imm</span>
        <span className="bold">st</span>
      </p>,
      <p className="done">nehmt</p>,
      <p className="done">nehmen</p>,
    ],
    guessImperativ: ["Nimm", "Nehmt", "Nehmen Sie"],
    finished2: [<p>Nimm</p>, <p>Nehmt</p>, <p>Nehmen Sie</p>],
  },
  {
    text: "fahren",
    guess: ["fährst", "fahrt", "fahren"],
    finished: [
      <p className="done">
        <span className="bold">f</span>
        <span className="bold light">ä</span>
        <span className="bold">hrst</span>
      </p>,
      <p className="done">fahrt</p>,
      <p className="done">fahren</p>,
    ],
    guessImperativ: ["Fahr", "Fahrt", "Fahren Sie"],
    finished2: [<p>Fahr</p>, <p>Fahrt</p>, <p>Fahren Sie</p>],
  },
];

const imageObj = [
  {
    img: Image1,
    description: "mir bitte in der Küche!",
    answerIndex: 0,
    answerText: "Hilf",
  },
  {
    img: Image2,
    description: "zu Besuch!",
    answerIndex: 2,
    answerText: "Kommen Sie",
  },
  {
    img: Image3,
    description: "bitte noch Gläser!",
    answerIndex: 1,
    answerText: "Bringt",
  },
  {
    img: Image4,
    description: "eine Dose!",
    answerIndex: 0,
    answerText: "Nimm",
  },
  {
    img: Image5,
    description: "zuerst nach links!",
    answerIndex: 2,
    answerText: "Fahren Sie",
  },
];

const guessBox = ["du", "ihr", "Sie"];

const originalInfo = (
  <>
    Arbeite mit der Tabelle: Schreib die Präsens- und <br /> Imperativformen.
    Zieh dann den passenden Imperativ <br /> in den Satz.
  </>
);

const Game4 = ({ nextLesson }) => {
  const [activeButton, setActiveButton] = useState(-1);

  const [endButton, setEndButton] = useState(false);

  const [help, setHelp] = useState([false, false, false, false, false]);

  const [help2, setHelp2] = useState([false, false, false, false, false]);

  const [finished, setFinished] = useState([
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);

  const [finished2, setFinished2] = useState([
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ]);

  const [finishedLine, setFinishedLine] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [finishedLine2, setFinishedLine2] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [keyboardDisable, setKeyboardDisable] = useState(true);

  const [imageDone, setImageDone] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [blankWidth, setBlankWidth] = useState([150, 150, 150, 150, 150]);
  const [firstTime, setFirstTime] = useState([true, true, true, true, true]);

  const dropRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const moveRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const buttonRefs = obj.map((item) => createRef(null));

  const [infoText, setInfoText] = useState(originalInfo);
  const [infoOverlay, setInfoOverlay] = useState(true);
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [helpFingerPosition, setHelpFingerPosition] = useState("init");
  const [preventHelp, setPreventHelp] = useState(false);

  const [firstDropImage, setFristDropImage] = useState(true);

  useEffect(() => {
    for (let i = 0; i < finishedLine.length; i++) {
      let isDone = true;

      for (let j = 0; j < finished[i].length; j++) {
        if (!finished[i][j]) {
          isDone = false;
          break;
        }
      }

      if (isDone) {
        setFinishedLine((prev) => {
          prev[i] = true;

          return [...prev];
        });
      }
    }
  }, [finished]);

  useEffect(() => {
    for (let i = 0; i < finishedLine2.length; i++) {
      let isDone = true;

      for (let j = 0; j < finished2[i].length; j++) {
        if (!finished2[i][j]) {
          isDone = false;
          break;
        }
      }

      if (isDone) {
        setFinishedLine2((prev) => {
          prev[i] = true;

          return [...prev];
        });
      }
    }
  }, [finished2]);

  useEffect(() => {
    if (activeButton === -1) return;

    let isDone = true;

    for (let j = 0; j < finished2[activeButton].length; j++) {
      if (!finished2[activeButton][j]) {
        isDone = false;
        break;
      }
    }

    if (isDone) {
      setKeyboardDisable(true);
    } else {
      setKeyboardDisable(false);
    }
  }, [activeButton, finished2]);

  useEffect(() => {
    if (!helpOverlay) return;

    if (activeButton === -1) {
      const button = buttonRefs[0].current;
      setHelpFingerPosition([
        button.getBoundingClientRect().left +
          button.getBoundingClientRect().width / 2,
        button.getBoundingClientRect().top +
          button.getBoundingClientRect().height / 2,
      ]);

      setTimeout(() => {
        button.click();
        setHelpFingerPosition("init");
      }, 1250);
    } else if (!finishedLine[activeButton]) {
      setHelp((prev) => {
        prev[activeButton] = true;

        return [...prev];
      });

      setTimeout(() => {
        setHelp((prev) => {
          prev[activeButton] = false;

          return [...prev];
        });
      }, 0);
    } else if (!finishedLine2[activeButton]) {
      setHelp2((prev) => {
        prev[activeButton] = true;

        return [...prev];
      });

      setTimeout(() => {
        setHelp2((prev) => {
          prev[activeButton] = false;

          return [...prev];
        });
      }, 0);
    } else if (!imageDone[activeButton]) {
      setHelpFingerPosition([
        moveRefs[activeButton].current.getBoundingClientRect().left +
          moveRefs[activeButton].current.getBoundingClientRect().width / 2,
        moveRefs[activeButton].current.getBoundingClientRect().top +
          moveRefs[activeButton].current.getBoundingClientRect().height / 2,
      ]);

      setTimeout(() => {
        setHelpFingerPosition([
          dropRefs[activeButton].current.getBoundingClientRect().left +
            dropRefs[activeButton].current.getBoundingClientRect().width / 2,
          dropRefs[activeButton].current.getBoundingClientRect().top +
            dropRefs[activeButton].current.getBoundingClientRect().height / 2,
        ]);

        const element = moveRefs[activeButton].current;
        element.style.transition = "1s linear";
        element.style.zIndex = "10000";

        const initX = element.getBoundingClientRect().left;
        const initY = element.getBoundingClientRect().top;

        element.style.zIndex = 10;

        element.style.left =
          dropRefs[activeButton].current.getBoundingClientRect().left +
          dropRefs[activeButton].current.getBoundingClientRect().width / 2 -
          moveRefs[activeButton].current.getBoundingClientRect().width / 2 -
          initX +
          "px";
        element.style.top =
          dropRefs[activeButton].current.getBoundingClientRect().top +
          dropRefs[activeButton].current.getBoundingClientRect().height / 2 -
          moveRefs[activeButton].current.getBoundingClientRect().height / 2 -
          initY +
          "px";

        setTimeout(() => {
          setHelpFingerPosition("init");
          element.style.transition = "0s linear";

          setImageDone((prev) => {
            prev[activeButton] = true;

            return [...prev];
          });

          setTimeout(() => {
            setBlankWidth((prev) => {
              prev[activeButton] =
                dropRefs[
                  activeButton
                ].current.children[0].getBoundingClientRect().width;

              return [...prev];
            });
          }, 0);
        }, 1250);
      }, 1250);
    } else if (imageDone[activeButton]) {
      let index;

      for (let i = 0; i < imageDone.length; i++) {
        if (!imageDone[i]) {
          index = i;
          break;
        }
      }
      const button = buttonRefs[index].current;
      setHelpFingerPosition([
        button.getBoundingClientRect().left +
          button.getBoundingClientRect().width / 2,
        button.getBoundingClientRect().top +
          button.getBoundingClientRect().height / 2,
      ]);

      setTimeout(() => {
        button.click();
        setHelpFingerPosition("init");
      }, 1250);
    }
  }, [helpOverlay]);

  useEffect(() => {
    if (finishedLine2[activeButton]) {
      setHelpFingerPosition("init");
    } else if (activeButton !== -1) {
      setTimeout(() => {
        setHelpFingerPosition("disable");
      }, 0);
    }

    if (finishedLine2[activeButton]) {
      setInfoText(<>Zieh den passenden Imperativ in den Satz.</>);
    } else {
      setInfoText(originalInfo);
    }
  }, [activeButton, finishedLine2]);

  useEffect(() => {
    if (firstDropImage && finishedLine2[activeButton]) {
      setInfoOverlay(true);
      setFristDropImage(false);
    }
  }, [finishedLine2]);

  useEffect(() => {
    let isDone = true;

    for (let i = 0; i < imageDone.length; i++) {
      if (!imageDone[i]) {
        isDone = false;
        break;
      }
    }

    if (isDone) {
      setEndButton(true);
      setPreventHelp(true);
    }
  }, [imageDone]);

  return (
    <>
      <div className="game4">
        <div className="table">
          <div className="top">
            <div
              className="label"
              style={{
                backgroundColor: activeButton === -1 ? "#5ac8f5" : "#9aa1a5",
              }}
            >
              <p>
                Infinitiv <br /> auswählen
              </p>
            </div>
            {obj.map((btn, index) => (
              <div
                className={`table-button ${
                  activeButton === index && "active"
                } ${imageDone[index] && "table-button-done"}`}
                onClick={() => setActiveButton(index)}
                ref={buttonRefs[index]}
              >
                <p>{btn.text}</p>
              </div>
            ))}
          </div>
          {obj.map((item, index) => (
            <>
              {activeButton === index && (
                <>
                  <GuessWordBottomTable
                    guessBox={guessBox}
                    obj={obj}
                    activeButton={activeButton}
                    finished={finished[index]}
                    labelActive={!finishedLine[index]}
                    help={help[index]}
                    setFinished={(stateIndex) => {
                      setFinished((prev) => {
                        prev[index][stateIndex] = true;

                        return [...prev];
                      });
                    }}
                    finishedElement={item.finished}
                  />
                  {finishedLine[index] && (
                    <GuessWordBottomTable2
                      guessBox={guessBox}
                      obj={obj}
                      singleFinished={finished2[index]}
                      activeButton={activeButton}
                      finished={finishedLine2[index]}
                      help={help2[index]}
                      labelActive={!finishedLine2[index]}
                      labelText={""}
                      dropRef={dropRefs[index]}
                      answerIndex={imageObj[index].answerIndex}
                      moveRefs={moveRefs[index]}
                      setImageDone={() =>
                        setImageDone((prev) => {
                          prev[index] = true;

                          return [...prev];
                        })
                      }
                      imageDone={imageDone[index]}
                      setFinished={(stateIndex) => {
                        setFinished2((prev) => {
                          prev[index][stateIndex] = true;

                          return [...prev];
                        });
                      }}
                      finishedElement={item.finished2}
                      setBlankWidth={(width) =>
                        setBlankWidth((prev) => {
                          prev[index] = width;

                          return [...prev];
                        })
                      }
                    />
                  )}
                  {
                    <ImageDropZone
                      display={finishedLine2[index]}
                      imageObj={imageObj[index]}
                      dropRef={dropRefs[index]}
                      imageDone={imageDone[index]}
                      blankWidth={blankWidth[index]}
                      firstTime={firstTime[index]}
                      setFirstTime={(status) =>
                        setFirstTime((prev) => {
                          prev[index] = status;

                          return [...prev];
                        })
                      }
                    />
                  }
                </>
              )}
            </>
          ))}
        </div>

        <Keyboard2 disable={keyboardDisable} />
      </div>

      {endButton && (
        <div
          style={{ marginTop: 0 }}
          className="done-button"
          onClick={nextLesson}
        >
          WEITER
        </div>
      )}

      <StatusBar
        infoText={infoText}
        infoOverlay={infoOverlay}
        setInfoOverlay={setInfoOverlay}
        setHelpOverlay={setHelpOverlay}
        preventHelp={preventHelp}
        helpFingerPosition={helpFingerPosition}
      />
    </>
  );
};

export default Game4;
