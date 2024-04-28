import { useState } from "react"
import { Link } from "react-router-dom"
import { BurgerMenuIcon, ExitIcon } from "../../assets/icons"
import monica from "../../assets/monic.jpg"
import { useAuthProvider } from "../../context/AuthContext"
import "./Navbar.css"

type Props = {
  image?: string
}

const Navbar = ({ image = monica }: Props) => {
  const { logout, user, isAuthenticated } = useAuthProvider();
  const [isSmallDevice, setIsSmallDevice] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  const UserControls = () => (
    <div className="navbar-profile">
      <Link to="/profile" onClick={handleLinkClick}>
        <img width={35} height={35} src={image} alt="Profile" />
        <span>{user?.username}</span>
      </Link>
      <Link to="/" onClick={() => { handleLinkClick(); logout() }}>
        <ExitIcon size={24} className="button" />
      </Link>
    </div>
  );

  const GuestControls = () => (
    <>
      <Link to="/login" onClick={toggleMenu}>Login</Link>
      <Link to="/sign-up" onClick={toggleMenu}>Sign Up</Link>
    </>
  );

  const Links = () => (
    <>
      <Link to="/" onClick={handleLinkClick}>Home</Link>
      {isAuthenticated && <Link to="/my-projects" onClick={handleLinkClick}>My Projects</Link>}
      <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
      <Link to="/about" onClick={handleLinkClick}>About</Link>
    </>
  );

  return (
    <div className={`navbar-container ${isSmallDevice && isMenuOpen && "open"}`}>
      {
        isSmallDevice ?
          <>
            <div style={{ padding: " 10px" }}>
              <BurgerMenuIcon size={24} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>
            {isMenuOpen ?
              <div className="navbar-menu-sm">
                <Link to={"/"} onClick={handleLinkClick}>Jello</Link>
                <Links />
                {isAuthenticated && user ?
                  <UserControls /> :
                  <GuestControls />
                }
              </div> : null
            }
          </> :
          <>
            <div className="title-icon">
              <Link to={"/"} onClick={handleLinkClick}>Jello</Link>
            </div>
            <div style={{ display: "flex" }}>
              <Links />
            </div>
            {
              isAuthenticated && user ?
                <UserControls /> :
                <div style={{ display: "flex" }}><GuestControls /></div>
            }
          </>
      }
    </div>
  )
}

export default Navbar