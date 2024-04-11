import { Colors } from "../../types/global";
import Divider from "../Divider/Divider";
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
  return (
    isModalOpen && <Overlay clickable isVisible={isModalOpen} setIsVisible={setIsModalOpen}>
      <div className="modal">
        <div style={style}>
          <div><b>{title}</b></div>
          <div className="item-tags">{tags?.map((tag: string, idx: number) => <div key={idx} className="item-tag" style={{ backgroundColor: Colors[tag as keyof typeof Colors] }}>{tag}</div>)}</div>
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