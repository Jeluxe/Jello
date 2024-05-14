import { useState } from "react"
import { Button, Item, Modal, NewProjectForm } from "../components"

import { BackIcon, PlusIcon } from "../assets/icons"
import { STATIC_DATA } from "../assets/global"

import { ThemeProps } from "../types/global"
import "./Projects.css"
import { ThemeProviderData, ThemeProviderOperations, useThemeProvider } from "../context/ThemeContext"

interface ProjectCardProps {
  name: string,
  theme: ThemeProps
}

const Projects = () => {
  const { modalType, isModalOpen, setIsModalOpen }: Pick<ThemeProviderData, "modalType" | "isModalOpen"> & Pick<ThemeProviderOperations, "setIsModalOpen"> = useThemeProvider();
  const [projectList, setProjectList] = useState<ProjectCardProps[]>(STATIC_DATA.map(({ projectData, ...props }) => props))
  const [isNewProjectFormOpen, setIsNewProjectFormOpen] = useState<boolean>(false);

  return (
    <div className="main-container">
      <div className="projects-container">
        <div className="projects-header">
          <span className="projects-header-title">
            {isNewProjectFormOpen ? "New Project Form" : "My Projects"}
          </span>
          <Button
            title={isNewProjectFormOpen ? <BackIcon /> : <PlusIcon />}
            size={40}
            style={{ padding: 0 }}
            onClick={() => setIsNewProjectFormOpen(!isNewProjectFormOpen)}
          />
        </div>
        {isNewProjectFormOpen ?
          <NewProjectForm
            projectList={projectList}
            setProjectList={setProjectList}
            setIsNewProjectFormOpen={setIsNewProjectFormOpen}
            setIsModalOpen={setIsModalOpen}
          /> :
          <div className="projects-wrapper">
            {projectList.map((project, idx) => (
              <Item key={idx} id={`foos${idx}`} title={`${project.name}`} theme={project.theme} />
            ))}
          </div>
        }
      </div>
      <Modal modalType={modalType} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  )
}

export default Projects
