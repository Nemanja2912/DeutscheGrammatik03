import React from "react";

const Box = ({ children, success, opacity }) => {
  return (
    <div
      className={`box ${success && "no-pointer"}`}
      style={{
        backgroundColor: success ? "#a0c814" : "#5ac8f5",
        opacity: opacity ? 1 : 0,
        transition: "0.5s",
      }}
    >
      {children}
    </div>
  );
};

export default Box;
