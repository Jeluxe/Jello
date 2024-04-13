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

export type ItemProps = {
  key?: React.Key | null | undefined,
  id: string,
  title: string,
  content: string,
  tags: string[],
  participants: User[],
  openModal?: (data: any) => void
}

export type ContainerProps = {
  key?: React.Key | null | undefined,
  id: string,
  title: string,
  list: ItemProps[],
  openModal?: (data: any) => void
}

export type ActiveProps = (Omit<ItemProps, 'key'> | Omit<ContainerProps, 'key'>);