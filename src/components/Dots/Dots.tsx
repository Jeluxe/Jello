import "./Dots.css"

const Dots = ({ vertical = false, onClick, color, className }: { vertical?: boolean, onClick?: any, color?: string, className?: string }) => {
  return (
    <div className={"dots " + className} style={{ flexDirection: vertical ? "column" : "row" }} onClick={onClick}>
      <div style={{ background: color }} />
      <div style={{ background: color }} />
      <div style={{ background: color }} />
    </div>
  )
}

export default Dots