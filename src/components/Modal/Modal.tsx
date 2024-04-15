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
          <div className="modal-tags tags">
            {tags?.slice(0, 11).map((tag: string, idx: number) => (
              <div key={idx}
                className="modal-tag tag"
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
        <div className="card-content modal-content">{content}</div>
        <div className="modal-footer" style={style}>
          <div className="activity">
            <h4>Activity</h4>
            <div className="activity-container">
              <div className="activity">
                <div className="activity-content">Changed card name to Mofus</div>
                <div className="activity-reviser" style={{ display: "flex", gap: 2, transform: "scale(.9)" }}>
                  <span>By</span>
                  <div className="participant-avatar">{"D".toUpperCase()}</div>
                  <div className="participant-username">{"droos"}</div>
                </div>
              </div>
            </div>
          </div>
          <Divider type="v" />
          <div className="participants">
            <h4>Participants</h4>
            <div className="participants-container">
              {participants?.map(({ id, username, avatar }: any) => (
                <div key={id} className="participant">
                  <div className="participant-avatar">{avatar ? avatar : username[0].toUpperCase()}</div>
                  <div className="participant-username">{username}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Overlay >
  )
}

export default Modal