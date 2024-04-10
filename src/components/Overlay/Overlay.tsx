import { useState } from "react";
import useOverlay from "../../hooks/OverlayHook";
import "./Overlay.css";

type OverlayProps = {
  children: React.ReactNode
}

const Overlay = ({ children }: OverlayProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true); // Control the visibility of the overlay
  const { overlayRef, stopPropagation } = useOverlay({ isVisible, setIsVisible });
  console.log(isVisible)
  return isVisible ? (
    <div className="overlay" ref={overlayRef} onClick={() => setIsVisible(false)}>
      <div onClick={stopPropagation} style={{ backgroundColor: '#fff', padding: 20, maxWidth: 400, margin: '100px auto', position: 'relative' }}>
        {children}
      </div>
    </div>
  ) : null;
}

export default Overlay