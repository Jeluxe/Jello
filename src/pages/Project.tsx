import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { ThemeIcon } from '../assets/icons';
import monica from "../assets/monic.jpg";
import Button from '../components/Button/Button';
import Container from '../components/Container/Container';
import Dots from '../components/Dots/Dots';
import Item from '../components/Item/Item';
import "./Project.css";

const isImgBg = (img: string) => ({
  background: `url(${img})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center"
})

const Project = () => {
  const params = useParams();
  const [containers, setContainers] = useState<any>({
    Planned: [{ id: "1", content: "ffooso", tags: ["bug", "info", "inspire", "danger", "frog"] }, { id: "2", content: "ffooso1" }, { id: "3", content: "ffasooso" }],
    InProgress: [{ id: "4", content: "ffooso2", tags: ["bug", "info"] }, { id: "5", content: "ff2eeooso" }, { id: "6", content: "fsdssfooso" }],
    Completed: [{ id: "7", content: "ffoosoef32q", tags: ["info", "inspire"] }, { id: "8", content: "ffoosofsdf3" }, { id: "9", content: "fdfosadoso" }],
    Dropped: []
  })
  const [activeItem, setActiveItem] = useState<any | null>()

  const findContainer = (id: string) => {
    if (id in containers) {
      return id;
    }

    return Object.keys(containers).find(key => containers[key].find((item: any) => item && item.id === id))
  }

  const handleDragStart = (event: any) => {
    const item = event.active.data.current;
    setActiveItem(item);
  }

  const handleDragOver = (event: any) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setContainers((prev: any) => {
      const overItems = prev[overContainer];

      if (overItems.length === 20) {
        return prev;
      }

      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable?.index;

      let newIndex;

      if (overId in prev) {
        newIndex = overItems.length + 1;
      } else {
        newIndex = overIndex >= 0 ? overIndex + 1 : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [...prev[activeContainer].filter((item: any) => item.id !== id)],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          containers[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      }
    })
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return;
    }

    const activeIndex = active.data.current.sortable.index;
    const overIndex = over.data.current?.sortable?.index;

    if (activeIndex !== overIndex) {
      setContainers((prev: any) => ({
        ...prev,
        [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex)
      }))
    }

    setActiveItem(null);
  }

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
  )

  const handleNewContainer = () => {
    if (Object.keys(containers).length > 8) {
      console.log("no more slots left")
      return;
    }
    setContainers((prev: any) => ({
      ...prev,
      ["aaaabbccdeaaa" + Math.random() * 1000]: []
    }))
    console.log("created new container")
  }

  return (
    <div className="project-container" style={isImgBg(monica)}>
      <div className="project-header">
        <div className='project-title'>project: {params.id}</div>
        <div className='project-options'>
          <div className='project-option' style={isImgBg(monica)}><ThemeIcon color='white' size={20} /></div>
          <div className='project-option'><Dots vertical color="black" /></div>
        </div>
      </div>
      <div className="project-body">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          {Object.entries(containers).map(([key, value]: any) => (
            <Container key={key} id={key} title={key} list={value} setContainers={setContainers} />
          ))}
          <Button title='add container' style={{ width: 320, backgroundColor: "rgb(123 124 125 / 59%)" }} onClick={handleNewContainer}></Button>
          <DragOverlay>{activeItem ? <Item item={activeItem} /> : null}</DragOverlay>
        </DndContext>
      </div>
    </div >

  )
}

export default Project