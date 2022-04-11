import React, { useState } from "react";

import InteractiveLeftSide from "./InteractiveLeftSide";
import StepTwoRightSide from "./StepTwoRightSide";

const InteractiveStepTwo = ({
  group,
  activeOption,
  stepLevel,
  success,
  setSuccess,
  keyboard,
  display,
  setKeyboard,
  words,
  setWords,
}) => {
  const leftText = `${group.pronoun}-Form bilden`;

  return (
    <div className="step">
      <InteractiveLeftSide
        foot="left"
        text={leftText}
        show={activeOption !== -1 && stepLevel[activeOption][0] >= 0}
        success={success[activeOption]}
      />
      {activeOption === 0 && display && (
        <StepTwoRightSide
          activeOption={activeOption}
          group={group}
          success={success}
          setSuccess={setSuccess}
          stepLevel={stepLevel}
          activeHardCode={0}
          words={words}
          display={display}
          keyboard={keyboard}
          returnKeyboardStatus={(status) => {
            setKeyboard(status);
          }}
          setWords={setWords}
        />
      )}
      {activeOption === 1 && display && (
        <StepTwoRightSide
          activeOption={activeOption}
          group={group}
          success={success}
          setSuccess={setSuccess}
          stepLevel={stepLevel}
          activeHardCode={1}
          words={words}
          display={display}
          keyboard={keyboard}
          returnKeyboardStatus={(status) => setKeyboard(status)}
          setWords={setWords}
        />
      )}
    </div>
  );
};

export default InteractiveStepTwo;
