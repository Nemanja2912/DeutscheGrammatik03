import React, { useState, useEffect } from "react";

import "../css/game3.css";
import ImageInteractiveScreen from "./ImageInteractiveScreen";
import FormInteractiveScreen from "./FormInteractiveScreen";
import InteractivePosition from "./InteractivePosition";

const Game3 = () => {
  const [level, setLevel] = useState(0);

  const handleLevel = () => {
    setLevel((prev) => prev + 1);
  };

  return (
    <div className="game3">
      <ImageInteractiveScreen display={level === 0} nextLevel={handleLevel} />
      <FormInteractiveScreen display={level === 1} nextLevel={handleLevel} />
      <InteractivePosition display={level === 2} nextLevel={handleLevel} />
    </div>
  );
};

export default Game3;
