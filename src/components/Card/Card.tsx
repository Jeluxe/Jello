import { Link } from "react-router-dom"
import monica from "../../assets/monic.jpg"
import "./Card.css"
type Props = {
  id: string,
  title: string,
  image?: string
}

const Card = ({ id, title, image = monica }: Props) => {

  return (
    <Link to={id} className="card-container">
      <img src={image} />
      <div>{title}</div>
    </Link>
  )
}

export default Card