import React, { useState, useEffect } from "react";
import Keyboard from "./Keyboard";
import DetailsBox from "./DetailsBox";

const GuessWord = ({
  word = "",
  keyboard = true,
  customWord = "",
  disable = false,
  keyboardStatus,
  tipp = false,
  msg = "",
  customDisable = false,
  success = () => {},
  getWordBack = () => {},
  returnKeyboardStatus = () => {},
}) => {
  const [guessWordHolder, setGuessWordHolder] = useState([]);
  const [blinkPosition, setBlinkPosition] = useState(0);
  const [falseLetters, setFalseLetters] = useState([]);
  const [blinkAnimation, setBlinkAnimation] = useState(false);
  const [showTipp, setShowTipp] = useState(false);

  const guessWordStyle = {
    display: "flex",
    position: "relative",
    gap: 2.5,
  };

  const blankStyle = {
    width: 16,
    height: 30,
    borderBottom: "2px solid white",
    display: "flex",
    justifyContent: "center",
  };

  const blinkBoxStyle = {
    width: 16,
    backgroundColor: "#fff",
    position: "absolute",
    left: blinkPosition * 16 + blinkPosition * 2.5,
    opacity: blinkAnimation ? 0 : 1,
    top: 0,
    right: 0,
    bottom: 0,
  };

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkAnimation((prev) => !prev);
    }, 500);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    for (let i = 0; i < customWord.length; i++) {
      if (customWord[i] === "") {
        setBlinkPosition(i);
        return;
      }
    }
    setBlinkPosition(0);
  }, [word]);

  useEffect(() => {
    const letterList = word.split("");
    let customChar = customWord;

    let list = [];

    for (let i = 0; i < letterList.length; i++) {
      if (customChar[i] !== undefined) {
        list[i] = customChar[i];
      } else {
        list[i] = "";
      }
    }
    setGuessWordHolder(list);
  }, [word, customWord]);

  const checkLetters = () => {
    let falseList = [];
    let tippActive = false;

    for (let i = 0; i < guessWordHolder.length; i++) {
      falseList[i] = guessWordHolder[i] !== word.split("")[i];

      if (guessWordHolder[i] !== word.split("")[i]) {
        setShowTipp(true);

        setTimeout(() => {
          setShowTipp(false);
        }, 2000);
      }
    }
    setFalseLetters([...falseList]);
  };

  useEffect(() => {
    if (blinkPosition === 0 && guessWordHolder.join("").length > 0)
      checkLetters();
  }, [blinkPosition]);

  const nextPosition = () => {
    setBlinkPosition((prev) => {
      if (prev === guessWordHolder.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevPosition = () => {
    setBlinkPosition((prev) => {
      if (prev === 0) return guessWordHolder.length - 1;

      return prev - 1;
    });
  };

  const getLetter = (char) => {
    if (char === "ArrowRight") {
      nextPosition();
    }

    if (char === "ArrowLeft") {
      prevPosition();
    }

    if (char === "Backspace") {
      setGuessWordHolder((prev) => {
        prev[blinkPosition] = "";
        return [...prev];
      });

      prevPosition();
    }

    if (/^[A-Züöäß]{1}$/gi.test(char)) {
      let newGuessList = [...guessWordHolder];
      newGuessList[blinkPosition] = char;

      setGuessWordHolder((prev) => {
        return [...newGuessList];
      });

      getWordBack([...newGuessList]);

      nextPosition();
    } else return;
  };

  useEffect(() => {
    if (disable) return;

    const letterEvent = (pressEvent) => {
      let char = pressEvent.key;

      getLetter(char);
    };

    window.addEventListener("keydown", letterEvent);

    return () => window.removeEventListener("keydown", letterEvent);
  }, [guessWordHolder, blinkPosition, disable]);

  useEffect(() => {
    if (guessWordHolder.join("") === word && word.length > 0) {
      checkLetters();
      success();
    }
  }, [guessWordHolder, word]);

  const returnLetter = (letter) => {
    getLetter(letter);
  };

  useEffect(() => {
    const custom = customWord.split("");

    for (let i = 0; i < custom.length; i++) {
      if (custom[i] !== guessWordHolder[i]) {
        if (i + 1 <= custom.length) {
          setBlinkPosition(i + 1);
        }

        break;
      }
    }
  }, [customWord]);

  return (
    <div className="guess-screen">
      <div className="guess-word" style={guessWordStyle}>
        {guessWordHolder.map((letter, letterIndex) => {
          return (
            <p
              key={letterIndex}
              letter={letter + letterIndex}
              className="blank"
              style={{
                ...blankStyle,
                backgroundColor: falseLetters[letterIndex] && "#EB6400",
              }}
            >
              {letter}
            </p>
          );
        })}
        {tipp && (
          <div
            className="detail-wrapper"
            style={{
              position: "absolute",
              top: 0,
              transform: "translateY(-125%)",
              opacity: showTipp ? 1 : 0,
              transition: ".25s linear",
              pointerEvents: "none",
            }}
          >
            <DetailsBox backgroundColor="#EB6400">{msg}</DetailsBox>
          </div>
        )}
        {!disable && <div className="blink-box" style={blinkBoxStyle}></div>}
      </div>

      <Keyboard
        returnLetter={returnLetter}
        disable={(keyboard && disable) || customDisable}
        returnStatus={returnKeyboardStatus}
        keyboardStatus={keyboardStatus}
      />
    </div>
  );
};

export default GuessWord;
