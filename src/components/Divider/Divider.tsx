import "./Divider.css";

const Divider = ({ type }: { type: string }) => {
  const verticalStyle = {
    minHeight: "100%",
    width: "1px",
    alignItems: "center"
  }

  const horizonalStyle = {
    minWidth: "100%",
    height: "1px",
    justifyContent: "center"
  }

  const findStyle = (type: string) => {
    if (type === "h") {
      return horizonalStyle
    }
    if (type === "v") {
      return verticalStyle
    }
  }

  return (
    <div className="divider" style={findStyle(type)}></div>
  )
}

export default Divider