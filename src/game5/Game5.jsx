import React, { useState, useEffect, useRef } from "react";
import SingleScreen from "./SingleScreen";

import "../css/game5.css";
import Keyboard from "../UI/Keyboard2";

import Video1 from "../assets/video/6a.mp4";
import Video1Wrong from "../assets/video/6b.mp4";
import Video1Correct from "../assets/video/6c.mp4";

import Video2 from "../assets/video/1a.mp4";
import Video2Wrong from "../assets/video/1b.mp4";
import Video2Correct from "../assets/video/1c.mp4";

import Video3 from "../assets/video/2a.mp4";
import Video3Wrong from "../assets/video/2b.mp4";
import Video3Correct from "../assets/video/2c.mp4";

import Video4 from "../assets/video/3a.mp4";
import Video4Wrong from "../assets/video/3b.mp4";
import Video4Correct from "../assets/video/3c.mp4";

import Video5 from "../assets/video/4a.mp4";
import Video5Wrong from "../assets/video/4b.mp4";
import Video5Correct from "../assets/video/4c.mp4";

import Video6 from "../assets/video/5a.mp4";
import Video6Wrong from "../assets/video/5b.mp4";
import Video6Correct from "../assets/video/5c.mp4";

import StatusBar from "../UI/StatusBar";
import Indicator from "../UI/Indicator";

const obj = [
  [
    { text: "Probieren", guess: true, explanation: "anprobieren" },
    { text: "Sie", guess: true },
    { text: "diese Hose", guess: false },
    { text: "an", guess: true },
    { text: "!", guess: false, marginLeft: -15 },
    { text: "Sie passt ihnen gut!", guess: false, marginLeft: -30 },
  ],
  [
    { text: "Essen", guess: true, explanation: "essen" },
    { text: "Sie", guess: true },
    { text: "viel Obst und", guess: false },
    { text: "trinken", guess: true, explanation: "trinken" },
    { text: "Sie", guess: true },
    { text: "genug Wasser! Das hilft ihnen.", guess: false },
  ],
  [
    { text: "Zieh", guess: true, explanation: "anziehen" },
    { text: "die Jacke", guess: false },
    { text: "an", guess: true },
    { text: "!", guess: false, marginLeft: -15 },
    { text: "Draußen ist es kalt!.", guess: false, marginLeft: -30 },
  ],
  [
    { text: "Gib", guess: true, explanation: "geben" },
    { text: "mir den Ball.", guess: false },
  ],
  [
    { text: "Kommt", guess: true, explanation: "mitkommen" },
    { text: "mit", guess: true },
    {
      text: "ins Kino! Ich habe drei Karten für den Film heute!",
      guess: false,
    },
  ],
  [
    { text: "Gebt", guess: true, explanation: "abgeben" },
    { text: "bitte eure Hausaufgabe", guess: false },
    { text: "ab", guess: true },
    { text: "!", guess: false, marginLeft: -15 },
  ],
];

const videos = [
  { normal: Video1, correct: Video1Correct, wrong: Video1Wrong, timeout: 3000 },
  { normal: Video2, correct: Video2Correct, wrong: Video2Wrong, timeout: 3000 },
  { normal: Video3, correct: Video3Correct, wrong: Video3Wrong, timeout: 3000 },
  { normal: Video4, correct: Video4Correct, wrong: Video4Wrong, timeout: 4000 },
  { normal: Video5, correct: Video5Correct, wrong: Video5Wrong, timeout: 4000 },
  { normal: Video6, correct: Video6Correct, wrong: Video6Wrong, timeout: 4000 },
];

const Game5 = () => {
  const [level, setLevel] = useState(0);

  const [help, setHelp] = useState(false);

  const [infoText, setInfoText] = useState(
    <>
      Wie heißt die Imperativ-Form? <br /> Schreib in die Lücke.
    </>
  );
  const [infoOverlay, setInfoOverlay] = useState(true);
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [helpFingerPosition, setHelpFingerPosition] = useState("disable");
  const [preventHelp, setPreventHelp] = useState(false);

  useEffect(() => {
    if (!helpOverlay) return;

    setHelp(true);

    setTimeout(() => {
      setHelp(false);
    }, 0);
  }, [helpOverlay]);

  return (
    <>
      <div className="game5">
        {obj.map((item, index) => (
          <>
            {level === index && (
              <SingleScreen
                obj={item}
                videos={videos[index]}
                help={help}
                setLevel={setLevel}
                level={level}
                endeFunc={() => {
                  setInfoText(
                    <>
                      Das war die letzte Aufgabe.
                      <br /> Du kannst im Menü eine andere Aufgabe auswählen{" "}
                      <br /> und sie wiederholen.
                    </>
                  );
                  setInfoOverlay(true);
                }}
              />
            )}
          </>
        ))}
        <Keyboard />
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

export default Game5;
