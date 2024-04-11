import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { DescriptionIcon, PlusIcon } from "../../assets/icons";
import monica from "../../assets/monic.jpg";
import { ItemProps } from "../../pages/Project";
import { Colors } from "../../types/global";
import ContextMenu from "../ContextMenu/ContextMenu";
import Dots from "../Dots/Dots";
import "./Item.css";

const Item = ({ id, title, content, tags, participants, setContainers, openModal }: ItemProps) => {
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
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleAddTags = (e: any) => {
    if (!setContainers) return;
    const selectedContainer = e.target.closest(".container").getAttribute("id");

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
      <div id={id} className="item" style={{ backgroundColor: "white" }}>
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
                size={12}
                className="button"
                onClick={handleAddTags}
              /> :
              <Dots size={6} className="button" onClick={() => console.log("open list")} />
          }
        </div>
        <div className="item-title"><b>{title}</b></div>
        <div className="item-body">{content}</div>
        <div className="item-footer">
          <div className="item-actions">
            <div className="item-actions-wrapper">
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
          <div className="item-participants">
            {participants?.map((participant: any) => <div key={participant.id} className="item-participant">{participant.avatar ? <img src={participant.avatar} width={35} height={35} /> : participant.username[0].toUpperCase()}</div>)}
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
