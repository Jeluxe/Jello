import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useParams } from "react-router-dom";

import { ThemeIcon } from '../assets/icons';
import monica from "../assets/monic.jpg";

import Button from '../components/Button/Button';
import Container from '../components/Container/Container';
import Dots from '../components/Dots/Dots';
import Modal from '../components/Modal/Modal';
import Ticket from '../components/Ticket/Ticket';
import { ProjectProviderData, selectedFunctions, useProjectProvider } from '../context/ProjectContext';
import useModal from '../hooks/ModalHook';
import "./Project.css";

const ImageBackgroundStyle = (img: string) => ({
  background: `url(${img})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center"
});

const Project: React.FC = () => {
  const params = useParams();

  const { setNodeRef } = useDroppable({ id: "container-list" });
  const { isModalOpen, setIsModalOpen, modalData, setModalData } = useModal();
  const {
    projectData,
    activeItem,
    addContainer,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    findItemById
  }: ProjectProviderData & selectedFunctions = useProjectProvider();

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

  const openModal = ({ target }: any) => {
    const foundItem = target.closest(".ticket");
    if (foundItem) {
      const foundID = foundItem.getAttribute("id");
      const returnedItem = findItemById(foundID);
      if (returnedItem) {
        setIsModalOpen(true);
        setModalData(returnedItem);
      }
    }
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
              <Container key={key} id={key} title={key} list={value} openModal={openModal} />
            ))}
            <Button title='add container' style={{ minWidth: 280, backgroundColor: "rgb(123 124 125 / 59%)" }} onClick={addContainer}></Button>
          </div>
        </SortableContext>
        <DragOverlay>{
          activeItem ?
            ('list' in activeItem) ? <Container key={activeItem.id} {...activeItem} /> :
              ('content' in activeItem) ? <Ticket key={activeItem.id} {...activeItem} /> : "" : ""
        }</DragOverlay>
      </DndContext>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} modalData={modalData} />
    </div>
  )
}

export default Project