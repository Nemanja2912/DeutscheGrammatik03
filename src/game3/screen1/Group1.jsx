import React, { useRef, useState, useEffect } from "react";
import Ball from "../../UI/Ball";

const Group1 = () => {
  const verb1 = useRef(null);
  const verb2 = useRef(null);

  const [verbCircle, setVerbCircle] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    setVerbCircle((prev) => {
      return {
        ...prev,
        left: verb1.current.getBoundingClientRect().left,
        width:
          verb2.current.getBoundingClientRect().right -
          verb1.current.getBoundingClientRect().left,
      };
    });
  }, []);
  return (
    <>
      <div className="drop-zone">
        <svg
          width="400"
          viewBox="0 0 685 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M684.561 26.5884C583.244 93.8771 464.344 129.815 342.718 129.91C221.092 130.006 102.135 94.2556 0.712799 27.1263L17.9111 1.14221C114.226 64.891 227.193 98.8412 342.693 98.7504C458.194 98.6595 571.107 64.5315 667.322 0.631348L684.561 26.5884Z"
            fill="#C4C4C4"
          />
        </svg>

        <div className="balls">
          <Ball>Sie</Ball>
          <Ball color={"#3FA0C8"} ballRef={verb1}>
            hat
          </Ball>
          <Ball>im Laden</Ball>
          <Ball>ein Buch</Ball>
          <Ball color={"#3FA0C8"} ballRef={verb2}>
            gekauft
          </Ball>
        </div>
      </div>
      <div
        className="verb-half-circle"
        style={{
          left: verbCircle.left,
          width: verbCircle.width,
          height: verbCircle.width,
        }}
      >
        <div
          className="cut"
          style={{
            width: verbCircle.width + 10,
            height: verbCircle.width / 2.41,
          }}
        ></div>
      </div>
    </>
  );
};

export default Group1;
