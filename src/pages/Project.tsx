import { useState } from 'react';

// DnD Kit
import { DndContext } from '@dnd-kit/core';

// Project components and contexts
import { Modal, ProjectBody, ProjectHeader, ProjectPreview, Sidebar } from '../components';
import { ProjectProviderData, ProjectProviderOperations, useProjectProvider } from '../context/ProjectContext';
import useDragOperations from '../hooks/useDragOperations';

// images
import monica from '../assets/monic.jpg';

// Types and styles
import { isThemeImage } from '../helpers';
import { SidebarProps, ThemeProps } from '../types/global';
import "./Project.css";

type ProjectContextOperations = Pick<ProjectProviderOperations, "setIsModalOpen">

const Project = () => {
  const [isPreview, setIsPreview] = useState<boolean>(false)
  const [theme, setTheme] = useState<ThemeProps>({ name: "monica", background: monica, image: true })
  const [themePreview, setThemePreview] = useState<ThemeProps | null>(null)
  const [sidebarData, setSidebarData] = useState<SidebarProps>({ type: "themes", isOpen: false });

  const {
    isModalOpen,
    modalData,
    setIsModalOpen,
  }: ProjectProviderData & ProjectContextOperations = useProjectProvider();

  const operations = useDragOperations()

  const closePreview = () => {
    setThemePreview(null);
    setIsPreview(false);
  }

  const onSave = () => {
    if (themePreview) {
      setTheme(themePreview);
    }
    closePreview();
  }

  return (
    <div className="project-container" style={isThemeImage(theme, themePreview)}>
      <ProjectHeader setSidebarData={setSidebarData} isPreview={isPreview} theme={theme} />
      {
        isPreview ?
          <ProjectPreview onSave={onSave} onRevert={closePreview} /> :
          <>
            <DndContext {...operations}>
              <ProjectBody />
            </DndContext>
            <Sidebar sidebarData={sidebarData} setSidebarData={setSidebarData} setThemePreview={setThemePreview} setIsPreview={setIsPreview} />
            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalData={modalData} />
          </>
      }
    </div>
  )
}

export default Project