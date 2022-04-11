import React, { useState } from "react";
import InteractiveLeftSide from "./InteractiveLeftSide";
import Box from "../UI/Box";
import EraseWord from "./../UI/EraseWord";
import EraseMoveWord from "../UI/EraseMoveWord";

const InteractiveStepThree = ({
  group,
  activeOption,
  stepLevel,
  successStepThree,
  setSuccessStepThree,
  choiceLevel,
  help,
  eraserRef,
}) => {
  let leftText = `Mit ${
    choiceLevel === 2 ? "Wortwechsler" : "Radiergummi"
  } arbeiten`;

  return (
    <div className="step">
      <InteractiveLeftSide
        foot="left"
        text={leftText}
        show={activeOption !== -1 && stepLevel[activeOption][1] >= 0}
        success={successStepThree[activeOption]}
      />
      {
        <div className="right" style={{ position: "relative" }}>
          <div
            className="wrapper"
            style={{
              opacity:
                activeOption === 0 && stepLevel[activeOption][1] >= 1 ? 1 : 0,
              position: "relative",
              zIndex: activeOption === 0 ? 10 : 1,
              pointerEvents: activeOption === 0 ? "initial" : "none",
            }}
          >
            <div
              className="div"
              style={{
                opacity:
                  activeOption !== -1 && stepLevel[activeOption][1] >= 1
                    ? 1
                    : 0,
                transition: "0.5s",
              }}
            >
              {choiceLevel !== 2 ? (
                <EraseWord
                  word={group.eraseWord[0]}
                  success={() =>
                    setSuccessStepThree((prev) => {
                      prev[0] = true;
                      return [...prev];
                    })
                  }
                  eraserRef={eraserRef[0]}
                  active={activeOption === 0 && stepLevel[0][1] >= 1}
                  help={help[0]}
                />
              ) : (
                <EraseMoveWord
                  word={group.eraseWord[0]}
                  success={() =>
                    setSuccessStepThree((prev) => {
                      prev[0] = true;
                      return [...prev];
                    })
                  }
                  eraserRef={eraserRef[0]}
                  help={help[0]}
                  active={activeOption === 0 && stepLevel[0][1] >= 1}
                />
              )}
            </div>
          </div>
          <div
            className="wrapper"
            style={{
              opacity:
                activeOption === 1 && stepLevel[activeOption][1] >= 1 ? 1 : 0,
              position: "absolute",
              left: 0,
              zIndex: activeOption === 1 ? 10 : 1,
              pointerEvents: activeOption === 1 ? "initial" : "none",
            }}
          >
            <div
              className="div"
              style={{
                opacity:
                  activeOption !== -1 && stepLevel[activeOption][1] >= 1
                    ? 1
                    : 0,
                transition: "0.5s",
              }}
            >
              {choiceLevel !== 2 ? (
                <EraseWord
                  word={group.eraseWord[1]}
                  eraserRef={eraserRef[1]}
                  help={help[1]}
                  success={() =>
                    setSuccessStepThree((prev) => {
                      prev[1] = true;
                      return [...prev];
                    })
                  }
                  active={activeOption === 1 && stepLevel[1][1] >= 1}
                />
              ) : (
                <EraseMoveWord
                  word={group.eraseWord[1]}
                  success={() =>
                    setSuccessStepThree((prev) => {
                      prev[1] = true;
                      return [...prev];
                    })
                  }
                  eraserRef={eraserRef[1]}
                  help={help[1]}
                  active={activeOption === 1 && stepLevel[1][1] >= 1}
                />
              )}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default InteractiveStepThree;
