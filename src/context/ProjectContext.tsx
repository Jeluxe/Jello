import { createContext, useContext, useState } from "react";
import useModal from "../hooks/useModal";
import { ActiveProps, ContainerMapProps, ItemProps } from "../types/global";

export type ProjectProviderData = {
  projectData: ContainerMapProps,
  activeItem: ActiveProps,
  isModalOpen: boolean,
  modalData: ItemProps,
  isTrashable: boolean,
  isOverTrash: boolean,
}

export type ProjectProviderOperations = {
  addContainer: (name: string) => void,
  addCard: (containerId: string, name: string) => void,
  addTag: (e?: any, id?: string, containerId?: string) => void,
  updateContainer: () => void,
  updateCard: () => void,
  updateTag: () => void,
  removeContainer: (id: string) => void,
  removeCard: (id: string) => void,
  removeTag: (id: string) => void,
  findContainer: (id: string) => string | undefined,
  findItemById: (id: string) => ItemProps | null,
  setIsModalOpen: React.Dispatch<boolean>,
  setModalData: React.Dispatch<ItemProps>,
  openModal: (id: string) => void,
  setProjectData: React.Dispatch<React.SetStateAction<ContainerMapProps>>
  setIsTrashable: React.Dispatch<boolean>,
  setIsOverTrash: React.Dispatch<boolean>,
  setActiveItem: React.Dispatch<ActiveProps | null>
}

export const ProjectContext = createContext<any>(null);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const { isModalOpen, modalData, setIsModalOpen, setModalData, } = useModal();
  const [projectData, setProjectData] = useState<ContainerMapProps>({
    Planned: [{ id: "1", title: "Mofus", content: "ffooso", tags: ["bug", "info", "inspire", "danger", "frog"], participants: [{ id: "432t7gyf7wsef", username: "froooste", avatar: null }, { id: "432t7g7345wsef", username: "groooste11", avatar: null }, { id: "432t7g7345wsef1", username: "aroooste11", avatar: null }] }, { id: "2", title: "Yofus", content: "ffooso1", tags: [], participants: [] }, { id: "3", title: "Bofus", content: "ffasooso", tags: [], participants: [] }],
    InProgress: [{ id: "4", title: "Rofus", content: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis assumenda commodi sunt animi praesentium tempora est inventore eveniet nostrum incidunt. Quasi minus voluptas ea quo! Iste, tempora omnis. At, eaque.", tags: ["bug", "info"], participants: [{ id: "432t7gyf7wsef", username: "froooste", avatar: null }, { id: "432t7g7345wsef", username: "groooste11", avatar: null }, { id: "432t7g7345wsef1", username: "aroooste11", avatar: null }] }, { id: "5", title: "Gofus", content: "ff2eeooso", tags: [], participants: [] }, { id: "6", title: "Nofus", content: "fsdssfooso", tags: [], participants: [] }],
    Completed: [{ id: "7", title: "Dofus", content: "ffoosoef32q", tags: ["info", "inspire"], participants: [{ id: "432t7gyf7wsef", username: "froooste", avatar: null }, { id: "432t7g7345wsef", username: "groooste11", avatar: null }, { id: "432t7g7345wsef1", username: "aroooste11", avatar: null }] }, { id: "8", title: "Jofus", content: "ffoosofsdf3", tags: [], participants: [] }, { id: "9", title: "Aofus", content: "fdfosadoso", tags: [], participants: [] }],
    Dropped: []
  });

  const [isTrashable, setIsTrashable] = useState<boolean>(false);
  const [isOverTrash, setIsOverTrash] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<ActiveProps | null>(null);

  const getNewId = (list: any[]): number => {
    let totalLength: number = 0;

    Object.keys(list).forEach((key: any) => {
      totalLength += list[key].length;
    })

    return totalLength + 1;
  }

  const addContainer: ProjectProviderOperations["addContainer"] = (name) => {
    if (Object.keys(projectData).length > 8) {
      console.log("no more slots left");
      return;
    }
    setProjectData((prev: any) => ({
      ...prev,
      [name.toCapitalize()]: []
    }));
    console.log("created new container");
  }

  const addCard: ProjectProviderOperations["addCard"] = (containerId, name) => {
    setProjectData((prev: any) => {
      if (containerId) {
        if (prev[containerId].length === 20) {
          return prev;
        }
        return {
          ...prev,
          [containerId]: [
            ...prev[containerId],
            { id: getNewId(prev), title: name, tags: [], participants: [] }
          ]
        }
      } else {
        return prev;
      }
    })
  }

  const addTag: ProjectProviderOperations["addTag"] = ({ e, id, containerId }) => {
    const selectedContainer = e?.target.closest(".container")?.getAttribute("id") || containerId;

    if (!selectedContainer) return;

    const newTag = "danger";

    setProjectData((prev: any) => ({
      ...prev,
      [selectedContainer]: [...prev[selectedContainer].map((card: any) => {
        if (card.id === id) {
          if (card.tags.includes(newTag)) return card;

          const updatedCardTags = {
            ...card,
            tags: (card.tags.length) ? [...card.tags, newTag] : [newTag]
          }

          setModalData({
            ...updatedCardTags,
            containerId: selectedContainer
          })

          return updatedCardTags
        }
        return card;
      })]
    }))
  }

  const updateContainer: ProjectProviderOperations["updateContainer"] = () => { }

  const updateCard: ProjectProviderOperations["updateCard"] = () => { }

  const updateTag: ProjectProviderOperations["updateTag"] = () => { }

  const removeContainer: ProjectProviderOperations["removeContainer"] = (id) => {
    console.log(id)
  }

  const removeCard: ProjectProviderOperations["removeCard"] = (activeId) => {
    const activeContainer = findContainer(activeId);

    if (!activeContainer) return;

    if (confirm("will you delete this item?")) {
      setProjectData((items: any) => {
        return ({
          ...items,
          [activeContainer]: [...items[activeContainer].filter(({ id }: { id: string }) => id !== activeId)]
        });
      });
    }
  }

  const removeTag: ProjectProviderOperations["removeTag"] = (id) => {
    console.log(id)
  }

  const findContainer: ProjectProviderOperations["findContainer"] = (id) => {
    if (id in projectData || id === "trash-container") {
      return id;
    }

    return Object.keys(projectData).find(key => projectData[key].find((card: any) => card && card.id === id));
  }

  const findItemById: ProjectProviderOperations["findItemById"] = (id) => {
    for (const category in projectData) {
      const categoryData = projectData[category];
      for (const card of categoryData) {
        if (card.id === id) {
          return {
            ...card
          };
        }
      }
    }
    return null;
  }

  const openModal: ProjectProviderOperations["openModal"] = (id: string) => {
    const containerId = findContainer(id);
    if (id && containerId) {
      const returnedCard = findItemById(id);
      if (returnedCard) {
        setIsModalOpen(true);
        setModalData({ ...returnedCard, containerId });
      }
    }
  }

  return (
    <ProjectContext.Provider value={{
      projectData,
      activeItem,
      addContainer,
      addCard,
      addTag,
      updateContainer,
      updateCard,
      updateTag,
      removeContainer,
      removeCard,
      removeTag,
      findItemById,
      findContainer,
      isModalOpen,
      modalData,
      setIsModalOpen,
      setModalData,
      openModal,
      isTrashable,
      isOverTrash,
      setIsTrashable,
      setIsOverTrash,
      setActiveItem,
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjectProvider = () => useContext(ProjectContext);