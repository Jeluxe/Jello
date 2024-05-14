import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { Dots } from "..";
import { DescriptionIcon, PlusIcon, TrashIcon } from "../../assets/icons";
import { ProjectProviderOperations, useProjectProvider } from "../../context/ProjectContext";
import { Colors, ItemProps } from "../../types/global";
import "./Card.css";

type CardContextOperations = Pick<ProjectProviderOperations, "addTag" | "openModal" | "removeCard">

const Card = ({ id, title, content, tags, participants }: ItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id })
  const { addTag, openModal, removeCard }: CardContextOperations = useProjectProvider();

  const uniqueTags = useMemo(() => {
    return [...new Set(tags)]
  }, [tags]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

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
                onClick={(e) => addTag({ e, id })}
              /> :
              <Dots size={6} className="button" onClick={() => console.log("open list")} />
          }
        </div>
        <div className="card-title"><b>{title}</b></div>
        <div className="card-content">{content}</div>
        <div className="card-footer">
          <div className="card-actions">
            <div className="card-actions-wrapper">
              <TrashIcon
                className="button"
                onClick={() => removeCard(id)}
              />
              <DescriptionIcon
                className="button"
                onClick={() => openModal(id, "card")}
              />
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
