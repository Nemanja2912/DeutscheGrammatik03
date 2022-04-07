import React from "react";
import Box from "../UI/Box";
import Foot from "./interactive/Foot";
import InteractiveLeftSide from "./InteractiveLeftSide";

const InteractiveStepFour = ({
  group,
  activeOption,
  stepLevel,
  successStepFour,
  setSuccessStepFour,
}) => {
  const leftText = "Imperativ fertig";

  return (
    <>
      <div className="step">
        <InteractiveLeftSide
          foot="both"
          text={leftText}
          show={activeOption !== -1 && stepLevel[activeOption][2] >= 0}
          success={activeOption !== -1 && stepLevel[activeOption][2] >= 0}
        />
        <div className="right">
          <Box success={true} opacity={stepLevel[0][2] >= 1}>
            {group.step4[0].word}
          </Box>
          <Box success={true} opacity={stepLevel[1][2] >= 0}>
            {group.step4[1].word}
          </Box>
        </div>
      </div>
    </>
  );
};

export default InteractiveStepFour;
