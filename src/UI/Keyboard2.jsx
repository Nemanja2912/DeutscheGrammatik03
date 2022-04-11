import React, { useState } from "react";
import ReactDOM from "react-dom";
import Del from "../assets/img/SVG/backspace.svg";
import Enter from "../assets/img/SVG/enter.svg";
import Up from "../assets/img/SVG/shift.svg";
import Space from "../assets/img/SVG/space.svg";
import Down from "../assets/img/SVG/down.svg";

const keyboard = [
  [
    "q",
    "w",
    "e",
    "r",
    "t",
    "z",
    "u",
    "i",
    "o",
    "p",
    "ü",
    "ß",
    <img style={{ width: 20 }} btn={"del"} src={Del} alt="" />,
  ],
  [
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "ö",
    "ä",
    <img style={{ width: 20 }} src={Enter} alt="" />,
  ],
  [
    <img style={{ width: 20 }} btn="up" src={Up} alt="" />,
    "y",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    <img style={{ width: 80 }} size={3} src={Space} alt="" />,
  ],
];

const Keyboard = ({
  disable,
  returnLetter = () => {},
  returnStatus = () => {},
  keyboardStatus = true,
}) => {
  const [show, setShow] = useState(keyboardStatus);
  const [shiftActive, setShiftActive] = useState(false);

  const keyboardStyle = {
    position: "absolute",
    bottom: disable ? -270 : show && keyboardStatus ? 0 : -216,
    backgroundColor: "#9AA1A5",
    zIndex: "10",
    left: 0,
    right: 0,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    padding: 2,
    transition: "500ms",
    fontSize: 20,
    pointerEvents: disable ? "none" : "initial",
  };

  const lineStyle = {
    display: "flex",
    justifyContent: "center",
    gap: 1,
  };

  const buttonStyle = {
    backgroundColor: "#BBC0C3",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    cursor: "pointer",
    color: "#80898E",
    borderRadius: 5,
  };

  const hideButtonStyle = {
    position: "absolute",
    right: 0,
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "15px 15px 0 0",
    transform: `translateY(-99%)`,
    backgroundColor: "#9AA1A5",
    width: 70,
    height: 50,
    cursor: "pointer",
  };

  return ReactDOM.createPortal(
    <div className="keyboard" style={keyboardStyle}>
      <div
        className="hide"
        style={hideButtonStyle}
        onClick={() => {
          setShow((prev) => {
            returnStatus(!prev);

            return !prev;
          });
        }}
      >
        <img
          style={{
            transform:
              show && keyboardStatus ? "rotate(0deg)" : "rotate(180deg)",
          }}
          src={Down}
          alt=""
        />
      </div>
      {keyboard.map((line, lineIndex) => (
        <div className="line" key={lineIndex} style={lineStyle}>
          {line.map((letter, letterIndex) => {
            const button =
              letter.type === "img" || letter === "ß"
                ? letter
                : shiftActive
                ? letter.toUpperCase()
                : letter;

            return (
              <div
                key={letterIndex}
                className="button"
                onClick={() => {
                  console.log(button);

                  if (letter.props?.btn === "del") {
                    window.dispatchEvent(
                      new KeyboardEvent("keydown", { key: "Backspace" })
                    );
                  } else if (letter.props?.btn === "up") {
                    setShiftActive(true);
                  } else {
                    window.dispatchEvent(
                      new KeyboardEvent("keydown", { key: button })
                    );
                  }
                }}
                style={{
                  ...buttonStyle,
                  width: letter.props?.size === 3 ? 210 : 70,
                }}
              >
                {button}
              </div>
            );
          })}
        </div>
      ))}
    </div>,
    document.querySelector("#keyboard")
  );
};

export default Keyboard;
