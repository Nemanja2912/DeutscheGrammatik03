import ReactDOM from "react-dom";
import React, { useState, useReducer, useEffect, useRef } from "react";

import StepsOptionInteractive from "./StepsOptionInteractive";
import InteractiveStepOne from "./InteractiveStepOne";
import ImageModal from "./ImageModal";
import StatusBar from "../UI/StatusBar";

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

  const [level, setLevel] = useState([-1, -1]);

  const [stepLevel, setStepLevel] = useState([
    [-1, -1, -1],
    [-1, -1, -1],
  ]);

  const [successStepTwo, setSuccessStepTwo] = useState([false, false]);
  const [successStepThree, setSuccessStepThree] = useState([false, false]);
  const [successStepFour, setSuccessStepFour] = useState([false, false]);

  const [infoText, setInfoText] = useState(
    <>
      Wie bildet man die Imperativ-Formen? <br /> Klick die blauen Felder an.
    </>
  );
  const [infoOverlay, setInfoOverlay] = useState(false);
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [helpFingerPosition, setHelpFingerPosition] = useState("init");
  const [preventHelp, setPreventHelp] = useState(false);

  const optionRefs = [useRef(null), useRef(null)];

  const [words, setWords] = useState(["", ""]);

  const [helpEraser, setHelpEraser] = useState([false, false]);
  const eraserRefs = [useRef(null), useRef(null)];

  const increaseLevel = (step) => {
    setStepLevel((prev) => {
      prev[activeOption][step] += 1;

      return [...prev];
    });
  };

  const levelUp = () => {
    setLevel((prev) => {
      prev[activeOption] += 1;

      return [...prev];
    });
  };

  useEffect(() => {
    if (activeOption !== -1 && stepLevel[activeOption][0] === -1) {
      levelUp();
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
      levelUp();
      increaseLevel(1);

      setTimeout(() => {
        increaseLevel(1);
      }, 1000);
    } else if (successStepTwo[1] && stepLevel[activeOption][1] === -1) {
      increaseLevel(1);

      levelUp();

      setTimeout(() => {
        increaseLevel(1);
      }, 1000);
    }
  }, [successStepTwo]);

  useEffect(() => {
    if (successStepThree[0] && stepLevel[activeOption][2] === -1) {
      increaseLevel(2);

      levelUp();

      setTimeout(() => {
        increaseLevel(2);

        setTimeout(() => {
          increaseLevel(2);
        }, 1000);
      }, 1000);
    } else if (successStepThree[1] && stepLevel[activeOption][2] === -1) {
      increaseLevel(2);

      levelUp();

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

  useEffect(() => {
    if (!helpOverlay) return;

    let index;

    if (activeOption === -1 || successStepFour[0] || successStepFour[1]) {
      if (!successStepFour[0]) {
        index = 0;
      } else if (!successStepFour[1]) {
        index = 1;
      }
    } else {
      index = activeOption;
    }

    console.log("index:", index);

    const currentLevel = level[index];

    if (currentLevel === -1 || activeOption !== index) {
      setHelpFingerPosition([
        optionRefs[index].current.getBoundingClientRect().left +
          optionRefs[index].current.getBoundingClientRect().width / 2,
        optionRefs[index].current.getBoundingClientRect().top +
          optionRefs[index].current.getBoundingClientRect().height / 2,
      ]);

      setTimeout(() => {
        optionRefs[index].current.click();
      }, 1250);
    } else if (currentLevel === 0) {
      setWords((prev) => {
        const word = prev[activeOption].split("");
        const originalWord = group[choiceLevel].guessWord[activeOption].word
          .split("")
          .slice(1);

        for (let i = 0; i < originalWord.length; i++) {
          if (word[i] !== originalWord[i]) {
            word[i] = originalWord[i];
            break;
          }
        }

        prev[activeOption] = word.join("");

        return [...prev];
      });
    } else if (currentLevel === 1) {
      const initX =
        eraserRefs[index].current.getBoundingClientRect().left +
        eraserRefs[index].current.getBoundingClientRect().width / 2;

      const absoluteX = -parseFloat(eraserRefs[index].current.style.left) - 35;
      const absoluteY = -parseFloat(eraserRefs[index].current.style.top) + 25;

      const initY =
        eraserRefs[index].current.getBoundingClientRect().top +
        eraserRefs[index].current.getBoundingClientRect().height / 2;

      setHelpFingerPosition([initX, initY]);

      setTimeout(() => {
        setHelpFingerPosition([initX + 65 + absoluteX, initY + absoluteY]);

        setTimeout(() => {
          setHelpFingerPosition([initX + absoluteX, initY + absoluteY]);

          setTimeout(() => {
            setHelpFingerPosition([initX + 65 + absoluteX, initY + absoluteY]);
            setTimeout(() => {
              setHelpFingerPosition([initX + absoluteX, initY + absoluteY]);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1250);

      setTimeout(() => {
        setHelpEraser((prev) => {
          prev[index] = true;

          return [...prev];
        });
      }, 1250);
    }
  }, [helpOverlay]);

  useEffect(() => {
    if (level[activeOption] === 0) {
      setHelpFingerPosition("disable");
      console.log("disable");
    } else {
      setHelpFingerPosition("init");
      console.log("init");
    }
  }, [level, activeOption]);

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
          optionRefs={optionRefs}
        />
        <StepsOptionInteractive
          group={group[choiceLevel]}
          display={display}
          activeOption={activeOption}
          stepLevel={stepLevel}
          help={helpEraser}
          keyboard={keyboard}
          setKeyboard={setKeyboard}
          choiceLevel={choiceLevel}
          successStepTwo={successStepTwo}
          setSuccessStepTwo={setSuccessStepTwo}
          successStepThree={successStepThree}
          setSuccessStepThree={setSuccessStepThree}
          successStepFour={successStepFour}
          setSuccessStepFour={setSuccessStepFour}
          words={words}
          setWords={setWords}
          eraserRef={eraserRefs}
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
      {miniBox && display && (
        <StatusBar
          infoText={infoText}
          infoOverlay={infoOverlay}
          setInfoOverlay={setInfoOverlay}
          setHelpOverlay={setHelpOverlay}
          preventHelp={preventHelp}
          helpFingerPosition={helpFingerPosition}
        />
      )}
    </>
  );
};

export default InteractiveScreen;
