// External libraries
import { createContext, useContext, useState } from "react";

// Hooks
import useModal from "../hooks/useModal";

// Types and static data
import { ActiveProps, ContainerMapProps, ItemProps, ModalDataProps } from "../types/global";
import { PROJECT_DATA } from "../assets/global";

export type ProjectProviderData = {
  projectData: ContainerMapProps,
  activeItem: ActiveProps,
  isModalOpen: boolean,
  modalData: ModalDataProps,
  isTrashable: boolean,
  isOverTrash: boolean,
  newContainer: boolean,
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
  openModal: (id: string) => void,
  setIsModalOpen: React.Dispatch<boolean>,
  setModalData: React.Dispatch<ModalDataProps>,
  setProjectData: React.Dispatch<React.SetStateAction<ContainerMapProps>>
  setIsTrashable: React.Dispatch<boolean>,
  setIsOverTrash: React.Dispatch<boolean>,
  setActiveItem: React.Dispatch<ActiveProps>,
  setNewContainer: React.Dispatch<boolean>,
}

export const ProjectContext = createContext<any>(null);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const { isModalOpen, modalData, setIsModalOpen, setModalData, } = useModal();
  const [projectData, setProjectData] = useState<ContainerMapProps>(PROJECT_DATA);
  const [newContainer, setNewContainer] = useState<boolean>(false);
  const [isTrashable, setIsTrashable] = useState<boolean>(false);
  const [isOverTrash, setIsOverTrash] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<ActiveProps>(null);

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

export const useProjectProvider = () => useContext(ProjectContext);