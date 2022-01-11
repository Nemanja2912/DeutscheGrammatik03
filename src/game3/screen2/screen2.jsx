const Screen2 = ({ step = 0, showButton, submitButton }) => {
  return (
    <>
      <div
        className="screen2"
        style={{
          gap: step !== 3 ? 150 : 30,
          opacity: step > 0 ? 1 : 0,
        }}
      >
        <div className="line1">
          <div className="text">
            Sie <span className="verb">hat</span> im Laden ein Buch{" "}
            <span className="verb">gekauft.</span>
          </div>
          <div className="rectangle">SATZKLAMMER</div>
        </div>
        <div className="line2">
          <div className="text">
            Peter <span className="verb">muss</span> zu Hause Vokabeln{" "}
            <span className="verb">lernen.</span>
          </div>
          <div className="rectangle">SATZKLAMMER</div>
        </div>
        <div className="line3">
          <div className="text">
            Frau Müller <span className="verb">steht</span> um 6 Uhr{" "}
            <span className="verb">auf.</span>
          </div>
          <div className="rectangle">SATZKLAMMER</div>
        </div>
      </div>
      {showButton && (
        <div className="button" onClick={submitButton}>
          WEITER
        </div>
      )}
    </>
  );
};

export default Screen2;
