import { PlusIcon } from "../../assets/icons";
import { Colors } from "../../types/global";
import Divider from "../Divider/Divider";
import Dots from "../Dots/Dots";
import Overlay from "../Overlay/Overlay";
import "./Modal.css";

type ModalProps = {
  isModalOpen: boolean,
  setIsModalOpen: React.Dispatch<boolean>,
  modalData: any
}

const style = { display: "flex", justifyContent: "space-between" }

const Modal = ({ isModalOpen, setIsModalOpen, modalData }: ModalProps) => {
  const { title, content, tags, participants } = modalData;

  if (!isModalOpen) return;

  return (
    <Overlay clickable isVisible={isModalOpen} setIsVisible={setIsModalOpen}>
      <div className="modal">
        <div style={style}>
          <div><b>{title}</b></div>
          <div className="modal-tags item-tags">
            {tags?.splice(0, 11).map((tag: string, idx: number) => (
              <div key={idx}
                className="item-tag"
                style={{ backgroundColor: Colors[tag as keyof typeof Colors] }}
              >
                {tag}
              </div>
            ))}
            {tags?.length < 10 ?
              <PlusIcon
                size={12}
                className="button"
              // onClick={addTag}
              /> :
              <Dots size={6} className="button" onClick={() => console.log("open list")} />}
          </div>
        </div>
        <div className="item-body">{content}</div>
        <div style={style}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>Changelog</div>
            <div>ds</div>
          </div>
          <Divider type="v" />
          <div className="item-participants">{participants?.map((parti: any, idx: number) => <div key={idx} className="item-participant">{parti}</div>)}</div>
        </div>
      </div>
    </Overlay>
  )
}

export default Modal