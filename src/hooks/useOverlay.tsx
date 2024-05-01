import { useEffect, useRef } from 'react';

type useOverlayProps = {
  isVisible: boolean,
  setIsVisible: React.Dispatch<boolean>
}

const useOverlay = ({ isVisible, setIsVisible }: useOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node) && isVisible) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, setIsVisible]);

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>): void => e.stopPropagation();

  return { overlayRef, stopPropagation };
}

export default useOverlay