import { useRef, useEffect, useState, useMemo } from "react";
import DetailsBox from "./../UI/DetailsBox";
import DragElement from "./../UI/DragElement";

const words = ["Modalverben", "Perfekt", "Trennbare Verben"];

const SecondPartBox = ({
  secondPart,
  level,
  setLevel,
  moveFinger,
  setHelpMove,
  helpMove,
}) => {
  const lineRefs = [useRef(null), useRef(null), useRef(null)];

  const [hide, setHide] = useState([0, 0, 0]);
  const [isDone, setIsDone] = useState([false, false, false]);
  const [stateCollection, setStateCollection] = useState([]);
  const [startMove, setStartMove] = useState([false, false, false]);

  const [ende, setEnde] = useState(false);

  useEffect(() => {
    if (level < 9) return;

    const setHideStatus = (index, status) => {
      setHide((prev) => {
        let arr = [...prev];
        arr[index] = status;

        return arr;
      });
    };
    for (let i = 0; i < isDone.length; i++) {
      if (isDone[i] && hide[i] === 0) {
        for (let j = 0; j < isDone.length; j++) {
          if (isDone[j]) {
            setHideStatus(j, false);
          }
        }

        setHideStatus(i, true);
        setTimeout(() => {
          setHideStatus(i, false);
        }, 1500);
      }
    }

    for (let i = 0; i < isDone.length; i++) {
      if (!isDone[i]) {
        let level = i === 1 ? 9 : i === 2 ? 10 : 11;

        setLevel(level);
        break;
      }
    }
  }, [isDone, hide]);

  useEffect(() => {
    let isEnd = true;

    for (let i = 0; i < hide.length; i++) {
      if (hide[i] !== false) {
        isEnd = false;
        break;
      }
    }

    setEnde(isEnd);
  }, [hide]);

  useEffect(() => {
    if (level < 9) return;

    let index = level === 9 ? 1 : level === 10 ? 2 : 0;

    if (!helpMove) return;
    moveFinger([
      stateCollection[index].absoluteX + 50,
      stateCollection[index].absoluteY + 15,
    ]);

    setTimeout(() => {
      moveFinger([
        lineRefs[index].current.getBoundingClientRect().left + 50,
        lineRefs[index].current.getBoundingClientRect().top + 15,
      ]);

      setStartMove((prev) => {
        let list = [...prev];
        list[index] = true;

        return list;
      });

      setTimeout(() => {
        // setIndicator((prev) => {
        //   return { ...prev, active: true, wrong: false };
        // });
      }, 1500);

      setTimeout(() => {
        moveFinger("init");

        setTimeout(() => {
          setHelpMove(false);
        }, 500);

        moveFinger(false);
      }, 1500);
    }, 1200);
  }, [helpMove]);

  return (
    <div
      className={`second-part-box ${secondPart ? "box-animation" : ""}`}
      style={{
        height: ende ? 170 : "",
      }}
    >
      <div className="lines">
        <div className="line">
          1. Das <div ref={lineRefs[1]} className="blank"></div> besteht aus
          Hilfsverb und Partizip II.
          {hide[1] === true && (
            <DetailsBox>
              Richtig! Hier ist ein Beispiel: <br />
              Sie hat am Samstag dieses Buch gekauft.
            </DetailsBox>
          )}
        </div>
        <div className="line">
          2. <div ref={lineRefs[2]} className="blank"></div> haben einen
          Verbstamm und eine Vorsilbe.
          {hide[2] === true && (
            <DetailsBox>
              Richtig! Hier ist ein Beispiel: <br />
              Sie hat am Samstag dieses Buch gekauft.
            </DetailsBox>
          )}
        </div>
        <div className="line">
          3. <div ref={lineRefs[0]} className="blank"></div> kommen mit einem
          Infinitv im Satz vor.
          {hide[0] === true && (
            <DetailsBox>
              Richtig! Hier ist ein Beispiel: <br />
              Sie hat am Samstag dieses Buch gekauft.
            </DetailsBox>
          )}
        </div>
      </div>
      {useMemo(() => {
        return (
          <div className="options">
            {words.map((word, index) => (
              <DragElement
                key={word}
                dropRef={lineRefs[index]}
                moveToDrop={startMove[index]}
                customClass={"green"}
                returnState={(state) => {
                  setStateCollection((prev) => {
                    let list = [...prev];
                    list[index] = state;

                    return list;
                  });

                  if (isDone[index] === state.isDone) return;

                  setIsDone((prev) => {
                    let list = [...prev];

                    list[index] = state.isDone;
                    return list;
                  });
                }}
              >
                {word}
              </DragElement>
            ))}
          </div>
        );
      }, [isDone, startMove])}
    </div>
  );
};

export default SecondPartBox;
