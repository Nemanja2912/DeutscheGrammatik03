import React, { useState, useEffect } from "react";
import GuessWordImproved from "./../UI/GuessWordImproved";

const GuessWordBottomTable = ({ guessBox, obj, activeButton }) => {
  const [focusIndex, setFocusIndex] = useState(0);
  const [statusState, setStatusState] = useState([
    ["init"],
    ["init"],
    ["init"],
  ]);

  useEffect(() => {
    let index;
  }, [statusState]);

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
              ${statusState[index][0] === "correct" && "correct"}`}
          onClick={() => setFocusIndex(index)}
        >
          <div
            className={`line ${
              statusState[index][0] === "correct" && "line-correct"
            }`}
          >
            {label}-Form
          </div>

          <div className="guess">
            <p className="guess-label">{label}</p>
            <GuessWordImproved
              word={obj[activeButton].guess[index]}
              letterWidth={20}
              letterHeight={30}
              setStatus={(status) => {
                setStatusState((prev) => {
                  prev[index] = [status];

                  return [...prev];
                });

                console.log("next is:", status, statusState);

                if (status === "correct") {
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuessWordBottomTable;
