import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { ChangeEvent, useCallback, useState } from 'react';
import { useParams } from "react-router-dom";

import { PlusIcon, ThemeIcon } from '../assets/icons';
import monica from "../assets/monic.jpg";

import { Button, Card, Container, Dots, Input, Modal } from '../components';
import { ProjectProviderData, ProjectProviderOperations, useProjectProvider } from '../context/ProjectContext';
import { ItemProps } from '../types/global';

import "./Project.css";

type ProjectContextOperations = Pick<ProjectProviderOperations, "addContainer" | "handleDragStart" | "handleDragOver" | "handleDragEnd" | "findItemById" | "setIsModalOpen">

const ImageBackgroundStyle = (img: string) => ({
  background: `url(${img})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center"
});

const Project: React.FC = () => {
  const params = useParams();
  const [newContainer, setNewContainer] = useState<{ creatingNewContainer: boolean, name: string }>({ creatingNewContainer: false, name: "" });
  const [error, setError] = useState<{ error: boolean, message: string }>({ error: false, message: "" });
  const { setNodeRef } = useDroppable({ id: "container-list" });
  const {
    projectData,
    activeItem,
    isModalOpen,
    modalData,
    setIsModalOpen,
    addContainer,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  }: ProjectProviderData & ProjectContextOperations = useProjectProvider();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      }
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const cancel = () => {
    setNewContainer({ creatingNewContainer: false, name: "" });
    setError({ error: false, message: "" })
  }

  const onAction = () => {
    let text = newContainer.name.trim()
    if (!text) {
      setError({ error: true, message: "No text inserted" })
      return;
    }
    if (!/[A-Za-z]/g.test(text[0])) {
      setError({ error: true, message: "First char must be letter" })
      return;
    }

    addContainer(text)
  }

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    setError({ error: false, message: "" })
    if (newContainer.creatingNewContainer && !e.shiftKey && !e.ctrlKey && !e.altKey) {
      if (e.key === 'Escape') {
        cancel()
      }
      else if (e.key === 'Enter') {
        onAction()
      }
    }
  }, [newContainer, setError, cancel, onAction])

  const containerCreation = () => {
    setNewContainer(prev => ({ ...prev, creatingNewContainer: true }));
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewContainer(prev => ({ ...prev, name: e.target.value }));
  };

  return (
    <div className="project-container" style={ImageBackgroundStyle(monica)}>
      <div className="project-header">
        <div className='project-title'>project: {params.id}</div>
        <div className='project-options'>
          <div className='project-option button' style={ImageBackgroundStyle(monica)}><ThemeIcon color='white' size={20} /></div>
          <div><Dots className={["button", "project-option"]} vertical color="black" /></div>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
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
              newContainer.creatingNewContainer ?
                <div
                  className='container new-container'
                >
                  <div>
                    <Input
                      className={"container-input"}
                      value={newContainer.name}
                      onKeydown={onKeyDown}
                      onChange={handleChange}
                      maxLength={24}
                    />
                  </div>
                  <PlusIcon className='button' onClick={onAction} />
                  {error.error ? <span style={{ position: "absolute", bottom: 0, transform: "translateY(40px)", color: "red", background: "rgba(0, 0, 0,.6)", padding: "4px 8px", borderRadius: "6px" }}>{error.message}</span> : null}
                </div> :
                <>{!activeItem ? <Button title='add container' style={{ minWidth: 280, backgroundColor: "rgb(123 124 125 / 59%)" }} onClick={containerCreation} /> : ""}</>
            }
          </div>
        </SortableContext>
        <DragOverlay>{
          activeItem ?
            ('list' in activeItem) ? <Container key={activeItem.id} {...activeItem} /> :
              ('content' in activeItem) ? <Card key={activeItem.id} {...activeItem} /> : "" : ""
        }</DragOverlay>
      </DndContext>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalData={modalData} />
    </div>
  )
}

export default Project