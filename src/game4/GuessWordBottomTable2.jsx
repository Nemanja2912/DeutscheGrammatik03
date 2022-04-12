import React, { useState, useEffect } from "react";
import GuessWordImproved from "../UI/GuessWordImproved";

const GuessWordBottomTable2 = ({
  singleFinished,
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
    <div className="bottom bottom2">
      <div className="label">
        <p>
          Imperativ- <br /> Formen bilden
        </p>
      </div>
      {guessBox.map((label, index) => (
        <div
          className={`guess-box ${statusState[index][0] === "wrong" && "wrong"}
              ${finished && "correct"}`}
          onClick={() => setFocusIndex(index)}
        >
          <div className={`guess ${singleFinished[index] && "guess-done"}`}>
            {!finished && (
              <GuessWordImproved
                word={obj[activeButton].guessImperativ[index]}
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
            {finished && finishedElement[index]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuessWordBottomTable2;
