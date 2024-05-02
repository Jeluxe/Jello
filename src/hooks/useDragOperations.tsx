import { useCallback } from "react";

import { PointerSensor, TouchSensor, closestCenter, getFirstCollision, pointerWithin, rectIntersection, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { ProjectProviderData, ProjectProviderOperations, useProjectProvider } from "../context/ProjectContext";
import { ContainerMapProps } from "../types/global";

type dragOperationsProps = {
  onDragStart: (e: any) => void,
  onDragOver: (e: any) => void,
  onDragEnd: (e: any) => void,
}

type ProjectContextOperations = Pick<ProjectProviderOperations, "setProjectData" | "setActiveItem" | "removeCard" | "findContainer" | "setIsTrashable" | "setIsOverTrash">

const useDragOperations = () => {
  const {
    projectData, setProjectData,
    setActiveItem, removeCard,
    findContainer, setIsTrashable,
    setIsOverTrash
  }: Pick<ProjectProviderData, "projectData"> & ProjectContextOperations = useProjectProvider()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      }
    }),
    useSensor(TouchSensor),
  );

  const collisionDetection: (arg: any) => any = useCallback((args) => {
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

  const onDragStart: dragOperationsProps["onDragStart"] = (e) => {
    const { id, data: { current: { sortable: { containerId, index } } } } = e.active;

    if (containerId === "container-list") {
      setActiveItem({ id, title: id, list: projectData[id] });
    } else {
      setActiveItem({ ...projectData[containerId][index] });
      setIsTrashable(true)
    }
  }

  const onDragOver: dragOperationsProps["onDragOver"] = (event) => {
    const { active, over } = event;

    if (over?.id === "trash-container" && active.data.current.sortable.containerId !== "container-list") {
      setIsOverTrash(true);
      return;
    } else {
      setIsOverTrash(false)
    };

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over?.id);

    if (active.data.current.sortable?.containerId === "container-list") return;

    if (!activeContainer || !overContainer || activeContainer === overContainer) return;

    setProjectData((prev: ContainerMapProps): ContainerMapProps => {
      const overItems = prev[activeContainer];
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index;
      let newIndex;

      if (overContainer in prev) {
        newIndex = overItems.length + 1;
      } else {
        newIndex = overIndex >= 0 ? overIndex + 1 : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [...prev[activeContainer].filter((card: any) => card.id !== active.id)],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          prev[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      }
    });
  }

  const onDragEnd: dragOperationsProps["onDragEnd"] = (event) => {
    setIsTrashable(false);
    const { active, over } = event;

    if (!active || !over) return;

    const { id: activeId } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer) return;

    if (overContainer == 'trash-container') {
      removeCard(activeId)
      setIsOverTrash(false);
      return;
    }

    if (activeId !== overId) {
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index;

      setProjectData((prev: any) => {
        if (active.data.current.sortable.containerId === "container-list") {
          const formattedObject = Object.entries(prev);

          const activeItem = formattedObject.find(card => card[0] === activeId);
          const overItem = formattedObject.find(card => card[0] === overId || card[0] === overContainer);

          if (!activeItem || !overItem) return prev;

          const newActiveIndex = formattedObject.indexOf(activeItem);
          const newOverIndex = formattedObject.indexOf(overItem);

          return Object.fromEntries(arrayMove(formattedObject, newActiveIndex, newOverIndex));
        }
        return ({
          ...prev,
          [activeContainer]: arrayMove(prev[activeContainer], activeIndex, overIndex)
        });
      });
    }
    setActiveItem(null);
  }

  return {
    sensors,
    collisionDetection,
    onDragStart,
    onDragOver,
    onDragEnd
  }
}

export default useDragOperations