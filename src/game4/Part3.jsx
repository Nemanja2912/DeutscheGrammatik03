import React, { useState, useEffect, useRef } from "react";

const Part3 = ({ children, verbID }) => {
  const [verbObj, setVerbObj] = useState({ width: 0, left: 0 });
  const textRef = useRef(null);

  useEffect(() => {
    setVerbObj({
      left:
        textRef.current.children[verbID].getBoundingClientRect().left +
        textRef.current.children[verbID].getBoundingClientRect().width / 2,
      width:
        textRef.current.children[
          textRef.current.children.length - 1
        ].getBoundingClientRect().right -
        textRef.current.children[verbID].getBoundingClientRect().left -
        textRef.current.children[verbID].getBoundingClientRect().width / 2 -
        textRef.current.children[
          textRef.current.children.length - 1
        ].getBoundingClientRect().width /
          2,
    });
  }, []);

  return (
    <div className="part3">
      <div className="text" ref={textRef}>
        {children}
      </div>
      <div
        className="verbPointer"
        style={{ width: verbObj.width, left: verbObj.left }}
      ></div>
    </div>
  );
};

export default Part3;
