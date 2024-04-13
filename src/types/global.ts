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
  avatar?: string | null,
  username: string,
}

export type ItemProps = {
  key?: React.Key | null | undefined,
  id: string,
  title: string,
  content: string,
  tags?: string[],
  participants?: User[],
  setContainers?: React.Dispatch<any>,
  openModal?: (data: any) => void
}

export type ContainerProps = {
  key?: React.Key | null | undefined,
  id: string,
  title: string,
  list: ItemProps[],
  setContainers?: React.Dispatch<any>,
  openModal?: (data: any) => void
}



type PropsToRemove = 'setContainers' | 'key';

export type ActiveProps = (Omit<ItemProps, PropsToRemove> | Omit<ContainerProps, PropsToRemove>);