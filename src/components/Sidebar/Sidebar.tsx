import { Overlay } from "..";
import { SidebarType, ThemeProps } from "../../types/global";
import './Sidebar.css';
import ThemesSidebar from "./ThemesSidebar/ThemesSidebar";

type Theme = { setThemePreview: React.Dispatch<ThemeProps>, setIsPreview: React.Dispatch<boolean> }

const Sidebar = ({ sidebarData, setSidebarData, setThemePreview, setIsPreview }: SidebarType & Theme) => {
  const closeSidebar = () => {
    setSidebarData((prev) => ({ ...prev, isOpen: false }))
  }

  const onPreview = (theme: any) => {
    setThemePreview(theme)
    setIsPreview(true)
    closeSidebar();
  }

  return (
    <Overlay clickable isVisible={sidebarData.isOpen} setIsVisible={closeSidebar}>
      <div className='sidebar'>
        {selectSidebarType(sidebarData.type, onPreview)}
      </div>
    </Overlay >
  )
};

const selectSidebarType = (type: string, onClick: (theme: any) => void) => {
  switch (type) {
    case "themes":
      return <ThemesSidebar onClick={onClick} />
    default:
      <div>Error</div>
  }
}

export default Sidebar;