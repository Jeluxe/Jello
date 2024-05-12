import { ThemeProviderData, ThemeProviderOperations, useThemeProvider } from '../../../context/ThemeContext'
import { isThemeImage } from '../../../helpers'
import { ThemeProps } from '../../../types/global'

const ThemeModal = () => {
  const { themeList, setThemePreview, setIsModalOpen }: Pick<ThemeProviderData, "themeList"> & Pick<ThemeProviderOperations, "setIsModalOpen" | "setThemePreview"> = useThemeProvider();

  const onSuccess = (theme: ThemeProps) => {
    setThemePreview(theme);
    setIsModalOpen(false);
    console.log("first")
  }

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {
        themeList.map((theme: ThemeProps, idx: number) =>
          <div key={idx} className='sidebar-theme-item button' style={isThemeImage(theme)} onClick={() => onSuccess(theme)}>
            <span className="sidebar-theme-item-title">{theme.name}</span>
          </div>
        )
      }
    </div>
  )
}

export default ThemeModal