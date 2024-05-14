// External libraries
import { createContext, useContext, useState } from "react";

// Hooks
import useModal from "../hooks/useModal";

// Types and static data
import { ActiveProps, ContainerMapProps, ItemProps, ModalDataTypes, ModalTypes } from "../types/global";
import { PROJECT_DATA } from "../assets/global";
import { renameKey } from "../helpers";

type ModalTypesWithoutTheme = Exclude<ModalTypes, "theme">;

export type ProjectProviderData = {
  projectData: ContainerMapProps,
  activeItem: ActiveProps,
  isModalOpen: boolean,
  modalData: ModalDataTypes,
  modalType: ModalTypes,
  isTrashable: boolean,
  isOverTrash: boolean,
  newContainer: boolean,
}

export type ProjectProviderOperations = {
  addContainer: (name: string) => void,
  addCard: (containerId: string, name: string) => void,
  addTag: (e?: any, id?: string, containerId?: string) => void,
  updateContainer: (id: string, updatedName: string) => void,
  updateCard: () => void,
  updateTag: () => void,
  removeContainer: (id: string) => void,
  removeCard: (id: string) => void,
  removeTag: (id: string) => void,
  findContainer: (id: string) => string | undefined,
  findItemById: (id: string) => ItemProps | null,
  openModal: (id: string, type: ModalTypesWithoutTheme) => void,
  setIsModalOpen: React.Dispatch<boolean>,
  setModalData: React.Dispatch<ModalDataTypes>,
  setProjectData: React.Dispatch<React.SetStateAction<ContainerMapProps>>
  setIsTrashable: React.Dispatch<boolean>,
  setIsOverTrash: React.Dispatch<boolean>,
  setActiveItem: React.Dispatch<ActiveProps>,
  setNewContainer: React.Dispatch<boolean>,
}

export const ProjectContext = createContext<any>(null);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const { isModalOpen, modalData, modalType, setIsModalOpen, setModalData, setModalType } = useModal("card");
  const [projectData, setProjectData] = useState<ContainerMapProps>(PROJECT_DATA);
  const [newContainer, setNewContainer] = useState<boolean>(false);
  const [isTrashable, setIsTrashable] = useState<boolean>(false);
  const [isOverTrash, setIsOverTrash] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<ActiveProps>(null);

  const getNewId = (list: ContainerMapProps): number => {
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
    setProjectData((prev: ContainerMapProps) => {
      if (containerId) {
        if (prev[containerId].length === 20) {
          return prev;
        }
        return {
          ...prev,
          [containerId]: [
            ...prev[containerId],
            { id: `${getNewId(prev)}`, title: name, content: "", tags: [], participants: [] }
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

    setProjectData((prev: ContainerMapProps) => ({
      ...prev,
      [selectedContainer]: [...prev[selectedContainer].map((card: any) => {
        if (card.id === id) {
          if (card.tags.includes(newTag)) return card;

          const updatedCard = {
            ...card,
            tags: (card.tags.length) ? [...card.tags, newTag] : [newTag]
          }

          setModalData({
            ...updatedCard,
            containerId: selectedContainer
          })

          return updatedCard
        }
        return card;
      })]
    }))
  }

  const updateContainer: ProjectProviderOperations["updateContainer"] = (id: string, updatedName: string) => {
    setProjectData((prev: ContainerMapProps) => renameKey(prev, id, updatedName))
  }

  const updateCard: ProjectProviderOperations["updateCard"] = () => { }

  const updateTag: ProjectProviderOperations["updateTag"] = () => { }

  const removeContainer: ProjectProviderOperations["removeContainer"] = (id) => {
    if (projectData[id].length) {
      if (confirm("There are still items in the container,\n are you sure you want to delete this container?\n Once you have deleted you can't return the data")) {
        setProjectData((items: ContainerMapProps) => {
          delete items[id]
          return items;
        });
      }
    } else {
      setProjectData((items: ContainerMapProps) => {
        delete items[id]
        return items;
      });
    }
  }

  const removeCard: ProjectProviderOperations["removeCard"] = (activeId) => {
    const activeContainer = findContainer(activeId);

    if (!activeContainer) return;

    if (confirm("will you delete this item?")) {
      setProjectData((prev: ContainerMapProps) => {
        return ({
          ...prev,
          [activeContainer]: [...prev[activeContainer].filter(({ id }: { id: string }) => id !== activeId)]
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

  const openModal: ProjectProviderOperations["openModal"] = (id: string, type: ModalTypesWithoutTheme) => {
    const containerId = findContainer(id);
    if (id && containerId) {
      setModalType(type)
      setIsModalOpen(true);
      if (id !== containerId) {
        const returnedCard = findItemById(id);
        if (returnedCard) {
          setModalData({ ...returnedCard, containerId });
        }
      } else {
        setModalData({ name: containerId, containerData: projectData[containerId] })
      }
    }
  }

  return (
    <ProjectContext.Provider value={{
      projectData,
      activeItem,
      setProjectData,
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
      modalType,
      setIsModalOpen,
      setModalData,
      openModal,
      isTrashable,
      isOverTrash,
      setIsTrashable,
      setIsOverTrash,
      setActiveItem,
      newContainer,
      setNewContainer
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export default ProjectProvider;

export const useProjectProvider = () => useContext(ProjectContext);