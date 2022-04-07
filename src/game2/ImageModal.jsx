import React, { useState, useRef, useEffect } from "react";
import Arrow from "../assets/img/chevron-right-solid.svg";

const ImageModal = ({
  group,
  choiceLevel,
  activeOption,
  setSuccessStepFour,
}) => {
  const [openModal, setOpenModal] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (openModal) {
      setTimeout(() => {
        audioRef.current.play();
      }, 0);
    }
  }, [openModal]);

  return (
    <>
      {openModal && (
        <div className="step-image">
          <div className="overlay">
            <img
              className="image"
              src={group[choiceLevel].step4[activeOption].img}
              alt=""
            />
            <div className="description">
              {group[choiceLevel].step4[activeOption].description}
            </div>
            <div
              className="close"
              onClick={() => {
                setOpenModal(false);
                setSuccessStepFour((prev) => {
                  prev[activeOption] = true;
                  return [...prev];
                });
              }}
            >
              <img src={Arrow} alt="" />
            </div>
          </div>

          <audio
            ref={audioRef}
            controls
            style={{
              position: "absolute",
              top: "-100vh",
              opacity: 0,
            }}
          >
            <source
              src={group[choiceLevel].step4[activeOption].sound}
              type="audio/ogg"
            />
          </audio>
        </div>
      )}
    </>
  );
};

export default ImageModal;
