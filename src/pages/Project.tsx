// DnD Kit
import { DndContext } from '@dnd-kit/core';

// Project components and contexts
import { Modal, ProjectBody, ProjectHeader } from '../components';
import { ProjectProviderData, ProjectProviderOperations, useProjectProvider } from '../context/ProjectContext';

// images
import monica from '../assets/monic.jpg';

// Types and styles
import { ImageBackgroundStyle } from '../helpers';
import useDragOperations from '../hooks/useDragOperations';
import "./Project.css";

type ProjectContextOperations = Pick<ProjectProviderOperations, "setIsModalOpen">

const Project: React.FC = () => {
  const {
    isModalOpen,
    modalData,
    setIsModalOpen,
  }: ProjectProviderData & ProjectContextOperations = useProjectProvider();

  const operations = useDragOperations()

  return (
    <div className="project-container" style={ImageBackgroundStyle(monica)}>
      <ProjectHeader />
      <DndContext {...operations}>
        <ProjectBody />
      </DndContext>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalData={modalData} />
    </div>
  )
}

export default Project