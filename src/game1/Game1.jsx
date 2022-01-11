import Image from "../assets/img/asset1.svg";
import Image2 from "../assets/img/asset2.svg";

import "../css/game1.css";
import { useRef, useState, useEffect } from "react";
import BallsGroup from "./BallsGroup";
import SecondPartBox from "./SecondPartBox";
import StatusBar from "./../UI/StatusBar";

const list = [
  {
    textList: [
      { text: "Mein Bruder" },
      { text: "steht" },
      { text: "immer" },
      { text: "früh" },
      { text: "auf." },
    ],
    verbs: [1, 4],
    containerIndex: 0,
    lineIndex: 0,
  },
  {
    textList: [
      { text: "Meine Schwes- ter" },
      { text: "kann" },
      { text: "schöne Bilder" },
      { text: "malen." },
    ],
    verbs: [1, 3],
    containerIndex: 1,
    lineIndex: 0,
  },
  {
    textList: [
      { text: "Peter" },
      { text: "ruft" },
      { text: "seine Oma" },
      { text: "oft" },
      { text: "an." },
    ],
    verbs: [1, 4],
    containerIndex: 0,
    lineIndex: 1,
  },
  {
    textList: [
      { text: "Herr Schmidt" },
      { text: "ist" },
      { text: "zu spät" },
      { text: "ins Büro" },
      { text: "gekom- men." },
    ],
    verbs: [1, 4],
    containerIndex: 2,
    lineIndex: 0,
  },
  {
    textList: [
      { text: "Das Kind" },
      { text: "will" },
      { text: "Fußball" },
      { text: "spielen." },
    ],
    verbs: [1, 3],
    containerIndex: 1,
    lineIndex: 1,
  },
  {
    textList: [
      { text: "Sie" },
      { text: "hat" },
      { text: "am Samstag" },
      { text: "dieses Buch" },
      { text: "gekauft." },
    ],
    verbs: [1, 4],
    containerIndex: 2,
    lineIndex: 1,
  },
  {
    textList: [
      { text: "Er" },
      { text: "muss" },
      { text: "eine" },
      { text: "neue Regel" },
      { text: "lernen." },
    ],
    verbs: [1, 4],
    containerIndex: 1,
    lineIndex: 2,
  },
  {
    textList: [
      { text: "Maria" },
      { text: "macht" },
      { text: "die Tür" },
      { text: "zu." },
    ],
    verbs: [1, 3],
    containerIndex: 0,
    lineIndex: 2,
  },
  {
    textList: [
      { text: "Mein Nachbar" },
      { text: "hat" },
      { text: "noch nie" },
      { text: "ein Buch" },
      { text: "gelesen." },
    ],
    verbs: [1, 4],
    containerIndex: 2,
    lineIndex: 2,
  },
];

let initState = [];

for (let index in list) {
  if (Number(index) === 0) {
    initState[index] = {
      line: false,
    };
  } else {
    initState[index] = {
      line: true,
    };
  }
}

const Game1 = () => {
  const leftDropArea = useRef(null);
  const centerDropArea = useRef(null);
  const rightDropArea = useRef(null);

  const blueDropRef = useRef(null);

  const [opacityList, setOpacityList] = useState(initState);
  const [secondPart, setSecondPart] = useState(false);
  const [infoOverlay, setInfoOverlay] = useState(true);
  const [infoText, setInfoText] = useState(
    <p>
      Ziehe die Verben aus dem Satz <br />
      und leg sie in den richtigen Kasten.
      <br />
      Weißt du die Antwort nicht? <br />
      Dann leg die Verben auf das Fragezeichen.
    </p>
  );
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [helpMove, setHelpMove] = useState(false);
  const [helpFingerPosition, setHelpFingerPosition] = useState([]);
  const [level, setLevel] = useState(0);
  const [, setBallPos] = useState([]);

  const returnDone = (opacity, index) => {
    if (index === list.length) {
      setInfoText(
        <p>
          Manchmal gibt es im Satz zwei Verben oder ein Verb <br /> aus zwei
          Teilen.
          <br />
          Drei Typen sind besonders wichtig. Ziehe die Wörter <br /> in die
          Lücken.
        </p>
      );
      setInfoOverlay(true);

      setSecondPart(true);
    } else {
      setOpacityList((prev) => {
        const list = [...prev];
        list[index] = opacity;

        return list;
      });
    }
  };

  useEffect(() => {
    if (helpOverlay) {
      setHelpMove(true);
    }
  }, [helpOverlay]);

  return (
    <>
      <StatusBar
        infoText={infoText}
        infoOverlay={infoOverlay}
        setInfoOverlay={setInfoOverlay}
        setHelpOverlay={setHelpOverlay}
        helpFingerPosition={helpFingerPosition}
      />
      <div className="game1">
        {list.map((item, index) => {
          return (
            <BallsGroup
              key={index}
              refList={[leftDropArea, centerDropArea, rightDropArea]}
              containerIndex={item.containerIndex}
              blueDropRef={blueDropRef}
              verbID1={item.verbs[0]}
              verbID2={item.verbs[1]}
              list={item.textList}
              lineOpacity={opacityList[index].line}
              returnDone={returnDone}
              index={index}
              lineIndex={item.lineIndex}
              secondPart={secondPart}
              returnBallPos={setBallPos}
              helpMove={helpMove}
              moveFinger={setHelpFingerPosition}
              level={level}
              setHelpMove={setHelpMove}
              setLevel={setLevel}
            />
          );
        })}
        <div className={`images ${secondPart ? "secondPart" : ""}`}>
          <img src={Image} alt="" />
          <img className="image2" src={Image2} alt="" />
          <div ref={blueDropRef} className="blue-circle">
            ?
          </div>
        </div>

        <div className={`drop-area ${secondPart ? "secondPart-drop" : ""}`}>
          <div ref={leftDropArea} className="container">
            <div className="title">trennbare Verben</div>
          </div>
          <div ref={centerDropArea} className="container">
            <div className="title">Modalverben</div>
          </div>
          <div ref={rightDropArea} className="container">
            <div className="title">Perfekt</div>
          </div>
        </div>

        <SecondPartBox
          secondPart={secondPart}
          level={level}
          setLevel={setLevel}
          moveFinger={setHelpFingerPosition}
          setHelpMove={setHelpMove}
          helpMove={helpMove}
        />
      </div>
    </>
  );
};

export default Game1;
