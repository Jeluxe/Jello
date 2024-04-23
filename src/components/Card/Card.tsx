import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { DescriptionIcon, PlusIcon } from "../../assets/icons";
import { ProjectProviderOperations, useProjectProvider } from "../../context/ProjectContext";
import { Colors, ItemProps } from "../../types/global";
import ContextMenu from "../ContextMenu/ContextMenu";
import Dots from "../Dots/Dots";
import "./Card.css";

const Card = ({ id, title, content, tags, participants, openModal }: ItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id })
  const { addTags }: Pick<ProjectProviderOperations, "addTags"> = useProjectProvider();

  const uniqueTags = useMemo(() => {
    return [...new Set(tags)]
  }, [tags]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const openMenu = (e: any) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen)
  }

  document.addEventListener("click", (e) => {
    e.preventDefault();

    if (isMenuOpen) setIsMenuOpen(false);
  })

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div id={id} className="card">
        <div className="tags">
          {uniqueTags?.slice(0, 4).map(((tag: string, idx: number) => {
            return (idx > 2) ?
              null :
              <div
                key={idx}
                className="tag"
                style={{ backgroundColor: Colors[tag as keyof typeof Colors] }}
              >
                {tag}
              </div>
          }))}
          {
            uniqueTags?.length < 3 ?
              <PlusIcon
                size={12}
                className="button plus-button"
                onClick={(e) => addTags({ e, id })}
              /> :
              <Dots size={6} className="button" onClick={() => console.log("open list")} />
          }
        </div>
        <div className="card-title"><b>{title}</b></div>
        <div className="card-content">{content}</div>
        <div className="card-footer">
          <div className="card-actions">
            <div className="card-actions-wrapper">
              <div style={{ display: "flex", position: "relative" }}>
                <Dots
                  size={6}
                  className="button"
                  color="black"
                  vertical
                  onClick={openMenu}
                />
                {isMenuOpen ? <ContextMenu id={id} setIsMenuOpen={setIsMenuOpen} /> : ""}
              </div>
              <DescriptionIcon
                className="button"
                onClick={openModal} />
              <div>july 15</div>
            </div>
          </div>
          <div className="card-participants">
            {participants?.slice(0, 2).map((participant: any) => (
              <div key={participant.id} className="participant-avatar">
                {
                  participant.avatar ?
                    <img src={participant.avatar} /> :
                    participant.username[0].toUpperCase()
                }
              </div>
            ))}
            {participants.length >= 3 ? <Dots size={6} /> : null}
          </div>
        </div>
      </div>
    </div >
  )
}

export default Card
