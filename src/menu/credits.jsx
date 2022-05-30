import React from "react";
import Close from "../assets/img/wrong.svg";

const Credits = ({ hide, setHide, setCredits, movePos }) => {
  return (
    <div
      className={`credits ${hide ? " " : "credits-opacity"}`}
      style={{
        transitionDelay: movePos === 3 && hide === false ? "750ms" : "0s",
      }}
    >
      <div
        className="close"
        onClick={() => {
          setHide(true);
          setCredits(false);
        }}
      >
        <img src={Close} alt="" />
      </div>
      <font color="#788287">
        <b>CREDITS</b>
      </font>
      <br />
      <b>Autoren:</b> Lara Bernhardt, Inga Ivanovska, Irina Olepir, <br />
      Dietmar Rösler, Tamara Zeyer (Justus-Liebig-Universität Gießen)
      <br />
      <b>Konzeption und Redaktion:</b> Goethe-Institut e.V., Paul Rusch
      <br />
      <b>Umsetzung:</b> Andreas Münch /{" "}
      <a href="http://www.andreasmuench.de">www.andreasmuench.de</a>
      <br />
      <font color="#788287">
        <b>BILDNACHWEISE</b>
      </font>
      <br />
      <b>Fotos:</b> Jochen Gerhardt (Imperativ in Situationen / Regel
      formulieren)
      <br />
      <b>Animation:</b> Dominik Hafner
      <br />
    </div>
  );
};

export default Credits;
