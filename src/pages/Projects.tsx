import Card from "../components/Card/Card"
import "./Projects.css"

const Projects = () => {
  return (
    <div className="main-container">
      <div className="projects-container">
        <span style={{ width: "100%", paddingLeft: "8%" }}>My Projects</span>
        <div className="projects-wrapper">
          {Array(15).fill(0).map((_, idx) => (
            <Card key={idx} id={`foos${idx}`} title={`goose${idx}`} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects