import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

const InfoOverlay = ({ children, closeFunc }) => {
  const infoOverlayStyle = {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    zIndex: 10000,
    alignItems: "center",
    transition: "0.5s",
  };

  const boxStyle = {
    backgroundColor: "#a0c814",
    width: "max-content",
    height: "max-content",
    padding: "20px 25px",
    borderRadius: "15px",
    position: "relative",
    transition: "0.2s",
    zIndex: "10000",
  };

  const titleStyle = {
    color: "#374105",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: "15px",
  };

  const textStyle = {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  };

  const closeStyle = {
    position: "absolute",
    right: "0",
    top: "0",
    backgroundColor: "#85a70e",
    height: "35px",
    width: "35px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 0.5s",
  };

  const svgStyle = {
    width: "35%",
    marginLeft: "5px",
  };

  const [animateOverlay, setAnimateOverlay] = useState(false);
  const [customBoxStyle, setCustomBoxStyle] = useState({
    transform: "scale(0.5)",
    opacity: 0,
  });

  const [customCloseStyle, setCustomCloseStyle] = useState({
    transform: "scale(1) translate(50%, -50%)",
    opacity: 0,
  });

  useEffect(() => {
    setAnimateOverlay(true);
    setCustomBoxStyle((prev) => {
      return { ...prev, transform: "scale(1.2)", opacity: 1 };
    });

    setTimeout(() => {
      setCustomBoxStyle((prev) => {
        return { ...prev, transform: "scale(1)" };
      });

      setTimeout(() => {
        setCustomCloseStyle((prev) => {
          return {
            ...prev,
            transform: "scale(1.2) translate(50%, -50%)",
            opacity: 1,
          };
        });

        setTimeout(() => {
          setCustomCloseStyle((prev) => {
            return { ...prev, transform: "scale(1) translate(50%, -50%)" };
          });
        }, 200);
      }, 200);
    }, 200);
  }, []);

  const handleClose = () => {
    // setAnimateBox(false);
    setTimeout(() => {
      setCustomBoxStyle((prev) => {
        return { ...prev, transform: "scale(0.5)", opacity: 0 };
      });
      setAnimateOverlay(false);

      setTimeout(() => {
        closeFunc();
      }, 500);
    }, 200);
  };

  return ReactDOM.createPortal(
    <div
      className="info-overlay"
      style={{ ...infoOverlayStyle, opacity: animateOverlay ? "1" : "0" }}
      onClick={handleClose}
    >
      <div
        className="box"
        style={{
          ...boxStyle,
          ...customBoxStyle,
        }}
      >
        <div className="title" style={titleStyle}>
          Aufgabe
        </div>
        <div className="text" style={textStyle}>
          {children}
        </div>
        <div
          className="close"
          onClick={handleClose}
          style={{ ...closeStyle, ...customCloseStyle }}
          onMouseMove={() => {
            setCustomCloseStyle({
              transform: "scale(1.1) translate(50%, -50%)",
            });
          }}
          onMouseOut={() => {
            setCustomCloseStyle({
              transform: "scale(1) translate(50%, -50%)",
            });
          }}
        >
          <svg
            width="266"
            height="438"
            viewBox="0 0 266 438"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={svgStyle}
          >
            <path
              d="M258.476 235.971L64.1319 430.314C54.7589 439.687 39.5629 439.687 30.1909 430.314L7.5239 407.647C-1.8331 398.29 -1.8511 383.125 7.4839 373.746L161.505 219L7.4839 64.255C-1.8511 54.876 -1.8331 39.711 7.5239 30.354L30.1909 7.68701C39.5639 -1.68599 54.7599 -1.68599 64.1319 7.68701L258.475 202.03C267.848 211.402 267.848 226.598 258.476 235.971Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>,
    document.querySelector("#info")
  );
};

export default InfoOverlay;
