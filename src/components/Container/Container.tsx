import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import Button from "../Button/Button"
import Item from "../Item/Item"
import "./Container.css"

type Props = {
  id: string,
  title: string,
  list: any[],
  setContainers: any
}

const Container = ({ id, title, list, setContainers }: Props) => {
  const { setNodeRef } = useDroppable({ id, data: list })

  const addItem = (e: any) => {
    const selectedContainer = e.target.parentElement.parentElement.getAttribute("id");

    setContainers((prev: any) => {
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
    <SortableContext id={id} items={list} strategy={verticalListSortingStrategy}>
      <div id={title} className="container">
        <div className="container-header">
          <div className="container-title">{title}</div>
          <Button className="new-card-btn" size={20} style={{ padding: "0", background: "transparent", color: "black" }} title="+" onClick={addItem}></Button>
        </div>
        <div className="container-items" ref={setNodeRef}>
          {list.map((item, idx) => (
            item && <Item key={idx} item={item} setContainers={setContainers} />
          ))}
        </div>
      </div>
    </SortableContext >
  )
}

export default Container