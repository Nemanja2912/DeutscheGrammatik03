import React, { useState, useEffect } from "react";
import Arrow from "../assets/img/arrow_down.svg";
import Screen1 from "./screen1";
import Screen2 from "./screen2";
import Logo from "../assets/img/logo.png";
import "../css/style.css";
import Credits from "./credits";

const Menu = ({ navMenuItem, setNavMenuItem, navButtonRef, menuRef }) => {
  const [movePos, setMovePos] = useState(0);
  const [buttonAnimation, setButtonAnimation] = useState(false);
  const [hide, setHide] = useState(true);
  const [credits, setCredits] = useState(false);

  const increaseMovePos = () => {
    if (movePos === 3) {
      setMovePos(0);
    } else {
      setMovePos(movePos + 1);
    }

    setButtonAnimation(true);
  };

  const setSpecificPos = (n) => {
    setMovePos(n);
  };

  useEffect(() => {
    if (movePos === 1) {
      setTimeout(() => {
        setButtonAnimation(false);
      }, 1000);
    }
  }, [movePos]);

  const handleOpenMenu = () => {
    if (movePos === 2) {
      setMovePos(3);
    } else {
      setMovePos(2);
    }
  };

  return (
    <div
      className={`menu ${
        movePos === 2 ? "menu-small" : movePos === 3 ? "menu-medium" : ""
      } ${credits ? "full-menu" : ""}`}
      onClick={() => {
        if (movePos === 2) handleOpenMenu();
      }}
    >
      <Screen1 movePos={movePos} />
      {movePos !== 0 && (
        <Screen2
          item={navMenuItem}
          changeItem={(n) => setNavMenuItem(n)}
          movePos={movePos}
          changePos={setSpecificPos}
          navButtonRef={navButtonRef}
        />
      )}
      <div
        onClick={increaseMovePos}
        className={`button ${buttonAnimation ? "buttonHidden" : ""}`}
      >
        WEITER
      </div>
      <div
        className={`info ${movePos === 1 || movePos === 2 ? "info-small" : ""}`}
      >
        <img src={Logo} alt="" />
      </div>
      <div className={`bottom ${movePos === 2 ? "bottomHide" : ""}`}>
        <p
          onClick={() => {
            setHide(false);
            setCredits(true);
          }}
        >
          Credits
        </p>
        <p>
          <a
            href="https://www.goethe.de/de/imp.html"
            target="_blank"
            rel="noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Impressum
          </a>
        </p>
      </div>
      <div className="arrow" ref={menuRef} onClick={handleOpenMenu}>
        <img
          className={`image ${
            movePos === 2 || movePos === 3 ? "imageShow" : ""
          }`}
          style={{ transform: movePos === 3 ? "rotate(180deg)" : "rotate(0)" }}
          src={Arrow}
          alt=""
        />
      </div>
      <Credits
        hide={hide}
        setHide={setHide}
        setCredits={setCredits}
        movePos={movePos}
      />
    </div>
  );
};

export default Menu;
