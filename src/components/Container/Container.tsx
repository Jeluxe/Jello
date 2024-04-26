import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useState } from "react"

import { Card, NewCardForm } from ".."

import { DragIcon, PlusIcon, SettingsIcon } from "../../assets/icons"
import { ContainerProps } from "../../types/global"

import "./Container.css"

const Container = ({ id, title, list }: ContainerProps) => {
  const [newCard, setNewCard] = useState(false)
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
              size={24}
              id="settings"
              className="button"
            // onClick={openMenu}
            />
            <div className="container-title">{title}</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <PlusIcon className="button" onClick={() => setNewCard(!newCard)} />
              <div ref={setActivatorNodeRef} {...attributes} {...listeners} style={{ height: '24px' }}>
                <DragIcon className='grabbable' size={24} />
              </div>
            </div>
          </div>
          <div className="container-items">
            {list.map((card) => card && <Card key={card.id} {...card} />)}
            {newCard && <NewCardForm setIsOpen={setNewCard} containerId={title} />}
          </div>
        </div>
      </SortableContext >
    </div>
  )
}

export default Container