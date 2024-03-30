import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { DescriptionIcon, PlusIcon } from "../../assets/icons";
import monica from "../../assets/monic.jpg";
import ContextMenu from "../ContextMenu/ContextMenu";
import Dots from "../Dots/Dots";
import "./Item.css";

type Props = {
  item: {
    id: string,
    content?: string,
    tags?: string[],
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    if (!selectedContainer) return;

    const newTag = "danger";

    setContainers((prev: any) => ({
      ...prev,
      [selectedContainer]: [...prev[selectedContainer].map((item: any) => {
        if (item.id === id) {
          if (item?.tags?.includes(newTag)) return item;
          return {
            ...item,
            tags: (item?.tags) ? [...item.tags, newTag] : [newTag]
          }
        }
        return item;
      })]
    }))
  }

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen)
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
              <PlusIcon
                className="button"
                onClick={handleAddTags}
              /> :
              <Dots onClick={() => console.log("open list")} />
          }
        </div>
        <div className="item-body">{content}</div>
        <div className="item-footer">
          <div className="item-actions">
            <div className="item-actions-wrapper">
              <div style={{ display: "flex", position: "relative" }}>
                <Dots
                  className="button"
                  color="black"
                  vertical
                  onClick={openMenu}
                />
                {isMenuOpen ? <ContextMenu /> : ""}
              </div>
              <DescriptionIcon
                className="button"
                onClick={handleOpenInfoModal} />
              <div>july 15</div>
            </div>
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
