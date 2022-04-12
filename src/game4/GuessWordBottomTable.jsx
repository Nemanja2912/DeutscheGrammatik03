import React, { useState, useEffect } from "react";
import GuessWordImproved from "./../UI/GuessWordImproved";

const GuessWordBottomTable = ({
  guessBox,
  obj,
  activeButton,
  finished,
  setFinished,
  finishedElement,
}) => {
  const [focusIndex, setFocusIndex] = useState(0);
  const [statusState, setStatusState] = useState([
    ["init"],
    ["init"],
    ["init"],
  ]);

  return (
    <div className="bottom">
      <div className="label">
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
                word={obj[activeButton].guess[index]}
                letterWidth={15}
                letterHeight={30}
                setStatus={(status) => {
                  setStatusState((prev) => {
                    prev[index] = [status];

                    return [...prev];
                  });

                  console.log(status, "status");

                  if (status === "correct") {
                    setFinished(index);

                    for (let i = 0; i < statusState.length; i++) {
                      if (statusState[i][0] !== "correct") {
                        setFocusIndex(i);
                        console.log("?");

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
