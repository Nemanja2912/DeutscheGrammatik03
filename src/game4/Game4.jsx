import React, { useRef, useState, useEffect } from "react";

import "../css/game4.css";
import GuessWordImproved from "../UI/GuessWordImproved";
import Keyboard2 from "../UI/Keyboard2";
import GuessWordBottomTable from "./GuessWordBottomTable";
import GuessWordBottomTable2 from "./GuessWordBottomTable2";
import ImageDropZone from "./ImageDropZone";

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
    guessImperativ: ["hilf", "helft", "helfen sie"],
    finished2: [
      <p className="drag-element">Hilf</p>,
      <p className="drag-element">Helft</p>,
      <p className="drag-element">Hilfen Sie</p>,
    ],
  },
  {
    text: "kommen",
    guess: ["kommst", "kommt", "kommen"],
    finished: [
      <p className="done">kommst</p>,
      <p className="done">kommt</p>,
      <p className="done">kommen</p>,
    ],
    guessImperativ: ["komm", "kommt", "kommen sie"],
    finished2: [
      <p className="drag-element">Komm</p>,
      <p className="drag-element">Kommt</p>,
      <p className="drag-element">Kommen Sie</p>,
    ],
  },
  {
    text: "bringen",
    guess: ["bringst", "bringt", "bringen"],
    finished: [
      <p className="done">bringst</p>,
      <p className="done">bringt</p>,
      <p className="done">bringen</p>,
    ],
    guessImperativ: ["bring", "bringt", "bringen sie"],
    finished2: [
      <p className="drag-element">Bring</p>,
      <p className="drag-element">Bringst</p>,
      <p className="drag-element">Bringen Sie</p>,
    ],
  },
  {
    text: "nehmen",
    guess: ["nimmst", "nehmt", "nehmen"],
    finished: [
      <p className="done">
        n<span>imm</span>st
      </p>,
      <p className="done">nehmt</p>,
      <p className="done">nehmen</p>,
    ],
    guessImperativ: ["nimm", "nehmt", "nehmen sie"],
    finished2: [
      <p className="drag-element">Nimm</p>,
      <p className="drag-element">Nehmt</p>,
      <p className="drag-element">Nehmen Sie</p>,
    ],
  },
  {
    text: "fahren",
    guess: ["fährst", "fahrt", "fahren"],
    finished: [
      <p className="done">
        f<span>ä</span>hrst
      </p>,
      <p className="done">fahrt</p>,
      <p className="done">fahren</p>,
    ],
    guessImperativ: ["fahr", "fahrt", "fahren sie"],
    finished2: [
      <p className="drag-element">Fahr</p>,
      <p className="drag-element">Fahrt</p>,
      <p className="drag-element">Fahren Sie</p>,
    ],
  },
];

const guessBox = ["du", "ihr", "Sie"];

const Game4 = () => {
  const [activeButton, setActiveButton] = useState(0);

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

  return (
    <div className="game4">
      <div className="table">
        <div className="top">
          <div className="label">
            <p>
              Infinitiv <br /> auswählen
            </p>
          </div>
          {obj.map((btn, index) => (
            <div
              className={`table-button ${activeButton === index && "active"}`}
              onClick={() => setActiveButton(index)}
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
                    labelText={""}
                    setFinished={(stateIndex) => {
                      setFinished2((prev) => {
                        prev[index][stateIndex] = true;

                        return [...prev];
                      });
                    }}
                    finishedElement={item.finished2}
                  />
                )}
                <ImageDropZone />
              </>
            )}
          </>
        ))}
      </div>

      <Keyboard2 />
    </div>
  );
};

export default Game4;
