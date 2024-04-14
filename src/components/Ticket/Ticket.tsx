import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { DescriptionIcon, PlusIcon } from "../../assets/icons";
import { useProjectProvider } from "../../context/ProjectContext";
import { Colors, ItemProps } from "../../types/global";
import ContextMenu from "../ContextMenu/ContextMenu";
import Dots from "../Dots/Dots";
import "./Ticket.css";

const Ticket = ({ id, title, content, tags, participants, openModal }: ItemProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id })
  const { addTags } = useProjectProvider();

  const filteredTags = useMemo(() => {
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
      <div id={id} className="ticket">
        <div className="tags">
          {filteredTags?.slice(0, 4).map(((tag: string, idx: number) => {
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
            filteredTags?.length < 3 ?
              <PlusIcon
                size={12}
                className="button plus-button"
                onClick={(e) => addTags(e, id)}
              /> :
              <Dots size={6} className="button" onClick={() => console.log("open list")} />
          }
        </div>
        <div className="ticket-title"><b>{title}</b></div>
        <div className="ticket-content">{content}</div>
        <div className="ticket-footer">
          <div className="ticket-actions">
            <div className="ticket-actions-wrapper">
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
          <div className="ticket-participants">
            {participants?.slice(0, 2).map((participant: any) => (
              <div key={participant.id} className="participant-avatar">
                {
                  participant.avatar ?
                    <img src={participant.avatar} /> :
                    participant.username[0].toUpperCase()
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  )
}

export default Ticket
