// Components and context
import { Overlay, NewThemeForm } from "..";
import { SidebarProviderData, SidebarProviderOperations, useSidebarProvider } from "../../context/SidebarContext";

// Helpers 
import { isThemeImage } from "../../helpers";

// Types and icons and styles
import { SidebarType, } from "../../types/global";
import { PlusIcon } from "../../assets/icons";
import './Sidebar.css';

type SidebarContext = SidebarType & Pick<SidebarProviderData, "newThemeForm" | "themeList"> & Pick<SidebarProviderOperations, "onPreview" | "closeSidebar" | "setNewThemeForm">

const Sidebar = () => {

  const {
    sidebarData,
    newThemeForm,
    themeList,
    onPreview,
    closeSidebar,
    setNewThemeForm
  }: SidebarContext = useSidebarProvider();

  return (
    <Overlay clickable isVisible={sidebarData.isOpen} setIsVisible={closeSidebar}>
      <div className='sidebar'>
        <h3>Themes</h3>
        <div className="sidebar-body">
          {
            newThemeForm ?
              <NewThemeForm /> :
              <>
                <div className="sidebar-theme-item button new-theme-button" onClick={() => setNewThemeForm(true)}>
                  <PlusIcon size={24} />
                  <span>new-theme</span>
                </div>
                {themeList.map((theme, idx) =>
                  <div key={idx} className="sidebar-theme-item button" style={isThemeImage(theme)} onClick={() => onPreview(theme)}>
                    <span className="sidebar-theme-item-title">{theme.name}</span>
                  </div>
                )}
              </>
          }
        </div>
      </div>
    </Overlay >
  )
};

export default Sidebar;