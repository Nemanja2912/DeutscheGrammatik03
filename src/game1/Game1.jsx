import React, { useState, useEffect, useRef, createRef } from "react";

import "../css/game1.css";

import Image1a from "../assets/img/story1a.jpg";
import Image2a from "../assets/img/story2a.jpg";
import Image3a from "../assets/img/story3a.jpg";
import Image4a from "../assets/img/story4a.jpg";
import Image5a from "../assets/img/story5a.jpg";
import Image6a from "../assets/img/story6a.jpg";

import Image1b from "../assets/img/story1b.jpg";
import Image2b from "../assets/img/story2b.jpg";
import Image3b from "../assets/img/story3b.jpg";
import Image4b from "../assets/img/story4b.jpg";
import Image5b from "../assets/img/story5b.jpg";
import Image6b from "../assets/img/story6b.jpg";

import Audio1a from "../assets/audio/1a.mp3";
import Audio2a from "../assets/audio/2a.mp3";
import Audio3a from "../assets/audio/3a.mp3";
import Audio4a from "../assets/audio/4a.mp3";
import Audio5a from "../assets/audio/5a.mp3";
import Audio6a from "../assets/audio/6a.mp3";

import Audio1b from "../assets/audio/1b.mp3";
import Audio2b from "../assets/audio/2b.mp3";
import Audio3b from "../assets/audio/3b.mp3";
import Audio4b from "../assets/audio/4b.mp3";
import Audio5b from "../assets/audio/5b.mp3";
import Audio6b from "../assets/audio/6b.mp3";
import Indicator from "../UI/Indicator";
import StatusBar from "./../UI/StatusBar";
import DetailsBox from "../UI/DetailsBox";
import Sentence from "./SentencePart";

const imageObj = [
  {
    id: 0,
    img: Image2a,
    nextImg: Image2b,
    text: "Rot steht dir gut.",
    nextText: "Probier mal dieses Kleid.",
    answerIndex: 0,
    audio: Audio1a,
    nextAudio: Audio1b,
    part2Answer: 0,
    halfCorrect: (
      <>
        Das ist fast richtig. Das Mädchen spricht mit <b>einer</b> Freundin.
      </>
    ),
  },
  {
    id: 1,
    img: Image3a,
    nextImg: Image3b,
    text: "Der Zug fährt gleich.",
    nextText: "Steigt lieber schon ein.",
    answerIndex: 0,
    audio: Audio2a,
    nextAudio: Audio2b,
    part2Answer: 1,
    halfCorrect: (
      <>
        Das ist fast richtig. Das Mädchen spricht mit <b>einem</b> Freund.
      </>
    ),
  },
  {
    id: 2,
    img: Image1b,
    nextImg: Image1a,
    text: "Oh! Es gibt eine Umleitung!",
    nextText: "Fahr geradeaus!",
    answerIndex: 1,
    audio: Audio3a,
    nextAudio: Audio3b,
    part2Answer: 0,
    halfCorrect: (
      <>
        Das ist fast richtig. Das Mädchen spricht mit <b>mehreren</b> Freunden.
      </>
    ),
  },
  {
    id: 3,
    img: Image4a,
    nextImg: Image4b,
    text: "Mein Koffer ist so schwer!",
    nextText: "Helft mir bitte!",
    answerIndex: 2,
    audio: Audio4a,
    nextAudio: Audio4b,
    part2Answer: 1,
    halfCorrect: (
      <>
        Das ist fast richtig. Das Mädchen spricht mit <b>mehreren</b> Freunden.
      </>
    ),
  },
  {
    id: 4,
    img: Image5a,
    nextImg: Image5b,
    text: "Ich habe zu viele Sachen gekauft.",
    nextText: "Geben Sie mir bitte eine Tüte!",
    answerIndex: 2,
    audio: Audio5a,
    nextAudio: Audio5b,
    part2Answer: 2,
    halfCorrect: (
      <>
        Das ist fast richtig. Der Mann spricht mit <b>einer</b> Frau.
      </>
    ),
  },
  {
    id: 5,
    img: Image6a,
    nextImg: Image6b,
    text: "Erzählen Sie!",
    nextText: "Herr Kommissar, meine Nachbarn sind sehr laut.",
    answerIndex: 1,
    audio: Audio6a,
    nextAudio: Audio6b,
    part2Answer: 3,
    halfCorrect: (
      <>
        Das ist fast richtig. Der Polizist spricht mit <b>mehreren</b> Leuten.
      </>
    ),
  },
];

const optionButtons = ["Tipp", "Aufforderung", "Bitte"];

const Game1 = () => {
  const [firstScreen, setFirstScreen] = useState(true);
  const [imagePos, setImagePos] = useState([0, 0]);
  const [imageWidth, setImageWidth] = useState(200);
  const [activeImage, setActiveImage] = useState();
  const [activeText, setActiveText] = useState();
  const [activeIndex, setActiveIndex] = useState();
  const [hideText, setHideText] = useState(false);
  const [activeIndicator, setActiveIndicator] = useState([]);
  const [finished, setFinished] = useState(false);
  const [showImageLevel, setShowImageLevel] = useState(0);
  const [detailsBox, setDetailsBox] = useState(false);
  const [detailsBoxText, setDetailsBoxText] = useState();
  const [part2, setPart2] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(true);
  const [disableOption, setDisableOption] = useState(true);
  const [disableMove, setDisableMove] = useState(false);
  const [helpOverlay, setHelpOverlay] = useState(false);
  const [helpFingerPosition, setHelpFingerPosition] = useState("init");
  const [preventHelp, setPreventHelp] = useState(false);

  const [optionCorrect, setOptionCorrect] = useState([
    [false, false],
    [false, false],
    [false, false],
  ]);

  const [part2BlueBox, setPart2BlueBox] = useState([
    [false, false],
    [false, false],
    [false, false],
    [false, false],
  ]);

  const [imageDone, setImageDone] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [sentencePart, setSentencePart] = useState(false);

  const showImageRef = useRef(null);
  const audioRef = useRef(null);

  const staticImageRef = useRef(null);

  const dropZoneRefs = [useRef(null), useRef(null)];
  const detailsBoxRef = useRef(null);
  const imageListRef = useRef(null);
  const dropZonesRef = useRef(null);
  const imagesRef = useRef(null);
  const optionsRef = useRef(null);
  const submitButtonRef = useRef(null);

  const [infoText, setInfoText] = useState(
    "Klick auf die Bilder und sieh dir kleine Geschichten an."
  );
  const [infoOverlay, setInfoOverlay] = useState(true);

  const handleClickImage = (e, index) => {
    setActiveImage(imageObj[index]?.img);
    setActiveText(imageObj[index]?.text);
    setActiveIndex(index);
    setDisableOption(false);
    setPreventHelp(true);

    audioRef.current.src = imageObj[index].audio;

    setImagePos([
      e.target.getBoundingClientRect().top -
        showImageRef.current.getBoundingClientRect().top,
      e.target.getBoundingClientRect().left -
        showImageRef.current.getBoundingClientRect().left,
    ]);

    setTimeout(() => {
      setFirstScreen(false);
      setImageWidth(500);
      setImagePos([0, 0]);

      audioRef.current.play();

      setTimeout(() => {
        let duration = audioRef.current.duration * 1000;

        setShowImageLevel(1);
        e.target.remove();

        setTimeout(() => {
          setShowImageLevel(2);

          setTimeout(() => {
            setActiveImage(imageObj[index]?.nextImg);
            setActiveText(imageObj[index]?.nextText);
            audioRef.current.src = imageObj[index].nextAudio;

            setTimeout(() => {
              setShowImageLevel(3);
              audioRef.current.play();
              let duration = audioRef.current.duration * 1000;

              setTimeout(() => {
                setShowImageLevel(4);

                setTimeout(() => {
                  setPreventHelp(false);
                }, 1000);

                setInfoText(
                  <p>
                    Welche Funktion hat der Satz unten? <br />
                    Wähle die richtige Antwort.
                  </p>
                );

                if (additionalInfo) {
                  setInfoOverlay(true);

                  setAdditionalInfo(false);
                }

                setImageWidth(300);

                setImagePos([
                  staticImageRef.current.getBoundingClientRect().top -
                    showImageRef.current.getBoundingClientRect().top,
                  staticImageRef.current.getBoundingClientRect().left -
                    showImageRef.current.getBoundingClientRect().left -
                    100,
                ]);

                if (index === 5) setActiveText(imageObj[index]?.text);
              }, duration);
            }, 100);
          }, 500);
        }, duration);
      }, 500);
    }, 0);
  };

  const handleChooseOption = (event, index) => {
    if (disableOption) return;
    setPreventHelp(true);

    index === imageObj[activeIndex]?.answerIndex && setDisableOption(true);

    setActiveIndicator([
      index === imageObj[activeIndex]?.answerIndex ? "correct" : "wrong",
    ]);

    if (index === imageObj[activeIndex]?.answerIndex) {
      let correctIndex;

      for (let i = 0; i < optionCorrect[index].length; i++) {
        if (!optionCorrect[index][i]) {
          correctIndex = i;
          break;
        }
      }

      let box = Array.from(event.target.parentNode.children)[correctIndex + 1];

      let boxChildrenList = Array.from(box.children);

      boxChildrenList[0].src = activeImage;
      boxChildrenList[1].innerHTML = activeText;

      setHideText(true);

      setImagePos([
        box.getBoundingClientRect().top -
          showImageRef.current.getBoundingClientRect().top,
        box.getBoundingClientRect().left -
          showImageRef.current.getBoundingClientRect().left +
          24.8,
      ]);

      setImageWidth(125);

      setTimeout(() => {
        let completed = true;

        setOptionCorrect((prev) => {
          prev[index][correctIndex] = true;

          for (let i = 0; i < prev.length; i++) {
            for (let j = 0; j < prev[i].length; j++) {
              if (!prev[i][j]) {
                completed = false;
                break;
              }
            }
          }

          return [...prev];
        });

        setActiveImage();

        setTimeout(() => {
          setImagePos([0, 0]);
          setImageWidth(200);
          setActiveText();
          if (!completed) {
            setShowImageLevel(0);
            setHideText(false);
          }
          setTimeout(() => {
            if (completed) {
              setFinished(true);
            } else {
              setFirstScreen(true);
              setInfoText(
                "Klick auf die Bilder und sieh dir kleine Geschichten an."
              );
            }

            setTimeout(() => {
              setPreventHelp(false);
            }, 1000);
          }, 250);
        }, 250);
      }, 1250);
    }
  };

  const handleSubmit = () => {
    setPreventHelp(true);
    setPart2(true);
    const completedBoxes = Array.from(
      document.querySelectorAll(".box-completed")
    );

    setTimeout(() => {
      setInfoText(
        <p>
          Wann sagt man du? <br />
          Wann sagt man Sie? <br />
          Sortiere die Situationen.
        </p>
      );
      setInfoOverlay(true);
      for (let i = 0; i < imageListRef.current.children.length; i++) {
        imageListRef.current.children[i].style.width = "175px";
        imageListRef.current.children[i].children[0].style.width = "175px";

        setTimeout(() => {
          imageListRef.current.children[i].style.left =
            completedBoxes[i].getBoundingClientRect().left -
            imageListRef.current.children[i].getBoundingClientRect().left +
            "px";
          imageListRef.current.children[i].style.bottom =
            imageListRef.current.children[i].getBoundingClientRect().bottom -
            completedBoxes[i].getBoundingClientRect().bottom +
            "px";

          setTimeout(() => {
            completedBoxes[
              i
            ].parentNode.parentNode.parentNode.style.transition = "0s";
            completedBoxes[
              i
            ].parentNode.parentNode.parentNode.style.opacity = 0;

            dropZonesRef.current.style.opacity = 1;

            imageListRef.current.children[i].style.transition = "0.25s";
            imageListRef.current.children[i].style.opacity = "1";
            imageListRef.current.children[i].style.left =
              completedBoxes[i].getBoundingClientRect().left -
              imageListRef.current.children[i].getBoundingClientRect().left +
              "px";
            imageListRef.current.children[i].style.bottom =
              imageListRef.current.children[i].getBoundingClientRect().bottom -
              completedBoxes[i].getBoundingClientRect().bottom +
              "px";

            imageListRef.current.children[i].style.width = "150px";
            imageListRef.current.children[i].children[0].style.width = "150px";

            setTimeout(() => {
              imageListRef.current.children[i].style.transition = "0s";
              dropZonesRef.current.style.zIndex = "1";

              completedBoxes[
                i
              ].parentNode.parentNode.parentNode.parentNode.style.display =
                "none";

              setTimeout(() => {
                setPreventHelp(false);
              }, 1000);
            }, 100);
          }, 150);
        }, 100);
      }
    }, 100);
  };

  const handleMove = (initEvent, index) => {
    const element = initEvent.target;

    element.style.transition = "0s";

    element.style.zIndex = "10";

    let desc = Array.from(element.children)[1];
    desc.style.opacity = 1;

    const initX = element.getBoundingClientRect().left;
    const initY = element.getBoundingClientRect().bottom;

    const initEventX = initEvent.clientX - initX;
    const initEventY = initY - initEvent.clientY;

    const move = (moveEvent) => {
      element.style.left =
        moveEvent.clientX - initX - initEventX + 20 * (index + 1) + "px";
      element.style.bottom =
        initY - moveEvent.clientY - initEventY + 25 * (index + 1) + "px";
    };

    document.addEventListener("mousemove", move);

    const endMove = (endEvent) => {
      document.removeEventListener("mousemove", move);
      element.style.zIndex = 9 - index;

      desc.style.opacity = 0;

      let contIndex;

      switch (imageObj[index].part2Answer) {
        case 0:
        case 1:
          contIndex = 0;
          break;
        case 2:
        case 3:
          contIndex = 1;
          break;
        default:
          console.log("wrong");
      }

      const dropZone = dropZoneRefs[contIndex].current;

      if (
        endEvent.clientX > dropZone.getBoundingClientRect().left &&
        endEvent.clientX < dropZone.getBoundingClientRect().right &&
        endEvent.clientY > dropZone.getBoundingClientRect().top &&
        endEvent.clientY < dropZone.getBoundingClientRect().bottom
      ) {
        let childrenIndex;
        switch (imageObj[index].part2Answer) {
          case 0:
          case 2:
            childrenIndex = 0;
            break;
          case 1:
          case 3:
            childrenIndex = 1;
            break;
          default:
            console.log("wrong");
        }

        const dropZoneChildren = dropZone.children[childrenIndex];

        const moveToDrop = () => {
          const boxes = dropZoneChildren.querySelector(".boxes");

          setImageDone((prev) => {
            prev[index] = true;
            return [...prev];
          });

          setActiveIndicator(["correct"]);

          if (part2BlueBox[imageObj[index].part2Answer][0]) {
            boxes.children[1].innerHTML = element.children[1].innerHTML;

            element.style.bottom =
              initY +
              25 * index -
              boxes.children[1].getBoundingClientRect().bottom +
              "px";

            setPart2BlueBox((prev) => {
              prev[imageObj[index].part2Answer][1] = true;

              return [...prev];
            });
          } else {
            boxes.children[0].innerHTML = element.children[1].innerHTML;

            element.style.bottom =
              initY +
              25 * index -
              boxes.children[0].getBoundingClientRect().bottom +
              "px";

            setPart2BlueBox((prev) => {
              prev[imageObj[index].part2Answer][0] = true;

              return [...prev];
            });
          }
          element.style.transition = "0.5s linear";

          element.children[0].style.transition = "0.5s linear";
          element.children[0].style.width = 60 + "px";
          element.style.left =
            dropZoneChildren.getBoundingClientRect().left -
            initX +
            5 +
            20 * (index + 1) +
            "px";
        };

        if (
          endEvent.clientX > dropZoneChildren.getBoundingClientRect().left &&
          endEvent.clientX < dropZoneChildren.getBoundingClientRect().right &&
          endEvent.clientY > dropZoneChildren.getBoundingClientRect().top &&
          endEvent.clientY < dropZoneChildren.getBoundingClientRect().bottom
        ) {
          moveToDrop();
        } else {
          setDetailsBox(true);
          setDisableMove(true);
          setDetailsBoxText(imageObj[index].halfCorrect);

          detailsBoxRef.current.style.left =
            element.getBoundingClientRect().left + "px";
          detailsBoxRef.current.style.top =
            element.getBoundingClientRect().top +
            5 -
            detailsBoxRef.current.getBoundingClientRect().height +
            "px";

          setTimeout(() => {
            setDetailsBox(false);
            setDisableMove(false);
            moveToDrop();

            setTimeout(() => {
              setPreventHelp(false);
            }, 1000);
          }, 1500);
        }
      } else {
        element.style.transition = "0.25s linear";
        element.style.left = 20 * (index + 1) + "px";
        element.style.bottom = 25 * (index + 1) + "px";

        setActiveIndicator(["wrong"]);
      }

      document.removeEventListener("mouseup", endMove);
    };

    document.addEventListener("mouseup", endMove);
  };

  useEffect(() => {
    let finished = true;

    for (let i = 0; i < imageDone.length; i++) {
      if (!imageDone[i]) {
        finished = false;
        break;
      }
    }

    if (finished) {
      document.querySelector(".part2").style.transition = "1s";
      document.querySelector(".part2").style.opacity = "0";

      setTimeout(() => {
        setSentencePart(true);
      }, 1100);
    }
  }, [imageDone]);

  useEffect(() => {
    if (!helpOverlay) return;

    if (!sentencePart) {
      if (!part2) {
        if (!finished) {
          if (firstScreen) {
            setHelpFingerPosition([
              imagesRef.current.children[0].getBoundingClientRect().left +
                imagesRef.current.children[0].getBoundingClientRect().width / 2,
              imagesRef.current.children[0].getBoundingClientRect().top +
                imagesRef.current.children[0].getBoundingClientRect().height /
                  2,
            ]);

            setTimeout(() => {
              setHelpFingerPosition("init");
              imagesRef.current.children[0].click();
            }, 1250);
          } else {
            let childrenIndex = imageObj[activeIndex].answerIndex;

            setHelpFingerPosition([
              optionsRef.current.children[
                childrenIndex
              ].children[0].getBoundingClientRect().left +
                optionsRef.current.children[
                  childrenIndex
                ].children[0].getBoundingClientRect().width /
                  2,
              optionsRef.current.children[
                childrenIndex
              ].children[0].getBoundingClientRect().top +
                optionsRef.current.children[
                  childrenIndex
                ].children[0].getBoundingClientRect().height /
                  2,
            ]);

            setTimeout(() => {
              setHelpFingerPosition("init");
              optionsRef.current.children[childrenIndex].children[0].click();
            }, 1250);
          }
        } else {
          setHelpFingerPosition([
            submitButtonRef.current.getBoundingClientRect().left +
              submitButtonRef.current.getBoundingClientRect().width / 2,
            submitButtonRef.current.getBoundingClientRect().top +
              submitButtonRef.current.getBoundingClientRect().height / 2,
          ]);

          setTimeout(() => {
            setHelpFingerPosition("init");
            submitButtonRef.current.click();
          }, 1250);
        }
      } else {
        console.log(imageDone);
        let index;

        for (let i = 0; i < imageDone.length; i++) {
          if (!imageDone[i]) {
            index = i;
            break;
          }
        }

        setHelpFingerPosition([
          imageListRef.current.children[index].getBoundingClientRect().left +
            imageListRef.current.children[index].getBoundingClientRect().width /
              2,
          imageListRef.current.children[index].getBoundingClientRect().top +
            imageListRef.current.children[index].getBoundingClientRect()
              .height /
              2,
        ]);

        setTimeout(() => {
          // START
          const element = imageListRef.current.children[index];
          element.style.zIndex = "10";

          const initX = element.getBoundingClientRect().left;
          const initY = element.getBoundingClientRect().bottom;

          element.style.zIndex = 9 - index;

          let contIndex;
          switch (imageObj[index].part2Answer) {
            case 0:
            case 1:
              contIndex = 0;
              break;
            case 2:
            case 3:
              contIndex = 1;
              break;
            default:
              console.log("wrong");
          }

          const dropZone = dropZoneRefs[contIndex].current;

          let childrenIndex;
          switch (imageObj[index].part2Answer) {
            case 0:
            case 2:
              childrenIndex = 0;
              break;
            case 1:
            case 3:
              childrenIndex = 1;
              break;
            default:
              console.log("wrong");
          }

          const dropZoneChildren = dropZone.children[childrenIndex];

          setHelpFingerPosition([
            dropZoneChildren.getBoundingClientRect().left +
              dropZoneChildren.getBoundingClientRect().width / 2,
            dropZoneChildren.getBoundingClientRect().top +
              dropZoneChildren.getBoundingClientRect().height / 2,
          ]);

          element.style.transition = "1s linear";

          element.children[0].style.transition = "1s linear";

          element.style.left =
            dropZoneChildren.getBoundingClientRect().left +
            dropZoneChildren.getBoundingClientRect().width / 2 -
            element.getBoundingClientRect().width / 2 -
            initX +
            5 +
            20 * (index + 1) +
            "px";

          element.style.bottom =
            initY +
            25 * index -
            dropZoneChildren.getBoundingClientRect().bottom -
            dropZoneChildren.getBoundingClientRect().height / 2 +
            element.getBoundingClientRect().height / 2 +
            "px";

          setTimeout(() => {
            const moveToDrop = () => {
              const boxes = dropZoneChildren.querySelector(".boxes");

              setImageDone((prev) => {
                prev[index] = true;
                return [...prev];
              });

              setActiveIndicator(["correct"]);

              if (part2BlueBox[imageObj[index].part2Answer][0]) {
                boxes.children[1].innerHTML = element.children[1].innerHTML;

                element.style.bottom =
                  initY +
                  25 * index -
                  boxes.children[1].getBoundingClientRect().bottom +
                  "px";

                setPart2BlueBox((prev) => {
                  prev[imageObj[index].part2Answer][1] = true;

                  return [...prev];
                });
              } else {
                boxes.children[0].innerHTML = element.children[1].innerHTML;

                element.style.bottom =
                  initY +
                  25 * index -
                  boxes.children[0].getBoundingClientRect().bottom +
                  "px";

                setPart2BlueBox((prev) => {
                  prev[imageObj[index].part2Answer][0] = true;

                  return [...prev];
                });
              }

              element.style.transition = "0.5s linear";

              element.children[0].style.transition = "0.5s linear";

              element.children[0].style.width = 60 + "px";
              element.style.left =
                dropZoneChildren.getBoundingClientRect().left -
                initX +
                5 +
                20 * (index + 1) +
                "px";
            };

            moveToDrop();
            setHelpFingerPosition("init");
          }, 1250);

          // END
        }, 1250);
      }
    } else {
      setHelpFingerPosition([
        imagesRef.current.children[0].getBoundingClientRect().left +
          imagesRef.current.children[0].getBoundingClientRect().width / 2,
        imagesRef.current.children[0].getBoundingClientRect().top +
          imagesRef.current.children[0].getBoundingClientRect().height / 2,
      ]);

      setTimeout(() => {
        setHelpFingerPosition("init");
        imagesRef.current.children[0].click();
      }, 1250);
    }
  }, [helpOverlay]);

  return (
    <>
      {!sentencePart && (
        <div className="game1">
          <audio ref={audioRef} controls>
            <source src="" type="audio/ogg" />
          </audio>
          <div
            className="images"
            style={{
              top: firstScreen ? 75 : "-100%",
              opacity: firstScreen ? 1 : 0,
            }}
            ref={imagesRef}
          >
            {imageObj.map((item, index) => (
              <img
                onClick={(e) => handleClickImage(e, index)}
                key={item.id}
                src={item.img}
                alt=""
              />
            ))}
          </div>
          <div className="show-image">
            <img
              src={activeImage}
              ref={showImageRef}
              alt=""
              style={{
                width: imageWidth,
                top: imagePos[0],
                left: imagePos[1],
                opacity: showImageLevel === 2 ? 0 : 1,
                transition: firstScreen ? "0s" : "0.5s linear",
              }}
            />
            <div
              className="description"
              style={{
                opacity:
                  showImageLevel === 0 || hideText
                    ? 0
                    : showImageLevel === 2
                    ? 0
                    : 1,
                width: showImageLevel < 4 ? 500 : 300,
                transition: hideText ? "0s" : "",
              }}
            >
              {activeText}
            </div>
          </div>
          <div className="option-screen">
            <div className="image">
              <img ref={staticImageRef} src={imageObj[0].img} alt="" />
              <div className="description">{imageObj[0].nextText}</div>
            </div>

            <div
              className="options"
              style={{
                transform: !finished
                  ? showImageLevel === 4 && !firstScreen
                    ? "translateY(0)"
                    : "translateY(250px)"
                  : "translateY(-250px)",
                opacity:
                  (showImageLevel === 4 && !firstScreen) || finished ? 1 : 0,
              }}
            >
              <div className="option-wrapper" ref={optionsRef}>
                {optionButtons.map((item, index) => (
                  <div className="option">
                    <div
                      className="button"
                      onClick={(e) => handleChooseOption(e, index)}
                    >
                      {item}
                    </div>
                    <div
                      className={`box ${finished && "box-completed"}`}
                      style={{ opacity: optionCorrect[index][0] ? 1 : 0 }}
                    >
                      <img src={imageObj[0].nextImg} alt="" />
                      <div className="description">{imageObj[0].nextText}</div>
                    </div>
                    <div
                      className={`box ${finished && "box-completed"}`}
                      style={{ opacity: optionCorrect[index][1] ? 1 : 0 }}
                    >
                      <img src={imageObj[0].img} alt="" />
                      <div className="description">{imageObj[0].nextText}</div>
                    </div>
                  </div>
                ))}
              </div>
              {finished && (
                <div
                  className="button-submit"
                  ref={submitButtonRef}
                  onClick={handleSubmit}
                >
                  WEITER
                </div>
              )}
            </div>
          </div>
          {part2 && (
            <div className="part2" style={{ zIndex: part2 ? "" : -1 }}>
              <div className="drop-zones" ref={dropZonesRef}>
                <div className="drop-zone">
                  <div className="left">
                    <div className="text">
                      <p>Informell</p>
                      <p className="bold">Man sagt zur Person "du"</p>
                      <div className="title">
                        <div className="bottom-title">Plural</div>
                        <div className="top-title">Singular</div>
                      </div>
                    </div>
                  </div>
                  <div className="right" ref={dropZoneRefs[0]}>
                    <div className="top">
                      <p>Informell Singular</p>
                      <div className="boxes">
                        <div
                          className="blue-box"
                          style={{ opacity: part2BlueBox[0][0] ? 1 : 0 }}
                        ></div>
                        <div
                          className="blue-box"
                          style={{ opacity: part2BlueBox[0][1] ? 1 : 0 }}
                        ></div>
                      </div>
                    </div>
                    <div className="bottom">
                      <p>Informell Plural</p>
                      <div className="boxes">
                        <div
                          className="blue-box"
                          style={{ opacity: part2BlueBox[1][0] ? 1 : 0 }}
                        ></div>
                        <div
                          className="blue-box"
                          style={{ opacity: part2BlueBox[1][1] ? 1 : 0 }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="drop-zone">
                  <div className="left">
                    <div className="text">
                      <p>Formell</p>
                      <p className="bold">Man sagt zur Person "Sie"</p>
                      <div className="title">
                        <div className="bottom-title">Plural</div>
                        <div className="top-title">Singular</div>
                      </div>
                    </div>
                  </div>
                  <div className="right" ref={dropZoneRefs[1]}>
                    <div className="top">
                      <p>Formell Singular</p>
                      <div className="boxes">
                        <div
                          className="blue-box"
                          style={{ opacity: part2BlueBox[2][0] ? 1 : 0 }}
                        >
                          caocao
                        </div>
                        <div
                          className="blue-box"
                          style={{ opacity: part2BlueBox[2][1] ? 1 : 0 }}
                        ></div>
                      </div>
                    </div>
                    <div className="bottom">
                      <p>Formell Plural</p>
                      <div className="boxes">
                        <div
                          className="blue-box"
                          style={{ opacity: part2BlueBox[3][0] ? 1 : 0 }}
                        ></div>
                        <div
                          className="blue-box"
                          style={{ opacity: part2BlueBox[3][1] ? 1 : 0 }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="render-images"
                ref={imageListRef}
                onClick={() => console.log("sakldasd")}
              >
                {imageObj.map((item, index) => (
                  <div
                    className="wrapper"
                    style={{
                      cursor:
                        !imageDone[index] && !disableMove
                          ? "pointer"
                          : "default",
                    }}
                    onMouseDown={(e) => {
                      setPreventHelp(true);

                      if (imageDone[index] || disableMove) return;

                      handleMove(e, index);
                    }}
                  >
                    <img src={item.nextImg} alt="" />
                    <p>{index === 5 ? item.text : item.nextText}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <StatusBar
            infoText={infoText}
            infoOverlay={infoOverlay}
            setInfoOverlay={setInfoOverlay}
            setHelpOverlay={setHelpOverlay}
            preventHelp={preventHelp}
            helpFingerPosition={helpFingerPosition}
          />
          <Indicator active={activeIndicator} />
          <div
            className="details-box-wrapper"
            style={{ opacity: detailsBox ? 1 : 0 }}
            ref={detailsBoxRef}
          >
            <DetailsBox backgroundColor="#EB6400">{detailsBoxText}</DetailsBox>
          </div>
        </div>
      )}
      {sentencePart && <Sentence />}
    </>
  );
};

export default Game1;
