import React, { useState } from "react";
import Group from "./part1/Group";
import Undo from "../assets/img/SVG/undo.svg";

const ChooseOption = ({
  optionActive,
  setOptionActive,
  group,
  miniBox,
  setMiniBox,
  choiceDisable,
  finished,
  setKeyboard,
}) => {
  const handleChooseOption = (index) => {
    if (choiceDisable) return;

    setMiniBox(true);

    setOptionActive(index);

    setKeyboard();
  };

  const handleBackToMainMenu = () => {
    if (choiceDisable) return;

    setMiniBox(false);
  };

  return (
    <div className="choose-option" style={{ left: miniBox ? -465 : 350 }}>
      {group.map((group, index) => (
        <Group
          word={group.word}
          box={group.pronoun}
          key={index}
          active={index === optionActive}
          index={index}
          handleChooseOption={() => handleChooseOption(index)}
          miniBox={miniBox}
          finished={finished}
        />
      ))}
      {miniBox && (
        <div className="back-button" onClick={handleBackToMainMenu}>
          <img src={Undo} alt="" />
        </div>
      )}
    </div>
  );
};

export default ChooseOption;
