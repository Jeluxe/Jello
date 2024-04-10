import { Link } from "react-router-dom"
import { ExitIcon } from "../../assets/icons"
import monica from "../../assets/monic.jpg"
import { useAuthProvider } from "../../context/AuthContext"
import "./Navbar.css"

type Props = {
  image?: string
}

const Navbar = ({ image = monica }: Props) => {
  const { logout, user, authenticated } = useAuthProvider();

  return (
    <div className="navbar-container">
      <div className="title-icon"><Link to={"/"}>Jello</Link></div>
      <ul className="navbar-items">
        <li><Link to={"/"}>Home</Link></li>
        {authenticated ? <li><Link to={"/my-projects"}>My Projects</Link></li> : ""}
        <li><Link to={"/contact"}>Contact</Link></li>
        <li><Link to={"/about"}>About</Link></li>
      </ul>
      {
        authenticated && user ?
          <div className="navbar-profile">
            <Link to={"/profile"}>
              <img width={35} height={35} src={image} />
              <span>{user.username}</span>
            </Link>
            <Link to={"/"} onClick={logout} style={{ padding: "14px" }}>
              <ExitIcon size={24} className="button" />
            </Link>
          </div> :
          <div style={{ display: "flex" }}>
            <Link to={"/login"}>Login</Link>
            <Link to={"/sign-up"}>Sign Up</Link>
          </div>
      }
    </div>
  )
}

export default Navbar