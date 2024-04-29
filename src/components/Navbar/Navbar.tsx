import { useLayoutEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { BurgerMenuIcon, ExitIcon } from "../../assets/icons"
import monica from "../../assets/monic.jpg"
import { useAuthProvider } from "../../context/AuthContext"
import "./Navbar.css"

type Props = {
  image?: string
}

const Navbar = ({ image = monica }: Props) => {
  const pageWidthRef = useRef<any>(null);
  const { logout, user, isAuthenticated } = useAuthProvider();
  const [isSmallDevice, setIsSmallDevice] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const checkSize = () => {
      if (pageWidthRef.current) {
        const width = pageWidthRef.current.getBoundingClientRect().width;
        setIsSmallDevice(width < 768);
      }
    };

    checkSize();

    window.addEventListener('resize', checkSize);

    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, [])

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
      <Link to="/" onClick={() => { handleLinkClick(); logout() }} style={{ padding: 14 }}>
        <ExitIcon size={24} />
      </Link>
    </div>
  );

  const GuestControls = ({ flex }: { flex?: boolean }) => (
    <div style={{ display: flex ? "flex" : "block" }}>
      <Link to="/login" onClick={toggleMenu}>Login</Link>
      <Link to="/sign-up" onClick={toggleMenu}>Sign Up</Link>
    </div>
  );

  const Links = ({ flex }: { flex?: boolean }) => (
    <div style={{ display: flex ? "flex" : "block" }}>
      <Link to="/" onClick={handleLinkClick}>Home</Link>
      {isAuthenticated && <Link to="/my-projects" onClick={handleLinkClick}>My Projects</Link>}
      <Link to="/contact" onClick={handleLinkClick}>Contact</Link>
      <Link to="/about" onClick={handleLinkClick}>About</Link>
    </div>
  );

  return (
    <div ref={pageWidthRef} className={`navbar-container ${isSmallDevice && isMenuOpen && "open"}`}>
      {
        isSmallDevice ?
          <>
            <div className="navbar-sm">
              <div className="button burger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <BurgerMenuIcon size={24} />
              </div>
              <Link to={"/"} onClick={handleLinkClick}>Jello</Link>
            </div>
            {isMenuOpen ?
              <div className="navbar-menu-sm">
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
            <Links flex />
            {
              isAuthenticated && user ?
                <UserControls /> :
                <GuestControls flex />
            }
          </>
      }
    </div>
  )
}

export default Navbar