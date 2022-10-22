import React, { useState, useRef, useEffect } from "react";
import "../css/game1.css";
import Indicator from "../UI/Indicator";

const Line = ({ sentence, secondIndex = 3, onCompleted, startHelp }) => {
  const cloneRef = useRef(null);
  const blankRef = useRef(null);

  const [finished, setFinished] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState(false);

  const handleMove = (initEvent, index) => {
    if (finished) return;
    if (index !== 0 && index !== secondIndex) {
      setActiveIndicator(["wrong"]);
      return;
    }

    cloneRef.current.style.transition = "0s";
    cloneRef.current.style.pointerEvents = "initial";
    cloneRef.current.style.opacity = 1;

    const initElementX = cloneRef.current.getBoundingClientRect().left;
    const initElementY = cloneRef.current.getBoundingClientRect().top;

    if (secondIndex) {
      if (index !== secondIndex) {
        cloneRef.current.children[0].innerHTML = initEvent.target.innerHTML;
        cloneRef.current.children[1].style.backgroundColor = "transparent";
        cloneRef.current.children[1].innerHTML =
          initEvent.target.parentNode.children[secondIndex].innerHTML;
        cloneRef.current.style.left =
          initEvent.target.getBoundingClientRect().left - initElementX + "px";

        if (initEvent.target.innerHTML === "Geben") {
          cloneRef.current.children[1].innerHTML += "!";
        }

        initEvent.target.parentNode.children[secondIndex].style.opacity = "0.5";
      } else {
        cloneRef.current.children[1].innerHTML = initEvent.target.innerHTML;
        cloneRef.current.children[0].style.backgroundColor = "transparent";
        cloneRef.current.children[0].innerHTML =
          initEvent.target.parentNode.children[0].innerHTML;

        cloneRef.current.style.left =
          initEvent.target.getBoundingClientRect().left -
          initEvent.target.parentNode.children[0].getBoundingClientRect()
            .width -
          initElementX +
          "px";

        if (initEvent.target.parentNode.children[0].innerHTML === "Geben") {
          cloneRef.current.children[1].innerHTML += "!";
        }

        initEvent.target.parentNode.children[0].style.opacity = "0.5";
      }
    } else {
      cloneRef.current.children[0].innerHTML = initEvent.target.innerHTML + "!";
      cloneRef.current.style.left =
        initEvent.target.getBoundingClientRect().left - initElementX + "px";

      console.log(initEvent.target.innerHTML);
    }

    cloneRef.current.style.top =
      initEvent.target.getBoundingClientRect().top - initElementY + "px";

    initEvent.target.style.opacity = "0.5";

    const initClientX =
      initEvent.clientX - initEvent.target.getBoundingClientRect().left;
    const initClientY =
      initEvent.clientY - initEvent.target.getBoundingClientRect().top;

    const moveElement = (moveEvent) => {
      cloneRef.current.style.top =
        moveEvent.clientY - initClientY - initElementY + "px";

      if (secondIndex) {
        if (index === secondIndex) {
          cloneRef.current.style.left =
            moveEvent.clientX -
            initClientX -
            initEvent.target.parentNode.children[0].getBoundingClientRect()
              .width -
            initElementX +
            "px";
        } else {
          cloneRef.current.style.left =
            moveEvent.clientX - initClientX - initElementX + "px";
        }
      } else {
        cloneRef.current.style.left =
          moveEvent.clientX - initClientX - initElementX + "px";
      }
    };

    const moveEnd = (moveEvent) => {
      document.removeEventListener("mousemove", moveElement);
      document.removeEventListener("mouseup", moveEnd);

      if (
        moveEvent.clientX > blankRef.current.getBoundingClientRect().left &&
        moveEvent.clientX < blankRef.current.getBoundingClientRect().right &&
        moveEvent.clientY > blankRef.current.getBoundingClientRect().top &&
        moveEvent.clientY < blankRef.current.getBoundingClientRect().bottom
      ) {
        cloneRef.current.style.transition = ".25s";
        cloneRef.current.style.left = 0 + "px";
        cloneRef.current.style.top = 0 + "px";

        setActiveIndicator(["correct"]);
        setFinished(true);
        onCompleted();
      } else {
        cloneRef.current.style.pointerEvents = "none";
        cloneRef.current.style.opacity = 0;
        initEvent.target.parentNode.children[0].style.opacity = "1";

        if (secondIndex) {
          initEvent.target.parentNode.children[secondIndex].style.opacity = "1";
        }

        setActiveIndicator(["wrong"]);

        cloneRef.current.style.left = 0 + "px";
        cloneRef.current.style.top = 0 + "px";
      }
    };

    document.addEventListener("mousemove", moveElement);
    document.addEventListener("mouseup", moveEnd);
  };

  useEffect(() => {
    const element = elementRef.current.children[0];

    if (!startHelp) return;

    cloneRef.current.style.transition = "0s";
    cloneRef.current.style.pointerEvents = "initial";
    cloneRef.current.style.opacity = 1;

    const initElementX = cloneRef.current.getBoundingClientRect().left;
    const initElementY = cloneRef.current.getBoundingClientRect().top;

    if (secondIndex) {
      cloneRef.current.children[0].innerHTML = element.innerHTML;
      cloneRef.current.children[1].style.backgroundColor = "transparent";
      cloneRef.current.children[1].innerHTML =
        element.parentNode.children[secondIndex].innerHTML;
      cloneRef.current.style.left =
        element.getBoundingClientRect().left - initElementX + "px";

      element.parentNode.children[secondIndex].style.opacity = "0.5";
    } else {
      cloneRef.current.children[0].innerHTML = element.innerHTML;
      cloneRef.current.style.left =
        element.getBoundingClientRect().left - initElementX + "px";
    }

    cloneRef.current.style.top =
      element.getBoundingClientRect().top - initElementY + "px";

    element.style.opacity = "0.5";

    cloneRef.current.style.transition = "1s linear";
    cloneRef.current.style.left =
      0 +
      blankRef.current.getBoundingClientRect().width / 2 -
      element.getBoundingClientRect().width / 2 +
      "px";

    setTimeout(() => {
      cloneRef.current.style.transition = ".25s";
      cloneRef.current.style.left = 0 + "px";
      cloneRef.current.style.top = 0 + "px";

      setActiveIndicator(["correct"]);
      setFinished(true);
      onCompleted();
    }, 1250);
  }, [startHelp]);

  const elementRef = useRef(null);

  return (
    <>
      <>
        <div className={`line ${finished && "finished"}`}>
          <div className="blank" ref={blankRef}>
            <div className="clone" ref={cloneRef}>
              <p></p>
              <p></p>
            </div>
          </div>
          <div className="sentence" ref={elementRef}>
            {sentence.map((word, index) => (
              <p onMouseDown={(e) => handleMove(e, index)}>{word}</p>
            ))}
          </div>
        </div>
      </>
      <Indicator active={activeIndicator} />
    </>
  );
};

export default Line;
