import { DndContext, DragOverlay, PointerSensor, TouchSensor, closestCenter, getFirstCollision, pointerWithin, rectIntersection, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { useCallback, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { ExitIcon, ThemeIcon } from '../assets/icons';
import monica from "../assets/monic.jpg";

import { Button, Card, Container, Dots, Modal, NewContainerForm, TrashContainer } from '../components';
import { ProjectProviderData, ProjectProviderOperations, useProjectProvider } from '../context/ProjectContext';
import { ItemProps } from '../types/global';

import "./Project.css";

type ProjectContextOperations = Pick<ProjectProviderOperations, "handleDragStart" | "handleDragOver" | "handleDragEnd" | "findItemById" | "setIsModalOpen">

const ImageBackgroundStyle = (img: string) => ({
  background: `url(${img})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center"
});

const Project: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [newContainer, setNewContainer] = useState<boolean>(false);
  const { setNodeRef } = useDroppable({ id: "container-list" });

  const {
    projectData,
    activeItem,
    isModalOpen,
    modalData,
    setIsModalOpen,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    isTrashable,
    isOverTrash
  }: ProjectProviderData & ProjectContextOperations = useProjectProvider();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      }
    }),
    useSensor(TouchSensor),
  );

  const collisionDetectionStrategy: (arg: any) => any = useCallback((args) => {
    // Start by finding any intersecting droppable
    const pointerIntersections = pointerWithin(args);
    const intersections =
      pointerIntersections.length > 0
        ? // If there are droppables intersecting with the pointer, return those
        pointerIntersections
        : rectIntersection(args);

    let overId = getFirstCollision(intersections, 'id');
    const activeItemContainerId = args.active.data.current?.sortable?.containerId;

    if (activeItemContainerId === "container-list") {
      return closestCenter({
        ...args,
        droppableContainers: [...args.droppableContainers.filter(({ data: { current } }: { data: { current: any } }) => current?.sortable?.containerId === "container-list")]
      });
    }
    if (overId != null) {
      if (overId === "trash-container") {
        // If the intersecting droppable is the trash, return early
        return intersections;
      }

    }
    return [{ id: overId }]
  }, []);

  return (
    <div className="project-container" style={ImageBackgroundStyle(monica)}>
      <div className="project-header">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ExitIcon className='button' size={24} onClick={() => navigate(-1)} />
          <div className='project-title'>project: {params.id}</div>
        </div>
        <div className='project-options'>
          <div className='project-option button' style={ImageBackgroundStyle(monica)}><ThemeIcon color='white' size={20} /></div>
          <div><Dots className={["button", "project-option"]} vertical color="black" /></div>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <SortableContext
          id='container-list'
          items={Object.keys(projectData)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="project-body" ref={setNodeRef}>
            {Object.entries(projectData).map(([key, value]: [string, ItemProps[]]) => (
              <Container key={key} id={key} title={key} list={value} />
            ))}
            {
              newContainer ?
                <NewContainerForm setIsOpen={setNewContainer} /> :
                !activeItem &&
                <Button
                  title='add container'
                  style={{ minWidth: 280, backgroundColor: "rgb(123 124 125 / 59%)" }}
                  onClick={() => setNewContainer(!newContainer)}
                />
            }
            {isTrashable && <TrashContainer onTrash={isOverTrash} />}
          </div>
        </SortableContext>
        <DragOverlay>{
          activeItem ?
            ('list' in activeItem) ? <Container key={activeItem.id + "overlay"} {...activeItem} /> :
              ('content' in activeItem) ? <Card key={activeItem.id + "overlay"} {...activeItem} /> : "" : ""
        }</DragOverlay>
      </DndContext>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalData={modalData} />
    </div>
  )
}

export default Project