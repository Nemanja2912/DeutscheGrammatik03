import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

const Indicator = ({ active = false, activeFunc = () => {} }) => {
  const [animationStart, setAnimationStart] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState(active[0]);

  useEffect(() => {
    setAnimationStart(active[0]);

    setTimeout(() => {
      setAnimationStart(false);
    }, 500);
  }, [active]);

  let Indicator = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: `translate(-50%, -50%) ${
      animationStart ? "scale(1.5)" : "scale(1)"
    }`,
    zIndex: "10000",
    height: "150px",
    width: "150px",
    backgroundColor: active[0] === "wrong" ? "#EB8336" : "#a0c814",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "50px",
    pointerEvents: "none",
    transition: "1s",
    opacity: animationStart ? 1 : 0,
  };

  return ReactDOM.createPortal(
    <div className="Indicator" style={Indicator}>
      {active[0] === "wrong" ? (
        <svg
          width="352"
          height="512"
          viewBox="0 0 352 512"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_165:2)">
            <path
              d="M242.72 256L342.79 155.93C355.07 143.65 355.07 123.74 342.79 111.45L320.55 89.21C308.27 76.93 288.36 76.93 276.07 89.21L176 189.28L75.93 89.21C63.65 76.93 43.74 76.93 31.45 89.21L9.21 111.45C-3.07 123.73 -3.07 143.64 9.21 155.93L109.28 256L9.21 356.07C-3.07 368.35 -3.07 388.26 9.21 400.55L31.45 422.79C43.73 435.07 63.65 435.07 75.93 422.79L176 322.72L276.07 422.79C288.35 435.07 308.27 435.07 320.55 422.79L342.79 400.55C355.07 388.27 355.07 368.36 342.79 356.07L242.72 256Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_165:2">
              <rect width="352" height="512" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ) : (
        <svg
          width="512"
          height="382"
          viewBox="0 0 512 382"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M173.898 374.404L7.49799 208.004C-2.49901 198.007 -2.49901 181.798 7.49799 171.8L43.701 135.596C53.698 125.598 69.908 125.598 79.905 135.596L192 247.69L432.095 7.596C442.092 -2.401 458.302 -2.401 468.299 7.596L504.502 43.8C514.499 53.797 514.499 70.006 504.502 80.004L210.102 374.405C200.104 384.402 183.895 384.402 173.898 374.404Z"
            fill="white"
          />
        </svg>
      )}
    </div>,
    document.querySelector("#indicator")
  );
};

export default Indicator;
