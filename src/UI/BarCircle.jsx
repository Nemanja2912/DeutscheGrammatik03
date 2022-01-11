import DetailsBox from "./DetailsBox";
import { useRef, useState, useEffect } from "react";

const BarCircle = ({ detailsText, children, color, onClick }) => {
  const barCircleStyle = {
    position: "relative",
  };

  const circleStyle = {
    fontWeight: 700,
    fontSize: 20,
    height: 35,
    width: 35,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "0.5s",
    backgroundColor: color,
    color: "#fff",
  };

  let boxStyle = {
    transform: "rotate(180deg)",
    position: "absolute",
    top: 60,
    transition: "0.5s",
  };

  const [leftPos, setLeftPos] = useState(0);
  const [show, setShow] = useState(false);
  const boxRef = useRef(null);

  const [customCircleStyle, setCustomCircleStyle] = useState({
    transform: "scale(1)",
  });

  useEffect(() => {
    setLeftPos((boxRef.current.getBoundingClientRect().width / 2 - 17.5) * -1);
  }, []);

  return (
    <div className="bar-circle" style={barCircleStyle}>
      <div
        className="circle"
        style={{ ...circleStyle, ...customCircleStyle }}
        onMouseMove={() => {
          setCustomCircleStyle({ transform: "scale(1.1)" });
          setShow(true);
        }}
        onMouseOut={() => {
          setCustomCircleStyle({ transform: "scale(1)" });
          setShow(false);
        }}
        onClick={onClick}
      >
        {children}
      </div>
      <div
        className="box"
        style={{
          ...boxStyle,
          left: leftPos,
          opacity: show ? 1 : 0,
        }}
        ref={boxRef}
      >
        <DetailsBox width={"max-content"} backgroundColor={"#788287"}>
          <p style={{ transform: "rotate(180deg)" }}>{detailsText}</p>
        </DetailsBox>
      </div>
    </div>
  );
};

export default BarCircle;
