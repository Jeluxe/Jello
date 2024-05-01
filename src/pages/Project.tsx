// DnD Kit
import { DndContext } from '@dnd-kit/core';

// Project components and contexts
import { Modal, ProjectBody, ProjectHeader, Sidebar } from '../components';
import { ProjectProviderData, ProjectProviderOperations, useProjectProvider } from '../context/ProjectContext';

// images
import monica from '../assets/monic.jpg';

// Types and styles
import { ImageBackgroundStyle } from '../helpers';
import useDragOperations from '../hooks/useDragOperations';
import "./Project.css";

type ProjectContextOperations = Pick<ProjectProviderOperations, "handleDragStart" | "handleDragOver" | "handleDragEnd" | "findItemById" | "setIsModalOpen">

const Project: React.FC = () => {
  const {
    isModalOpen,
    modalData,
    setIsModalOpen,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  }: ProjectProviderData & ProjectContextOperations = useProjectProvider();
  const operations = useDragOperations()

  return (
    <div className="project-container" style={ImageBackgroundStyle(monica)}>
      <ProjectHeader />
      <DndContext
        {...operations}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <ProjectBody />
      </DndContext>
      <Sidebar type={"theme"} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalData={modalData} />
    </div>
  )
}

export default Project