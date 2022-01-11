import Ball from "./../UI/Ball";

const Container = ({
  children,
  active,
  inLine = 2,
  inRow = 2,
  containerRef,
}) => {
  const containerStyle = {
    width: "max-content",
    height: "max-content",
    backgroundColor: "#BBC0C3",
    transition: "1000ms",
    borderRadius: 10,
    zIndex: `${active ? 250 : 1}`,
  };

  const scaleStyle = {
    display: "grid",
    width: `${(active ? 80 : 44) * inLine}px`,
    height: `${(active ? 80 : 44) * inRow}px`,
    transformOrigin: "left top",
    gridTemplateColumns: `repeat(${inLine},1fr)`,
    transition: "500ms",
    transform: `scale(${active ? 1 : 0.55})`,
  };

  return (
    <div className="container" style={containerStyle} ref={containerRef}>
      <div className="scale" style={scaleStyle}>
        {children}
      </div>
    </div>
  );
};

export default Container;
