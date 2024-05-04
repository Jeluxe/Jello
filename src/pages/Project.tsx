// DnD Kit
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

// Project components and contexts and hooks
import { Modal, ProjectHeader, ProjectPreview, Sidebar, ProjectBody, Container, Card } from '../components';
import { ProjectProviderData, ProjectProviderOperations, useProjectProvider } from '../context/ProjectContext';
import { SidebarProviderData, useSidebarProvider } from '../context/SidebarContext';
import useDragOperations from '../hooks/useDragOperations';

// Types and styles
import { isThemeImage } from '../helpers';
import "./Project.css";

type ProjectContextOperations = Pick<ProjectProviderOperations, "setIsModalOpen">

const Project = () => {
  const {
    projectData,
    activeItem,
    isModalOpen,
    modalData,
    setIsModalOpen,
  }: ProjectProviderData & ProjectContextOperations = useProjectProvider();

  const {
    theme,
    themePreview,
    isPreview,
  }: Exclude<SidebarProviderData, "sidebarData"> = useSidebarProvider()

  const operations = useDragOperations()

  return (
    <div className="project-container" style={isThemeImage(theme, themePreview)}>
      <ProjectHeader />
      {
        isPreview ?
          <ProjectPreview /> :
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
            <Sidebar />
            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalData={modalData} />
          </>
      }
    </div>
  )
}

export default Project