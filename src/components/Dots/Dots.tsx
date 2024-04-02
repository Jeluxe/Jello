import { separateClasses } from "../../helpers"
import "./Dots.css"

const Dots = ({ vertical = false, onClick, color, size, className = "" }: { vertical?: boolean, onClick?: any, color?: string, size?: number, className?: string[] | string }) => {
  return (
    <div className={separateClasses("dots", className)} style={{ flexDirection: vertical ? "column" : "row" }} onClick={onClick}>
      <div style={{ background: color, height: size, width: size }} />
      <div style={{ background: color, height: size, width: size }} />
      <div style={{ background: color, height: size, width: size }} />
    </div>
  )
}

export default Dots