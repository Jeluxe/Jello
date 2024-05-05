import { separateClasses } from "../../helpers";
import "./Divider.css";

const Divider = ({ type = "h", color }: { type?: string, color?: string }) => {
  return (
    <div className={separateClasses("divider", type)} style={{ background: color }}></div>
  )
}

export default Divider