import React, { useRef, useState, useEffect, useMemo } from "react";
import DragElement from "../../UI/DragElement";

let options = [
  {
    word: "Partizip II",
    dropPosition: 1,
    customDropPos: 3,
  },
  {
    word: "Verbstamm",
    dropPosition: 0,
    customDropPos: 0,
  },
  {
    word: "2",
    dropPosition: 2,
    customDropPos: false,
  },
  {
    word: "Satzende",
    dropPosition: 3,
    customDropPos: false,
  },
  {
    word: "Infinitiv",
    dropPosition: 1,
    customDropPos: 4,
  },
  {
    word: "Vorsilbe",
    dropPosition: 1,
    customDropPos: 5,
  },
  {
    word: "Modalverb",
    dropPosition: 0,
    customDropPos: 1,
  },
  {
    word: "Hilfsverb",
    dropPosition: 0,
    customDropPos: 2,
  },
];

const Screen3 = ({ helpOverlay, setHelpFingerPosition }) => {
  const dropRefList = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [startMove, setStartMove] = useState([]);
  const [finished, setFinished] = useState(false);

  const blankGroup1Ref1 = useRef(null);
  const blankGroup1Ref2 = useRef(null);
  const blankGroup1Ref3 = useRef(null);
  const blankGroup2Ref1 = useRef(null);
  const blankGroup2Ref2 = useRef(null);
  const blankGroup2Ref3 = useRef(null);

  const [groupPos, setGroupPos] = useState([
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]);

  useEffect(() => {
    setTimeout(() => {
      setGroupPos([
        [
          blankGroup1Ref1.current.getBoundingClientRect().left,
          blankGroup1Ref1.current.getBoundingClientRect().top,
        ],
        [
          blankGroup1Ref2.current.getBoundingClientRect().left,
          blankGroup1Ref2.current.getBoundingClientRect().top,
        ],
        [
          blankGroup1Ref3.current.getBoundingClientRect().left,
          blankGroup1Ref3.current.getBoundingClientRect().top,
        ],
        [
          blankGroup2Ref1.current.getBoundingClientRect().left,
          blankGroup2Ref1.current.getBoundingClientRect().top,
        ],
        [
          blankGroup2Ref2.current.getBoundingClientRect().left,
          blankGroup2Ref2.current.getBoundingClientRect().top,
        ],
        [
          blankGroup2Ref3.current.getBoundingClientRect().left,
          blankGroup2Ref3.current.getBoundingClientRect().top,
        ],
      ]);
    }, 1000);
  }, []);

  //
  const [stateCollection, setStateCollection] = useState([]);
  const [isDone, setIsDone] = useState([]);

  useEffect(() => {
    if (!helpOverlay) return;

    let index = false;

    for (let i = 0; i < isDone.length; i++) {
      if (!isDone[i]) {
        index = i;
        break;
      }
    }

    if (index !== false) {
      setHelpFingerPosition([
        stateCollection[index].absoluteX + 50,
        stateCollection[index].absoluteY + 15,
      ]);

      setTimeout(() => {
        setStartMove((prev) => {
          const list = [...prev];
          list[index] = true;

          return list;
        });

        setHelpFingerPosition([
          stateCollection[index].dropPosX + 50,
          stateCollection[index].dropPosY + 15,
        ]);

        setTimeout(() => {
          setHelpFingerPosition("init");
          setHelpFingerPosition(false);
        }, 1250);
      }, 1250);
    }
  }, [helpOverlay]);

  useEffect(() => {
    let finished = true;

    if (isDone.length === 0) return;

    for (let i = 0; i < isDone.length; i++) {
      if (!isDone[i]) {
        finished = false;
        break;
      }
    }

    if (finished) {
      setHelpFingerPosition("init");

      setTimeout(() => {
        setFinished(true);
      }, 1000);
    }
  }, [isDone]);

  return (
    <div className="screen3" style={{ height: finished ? "225px" : "325px" }}>
      <div className="text">
        Der erste Teil der Satzklammer ({" "}
        <div className="wrapper" ref={dropRefList[0]}>
          <span className="blank" ref={blankGroup1Ref1}>
            .
          </span>
          ,{" "}
          <span className="blank" ref={blankGroup1Ref2}>
            .
          </span>{" "}
          oder{" "}
          <span className="blank" ref={blankGroup1Ref3}>
            .
          </span>
          <span> )</span>
        </div>
        steht immer an Position{" "}
        <span className="blank" ref={dropRefList[2]}>
          .
        </span>{" "}
        im Satz.
      </div>
      <div className="text">
        Der zweite Teil der Satzklammer ({" "}
        <div className="wrapper" ref={dropRefList[1]}>
          <span className="blank" ref={blankGroup2Ref1}>
            .
          </span>
          ,{" "}
          <span className="blank" ref={blankGroup2Ref2}>
            .
          </span>{" "}
          oder{" "}
          <span className="blank" ref={blankGroup2Ref3}>
            .
          </span>{" "}
        </div>
        steht immer am{" "}
        <span className="blank" ref={dropRefList[3]}>
          .
        </span>
        .
      </div>
      {useMemo(() => {
        return (
          <div className="options">
            {options.map((option, index) => (
              <DragElement
                customClass={"green"}
                dropRef={dropRefList[option.dropPosition]}
                moveToDrop={startMove[index]}
                customDropPosition={groupPos[option.customDropPos]}
                returnState={(state) => {
                  setStateCollection((prev) => {
                    let list = [...prev];
                    list[index] = state;

                    return list;
                  });

                  if (isDone[index] === state.isDone) return;

                  setIsDone((prev) => {
                    let list = [...prev];

                    list[index] = state.isDone;
                    return list;
                  });
                }}
              >
                <div className="option">{option.word}</div>
              </DragElement>
            ))}
          </div>
        );
      }, [groupPos, startMove])}
    </div>
  );
};

export default Screen3;
