import { Link } from "react-router-dom"
import monica from "../../assets/monic.jpg"
import "./Navbar.css"

type Props = {
  name?: string,
  image?: string
}

const Navbar = ({ name, image = monica }: Props) => {
  return (
    <div className="navbar-container">
      <div className="title-icon"><Link to={"/"}>website title</Link></div>
      <ul className="navbar-items">
        <li><Link to={"/"}>Home</Link></li>
        {name ? <li><Link to={"/my-projects"}>My Projects</Link></li> : ""}
        <li><Link to={"/contact"}>Contact</Link></li>
        <li><Link to={"/about"}>About</Link></li>
      </ul>
      {name ? <div className="navbar-profile">
        <Link to={"/profile"}><img width={35} height={35} src={image} /> <span>{name}</span></Link>
      </div> : <div style={{ display: "flex" }}>
        <Link to={"/sign-in"}> Sign In</Link>
        <Link to={"/sign-up"}> Sign Up</Link>
      </div>}
    </div>
  )
}

export default Navbar