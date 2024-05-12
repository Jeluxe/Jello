import { AcceptableImagesExtensions, ContainerMapProps, ThemeProps } from "../types/global";
import monica from "./monic.jpg"

export const ACCEPTABLE_IMAGE_FILE_EXTENSIONS: AcceptableImagesExtensions = [".jpg", ".jpeg", ".png"];

export const PREDEFINED_THEMES: ThemeProps[] = [
  { name: "monica", background: monica, isImage: true },
  { name: "blue", background: "blue" },
  { name: "yellow", background: "yellow" },
  { name: "green", background: "green" },
  { name: "black", background: "black" },
  { name: "white", background: "white" },
  { name: "purple", background: "purple" },
  { name: "pink", background: "pink" },
  { name: "gray", background: "gray" },
  { name: "lightblue", background: "lightblue" },
  { name: "lightgreen", background: "lightgreen" },
  { name: "orange", background: "orange" },
  { name: "tomato", background: "tomato" },
  { name: "salmon", background: "salmon" }
]

export const PROJECT_DATA: ContainerMapProps = {
  Planned: [{ id: "1", title: "Mofus", content: "ffooso", tags: ["bug", "info", "inspire", "danger", "frog"], participants: [{ id: "432t7gyf7wsef", username: "froooste", avatar: null }, { id: "432t7g7345wsef", username: "groooste11", avatar: null }, { id: "432t7g7345wsef1", username: "aroooste11", avatar: null }] }, { id: "2", title: "Yofus", content: "ffooso1", tags: [], participants: [] }, { id: "3", title: "Bofus", content: "ffasooso", tags: [], participants: [] }],
  InProgress: [{ id: "4", title: "Rofus", content: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis assumenda commodi sunt animi praesentium tempora est inventore eveniet nostrum incidunt. Quasi minus voluptas ea quo! Iste, tempora omnis. At, eaque.", tags: ["bug", "info"], participants: [{ id: "432t7gyf7wsef", username: "froooste", avatar: null }, { id: "432t7g7345wsef", username: "groooste11", avatar: null }, { id: "432t7g7345wsef1", username: "aroooste11", avatar: null }] }, { id: "5", title: "Gofus", content: "ff2eeooso", tags: [], participants: [] }, { id: "6", title: "Nofus", content: "fsdssfooso", tags: [], participants: [] }],
  Completed: [{ id: "7", title: "Dofus", content: "ffoosoef32q", tags: ["info", "inspire"], participants: [{ id: "432t7gyf7wsef", username: "froooste", avatar: null }, { id: "432t7g7345wsef", username: "groooste11", avatar: null }, { id: "432t7g7345wsef1", username: "aroooste11", avatar: null }] }, { id: "8", title: "Jofus", content: "ffoosofsdf3", tags: [], participants: [] }, { id: "9", title: "Aofus", content: "fdfosadoso", tags: [], participants: [] }],
  Dropped: []
}

interface ProjectCardProps {
  name: string,
  theme: ThemeProps
}

export const STATIC_DATA: ProjectCardProps[] = Array(5).fill({ name: "goosse" }).map((item, idx) => ({ name: `${item.name}${idx}`, theme: Math.floor(Math.random() * 10) < 5 ? { name: "foseol", background: monica, isImage: true } : { name: "foseol", background: "black" } }))