import Item from "../components/Item/Item"
import "./Projects.css"

const Projects = () => {
  return (
    <div className="main-container">
      <div className="projects-container">
        <span className="container-title">My Projects</span>
        <div className="projects-wrapper">
          {Array(5).fill(0).map((_, idx) => (
            <Item key={idx} id={`foos${idx}`} title={`goose${idx}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects