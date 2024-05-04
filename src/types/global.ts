export enum Colors {
  bug = "green",
  info = "lightblue",
  inspire = "yellow",
  danger = "red"
}

export type AcceptableImagesExtensions = [".jpg", ".jpeg", ".png"]

export type ContainerMapProps = {
  [key: string]: ItemProps[]
}

type User = {
  id: string,
  avatar: string | null,
  username: string,
}

type SharedProps = {
  key?: React.Key | null | undefined,
  title: string,
  id: string,
  openModal?: (data: any) => void
}

export interface ItemProps extends SharedProps {
  content?: string,
  tags: string[],
  participants: User[],
}

export interface ContainerProps extends SharedProps {
  list: ItemProps[],
}

export type ModalProps = ItemProps & { containerId: string } | null;

export type ActiveProps = (Omit<ItemProps, 'key'> | Omit<ContainerProps, 'key'>) | null;

export type SidebarProps = {
  isOpen: boolean,
}

export type SidebarAction = {
  setSidebarData: React.Dispatch<React.SetStateAction<SidebarProps>>
}

export type SidebarType = {
  sidebarData: SidebarProps
} & SidebarAction;

export type ThemeProps = {
  name: string,
  background: string,
  image?: boolean
}

export type ThemeActions = {
  setThemeList: React.Dispatch<React.SetStateAction<ThemeProps[]>>,
  setNewThemeForm: React.Dispatch<boolean>
}