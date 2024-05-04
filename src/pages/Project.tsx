// External libraries
import { useState } from 'react';

// DnD Kit
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

// Project components and contexts
import { Modal, ProjectHeader, ProjectPreview, Sidebar, ProjectBody, Container, Card } from '../components';
import { ProjectProviderData, ProjectProviderOperations, useProjectProvider } from '../context/ProjectContext';
import useDragOperations from '../hooks/useDragOperations';

// Images
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
    projectData,
    activeItem,
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
              <SortableContext
                id='container-list'
                items={Object.keys(projectData)}
                strategy={horizontalListSortingStrategy}
              >
                <ProjectBody />
              </SortableContext>
              <DragOverlay>
                {
                  activeItem ?
                    ('list' in activeItem) ?
                      <Container key={activeItem.id + "overlay"} {...activeItem} /> :
                      ('content' in activeItem) ?
                        <Card key={activeItem.id + "overlay"} {...activeItem} /> :
                        null :
                    null
                }
              </DragOverlay>
            </DndContext>
            <Sidebar sidebarData={sidebarData} setSidebarData={setSidebarData} setThemePreview={setThemePreview} setIsPreview={setIsPreview} />
            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalData={modalData} />
          </>
      }
    </div>
  )
}

export default Project