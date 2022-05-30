import React, { useState, useEffect, useRef } from "react";
import GuessWordImproved from "./../UI/GuessWordImproved";

const GuessWordBottomTable = ({
  guessBox,
  obj,
  activeButton,
  finished,
  setFinished,
  finishedElement,
  labelActive,
  help,
}) => {
  const [focusIndex, setFocusIndex] = useState(0);
  const [statusState, setStatusState] = useState([
    ["init"],
    ["init"],
    ["init"],
  ]);
  const [helpFocus, setHelpFocus] = useState([false, false, false]);

  useEffect(() => {
    if (help) {
      setHelpFocus((prev) => {
        prev[focusIndex] = true;

        return [...prev];
      });

      setTimeout(() => {
        setHelpFocus((prev) => {
          prev[focusIndex] = false;

          return [...prev];
        });
      }, 0);
    }
  }, [help]);

  return (
    <div className="bottom">
      <div
        style={{
          backgroundColor: labelActive ? "#5ac8f5" : "#9aa1a5",
        }}
        className="label"
      >
        <p>
          Präsens- <br /> Formen <br /> bilden
        </p>
      </div>
      {guessBox.map((label, index) => (
        <div
          className={`guess-box ${statusState[index][0] === "wrong" && "wrong"}
              ${finished[index] && "correct"}`}
          onClick={() => setFocusIndex(index)}
        >
          <div className={`line ${finished[index] && "line-correct"}`}>
            {label}-Form
          </div>

          <div className="guess">
            <p className="guess-label">{label}</p>
            {!finished[index] && (
              <GuessWordImproved
                help={helpFocus[index]}
                word={obj[activeButton].guess[index]}
                letterWidth={15}
                letterHeight={30}
                status={statusState[index][0]}
                setStatus={(status) => {
                  setStatusState((prev) => {
                    prev[index] = [status];

                    return [...prev];
                  });

                  if (status === "correct") {
                    setFinished(index);

                    for (let i = 0; i < statusState.length; i++) {
                      if (statusState[i][0] !== "correct") {
                        setFocusIndex(i);

                        break;
                      }
                    }
                  }
                }}
                focus={index === focusIndex}
              />
            )}
            {finished[index] && finishedElement[index]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuessWordBottomTable;
