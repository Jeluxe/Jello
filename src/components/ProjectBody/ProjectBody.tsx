// DnD Kit
import { useDroppable } from '@dnd-kit/core';

// Project components and contexts
import { Container, NewContainerForm, TrashContainer } from '..';
import { ProjectProviderData, ProjectProviderOperations, useProjectProvider } from '../../context/ProjectContext';

// Types and styles
import { ItemProps } from '../../types/global';
import './ProjectBody.css';

interface ProjectBodyProps {
}

const ProjectBody = ({ }: ProjectBodyProps) => {
  const { setNodeRef } = useDroppable({ id: "container-list" });

  const {
    projectData,
    isTrashable,
    isOverTrash,
    newContainer,
    setNewContainer
  }: ProjectProviderData & ProjectProviderOperations = useProjectProvider();

  return (
    <div className="project-body" ref={setNodeRef}>
      {Object.entries(projectData).map(([key, value]: [string, ItemProps[]]) => (
        <Container key={key} id={key} title={key} list={value} />
      ))}
      {newContainer && <NewContainerForm setIsOpen={setNewContainer} />}
      {isTrashable && <TrashContainer onTrash={isOverTrash} />}
    </div>
  )
};

export default ProjectBody;