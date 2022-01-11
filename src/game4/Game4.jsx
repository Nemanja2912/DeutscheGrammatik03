import React, { useRef, useState, useEffect } from "react";

import "../css/game4.css";
import StatusBar from "../UI/StatusBar";
import FeedbackOverlay from "./FeedbackOverlay";
import Part2 from "./Part2";
import Part3 from "./Part3";

let sentenceList = [
  [
    "Ich ",
    "bin ",
    "der beste ",
    "Fußball-Spieler ",
    "in ",
    "meiner Mannschaft.",
  ],
  ["Ich ", "habe ", "schon ", "viele Spiele ", "gewonnen."],
  ["Jeden Tag ", "stehe ", "ich ", "früh ", "auf."],
  ["Dann ", "fahre ", "ich ", "zum ", "Stadion."],
  ["Dort ", "muss ", "ich ", "viel ", "üben."],
  ["Später ", "möchte ", "ich ", "Fußball-Weltmeister ", "werden."],
  ["Dann ", "bekomme ", "ich ", "einen ", "goldenen Pokal."],
  ["Oh, ", "jemand ", "ruft ", "mich ", "an."],
  ["Vielleicht ", "sind ", "es ", "meine ", "Fans."],
  ["Nein, ", "da ", "hat ", "nur ", "der Wecker ", "vom Handy ", "geklingelt."],
  ["Ich ", "habe ", "wieder ", "geträumt."],
];

let sentenceList2 = [
  {
    words: ["Ich ", "habe ", "schon ", "viele Spiele ", "gewonnen."],
    verbID: 1,
  },
  { words: ["Jeden Tag ", "stehe ", "ich ", "früh ", "auf."], verbID: 1 },
  { words: ["Dort ", "muss ", "ich ", "viel ", "üben."], verbID: 1 },
  {
    words: ["Später ", "möchte ", "ich ", "Fußball-Weltmeister ", "werden."],
    verbID: 1,
  },
  { words: ["Oh, ", "jemand ", "ruft ", "mich ", "an."], verbID: 2 },
  {
    words: [
      "Nein, ",
      "da ",
      "hat ",
      "nur ",
      "der Wecker ",
      "vom Handy ",
      "geklingelt.",
    ],
    verbID: 2,
  },
  { words: ["Ich ", "habe ", "wieder ", "geträumt."], verbID: 1 },
];

const Game4 = () => {
  const dropRef = useRef(null);

  const moveCloneElementOnPosition = (element) => {
    const cloneSentence = element.cloneNode(true);

    cloneSentence.style.left = "0px";
    cloneSentence.style.top = "0px";

    for (let i = 0; i < cloneSentence.children.length; i++) {
      cloneSentence.children[i].style.left = "0px";
      cloneSentence.children[i].style.top = "0px";
    }

    cloneSentence.addEventListener("mousedown", (e) => {
      handleMoveSentence(e, true, element);
    });

    let drop = document.querySelector(".drop");

    drop.appendChild(cloneSentence);

    cloneSentence.style.left =
      element.offsetLeft - cloneSentence.getBoundingClientRect().left + "px";
    cloneSentence.style.top =
      element.offsetTop - cloneSentence.getBoundingClientRect().top + "px";

    setTimeout(() => {
      cloneSentence.style.transition = "200ms left, 200ms top";
      cloneSentence.style.left = "0px";
      cloneSentence.style.top = "0px";

      setTimeout(() => {
        cloneSentence.style.transition = "0ms";
      }, 200);
    }, 0);

    element.style.opacity = "0";
    element.style.visibility = "hidden";

    switch (+element.getAttribute("sentenceid")) {
      case 1:
      case 2:
      case 4:
      case 5:
      case 7:
      case 9:
      case 10:
        setRightSentence((prev) => prev + 1);
        break;
      default:
        setWrongSentence((prev) => prev + 1);
    }
  };

  const handleMoveSentence = (initEvent, clone = false, initElement) => {
    const element = initEvent.currentTarget;

    element.style.zIndex = "10000";

    let index = false;

    for (let i = 0; i < element.children.length; i++) {
      if (
        initEvent.clientX > element.children[i].getBoundingClientRect().left &&
        initEvent.clientX < element.children[i].getBoundingClientRect().right
      ) {
        index = i;
        break;
      }
    }

    let moveRightX = 0;
    let moveRightY = 0;

    for (let i = index + 1; i < element.children.length; i++) {
      element.children[i].style.transition = "300ms";

      if (
        element.children[i].getBoundingClientRect().left <
          element.children[i - 1].getBoundingClientRect().left &&
        moveRightX === 0
      ) {
        moveRightX =
          element.children[i - 1].getBoundingClientRect().right -
          element.children[i].getBoundingClientRect().left +
          6;

        moveRightY =
          element.children[i - 1].getBoundingClientRect().top -
          element.children[i].getBoundingClientRect().top;
      }

      element.children[i].style.left = moveRightX + "px";

      element.children[i].style.top = moveRightY + "px";
    }

    let moveLeftX = 0;
    let moveLeftY = 0;

    for (let i = index - 1; i >= 0; i--) {
      element.children[i].style.transition = "300ms";

      if (
        element.children[i].getBoundingClientRect().left >
          element.children[i + 1].getBoundingClientRect().left &&
        moveLeftX === 0
      ) {
        moveLeftX =
          element.children[i + 1].getBoundingClientRect().left -
          element.children[i].getBoundingClientRect().right -
          6;

        moveLeftY =
          element.children[i + 1].getBoundingClientRect().top -
          element.children[i].getBoundingClientRect().top;
      }

      element.children[i].style.left = moveLeftX + "px";

      element.children[i].style.top = moveLeftY + "px";
    }

    const moveElement = (moveEvent) => {
      element.style.left = moveEvent.clientX - initEvent.clientX + "px";
      element.style.top = moveEvent.clientY - initEvent.clientY + "px";
    };

    document.addEventListener("mousemove", moveElement);

    const stopMove = (endEvent) => {
      document.removeEventListener("mousemove", moveElement);
      document.removeEventListener("mouseup", stopMove);

      element.style.zIndex = "1";

      if (
        endEvent.clientX > dropRef.current.getBoundingClientRect().left &&
        endEvent.clientX < dropRef.current.getBoundingClientRect().right &&
        endEvent.clientY > dropRef.current.getBoundingClientRect().top &&
        endEvent.clientY < dropRef.current.getBoundingClientRect().bottom &&
        !clone
      ) {
        moveCloneElementOnPosition(element);
      } else if (clone) {
        if (
          endEvent.clientX > dropRef.current.getBoundingClientRect().left &&
          endEvent.clientX < dropRef.current.getBoundingClientRect().right &&
          endEvent.clientY > dropRef.current.getBoundingClientRect().top &&
          endEvent.clientY < dropRef.current.getBoundingClientRect().bottom
        ) {
          element.style.transition = "200ms";

          element.style.left = "0px";
          element.style.top = "0px";

          setTimeout(() => {
            element.style.transition = "0ms";
          }, 200);

          for (let i = 0; i < element.children.length; i++) {
            element.children[i].style.left = "0px";
            element.children[i].style.top = "0px";
          }
        } else {
          initElement.style.visibility = "";
          initElement.style.opacity = 1;

          //ovde
          initElement.style.left = "0px";
          initElement.style.top = "0px";

          for (let i = 0; i < initElement.children.length; i++) {
            initElement.children[i].style.left = "0px";
            initElement.children[i].style.top = "0px";
          }

          initElement.style.left =
            element.offsetLeft -
            initElement.getBoundingClientRect().left +
            "px";
          initElement.style.top =
            element.offsetTop - initElement.getBoundingClientRect().top + "px";

          setTimeout(() => {
            initElement.style.transition = "200ms left, 200ms top";
            initElement.style.left = "0px";
            initElement.style.top = "0px";

            setTimeout(() => {
              initElement.style.transition = "0ms";
            }, 200);
          }, 0);

          element.style.opacity = "0";
          element.style.visibility = "hidden";

          element.style.transition = "200ms margin-left";
          element.style.opacity = "0";
          element.style.marginLeft =
            -element.getBoundingClientRect().width + "px";
          element.remove();

          switch (+element.getAttribute("sentenceid")) {
            case 1:
            case 2:
            case 4:
            case 5:
            case 7:
            case 9:
            case 10:
              setRightSentence((prev) => prev - 1);
              break;
            default:
              setWrongSentence((prev) => prev - 1);
          }
        }
      } else {
        element.style.transition = "200ms";
        element.style.left = "0px";
        element.style.top = "0px";

        setTimeout(() => {
          element.style.transition = "0ms";
          element.style.zIndex = "1";
        }, 200);

        for (let i = 0; i < element.children.length; i++) {
          element.children[i].style.left = "0px";
          element.children[i].style.top = "0px";
        }
      }
    };

    document.addEventListener("mouseup", stopMove);
  };

  const [infoText, setInfoText] = useState(
    <p>
      In den Übungen vorher hast du die Satzklammer <br /> kennen gelernt.
      <br />
      Welche Sätze der Geschichte haben eine <br /> Satzklammer?
      <br />
      Ziehe sie in das blaue Feld.
    </p>
  );
  const [infoOverlay, setInfoOverlay] = useState(true);
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [helpFingerPosition, setHelpFingerPosition] = useState([]);
  const [feedback, setFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [rightSentence, setRightSentence] = useState(0);
  const [wrongSentence, setWrongSentence] = useState(0);

  const [isDone, setIsDone] = useState(true);

  const handleCheck = () => {
    const numberSentStrings = [
      "keinen Satz",
      "einen Satz",
      "zwei Sätze",
      "drei Sätze",
      "vier Sätze",
      "fünf Sätze",
      "sechs Sätze",
      "sieben Sätze",
    ];

    let feedback = "";
    let totalRightSententences = 7;

    if (wrongSentence > 0) {
      var wrongSentences =
        wrongSentence > 1 ? "die falschen Sätze" : "den falschen Satz";
      if (rightSentence > 0) {
        feedback = (
          <p>
            Du hast {numberSentStrings[rightSentence]} richtig gefunden, aber
            auch
            {numberSentStrings[wrongSentence]} falsch ausgewählt. Ziehe
            {wrongSentences} wieder aus dem blauen Feld nach oben.
            <br /> Tipp: Die Satzklammer hat immer zwei Teile. Suche weiter!
          </p>
        );
      } else {
        feedback = (
          <p>
            Leider hast du bisher nur falsche Sätze ausgewählt. Ziehe{" "}
            {wrongSentences} wieder aus dem blauen Feld nach oben.
            <br /> Tipp: Die Satzklammer hat immer zwei Teile. Suche weiter!;
          </p>
        );
      }
    } else if (rightSentence === 0) {
      feedback =
        "Du hast noch gar keinen Satz ausgewählt. Ziehe die Sätze mit Satzklammer auf den unteren Bereich.";
    } else if (rightSentence === totalRightSententences) {
      feedback = "Super! Du hast alle Sätze mit Satzklammer gefunden!";
      setIsDone(false);
    } else {
      if (rightSentence > totalRightSententences - 3) {
        feedback = "Du hast fast alle Sätze mit Satzklammer gefunden.";
        if (totalRightSententences - rightSentence > 1)
          feedback +=
            "Es fehlen nur noch " +
            numberSentStrings[totalRightSententences - rightSentence] +
            ". Suche weiter !";
        else feedback += "Es fehlt nur noch ein Satz. Suche weiter!";
      } else {
        feedback =
          "Du hast schon " +
          numberSentStrings[rightSentence] +
          " mit Satzklammer gefunden. Es fehlen dir noch " +
          numberSentStrings[totalRightSententences - rightSentence] +
          ". Suche weiter!";
      }
    }

    setFeedbackText(feedback);

    setFeedback(true);
  };

  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (!isDone || rightSentence === 7) {
      setHelpFingerPosition("init");
      setTimeout(() => {
        setHelpFingerPosition(false);
      }, 10);

      return;
    }
    const answerListId = [1, 2, 4, 5, 7, 9, 10];

    if (helpOverlay) {
      const sentenceList = document.querySelector(".text").children;

      let firstActiveId = false;

      for (let i = 0; i < answerListId.length; i++) {
        if (sentenceList[answerListId[i]].style.visibility !== "hidden") {
          firstActiveId = i;
          break;
        }
      }

      const element = sentenceList[answerListId[firstActiveId]];

      setHelpFingerPosition([
        element.children[1].getBoundingClientRect().left +
          element.children[1].getBoundingClientRect().width / 3,
        element.children[1].getBoundingClientRect().top + 15,
      ]);

      setTimeout(() => {
        element.children[1].style.backgroundColor = "#c7c7c7";

        let moveRightX = 0;
        let moveRightY = 0;

        for (let i = 2; i < element.children.length; i++) {
          element.children[i].style.transition = "300ms";

          if (
            element.children[i].getBoundingClientRect().left <
              element.children[i - 1].getBoundingClientRect().left &&
            moveRightX === 0
          ) {
            moveRightX =
              element.children[i - 1].getBoundingClientRect().right -
              element.children[i].getBoundingClientRect().left +
              6;

            moveRightY =
              element.children[i - 1].getBoundingClientRect().top -
              element.children[i].getBoundingClientRect().top;
          }

          element.children[i].style.left = moveRightX + "px";

          element.children[i].style.top = moveRightY + "px";
        }

        setTimeout(() => {
          setHelpFingerPosition([
            dropRef.current.getBoundingClientRect().left +
              dropRef.current.getBoundingClientRect().width / 2,
            dropRef.current.getBoundingClientRect().top +
              dropRef.current.getBoundingClientRect().height / 2,
          ]);

          element.style.transition = "1000ms linear";

          element.style.left =
            dropRef.current.getBoundingClientRect().left +
            dropRef.current.getBoundingClientRect().width / 2 -
            element.offsetLeft -
            sentenceList[
              answerListId[firstActiveId]
            ].children[0].getBoundingClientRect().width -
            element.children[1].getBoundingClientRect().width / 3 +
            "px";

          element.style.top =
            dropRef.current.getBoundingClientRect().top +
            dropRef.current.getBoundingClientRect().height / 2 -
            element.offsetTop -
            sentenceList[
              answerListId[firstActiveId]
            ].children[0].getBoundingClientRect().height +
            5 +
            "px";

          //   element.style.visibility = "hidden";

          setTimeout(() => {
            element.style.transition = "0ms";
            element.children[1].style.backgroundColor = "transparent";
            moveCloneElementOnPosition(element);

            setTimeout(() => {
              setHelpFingerPosition("init");
              setHelpFingerPosition(false);
            }, 300);
          }, 1250);
        }, 300);
      }, 1250);
    }
  }, [helpOverlay]);

  useEffect(() => {
    if (level === 7) {
      setHelpFingerPosition("init");
    }
  }, [level]);

  return (
    <>
      <div className="game4">
        {isDone && (
          <>
            <div className="text">
              {sentenceList.map((sentece, index) => {
                return (
                  <div
                    sentenceid={index}
                    className="sentence"
                    onMouseDown={handleMoveSentence}
                  >
                    {sentece.map((word) => {
                      return <span>{word}</span>;
                    })}
                  </div>
                );
              })}
            </div>
            <div className="drop" ref={dropRef}></div>

            <div className="button" onClick={handleCheck}>
              Prüfen
            </div>
          </>
        )}
      </div>
      {!isDone &&
        sentenceList2.map(
          (sentence, index) =>
            index === level && (
              <Part2
                setHelpFingerPosition={setHelpFingerPosition}
                helpOverlay={helpOverlay}
                setLevel={setLevel}
                verbID={sentence.verbID}
              >
                {sentence.words.map((word, index) => (
                  <span
                    verb={
                      index === sentence.verbID ||
                      index === sentence.words.length - 1
                        ? "true"
                        : null
                    }
                  >
                    {word}
                  </span>
                ))}
              </Part2>
            )
        )}
      {level === 7 &&
        sentenceList2.map((sentence) => (
          <Part3 verbID={sentence.verbID}>
            {sentence.words.map((word, index) => (
              <span
                verb={
                  index === sentence.verbID ||
                  index === sentence.words.length - 1
                    ? "true"
                    : null
                }
                className={`${
                  index === sentence.verbID ||
                  index === sentence.words.length - 1
                    ? "verb"
                    : ""
                }`}
              >
                {word}
              </span>
            ))}
          </Part3>
        ))}
      <StatusBar
        infoText={infoText}
        infoOverlay={infoOverlay}
        setInfoOverlay={setInfoOverlay}
        setHelpOverlay={setHelpOverlay}
        helpFingerPosition={helpFingerPosition}
      />
      {feedback && (
        <FeedbackOverlay closeFunc={() => setFeedback(false)}>
          {feedbackText}
        </FeedbackOverlay>
      )}
    </>
  );
};

export default Game4;
