import React from "react";

const Group = ({
  word,
  box,
  handleChooseOption,
  miniBox,
  active,
  finished,
  index,
  optionRef,
}) => {
  return (
    <div className="group">
      <div className="word-box">
        {word.map((word) => (
          <div className="word">{word}</div>
        ))}
      </div>
      <div className="bracket">&#125;</div>
      <div
        className="interactive-box"
        onClick={handleChooseOption}
        ref={optionRef}
        style={{
          backgroundColor: !miniBox
            ? "#5ac8f5"
            : active
            ? finished[index]
              ? "#85a70e"
              : "#5ac8f5"
            : "#d6d9db",
        }}
      >
        <div className="horizontal" style={{ opacity: miniBox ? 0 : 1 }}>
          Imperativ <span className="bold">{box}</span>-Form
        </div>
        <div className="vertical" style={{ opacity: miniBox ? 1 : 0 }}>
          {box}-form
        </div>
      </div>
    </div>
  );
};

export default Group;
