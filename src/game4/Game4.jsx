import React, { useRef, useState, useEffect } from "react";

import "../css/game4.css";
import GuessWordImproved from "../UI/GuessWordImproved";
import Keyboard2 from "../UI/Keyboard2";
import GuessWordBottomTable from "./GuessWordBottomTable";

const obj = [
  { text: "helfen", guess: ["hilfst", "helft", "helfen"] },
  { text: "kommen", guess: ["kommst", "kommt", "kommen"] },
  { text: "bringen", guess: ["bringst", "bringt", "bringen"] },
  { text: "nehmen", guess: ["nimmst", "nehmt", "nehmen"] },
  { text: "fahren", guess: ["fährst", "fahrt", "fahren"] },
];

const guessBox = ["du", "ihr", "Sie"];

const Game4 = () => {
  const [activeButton, setActiveButton] = useState(0);

  return (
    <div className="game4">
      <div className="table">
        <div className="top">
          <div className="label">
            <p>
              Infinitiv <br /> auswählen
            </p>
          </div>
          {obj.map((btn, index) => (
            <div
              className={`table-button ${activeButton === index && "active"}`}
              onClick={() => setActiveButton(index)}
            >
              <p>{btn.text}</p>
            </div>
          ))}
        </div>
        {obj.map((item, index) => (
          <>
            {activeButton === index && (
              <GuessWordBottomTable
                guessBox={guessBox}
                obj={obj}
                activeButton={activeButton}
              />
            )}
          </>
        ))}
      </div>

      <Keyboard2 />
    </div>
  );
};

export default Game4;
