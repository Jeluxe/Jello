import "./Dots.css"

const Dots = ({ vertical = false, onClick }: { vertical?: boolean, onClick?: any }) => {
  return (
    <div className="dots" style={{ flexDirection: vertical ? "column" : "row" }} onClick={onClick}>
      <div /><div /><div />
    </div>
  )
}

export default Dots