import React, { useState, useEffect } from "react";

import Arrow from "../assets/img/chevron-right-solid.svg";

const ImageDropZone = ({
  imageObj,
  dropRef,
  display,
  imageDone,
  blankWidth,
  firstTime,
  setFirstTime,
}) => {
  const [scaleImage, setScaleImage] = useState(false);

  useEffect(() => {
    if (imageDone && firstTime) {
      setScaleImage(true);
      setFirstTime(false);
    }
  }, [imageDone, firstTime]);

  return (
    <div
      className="image-drop-zone"
      style={{
        opacity: display ? 1 : 0,
        pointerEvents: display ? "initial" : "none",
      }}
    >
      {scaleImage && <div className="background-overlay"></div>}
      <div className={`image ${scaleImage && "scale-image"}`}>
        <img src={imageObj.img} alt="" />

        {scaleImage && (
          <div className="close" onClick={() => setScaleImage(false)}>
            <img src={Arrow} alt="" />
          </div>
        )}
      </div>

      <div
        className="drop-zone"
        style={{ background: imageDone ? "#A0C814" : "#5ac8f5" }}
      >
        <div
          className="blank"
          ref={dropRef}
          style={{
            background: imageDone ? "transparent" : "#d6d9db",
            width: blankWidth,
          }}
        >
          <p>{imageDone && imageObj.answerText}</p>
        </div>
        <p className="description">{imageObj.description}</p>
      </div>
    </div>
  );
};

export default ImageDropZone;
