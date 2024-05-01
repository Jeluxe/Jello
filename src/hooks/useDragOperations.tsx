import { PointerSensor, TouchSensor, closestCenter, getFirstCollision, pointerWithin, rectIntersection, useSensor, useSensors } from "@dnd-kit/core";
import { useCallback } from "react";

const useDragOperations = () => {
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

  return { sensors, collisionDetection }
}

export default useDragOperations