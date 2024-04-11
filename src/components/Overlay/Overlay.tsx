import useOverlay from "../../hooks/OverlayHook";
import "./Overlay.css";

type OverlayProps = {
  clickable?: boolean,
  isVisible: boolean,
  setIsVisible: React.Dispatch<boolean>,
  children: React.ReactNode
}

const Overlay = ({ clickable = false, isVisible, setIsVisible, children }: OverlayProps) => {
  const { overlayRef, stopPropagation } = useOverlay({ isVisible, setIsVisible });

  return isVisible ? (
    <div className="overlay" ref={overlayRef} onClick={() => clickable ? setIsVisible(false) : null}>
      <div onClick={stopPropagation}>
        {children}
      </div>
    </div>
  ) : null;
}

export default Overlay