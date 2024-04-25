import { useDroppable } from "@dnd-kit/core";
import { TrashIcon } from "../../../assets/icons";
import { separateClasses } from "../../../helpers";
import "./TrashContainer.css";

interface TrashContainerProps {
  onTrash: boolean
}

const TrashContainer = ({ onTrash }: TrashContainerProps) => {
  const { setNodeRef } = useDroppable({ id: "trash-container" });

  return (
    <div key={"trash-container"} ref={setNodeRef} className={separateClasses("trash-container", onTrash ? "dragover" : "")}><TrashIcon /></div>
  )
};

export default TrashContainer;