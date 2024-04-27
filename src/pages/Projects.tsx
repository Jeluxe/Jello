import { Item } from "../components"
import "./Projects.css"

const Projects = () => {
  return (
    <div className="main-container">
      <div className="projects-container">
        <div className="projects-wrapper">
          <span className="projects-header">My Projects</span>
          {Array(5).fill(0).map((_, idx) => (
            <Item key={idx} id={`foos${idx}`} title={`goose${idx}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects
