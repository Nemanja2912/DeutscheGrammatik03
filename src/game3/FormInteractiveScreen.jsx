import React, { useRef, useState, useEffect } from "react";
import ErasePart from "./ErasePart";
import FormPart from "./FormPart";
import StatusBar from "./../UI/StatusBar";

const eraseObj = [
  [
    [
      { letter: "d", opacity: true },
      { letter: "u", opacity: true },
      { letter: ".", blank: true, opacity: true },
      { letter: "s", opacity: false },
      { letter: "t", opacity: false },
      { letter: "e", opacity: false },
      { letter: "i", opacity: false },
      { letter: "g", opacity: false },
      { letter: "s", opacity: true },
      { letter: "t", opacity: true },
      { letter: ".", blank: true, opacity: false },
      { letter: "e", opacity: false },
      { letter: "i", opacity: false },
      { letter: "n", opacity: false },
    ],
    [
      { letter: "i", opacity: true },
      { letter: "h", opacity: true },
      { letter: "r", opacity: true },
      { letter: ".", blank: true, opacity: true },
      { letter: "s", opacity: false },
      { letter: "t", opacity: false },
      { letter: "e", opacity: false },
      { letter: "i", opacity: false },
      { letter: "g", opacity: false },
      { letter: "t", opacity: false },
      { letter: ".", blank: true, opacity: false },
      { letter: "e", opacity: false },
      { letter: "i", opacity: false },
      { letter: "n", opacity: false },
    ],
  ],
  [
    [
      { letter: "d", opacity: true },
      { letter: "u", opacity: true },
      { letter: ".", blank: true, opacity: true },
      { letter: "f", opacity: false },
      { letter: "ä", opacity: false, newLetter: "a" },
      { letter: "h", opacity: false },
      { letter: "r", opacity: false },
      { letter: "s", opacity: true },
      { letter: "t", opacity: true },
    ],
    [
      { letter: "i", opacity: true },
      { letter: "h", opacity: true },
      { letter: "r", opacity: true },
      { letter: ".", blank: true, opacity: true },
      { letter: "f", opacity: false },
      { letter: "a", opacity: false },
      { letter: "h", opacity: false },
      { letter: "r", opacity: false },
      { letter: "t", opacity: false },
    ],
  ],
  [
    [
      { letter: "d", opacity: true },
      { letter: "u", opacity: true },
      { letter: ".", blank: true, opacity: true },
      { letter: "e", opacity: false },
      { letter: "r", opacity: false },
      { letter: "z", opacity: false },
      { letter: "ä", opacity: false },
      { letter: "h", opacity: false },
      { letter: "l", opacity: false },
      { letter: "s", opacity: true },
      { letter: "t", opacity: true },
    ],
    [
      { letter: "i", opacity: true },
      { letter: "h", opacity: true },
      { letter: "r", opacity: true },
      { letter: ".", blank: true, opacity: true },
      { letter: "e", opacity: false },
      { letter: "r", opacity: false },
      { letter: "z", opacity: false },
      { letter: "ä", opacity: false },
      { letter: "h", opacity: false },
      { letter: "l", opacity: false },
      { letter: "t", opacity: false },
    ],
  ],
];

const moveObj = [
  [
    { word: "Sie", move: true, position: 1 },
    { word: "steigen" },
    { word: "ein" },
  ],
  [{ word: "Sie", move: true, position: 1 }, { word: "fahren" }],
  [{ word: "Sie", move: true, position: 1 }, { word: "erzählen" }],
];

const text = [
  ["du steigst ein", "ihr steigt ein", "Sie steigen ein"],
  ["du fährst", "ihr fahrt", "Sie fahren"],
  ["du erzählst", "ihr erzählt", "Sie erzählen"],
];

const FormInteractiveScreen = ({ display, nextLevel }) => {
  const [step, setStep] = useState(0);

  const [customHelp, setCustomHelp] = useState(false);

  const [infoText, setInfoText] = useState(<>Zieh die Wörter in die Lücken.</>);
  const [infoOverlay, setInfoOverlay] = useState(false);
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [helpFingerPosition, setHelpFingerPosition] = useState("init");
  const [preventHelp, setPreventHelp] = useState(false);

  const [finishedForm, setFinishedForm] = useState([false, false, false]);
  const formBoxRefs = [useRef(null), useRef(null), useRef(null)];
  const formDropRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (display) {
      setInfoOverlay(true);
    }
  }, [display]);

  useEffect(() => {
    if (!helpOverlay) return;

    if (step === 0) {
      let index;

      for (let i = 0; i < finishedForm.length; i++) {
        if (!finishedForm[i]) {
          index = i;
          break;
        }
      }

      setHelpFingerPosition([
        formBoxRefs[index].current.getBoundingClientRect().left +
          formBoxRefs[index].current.getBoundingClientRect().width / 2,
        formBoxRefs[index].current.getBoundingClientRect().top +
          formBoxRefs[index].current.getBoundingClientRect().height / 2,
      ]);

      setTimeout(() => {
        setCustomHelp(true);

        setHelpFingerPosition([
          formDropRefs[index].current.getBoundingClientRect().left +
            formDropRefs[index].current.getBoundingClientRect().width / 2,
          formDropRefs[index].current.getBoundingClientRect().top +
            formDropRefs[index].current.getBoundingClientRect().height / 2,
        ]);

        setTimeout(() => {
          setHelpFingerPosition("init");

          setCustomHelp(false);
        }, 1250);
      }, 1250);
    }
  }, [helpOverlay]);

  return (
    <div
      className="form-interactive"
      style={{
        opacity: display ? 1 : 0,
        pointerEvents: display ? "initial" : "none",
        transition: display ? "0.5s linear" : "0s",
      }}
    >
      <FormPart
        setStep={setStep}
        finished={finishedForm}
        setFinished={setFinishedForm}
        formBoxRefs={formBoxRefs}
        dropRefs={formDropRefs}
        customHelp={step === 0 && customHelp}
      />

      {text.map((item, index) => (
        <div
          className="wrapper"
          style={{
            marginBottom: 33,
            marginTop: 2,
            pointerEvents: step >= index + 1 ? "initial" : "none",
          }}
        >
          <ErasePart
            eraseObj={eraseObj[index]}
            display={step >= index + 1}
            moveObj={moveObj[index]}
            text={text[index]}
            showStatus={step === index + 1}
            increaseStep={() => {
              setStep(index + 2);
            }}
          />
        </div>
      ))}

      {(step === 0 || step === 4) && (
        <StatusBar
          infoText={infoText}
          infoOverlay={infoOverlay}
          setInfoOverlay={setInfoOverlay}
          setHelpOverlay={setHelpOverlay}
          preventHelp={step === 4 ? true : preventHelp}
          helpFingerPosition={helpFingerPosition}
        />
      )}

      {step === 4 && (
        <div className="button" style={{ marginTop: -5 }} onClick={nextLevel}>
          WEITER
        </div>
      )}
    </div>
  );
};

export default FormInteractiveScreen;
