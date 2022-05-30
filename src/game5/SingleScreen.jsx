import React, { useState, useEffect, useRef } from "react";
import GuessWordImproved from "./../UI/GuessWordImproved";
import Indicator from "./../UI/Indicator";

const SingleScreen = ({ obj, setLevel, videos, help, level, endeFunc }) => {
  const [focusIndex, setFocusIndex] = useState(0);
  const [video, setVideo] = useState(videos.normal);
  const [guessedWord, setGuessedWord] = useState([
    ...obj.map((item) => (item.guess ? "init" : true)),
  ]);

  const [indicator, setIndicator] = useState(false);

  const [loop, setLoop] = useState(true);

  const videoRef = useRef(null);

  const [showButton, setShowButton] = useState(false);

  const [statusState, setStatusState] = useState([
    ...obj.map((item) => ["init"]),
  ]);
  const [helpFocus, setHelpFocus] = useState([false, false, false]);

  useEffect(() => {
    if (help) {
      setHelpFocus((prev) => {
        prev[focusIndex] = true;

        return [...prev];
      });

      setTimeout(() => {
        setHelpFocus((prev) => {
          prev[focusIndex] = false;

          return [...prev];
        });
      }, 0);
    }
  }, [help]);

  useEffect(() => {
    let wrong = false;
    let correct = true;

    let status = true;

    for (let i = 0; i < guessedWord.length; i++) {
      if (guessedWord[i] === "init") {
        status = false;
        break;
      } else if (guessedWord[i]) {
        correct = true;
      } else {
        wrong = true;
      }
    }

    if (status) {
      if (correct && !wrong) {
        setVideo(videos.correct);

        setLoop(false);

        setTimeout(() => {
          setShowButton(true);
        }, videos.timeout);
      } else if (wrong) {
        setVideo(videos.wrong);
      }
      videoRef.current.load();
    }
  }, [guessedWord]);

  const handleFinished = (status, index) => {
    setGuessedWord((prev) => {
      prev[index] = status === "correct";

      return [...prev];
    });
  };

  return (
    <>
      <div className="single-screen">
        <div className="video">
          <video autoPlay muted loop={loop} ref={videoRef}>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="body">
          {obj.map((item, index) => (
            <div className="wrapper">
              <div
                className={`guess-box ${item.guess && "guess-text"} ${
                  statusState[index][0] === "wrong" && "wrong"
                }
            ${
              guessedWord[index] && guessedWord[index] !== "init" && "correct"
            }`}
                onClick={() => setFocusIndex(index)}
                style={{
                  backgroundColor: item.guess
                    ? statusState[index][0] === "wrong"
                      ? "#eb6400"
                      : guessedWord[index] && guessedWord[index] !== "init"
                      ? "#A0C814"
                      : "#5ac8f5"
                    : "transparent",
                }}
              >
                <div className="guess">
                  {item.guess ? (
                    <GuessWordImproved
                      help={helpFocus[index]}
                      word={item.text}
                      letterWidth={15}
                      letterHeight={30}
                      status={statusState[index][0]}
                      setStatus={(status) => {
                        setStatusState((prev) => {
                          prev[index] = [status];

                          return [...prev];
                        });

                        setIndicator([status]);

                        handleFinished(status, index);
                        if (status === "correct") {
                          for (let i = 0; i < statusState.length; i++) {
                            if (statusState[i][0] !== "correct") {
                              for (let j = i; j < statusState.length; j++) {
                                if (
                                  obj[j].guess &&
                                  statusState[j][0] !== "correct"
                                ) {
                                  setFocusIndex(j);
                                  break;
                                }
                              }

                              break;
                            }
                          }
                        }
                      }}
                      focus={index === focusIndex}
                    />
                  ) : (
                    <p
                      style={{
                        marginLeft: item.marginLeft ? item.marginLeft : 0,
                      }}
                    >
                      {item.text}
                    </p>
                  )}
                </div>
              </div>

              {item.explanation && (
                <div className="additional">{item.explanation}</div>
              )}
            </div>
          ))}
        </div>
        {showButton && (
          <div
            className="button"
            onClick={() => {
              console.log(level);
              if (level < 5) {
                setLevel((prev) => prev + 1);
              } else {
                endeFunc();
              }
            }}
          >
            {level < 5 ? "WEITER" : "ENDE"}
          </div>
        )}
      </div>
      <Indicator active={indicator} />
    </>
  );
};

export default SingleScreen;
