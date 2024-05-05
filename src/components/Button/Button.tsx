import { separateClasses } from "../../helpers"
import "./Button.css"

type Props = {
  className?: string | string[],
  size?: number | string,
  width?: number | string,
  height?: number | string,
  style?: any,
  title: string | React.ReactNode,
  onClick: (e: any) => void,
}
const Button = ({ className, width, height, size, style, title, onClick }: Props) => {
  return (
    <button className={separateClasses("button", className)} style={{ width: size || width, height: size || height, ...style }} onClick={onClick}>{title}</button>
  )
}

export default Button