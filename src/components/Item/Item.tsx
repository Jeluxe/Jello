import { Link } from "react-router-dom"
import monica from "../../assets/monic.jpg"
import "./Item.css"
type Props = {
  id: string,
  title: string,
  image?: string
}

const Item = ({ id, title, image = monica }: Props) => {

  return (
    <Link to={id} className="item-container">
      <img src={image} />
      <div>{title}</div>
    </Link>
  )
}

export default Item