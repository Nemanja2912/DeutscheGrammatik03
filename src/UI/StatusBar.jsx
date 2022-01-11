import BarCircle from "./BarCircle";
import InfoOverlay from "./InfoOverlay";
import { useState } from "react";
import HelpOverlay from "./HelpOverlay";

const StatusBar = ({
  infoText,
  infoOverlay,
  setInfoOverlay = () => {},
  setHelpOverlay = () => {},
  helpFingerPosition,
}) => {
  let barStyle = {
    position: "absolute",
    right: 25,
    top: 80,
    display: "flex",
    gap: 5,
  };

  const [showInfo, setShowInfo] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <div className="status-bar" style={barStyle}>
        <BarCircle
          detailsText={"Information"}
          color={"#a0c814"}
          onClick={() => setShowInfo(true)}
        >
          i
        </BarCircle>
        <BarCircle
          detailsText={"Hilfe"}
          color={"#5ac8f5"}
          onClick={() => {
            setHelpOverlay(true);
            setShowHelp(true);
          }}
        >
          ?
        </BarCircle>
      </div>
      {(showInfo || infoOverlay) && (
        <InfoOverlay
          closeFunc={() => {
            setInfoOverlay(false);
            setShowInfo(false);
          }}
        >
          {infoText}
        </InfoOverlay>
      )}

      {showHelp && (
        <HelpOverlay
          pos={helpFingerPosition}
          closeOverlay={() => {
            setHelpOverlay(false);
            setShowHelp(false);
          }}
        />
      )}
    </>
  );
};

export default StatusBar;
