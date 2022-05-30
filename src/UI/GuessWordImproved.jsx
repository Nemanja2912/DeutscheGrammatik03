import React, { useState, useEffect, useRef, createRef } from "react";

const GuessWordImproved = ({
  word,
  letterWidth,
  letterHeight,
  status,
  setStatus,
  focus,
  help,
}) => {
  let wordArr;
  let keyboardEvent = useRef(null);
  let blinkInterval = useRef(null);

  if (word) {
    wordArr = word.split("");
  }

  const [letterList, setLetterList] = useState(
    wordArr.map((item) => {
      if (item === " ") return " ";
      return "";
    })
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [blinkAnimation, setBlinkAnimation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [check, setCheck] = useState(false);

  const guessWordRef = useRef(null);

  useEffect(() => {
    if (focus) {
      blinkInterval.current = setInterval(() => {
        setBlinkAnimation((prev) => !prev);
      }, 500);
    } else {
      clearInterval(blinkInterval.current);
      setBlinkAnimation(true);
    }

    return () => clearInterval(blinkInterval.current);
  }, [focus]);

  useEffect(() => {
    if (isCompleted) return;

    if (focus) {
      keyboardEvent.current = (event) => {
        const key = event.key;

        const nextPos = () => {
          setActiveIndex((prev) => {
            if (prev === wordArr.length - 1) {
              return 0;
            }

            if (word[prev + 1] === " ") {
              return prev + 2;
            } else {
              return prev + 1;
            }
          });
        };

        const prevPos = () => {
          setActiveIndex((prev) => {
            if (prev === 0) {
              return prev;
            }

            return prev - 1;
          });
        };

        if (key === "ArrowRight") {
          nextPos();
        } else if (key === "ArrowLeft") {
          prevPos();
        } else if (key === "Backspace") {
          setLetterList((prev) => {
            prev[activeIndex] = "";
            return [...prev];
          });

          prevPos();
        } else {
          if (key.length === 1) {
            setLetterList((prev) => {
              prev[activeIndex] = key;

              return [...prev];
            });

            nextPos();
          }
        }
      };
      window.addEventListener("keydown", keyboardEvent.current);
    } else {
      clearInterval(blinkInterval.current);
      window.removeEventListener("keydown", keyboardEvent.current);
    }

    return () => window.removeEventListener("keydown", keyboardEvent.current);
  }, [activeIndex, letterList, focus, isCompleted]);

  useEffect(() => {
    if (help) {
      let index;

      for (let i = 0; i < letterList.length; i++) {
        if (letterList[i] !== word[i]) {
          index = i;
          break;
        }
      }

      const letter = word[index];

      setActiveIndex((prev) => {
        if (index === wordArr.length - 1) {
          return 0;
        }

        if (word[index + 1] === " ") {
          return index + 2;
        } else {
          return index + 1;
        }
      });

      setLetterList((prev) => {
        prev[index] = letter;

        return [...prev];
      });

      // window.dispatchEvent(new KeyboardEvent("keydown", { key: letter }));
    }
  }, [help]);

  useEffect(() => {
    if (status === "correct") return;

    if (word.toLowerCase() === letterList.join("").toLowerCase()) {
      setIsCompleted(true);
      setBlinkAnimation(true);

      clearInterval(blinkInterval.current);
      window.removeEventListener("keydown", keyboardEvent.current);

      setLetterList((prev) => {
        for (let i = 0; i < prev.length; i++) {
          if (prev[i] !== word[i]) {
            prev[i] = word[i];
          }
        }

        return [...prev];
      });

      setStatus("correct");
    }
  }, [word, letterList]);

  useEffect(() => {
    if (activeIndex === wordArr.length - 1) {
      setCheck(true);
    }

    if (check) {
      if (word.toLowerCase() !== letterList.join("").toLowerCase()) {
        setStatus("wrong");
        setCheck(false);
      }
    }
  }, [activeIndex]);

  const guessStyle = { display: "flex", gap: 5, position: "relative" };

  const letterStyle = {
    width: letterWidth,
    height: letterHeight,
    borderBottom: "1px solid #fff",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  };

  const blinkBoxStyle = {
    width: letterWidth,
    backgroundColor: "#fff",
    position: "absolute",
    left: activeIndex * letterWidth + 5 * activeIndex,
    opacity: blinkAnimation ? 0 : 1,
    top: 0,
    right: 0,
    bottom: 0,
  };

  return (
    <div className="guess-word" style={guessStyle} ref={guessWordRef}>
      {letterList.map((letter, index) => (
        <p style={{ ...letterStyle, opacity: word[index] === " " ? 0 : 1 }}>
          {letter}
        </p>
      ))}
      <div className="blink-box" style={blinkBoxStyle}></div>
    </div>
  );
};

export default GuessWordImproved;
