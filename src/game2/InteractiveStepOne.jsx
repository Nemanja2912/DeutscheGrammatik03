import React, { useState } from "react";
import Box from "../UI/Box";

import Foot from "./interactive/Foot";
import InteractiveLeftSide from "./InteractiveLeftSide";

const InteractiveStepOne = ({ group, onChoose, disable, completed }) => {
  const [active, setActive] = useState(-1);

  const handleClick = (index) => {
    if (disable) return;
    setActive(index);
    onChoose(index);
  };

  return (
    <div className="step">
      <InteractiveLeftSide
        text={"Infinitiv auswählen"}
        foot="right"
        show={true}
        success={active !== -1}
      />
      <div className="right">
        {group.map((word, index) => (
          <div
            onClick={() => {
              handleClick(index);
            }}
          >
            <Box success={index === active || completed(index)} opacity={true}>
              {word}
            </Box>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveStepOne;
