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
  },
];

const Game1 = () => {
  const optionsRef = useRef(null);
  const imageRef = useRef(null);
  const [imageWidth, setImageWidth] = useState(0);
  const audioRef = useRef(null);
  const [indicator, setIndicator] = useState({
    active: false,
    wrong: false,
  });
  const [level, setLevel] = useState(0);

  const [activeImage, setActiveImage] = useState();

  const imagesRef = imageObj.map((element, i) => createRef(null));

  const setWidthContainer = () => {
    setImageWidth(
      200 * Math.ceil(imageRef.current.children.length / 2) +
        75 * (Math.ceil(imageRef.current.children.length / 2) - 1)
    );
  };

  useEffect(() => {
    setWidthContainer();
  }, []);

  const handleClick = (initEvent) => {
    const element = initEvent.target;

    setLevel((prev) => prev + 1);

    if (element.getAttribute("disableClick") === "true") return;

    element.setAttribute("disableClick", "true");

    const elementIndex = +element.getAttribute("index");

    setActiveImage(elementIndex);

    element.style.left = element.getBoundingClientRect().left + "px";
    element.style.top = element.getBoundingClientRect().top + "px";
    element.style.width = element.getBoundingClientRect().width + "px";
    element.style.cursor = "default";

    element.parentElement.style.top = "-500px";
    element.parentElement.style.opacity = 0;

    audioRef.current.src = imageObj[elementIndex].audio;

    document.querySelector(".clone").appendChild(element);

    setTimeout(() => {
      element.style.left = (window.innerWidth - 500) / 2 + "px";
      element.style.top = 125 + "px";
      element.style.width = "500px";

      setTimeout(() => {
        audioRef.current.play();

        const textElement = element.parentElement.children[0];
        textElement.innerHTML = imageObj[elementIndex].text;
        textElement.style.opacity = 1;

        setTimeout(() => {
          let duration = audioRef.current.duration * 1000;

          setTimeout(() => {
            element.style.opacity = 0;

            setTimeout(() => {
              textElement.innerHTML = imageObj[elementIndex].nextText;
              element.src = imageObj[elementIndex].nextImg;
              element.style.opacity = 1;

              audioRef.current.src = imageObj[elementIndex].nextAudio;
              audioRef.current.play();

              setTimeout(() => {
                let duration = audioRef.current.duration * 1000;

                setTimeout(() => {
                  textElement.style.fontSize = "12px";
                  textElement.style.width = "300px";
                  textElement.style.top = 305 + "px";
                  element.style.width = "300px";
                  element.style.left =
                    (window.innerWidth - 500) / 2 + 100 + "px";
                  element.style.top = 80 + "px";

                  optionsRef.current.style.opacity = 1;
                  optionsRef.current.style.top = "380px";
                }, duration);
              }, 500);
            }, 250);
          }, duration);
        }, 250);
      }, 500);
    }, 0);

    setWidthContainer();
  };

  const handleImageOption = (initEvent, index) => {
    if (level === 6) return;
    let targetElement;
    if (index === imageObj[activeImage].answerIndex) {
      const childrenList = Array.from(initEvent.target.parentElement.children);

      for (let i = 0; i < childrenList.length; i++) {
        if (
          childrenList[i].getAttribute("src") !== null &&
          childrenList[i].getAttribute("src") === ""
        ) {
          targetElement = childrenList[i];
          break;
        }
      }

      const textElement =
        imagesRef[activeImage].current.parentElement.children[0];

      const parentElement = imageRef.current;

      targetElement.src = imageObj[activeImage].nextImg;

      targetElement.style.left =
        imagesRef[activeImage].current.getBoundingClientRect().left -
        targetElement.getBoundingClientRect().left +
        "px";
      targetElement.style.top =
        imagesRef[activeImage].current.getBoundingClientRect().top -
        1 -
        targetElement.getBoundingClientRect().top +
        "px";
      targetElement.style.transform = "scale(2.5)";

      imagesRef[activeImage].current.display = "none";
      textElement.style.display = "none";
      setTimeout(() => {
        imagesRef[activeImage].current.remove();
        targetElement.style.transition = "250ms linear";
        targetElement.style.left = 0 + "px";
        targetElement.style.top = 0 + "px";
        targetElement.style.transform = "scale(1)";

        setIndicator({ active: true, wrong: false });

        textElement.style.display = "";
        textElement.style.opacity = 0;
        textElement.style.width = "500px";
        textElement.style.fontSize = "16px";
        textElement.style.left = "0px";
        textElement.style.top = "500px";

        setTimeout(() => {
          setIndicator({ active: false, wrong: false });
          if (level < 6) {
            optionsRef.current.style.opacity = 0;
            optionsRef.current.style.top = "120%";

            parentElement.style.top = "0px";
            parentElement.style.opacity = 1;
          } else {
            optionsRef.current.style.top = "80px";

            const optionImage = Array.from(
              document.querySelectorAll(".option-image")
            );

            for (let i = 0; i < optionImage.length; i++) {
              optionImage[i].style.width = "135%";
            }
          }
        }, 1000);
      }, 100);
    } else {
      setIndicator({ active: true, wrong: true });

      setTimeout(() => {
        setIndicator({ active: false, wrong: true });
      }, 1000);
    }
  };

  return (
    <>
      <div className="game1">
        <audio ref={audioRef} controls>
          <source src="" type="audio/ogg" />
        </audio>

        <div ref={imageRef} className="images" style={{ width: imageWidth }}>
          {imageObj.map((item, index) => (
            <img
              onClick={handleClick}
              key={item.id}
              index={item.id}
              src={item.img}
              alt=""
              ref={imagesRef[index]}
              disableClick={"false"}
            />
          ))}
        </div>
        <div className="clone">
          <div className="text"></div>
        </div>
        <div className="options" ref={optionsRef}>
          <div className="option option1">
            <div
              className={`btn ${level === 6 ? "" : "btn-hover"}`}
              onClick={(e) => handleImageOption(e, 0)}
            >
              Tipp
            </div>
            <img class="option-image" src="" alt="" />
            <img class="option-image" src="" alt="" />
          </div>
          <div className="option option2">
            <div
              className={`btn ${level === 6 ? "" : "btn-hover"}`}
              onClick={(e) => handleImageOption(e, 1)}
            >
              Aufforderung
            </div>
            <img class="option-image" src="" alt="" />
            <img class="option-image" src="" alt="" />
          </div>
          <div className="option option3">
            <div
              className={`btn ${level === 6 ? "" : "btn-hover"}`}
              onClick={(e) => handleImageOption(e, 2)}
            >
              Bitte
            </div>
            <img class="option-image" src="" alt="" />
            <img class="option-image" src="" alt="" />
          </div>
        </div>
      </div>
      <Indicator active={indicator.active} wrong={indicator.wrong} />
    </>
  );
};

export default Game1;
