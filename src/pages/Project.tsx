import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useParams } from "react-router-dom";

import { PlusIcon, ThemeIcon } from '../assets/icons';
import monica from "../assets/monic.jpg";

import { useCallback, useState } from 'react';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import Container from '../components/Container/Container';
import Dots from '../components/Dots/Dots';
import Input from '../components/Input/Input';
import Modal from '../components/Modal/Modal';
import { ProjectProviderData, ProjectProviderOperations, useProjectProvider } from '../context/ProjectContext';
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
  const [newContainer, setNewContainer] = useState({ creatingNewContainer: false, name: "" });
  const [error, setError] = useState({ error: false, message: "" });
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
  }

  const onAction = () => {
    console.log("here")
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
    cancel()
  }

  const onKeyDown = useCallback((e: any) => {
    setError({ error: false, message: "" })
    if (newContainer.creatingNewContainer && e.key === 'Escape' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
      cancel()
    }
    if (newContainer.creatingNewContainer && e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
      onAction()
    }
  }, [newContainer])

  const containerCreation = () => {
    setNewContainer(prev => ({ ...prev, creatingNewContainer: true }));
  }

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
            {Object.entries(projectData).map(([key, value]: any) => (
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
                      onBlur={() => setTimeout(() => { cancel() }, 100)}
                      onChange={({ target: { value } }: { target: { value: string } }) => setNewContainer(prev => ({ ...prev, name: value }))}
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