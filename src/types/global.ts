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
  id: string,
  openModal?: (data: any) => void
}

export interface ItemProps extends SharedProps {
  title: string,
  content?: string,
  tags: string[],
  participants: User[],
}

export interface ContainerProps extends SharedProps {
  title: string,
  list: ItemProps[],
}

export type ActiveProps = (Omit<ItemProps, 'key'> | Omit<ContainerProps, 'key'>);