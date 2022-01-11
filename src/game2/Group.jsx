const Group = ({ children }) => {
  const groupStyle = { display: "flex", height: "240px" };
  return (
    <div className="group" style={groupStyle}>
      {children}
    </div>
  );
};

export default Group;
