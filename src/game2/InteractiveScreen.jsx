import ReactDOM from "react-dom";
import React, { useState, useReducer, useEffect, useRef } from "react";
import GuessWord from "./../UI/GuessWord";
import EraseWord from "../UI/EraseWord";
import EraseMoveWord from "./../UI/EraseMoveWord";

import StepsOptionInteractive from "./StepsOptionInteractive";
import InteractiveStepOne from "./InteractiveStepOne";
import ImageModal from "./ImageModal";

const InteractiveScreen = ({
  choiceLevel,
  miniBox,
  group,
  display,
  handleFinished,
  keyboard,
  setKeyboard,
}) => {
  const [activeOption, setActiveOption] = useState(-1);
  const [disable, SetDisable] = useState(false);

  const [stepLevel, setStepLevel] = useState([
    [-1, -1, -1],
    [-1, -1, -1],
  ]);

  const [successStepTwo, setSuccessStepTwo] = useState([false, false]);
  const [successStepThree, setSuccessStepThree] = useState([false, false]);
  const [successStepFour, setSuccessStepFour] = useState([false, false]);

  const increaseLevel = (step) => {
    setStepLevel((prev) => {
      prev[activeOption][step] += 1;

      return [...prev];
    });
  };

  useEffect(() => {
    if (activeOption !== -1 && stepLevel[activeOption][0] === -1) {
      increaseLevel(0);

      setTimeout(() => {
        increaseLevel(0);

        setTimeout(() => {
          increaseLevel(0);
        }, 1000);
      }, 1000);
    }
  }, [activeOption]);

  useEffect(() => {
    if (successStepTwo[0] && stepLevel[activeOption][1] === -1) {
      increaseLevel(1);

      setTimeout(() => {
        increaseLevel(1);
      }, 1000);
    } else if (successStepTwo[1] && stepLevel[activeOption][1] === -1) {
      increaseLevel(1);

      setTimeout(() => {
        increaseLevel(1);
      }, 1000);
    }
  }, [successStepTwo]);

  useEffect(() => {
    if (successStepThree[0] && stepLevel[activeOption][2] === -1) {
      increaseLevel(2);

      setTimeout(() => {
        increaseLevel(2);

        setTimeout(() => {
          increaseLevel(2);
        }, 1000);
      }, 1000);
    } else if (successStepThree[1] && stepLevel[activeOption][2] === -1) {
      increaseLevel(2);

      setTimeout(() => {
        increaseLevel(2);

        setTimeout(() => {
          increaseLevel(2);
        }, 1000);
      }, 1000);
    }
  }, [successStepThree]);

  useEffect(() => {
    if (successStepFour[0] && successStepFour[1]) {
      handleFinished();
    }
  }, [successStepFour]);

  return (
    <>
      <div
        className="interactive-screen"
        style={{
          display: display ? "flex" : "none",
          left: miniBox ? 300 : 1000,
          opacity: miniBox ? 1 : 0,
        }}
      >
        <InteractiveStepOne
          onChoose={setActiveOption}
          group={group[choiceLevel].optionWord}
          disable={disable}
          completed={(index) => index > -1 && stepLevel[index][2] >= 0}
        />
        <StepsOptionInteractive
          group={group[choiceLevel]}
          display={display}
          activeOption={activeOption}
          stepLevel={stepLevel}
          keyboard={keyboard}
          setKeyboard={setKeyboard}
          choiceLevel={choiceLevel}
          successStepTwo={successStepTwo}
          setSuccessStepTwo={setSuccessStepTwo}
          successStepThree={successStepThree}
          setSuccessStepThree={setSuccessStepThree}
          successStepFour={successStepFour}
          setSuccessStepFour={setSuccessStepFour}
        />
      </div>
      {activeOption !== -1 &&
        stepLevel[activeOption][2] >= 1 &&
        !successStepFour[activeOption] && (
          <ImageModal
            group={group}
            choiceLevel={choiceLevel}
            activeOption={activeOption}
            setSuccessStepFour={setSuccessStepFour}
          />
        )}
    </>
  );
};

export default InteractiveScreen;
