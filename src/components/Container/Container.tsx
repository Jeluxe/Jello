import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DragIcon, PlusIcon, SettingsIcon } from "../../assets/icons"
import { useProjectProvider } from "../../context/ProjectContext"
import { ContainerProps } from "../../types/global"
import Item from "../Item/Item"
import "./Container.css"

const Container = ({ id, title, list, openModal }: ContainerProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef
  } = useSortable({ id });
  const { addItem } = useProjectProvider()

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <SortableContext
        id={id}
        items={list}
        strategy={verticalListSortingStrategy}
      >
        <div id={title} className="container">
          <div className="container-header">
            <SettingsIcon
              size={20}
              id="settings"
              className="button"
              color="black"
            // onClick={openMenu}
            />
            <div className="container-title">{title}</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <PlusIcon className="button" onClick={addItem} />
              <div ref={setActivatorNodeRef} {...attributes} {...listeners} style={{ height: '24px' }}>
                <DragIcon className='grabbable' size={24} />
              </div>
            </div>
          </div>
          <div className="container-items">
            {list.map((item) => <Item key={item.id} {...item} openModal={openModal} />)}
          </div>
        </div>
      </SortableContext >
    </div>
  )
}

export default Container