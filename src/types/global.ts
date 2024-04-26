export enum Colors {
  bug = "green",
  info = "lightblue",
  inspire = "yellow",
  danger = "red"
}

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

export type ActiveProps = (Omit<ItemProps, 'key'> | Omit<ContainerProps, 'key'>);