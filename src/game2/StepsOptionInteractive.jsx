import React from "react";
import InteractiveStepThree from "./InteractiveStepThree";
import InteractiveStepTwo from "./InteractiveStepTwo";
import InteractiveStepFour from "./InteractiveStepFour";

const StepsOptionInteractive = ({
  group,
  activeOption,
  stepLevel,
  keyboard,
  setKeyboard,
  display,
  choiceLevel,
  words,
  setWords,
  help,
  eraserRef,
  successStepTwo,
  setSuccessStepTwo,
  successStepThree,
  setSuccessStepThree,
  successStepFour,
  setSuccessStepFour,
}) => {
  return (
    <>
      <InteractiveStepTwo
        group={group}
        activeOption={activeOption}
        stepLevel={stepLevel}
        keyboard={keyboard}
        display={display}
        setKeyboard={setKeyboard}
        success={successStepTwo}
        setSuccess={setSuccessStepTwo}
        words={words}
        setWords={setWords}
      />
      <InteractiveStepThree
        group={group}
        help={help}
        activeOption={activeOption}
        stepLevel={stepLevel}
        choiceLevel={choiceLevel}
        eraserRef={eraserRef}
        successStepThree={successStepThree}
        setSuccessStepThree={setSuccessStepThree}
      />
      <InteractiveStepFour
        group={group}
        activeOption={activeOption}
        stepLevel={stepLevel}
        success={successStepFour}
        setSuccess={setSuccessStepFour}
      />
    </>
  );
};

export default StepsOptionInteractive;
