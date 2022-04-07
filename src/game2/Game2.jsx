import React from "react";
import { useState, useEffect, useReducer, createRef, useRef } from "react";
import "../css/game2.css";
import ChooseOption from "./ChooseOption";
import InteractiveScreen from "./InteractiveScreen";

import Image1a from "../assets/img/story2a.jpg";
import Image1b from "../assets/img/story1a.jpg";
import Image2a from "../assets/img/story3a.jpg";
import Image2b from "../assets/img/story4a.jpg";
import Image3a from "../assets/img/story5a.jpg";
import Image3b from "../assets/img/story6a.jpg";

import Audio1a from "../assets/audio/1b.mp3";
import Audio1b from "../assets/audio/3b.mp3";
import Audio2a from "../assets/audio/2b.mp3";
import Audio2b from "../assets/audio/4b.mp3";
import Audio3a from "../assets/audio/5b.mp3";
import Audio3b from "../assets/audio/6a.mp3";

const group = [
  {
    word: ["Probier an", "Fahr"],
    optionWord: ["anprobieren", "fahren"],
    pronoun: "du",
    guessWord: [
      {
        word: "probierst",
        rest: "an",
        tippMsg: (
          <>
            Das ist leider falsch. <br />
            <b>Tipp:</b> Ich probiere an, <br />
            du probier__ an.
          </>
        ),
      },
      {
        word: "fährst",
        rest: "",
        tippMsg: (
          <>
            Das ist leider falsch. <br />
            <b>Tipp:</b> Ich fahre, du <br />
            fähr__.
          </>
        ),
      },
    ],
    eraseWord: [
      [
        { letter: "d", opacity: true },
        { letter: "u", opacity: true },
        { letter: ".", blank: true, opacity: true },
        { letter: "p", opacity: false },
        { letter: "r", opacity: false },
        { letter: "o", opacity: false },
        { letter: "b", opacity: false },
        { letter: "i", opacity: false },
        { letter: "e", opacity: false },
        { letter: "r", opacity: false },
        { letter: "s", opacity: true },
        { letter: "t", opacity: true },
        { letter: ".", blank: true, opacity: true },
        { letter: "a", opacity: false },
        { letter: "n", opacity: false },
      ],
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
    ],
    step4: [
      {
        word: "Probier an!",
        description: (
          <>
            <b>Probier</b> mal dieses Kleid <b>an!</b>
          </>
        ),
        img: Image2a,
        sound: Audio1a,
      },
      {
        word: "Fahr!",
        description: (
          <>
            <b>Fahr</b> geradeaus!
          </>
        ),
        img: Image1a,
        sound: Audio1b,
      },
    ],
  },
  {
    word: ["Steight ein", "Helft"],
    optionWord: ["einsteigen", "helfen"],
    pronoun: "ihr",
    guessWord: [
      {
        word: "steigt",
        rest: "ein",
        tippMsg: (
          <>
            Das ist leider falsch. <br />
            <b>Tipp:</b> Ich steige ein, <br />
            ihr stei__ ein.
          </>
        ),
      },
      {
        word: "helft",
        rest: "",
        tippMsg: (
          <>
            Das ist leider falsch. <br />
            <b>Tipp:</b> Ich helfe, ihr
            <br />
            hel__.
          </>
        ),
      },
    ],
    eraseWord: [
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
        { letter: ".", opacity: false, blank: true },
        { letter: "e", opacity: false },
        { letter: "i", opacity: false },
        { letter: "n", opacity: false },
      ],
      [
        { letter: "i", opacity: true },
        { letter: "h", opacity: true },
        { letter: "r", opacity: true },
        { letter: ".", blank: true },
        { letter: "h", opacity: false },
        { letter: "e", opacity: false },
        { letter: "l", opacity: false },
        { letter: "f", opacity: false },
        { letter: "t", opacity: false },
      ],
    ],
    step4: [
      {
        word: "Steigt ein!",
        description: (
          <>
            <b>Steigt</b> lieber schon <b>ein.</b>
          </>
        ),
        img: Image2a,
        sound: Audio2a,
      },
      {
        word: "Helft!",
        description: (
          <>
            <b>Helft</b> mir bitte!
          </>
        ),
        img: Image2b,
        sound: Audio2b,
      },
    ],
  },
  {
    word: ["Geben Sie", "Erzählen Sie"],
    optionWord: ["geben", "erzählen"],
    pronoun: "Sie",
    guessWord: [
      {
        word: "geben",
        rest: "",
        tippMsg: (
          <>
            Das ist leider falsch. <br />
            <b>Tipp:</b> Ich gebe, Sie
            <br />
            geb__.
          </>
        ),
      },
      {
        word: "erzählen",
        rest: "",
        tippMsg: (
          <>
            Das ist leider falsch. <br />
            <b>Tipp:</b> Ich arzähle, Sie
            <br />
            erzähl__.
          </>
        ),
      },
    ],
    eraseWord: [
      [
        { word: "Sie", pos: 1 },
        { word: "geben", pos: 0 },
      ],
      [
        { letter: "S", opacity: true },
        { letter: "i", opacity: true },
        { letter: "e", opacity: true },
        { letter: ".", blank: true },
        { letter: "e", opacity: false },
        { letter: "r", opacity: false },
        { letter: "z", opacity: false },
        { letter: "ä", opacity: false },
        { letter: "h", opacity: true },
        { letter: "l", opacity: true },
        { letter: "e", opacity: true },
        { letter: "n", opacity: true },
      ],
    ],
    step4: [
      {
        word: "Probier an!",
        description: (
          <>
            <b>Probier</b> mal dieses Kleid <b>an!</b>
          </>
        ),
        img: Image2a,
        sound: Audio1a,
      },
      {
        word: "Fahr!",
        description: (
          <>
            <b>Fahr</b> geradeaus!
          </>
        ),
        img: Image1a,
        sound: Audio1b,
      },
    ],
  },
];

// const initLevelStep =

const Game2 = () => {
  const [optionActive, setOptionActive] = useState(0);
  const [miniBox, setMiniBox] = useState(false);
  const [choiceDisable, setChoiceDisable] = useState(false);
  const [finished, setFinished] = useState([false, false, false]);

  const [keyboard, setKeyboard] = useState(true);

  const handleFinished = (index) => {
    setFinished((prev) => {
      prev[index] = true;

      return [...prev];
    });
  };

  return (
    <div className="game2">
      <ChooseOption
        optionActive={optionActive}
        setOptionActive={setOptionActive}
        group={group}
        miniBox={miniBox}
        setMiniBox={setMiniBox}
        choiceDisable={choiceDisable}
        finished={finished}
        setKeyboard={() => {
          if (miniBox) {
            // setKeyboard(false);
          }
        }}
      />
      <InteractiveScreen
        display={optionActive === 0 || !miniBox}
        choiceLevel={0}
        group={group}
        miniBox={miniBox}
        choiceDisable={choiceDisable}
        keyboard={keyboard}
        setKeyboard={setKeyboard}
        setChoiceDisable={setChoiceDisable}
        handleFinished={() => handleFinished(0)}
      />
      <InteractiveScreen
        display={optionActive === 1 || !miniBox}
        choiceLevel={1}
        group={group}
        miniBox={miniBox}
        choiceDisable={choiceDisable}
        keyboard={keyboard}
        setKeyboard={setKeyboard}
        setChoiceDisable={setChoiceDisable}
        handleFinished={() => handleFinished(1)}
      />
      <InteractiveScreen
        display={optionActive === 2 || !miniBox}
        choiceLevel={2}
        group={group}
        miniBox={miniBox}
        choiceDisable={choiceDisable}
        keyboard={keyboard}
        setKeyboard={setKeyboard}
        setChoiceDisable={setChoiceDisable}
        handleFinished={() => handleFinished(2)}
      />
    </div>
  );
};

export default Game2;
