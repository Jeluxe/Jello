// DnD Kit
import { DragOverlay, useDroppable } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';

// Project components and contexts
import { Card, Container, NewContainerForm, TrashContainer } from '..';
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
    activeItem,
    isTrashable,
    isOverTrash,
    newContainer,
    setNewContainer
  }: ProjectProviderData & ProjectProviderOperations = useProjectProvider();

  return (
    <>
      <SortableContext
        id='container-list'
        items={Object.keys(projectData)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="project-body" ref={setNodeRef}>
          {Object.entries(projectData).map(([key, value]: [string, ItemProps[]]) => (
            <Container key={key} id={key} title={key} list={value} />
          ))}
          {newContainer && <NewContainerForm setIsOpen={setNewContainer} />}
          {isTrashable && <TrashContainer onTrash={isOverTrash} />}
        </div>
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
    </>
  )
};

export default ProjectBody;