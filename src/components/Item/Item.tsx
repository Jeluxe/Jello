import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import monica from "../../assets/monic.jpg";
import Button from "../Button/Button";
import Dots from "../Dots/Dots";
import "./Item.css";

type Props = {
  item: {
    id: string,
    content?: string,
    tags?: string[] | null,
  },
  setContainers?: any
}

enum Colors {
  bug = "green",
  info = "lightblue",
  inspire = "yellow",
  danger = "red"
}

const Item = ({ item, setContainers }: Props) => {
  const { id, content, tags } = item;

  const filteredTags = useMemo(() => {
    return [...new Set(tags)]
  }, [tags]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: item.id, data: item })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleOpenInfoModal = () => {
    console.log("open")
  }

  const handleAddTags = (e: any) => {
    const selectedContainer = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute("id");

    console.log("add tag/s", selectedContainer)
    const newTag = "danger";
    setContainers((prev: any) => ({
      ...prev,
      [selectedContainer]: [...prev[selectedContainer].map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            tags: (item?.tags) ? [...item.tags, newTag] : [newTag]
          }
        }
        return item;
      })]
    }))
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="item" style={{ backgroundColor: "white" }}>
        <div className="item-tags">
          {filteredTags?.slice(0, 4).map(((tag: string, idx: number) => {
            return (idx > 2) ?
              null :
              <div
                key={idx}
                className="item-tag"
                style={{ backgroundColor: Colors[tag as keyof typeof Colors] }}
              >
                {tag}
              </div>
          }))}
          {
            filteredTags?.length < 3 ?
              <Button
                className="new-card-btn"
                size={20}
                title="+"
                onClick={handleAddTags}
              /> :
              <Dots onClick={() => console.log("open list")} />
          }
        </div>
        <div className="item-body">{content}</div>
        <div className="item-footer">
          <div className="item-actions">
            <Button
              title="*"
              size={16}
              onClick={() => { console.log("first") }}
            />
            <Button
              title="="
              size={16}
              onClick={handleOpenInfoModal} />
            <div>july 15</div>
          </div>
          <div className="item-participants">
            <div className="item-participant">
              <img src={monica} width={35} height={35} />
            </div>
            <div className="item-participant">D</div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Item
