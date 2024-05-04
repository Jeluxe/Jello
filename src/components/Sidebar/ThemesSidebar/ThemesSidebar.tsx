import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { PREDEFINED_THEMES } from "../../../assets/global";
import { isThemeImage } from "../../../helpers";
import { ThemeProps } from "../../../types/global";
import NewThemeFormSidebar from "./NewThemeFormSidebar";
import './ThemesSidebar.css';

interface ThemesSidebarProps {
  onClick: (theme: any) => void
}

const ThemesSidebar = ({ onClick }: ThemesSidebarProps) => {
  const [newThemeForm, setNewThemeForm] = useState(false);
  const [themeList, setThemeList] = useState<ThemeProps[]>(PREDEFINED_THEMES);

  return (
    <>
      <h3>Themes</h3>
      <div className="sidebar-body">
        {
          newThemeForm ?
            <NewThemeFormSidebar themeList={themeList} setThemeList={setThemeList} setNewThemeForm={setNewThemeForm} /> :
            <>
              <div className="sidebar-theme-item button new-theme-button" onClick={() => setNewThemeForm(true)}>
                <FaPlus size={24} />
                <span>new-theme</span>
              </div>
              {themeList.map((theme, idx) =>
                <div key={idx} className="sidebar-theme-item button" style={isThemeImage(theme)} onClick={() => onClick(theme)}>
                  <span className="sidebar-theme-item-title">{theme.name}</span>
                </div>
              )}
            </>
        }
      </div>
    </>
  )
};

export default ThemesSidebar;