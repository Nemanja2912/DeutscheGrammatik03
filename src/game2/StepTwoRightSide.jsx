import React, { useState } from "react";

import GuessWord from "../UI/GuessWord";
import Box from "../UI/Box";

let guessWord;
let firstLetter;
let restWord;

const StepTwoRightSide = ({
  activeOption,
  group,
  success,
  setSuccess,
  stepLevel,
  activeHardCode,
  words,
  display,
  setWords,
  keyboard,
  returnKeyboardStatus,
}) => {
  if (activeOption !== -1) {
    guessWord = group.guessWord[activeOption]?.word;
    firstLetter = guessWord.split("").shift();
    restWord = guessWord.slice(1);
  }

  const getWordBack = (word) => {
    setWords((prev) => {
      prev[activeHardCode] = word.join("");

      return [...prev];
    });
  };

  const handleSuccess = () => {
    setSuccess((prev) => {
      prev[activeHardCode] = true;
      return [...prev];
    });
  };

  return (
    <div
      className="right"
      style={{ opacity: activeOption === activeHardCode ? 1 : 0 }}
    >
      <Box
        success={success[activeHardCode]}
        opacity={activeOption !== -1 && stepLevel[activeHardCode][0] >= 1}
      >
        {group.pronoun}
      </Box>
      <Box
        success={success[activeHardCode]}
        opacity={activeOption !== -1 && stepLevel[activeHardCode][0] >= 2}
      >
        <>
          {firstLetter}
          <GuessWord
            word={restWord}
            getWordBack={getWordBack}
            customWord={words[activeHardCode]}
            keyboard={
              activeOption !== -1 &&
              stepLevel[activeHardCode][0] >= 2 &&
              activeOption === activeHardCode
            }
            returnKeyboardStatus={returnKeyboardStatus}
            success={handleSuccess}
            keyboardStatus={keyboard}
            disable={success[activeHardCode]}
            tipp={true}
            msg={group.guessWord[activeHardCode].tippMsg}
            customDisable={
              !(activeOption !== -1 && stepLevel[activeHardCode][0] >= 2)
            }
          />
        </>
      </Box>
      <p
        style={{
          opacity:
            activeOption !== -1 && stepLevel[activeHardCode][0] >= 2 ? 1 : 0,
          transition: "0.5s",
        }}
      >
        {group.guessWord[activeOption]?.rest}
      </p>
    </div>
  );
};

export default StepTwoRightSide;
