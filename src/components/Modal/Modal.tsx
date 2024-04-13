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
  const { id, title, content, tags, participants } = modalData;

  if (!isModalOpen) return;

  return (
    <Overlay clickable isVisible={isModalOpen} setIsVisible={setIsModalOpen}>
      <div className="modal">
        <div style={style}>
          <div><b>{title}</b></div>
          <div className="modal-tags item-tags">
            {tags?.slice(0, 11).map((tag: string, idx: number) => (
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
                className="button plus-button"
              // onClick={addTag}
              /> :
              <Dots size={6} className="button" onClick={() => console.log("open list")} />}
          </div>
        </div>
        <div className="item-body">{content}</div>
        <div style={style}>
          <div className="item-changelog-container">
            <h4>Changelog</h4>
            <div className="item-changelog">
              <div>ds</div>
            </div>
          </div>
          <Divider type="v" />
          <div className="item-participants-container">
            <h4>Participants</h4>
            <div className="item-participants">
              {participants?.map(({ id, username, avatar }: any) => (
                <div key={id} className="item-participant">
                  <div className="item-participant-avatar">{avatar ? avatar : username[0].toUpperCase()}</div>
                  <div className="item-participant-username">{username}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  )
}

export default Modal