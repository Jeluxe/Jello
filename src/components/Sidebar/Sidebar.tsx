// External libraries
import { useState } from "react";

// Components and context
import { Overlay } from "..";
import NewThemeFormSidebar from "./NewThemeForm/NewThemeForm";
import { SidebarProviderOperations, useSidebarProvider } from "../../context/SidebarContext";

// Helpers and static data
import { isThemeImage } from "../../helpers";
import { PREDEFINED_THEMES } from "../../assets/global";

// Types and icons and styles
import { SidebarType, ThemeProps, } from "../../types/global";
import { PlusIcon } from "../../assets/icons";
import './Sidebar.css';

const Sidebar = () => {
  const [newThemeForm, setNewThemeForm] = useState(false);
  const [themeList, setThemeList] = useState<ThemeProps[]>(PREDEFINED_THEMES);
  const { sidebarData, onPreview, closeSidebar }: SidebarType & SidebarProviderOperations = useSidebarProvider();

  return (
    <Overlay clickable isVisible={sidebarData.isOpen} setIsVisible={closeSidebar}>
      <div className='sidebar'>
        <h3>Themes</h3>
        <div className="sidebar-body">
          {
            newThemeForm ?
              <NewThemeFormSidebar themeList={themeList} setThemeList={setThemeList} setNewThemeForm={setNewThemeForm} /> :
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