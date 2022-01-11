const DetailsBox = ({ children, width = 160, backgroundColor = "#a0c814" }) => {
  let detailsBoxStyle = {
    backgroundColor: backgroundColor,
    width: width,
    lineHeight: "20px",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
    borderRadius: "5px",
    padding: 10,
    color: "#fff",
    fontSize: 14,
  };

  let pointerStyle = {
    height: 20,
    width: 20,
    backgroundColor: backgroundColor,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -10,
    margin: "auto",
    transform: "rotate(45deg)",
  };

  return (
    <div className="details-box" style={detailsBoxStyle}>
      {children}
      <div className="pointer" style={pointerStyle}></div>
    </div>
  );
};

export default DetailsBox;
