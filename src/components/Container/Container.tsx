import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DragIcon, PlusIcon } from "../../assets/icons"

import { ContainerProps } from "../../pages/Project"
import Item from "../Item/Item"
import "./Container.css"

const Container = ({ id, title, list, setContainers }: ContainerProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const addItem = (e: any) => {
    if (!setContainers) return;
    const selectedContainer = e.target.parentElement.parentElement.getAttribute("id");

    setContainers((prev: any) => {
      if (selectedContainer) {
        if (prev[selectedContainer].length === 20) {
          return prev;
        }
        return {
          ...prev,
          [selectedContainer]: [
            ...prev[selectedContainer],
            { id: getNewId(prev), content: "foos" }
          ]
        }
      } else {
        return prev;
      }
    })
  }

  const getNewId = (list: any[]): number => {
    let totalLength: number = 0;

    Object.values(list).forEach(item => {
      totalLength += item.length;
    })
    console.log(totalLength)
    return totalLength + 1;
  }

  return (
    <div ref={setNodeRef} style={style}>
      <SortableContext
        id={id}
        items={list}
        strategy={verticalListSortingStrategy}
      >
        <div id={title} className="container">
          <div className="container-header">
            <div className="container-title">{title}</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <PlusIcon className="button" onClick={addItem} />
              <div ref={setActivatorNodeRef} {...attributes} {...listeners} style={{ height: '24px' }}>
                <DragIcon className='grabbable' size={24} />
              </div>
            </div>
          </div>
          <div className="container-items">
            {list.map((item) => <Item key={item.id} {...item} setContainers={setContainers} />)}
          </div>
        </div>
      </SortableContext >
    </div>
  )
}

export default Container