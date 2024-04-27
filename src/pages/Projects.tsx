import { PlusIcon } from "../assets/icons"
import { Button, Item } from "../components"
import "./Projects.css"

const Projects = () => {
  return (
    <div className="main-container">
      <div className="projects-container">
        <div className="projects-header">
          <span className="projects-header-title">My Projects</span>
          <Button title={<PlusIcon />} size={40} style={{ padding: 0 }} onClick={() => console.log("first")} />
        </div>
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
