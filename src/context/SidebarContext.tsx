// External libraries
import { createContext, useContext, useState } from "react";

// Types and image
import { SidebarProps, ThemeProps } from "../types/global";
import monica from "../assets/monic.jpg"

export type SidebarProviderData = {
  sidebarData: SidebarProps,
  theme: ThemeProps,
  themePreview: ThemeProps | null,
  isPreview: boolean,
}

export type SidebarProviderOperations = {
  setIsPreview: React.Dispatch<boolean>,
  setSidebarData: React.Dispatch<SidebarProps>
  setTheme: React.Dispatch<ThemeProps>,
  setThemePreview: React.Dispatch<ThemeProps | null>,
  onSave: () => void,
  closePreview: () => void
  closeSidebar: () => void,
  onPreview: (theme: any) => void,
}

export const SidebarContext = createContext<any>(null);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarData, setSidebarData] = useState<SidebarProps>({ isOpen: false });
  const [isPreview, setIsPreview] = useState<boolean>(false)
  const [theme, setTheme] = useState<ThemeProps>({ name: "monica", background: monica, image: true })
  const [themePreview, setThemePreview] = useState<ThemeProps | null>(null)

  const closeSidebar = () => {
    setSidebarData((prev) => ({ ...prev, isOpen: false }))
  }

  const onPreview = (theme: any) => {
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
      setSidebarData,
      isPreview,
      theme,
      themePreview,
      setIsPreview,
      setTheme,
      setThemePreview,
      closeSidebar,
      closePreview,
      onPreview,
      onSave
    }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebarProvider = () => useContext(SidebarContext);