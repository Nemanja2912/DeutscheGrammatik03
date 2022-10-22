import React, { useState, useEffect, useRef } from "react";
import StatusBar from "../UI/StatusBar";
import Line from "./Line";

const sentences = [
  {
    sentence: "Probier mal dieses Kleid an!",
    secondIndex: 4,
  },
  {
    sentence: "Fahr geradeaus!",
    secondIndex: 1,
  },
  {
    sentence: "Steigt lieber schon ein!",
    secondIndex: 3,
  },
  {
    sentence: "Helft mir bitte!",
    secondIndex: false,
  },
  {
    sentence: "Geben Sie mir bitte eine Tüte!",
    secondIndex: 1,
  },
  {
    sentence: "Erzählen Sie!",
    secondIndex: 1,
  },
];

const Sentence = ({ nextLesson }) => {
  const [completed, setCompleted] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isDone, setIsDone] = useState(false);

  const [infoText, setInfoText] = useState(
    "Zieh die Verbformen aus den Sätzen."
  );
  const [infoOverlay, setInfoOverlay] = useState(true);
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [helpFingerPosition, setHelpFingerPosition] = useState("init");
  const [preventHelp, setPreventHelp] = useState(false);

  const [startHelpMove, setStartHelpMove] = useState(-1);

  const sentencePartRef = useRef(null);

  const [endButton, setEndButton] = useState(false);

  useEffect(() => {
    let finished = true;

    for (let i = 0; i < completed.length; i++) {
      if (!completed[i]) {
        finished = false;
        break;
      }
    }

    if (finished) {
      setIsDone(true);

      setTimeout(() => {
        setEndButton(true);
      }, 1000);

      setPreventHelp(true);
    }
  }, [completed]);

  const handleCompleted = (index) => {
    setCompleted((prev) => {
      prev[index] = true;

      return [...prev];
    });
  };

  useEffect(() => {
    if (!helpOverlay) return;

    let index;

    for (let i = 0; i < completed.length; i++) {
      if (!completed[i]) {
        index = i;
        break;
      }
    }

    setHelpFingerPosition([
      sentencePartRef.current.children[
        index
      ].children[0].children[1].children[0].getBoundingClientRect().left +
        sentencePartRef.current.children[
          index
        ].children[0].children[1].children[0].getBoundingClientRect().width /
          2,
      sentencePartRef.current.children[
        index
      ].children[0].children[1].children[0].getBoundingClientRect().top +
        sentencePartRef.current.children[
          index
        ].children[0].children[1].children[0].getBoundingClientRect().height /
          2,
    ]);

    setTimeout(() => {
      setStartHelpMove(index);
      setHelpFingerPosition([
        sentencePartRef.current.children[
          index
        ].children[0].children[0].getBoundingClientRect().left +
          sentencePartRef.current.children[
            index
          ].children[0].children[0].getBoundingClientRect().width /
            2,
        sentencePartRef.current.children[
          index
        ].children[0].children[0].getBoundingClientRect().top +
          sentencePartRef.current.children[
            index
          ].children[0].children[0].getBoundingClientRect().height /
            2,
      ]);

      setTimeout(() => {
        setHelpFingerPosition("init");
      }, 1250);
    }, 1250);
  }, [helpOverlay]);

  return (
    <>
      <div className="sentence-part" ref={sentencePartRef}>
        {sentences.map((item, index) => (
          <div className={`line-wrapper ${isDone && "completed-line"}`}>
            <Line
              onCompleted={() => handleCompleted(index)}
              sentence={item.sentence.split(" ")}
              secondIndex={item.secondIndex}
              startHelp={index === startHelpMove}
            />
          </div>
        ))}

        <div
          className="static-screen"
          style={{
            opacity: isDone ? 1 : 0,
          }}
        >
          <div className="box box1">
            <p className="bracket bracket1">&#125;</p>
            <div className="green">
              <p>
                Imperativ{" "}
                <span>
                  <b>du</b>-Form
                </span>
              </p>
            </div>
          </div>
          <div className="box box2">
            <p className="bracket bracket2">&#125;</p>
            <div className="green">
              <p>
                Imperativ{" "}
                <span>
                  <b>ihr</b>-Form
                </span>
              </p>
            </div>
          </div>
          <div className="box box3">
            <p className="bracket bracket3">&#125;</p>
            <div className="green">
              <p>
                Imperativ{" "}
                <span>
                  <b>Sie</b>-Form
                </span>
              </p>
            </div>
          </div>
        </div>

        {endButton && (
          <div className="button-submit end-button" onClick={nextLesson}>
            WEITER
          </div>
        )}
      </div>

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

export default Sentence;
