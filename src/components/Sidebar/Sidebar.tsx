// Components and context
import { Overlay, NewThemeForm } from "..";
import { ThemeProviderData, ThemeProviderOperations, useThemeProvider } from "../../context/ThemeContext";

// Helpers 
import { isThemeImage } from "../../helpers";

// Types and icons and styles
import { PlusIcon } from "../../assets/icons";
import './Sidebar.css';

type SidebarContext = Pick<ThemeProviderData, "isSidebarOpen" | "newThemeForm" | "themeList"> & Pick<ThemeProviderOperations, "closeSidebar" | "previewTheme" | "setNewThemeForm">

const Sidebar = () => {
  const {
    newThemeForm,
    themeList,
    isSidebarOpen,
    previewTheme,
    closeSidebar,
    setNewThemeForm
  }: SidebarContext = useThemeProvider();

  return (
    <Overlay clickable isVisible={isSidebarOpen} setIsVisible={closeSidebar}>
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
                  <div key={idx} className="sidebar-theme-item button" style={isThemeImage(theme)} onClick={() => previewTheme(theme)}>
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