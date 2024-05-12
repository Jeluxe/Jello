export enum Colors {
  bug = "green",
  info = "lightblue",
  inspire = "yellow",
  danger = "red"
}

export interface ErrorProps {
  error: boolean,
  message: string | null
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

export type ActiveProps = (Omit<ItemProps, 'key'> | Omit<ContainerProps, 'key'>) | null;

export type ModalTypes = "card" | "container" | "theme" | null;

export type ModalCardDataProps = ItemProps & { containerId: string };

export type ModalContainerDataProps = any;

export type ModalDataTypes = ModalCardDataProps | ModalContainerDataProps

export type ThemeProps = {
  name: string,
  background: string,
  isImage?: boolean
}

export type ThemeActions = {
  setThemeList: React.Dispatch<React.SetStateAction<ThemeProps[]>>,
  setNewThemeForm: React.Dispatch<boolean>
}