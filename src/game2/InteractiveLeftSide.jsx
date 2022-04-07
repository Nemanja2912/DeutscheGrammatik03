import React from "react";

import Foot from "./interactive/Foot";

const InteractiveLeftSide = ({ foot, text, show, success }) => {
  return (
    <div
      className="left"
      style={{
        opacity: show ? 1 : 0.5,
        transition: "0.5s",
      }}
    >
      <Foot color={success ? "#85a70e" : "#788287"} footType={foot} />
      <p>{text}</p>
    </div>
  );
};

export default InteractiveLeftSide;
