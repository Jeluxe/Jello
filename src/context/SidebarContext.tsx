// External libraries
import { createContext, useContext, useState } from "react";

// Types and image
import { SidebarProps, ThemeProps } from "../types/global";
import monica from "../assets/monic.jpg"
import { PREDEFINED_THEMES } from "../assets/global";

export type SidebarProviderData = {
  sidebarData: SidebarProps,
  isPreview: boolean,
  newThemeForm: boolean,
  themePreview: ThemeProps | null,
  theme: ThemeProps,
  themeList: ThemeProps[]
}

export type SidebarProviderOperations = {
  setSidebarData: React.Dispatch<SidebarProps>
  setNewThemeForm: React.Dispatch<boolean>,
  setThemeList: React.Dispatch<ThemeProps[]>,
  onSave: () => void,
  closePreview: () => void
  closeSidebar: () => void,
  onPreview: (theme: any) => void,
}

export const SidebarContext = createContext<any>(null);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarData, setSidebarData] = useState<SidebarProps>({ isOpen: false });
  const [theme, setTheme] = useState<ThemeProps>({ name: "monica", background: monica, image: true })
  const [themeList, setThemeList] = useState<ThemeProps[]>(PREDEFINED_THEMES);
  const [newThemeForm, setNewThemeForm] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false)
  const [themePreview, setThemePreview] = useState<ThemeProps | null>(null)

  const closeSidebar = () => {
    setSidebarData((prev) => ({ ...prev, isOpen: false }))
    setNewThemeForm(false)
  }

  const onPreview = (theme: ThemeProps) => {
    setThemePreview(theme)
    setIsPreview(true)
    closeSidebar();
  }

  const closePreview = () => {
    setThemePreview(null);
    setIsPreview(false);
  }

  const onSave = () => {
    if (themePreview) {
      setTheme(themePreview);
    }
    closePreview();
  }

  return (
    <SidebarContext.Provider value={{
      sidebarData,
      isPreview,
      theme,
      themeList,
      themePreview,
      newThemeForm,
      setSidebarData,
      closeSidebar,
      closePreview,
      onPreview,
      setNewThemeForm,
      setThemeList,
      onSave
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarProvider = () => useContext(SidebarContext);