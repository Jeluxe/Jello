import { separateClasses } from "../../helpers"
import "./Dots.css"

const Dots = ({ vertical = false, onClick, color, size, className = "" }: { vertical?: boolean, onClick?: any, color?: string, size?: number, className?: string[] | string }) => {
  return (
    <div className={separateClasses("dots", className)} style={{ flexDirection: vertical ? "column" : "row" }} onClick={onClick}>
      {Array(3).fill(0).map((_, idx) => <div key={idx} style={{ background: color, height: size, width: size }} />)}
    </div>
  )
}

export default Dots