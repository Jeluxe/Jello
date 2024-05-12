// External libraries
import { createContext, useContext, useState } from "react";

// Types and image
import { ModalTypes, ThemeProps } from "../types/global";
import { PREDEFINED_THEMES } from "../assets/global";
import useModal from "../hooks/useModal";

export type ThemeProviderData = {
  isSidebarOpen: boolean,
  isPreview: boolean,
  newThemeForm: boolean,
  themePreview: ThemeProps | null,
  theme: ThemeProps,
  themeList: ThemeProps[],
  modalType: ModalTypes,
  isModalOpen: boolean
}

export type ThemeProviderOperations = {
  setIsSidebarOpen: React.Dispatch<boolean>,
  setNewThemeForm: React.Dispatch<boolean>,
  setThemeList: React.Dispatch<ThemeProps[]>,
  setThemePreview: React.Dispatch<ThemeProps | null>,
  setIsModalOpen: React.Dispatch<boolean>,
  saveTheme: () => void,
  closePreview: () => void
  closeSidebar: () => void,
  previewTheme: (theme: any) => void,
}

export const ThemeContext = createContext<any>(null);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { modalType, isModalOpen, setIsModalOpen } = useModal("theme");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<ThemeProps>(PREDEFINED_THEMES[0])
  const [themeList, setThemeList] = useState<ThemeProps[]>(PREDEFINED_THEMES);
  const [newThemeForm, setNewThemeForm] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false)
  const [themePreview, setThemePreview] = useState<ThemeProps | null>(null)

  const closeSidebar = () => {
    setIsSidebarOpen(false)
    setNewThemeForm(false)
  }

  const previewTheme = (theme: ThemeProps) => {
    setThemePreview(theme)
    setIsPreview(true)
    closeSidebar();
  }

  const closePreview = () => {
    setThemePreview(null);
    setIsPreview(false);
  }

  const saveTheme = () => {
    if (themePreview) {
      setTheme(themePreview);
    }
    closePreview();
  }

  return (
    <ThemeContext.Provider value={{
      isSidebarOpen,
      isPreview,
      theme,
      themeList,
      themePreview,
      newThemeForm,
      modalType,
      isModalOpen,
      closeSidebar,
      closePreview,
      previewTheme,
      setNewThemeForm,
      setThemeList,
      setThemePreview,
      saveTheme,
      setIsModalOpen
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;

export const useThemeProvider = () => useContext(ThemeContext);