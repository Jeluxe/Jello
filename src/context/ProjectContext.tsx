import { arrayMove } from "@dnd-kit/sortable";
import { createContext, useContext, useState } from "react";
import useModal from "../hooks/ModalHook";
import { ActiveProps, ContainerMapProps, ItemProps } from "../types/global";

export type ProjectProviderData = {
  projectData: ContainerMapProps,
  activeItem: ActiveProps,
  isModalOpen: boolean,
  modalData: ItemProps,
}

export type ProjectProviderOperations = {
  addContainer: (name: string) => void,
  addCard: (e: any) => void,
  addTags: (e?: any, id?: string, containerId?: string) => void,
  updateContainer: () => void,
  updateCard: () => void,
  updateTags: () => void,
  removeContainer: () => void,
  removeCard: () => void,
  removeTags: () => void,
  findContainer: (id: string) => string | undefined,
  handleDragStart: ({ active }: { active: any }) => void,
  handleDragOver: ({ active, over }: { active: any, over: any }) => void,
  handleDragEnd: ({ active, over }: { active: any, over: any }) => void,
  findItemById: (id: string) => ItemProps | null,
  setIsModalOpen: React.Dispatch<boolean>,
  setModalData: React.Dispatch<ItemProps>,
  openModal: ({ target }: { target: any }) => void,
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

  const addCard: ProjectProviderOperations["addCard"] = (e) => {
    const selectedContainer = e.target.closest(".container").getAttribute("id");

    if (!selectedContainer) return;

    setProjectData((prev: any) => {
      if (selectedContainer) {
        if (prev[selectedContainer].length === 20) {
          return prev;
        }
        return {
          ...prev,
          [selectedContainer]: [
            ...prev[selectedContainer],
            { id: getNewId(prev), content: "foos", tags: [], participants: [] }
          ]
        }
      } else {
        return prev;
      }
    })
  }

  const addTags: ProjectProviderOperations["addTags"] = ({ e, id, containerId }) => {
    const selectedContainer = e?.target.closest(".container")?.getAttribute("id") || containerId;

    if (!selectedContainer) return;

    const newTag = "danger";

    setProjectData((prev: any) => ({
      ...prev,
      [selectedContainer]: [...prev[selectedContainer].map((card: any) => {
        if (card.id === id) {
          if (card.tags.includes(newTag)) return card;

          setModalData({
            ...card,
            tags: (card.tags.length) ? [...card.tags, newTag] : [newTag],
            containerId: selectedContainer
          })

          return {
            ...card,
            tags: (card.tags.length) ? [...card.tags, newTag] : [newTag]
          }
        }
        return card;
      })]
    }))
  }

  const updateContainer: ProjectProviderOperations["updateContainer"] = () => { }

  const updateCard: ProjectProviderOperations["updateCard"] = () => { }

  const updateTags: ProjectProviderOperations["updateTags"] = () => { }

  const removeContainer: ProjectProviderOperations["removeContainer"] = () => { }

  const removeCard: ProjectProviderOperations["removeCard"] = () => { }

  const removeTags: ProjectProviderOperations["removeTags"] = () => { }

  const findContainer: ProjectProviderOperations["findContainer"] = (id) => {
    if (id in projectData) {
      return id;
    }

    return Object.keys(projectData).find(key => projectData[key].find((card: any) => card && card.id === id));
  }

  const handleDragStart: ProjectProviderOperations["handleDragStart"] = (e) => {
    const { id, data: { current: { sortable: { containerId, index } } } } = e.active;

    if (containerId === "container-list") {
      setActiveItem({ id, title: id, list: projectData[id] });
    } else {
      setActiveItem({ ...projectData[containerId][index] });
    }
  }

  const handleDragOver: ProjectProviderOperations["handleDragOver"] = (event) => {
    const { active, over } = event;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over?.id);

    if (active.data.current.sortable.containerId === "container-list") return;

    if (!activeContainer || !overContainer || activeContainer === overContainer) return;

    setProjectData((prev: any) => {
      const overItems = prev[activeContainer];
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index;
      let newIndex;

      if (overContainer in prev) {
        newIndex = overItems.length + 1;
      } else {
        newIndex = overIndex >= 0 ? overIndex + 1 : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [...prev[activeContainer].filter((card: any) => card.id !== active.id)],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          prev[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      }
    });
  }

  const handleDragEnd: ProjectProviderOperations["handleDragEnd"] = (event) => {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || (activeContainer !== overContainer && active.data.current.sortable.containerId !== "container-list")) {
      return;
    }

    if (id !== overId) {
      const activeIndex = active.data.current.sortable.index;
      const overIndex = over.data.current?.sortable.index;

      setProjectData((items: any) => {
        if (active.data.current.sortable.containerId === "container-list") {
          const formattedObject = Object.entries(items);

          const activeItem = formattedObject.find(card => card[0] === active.id);
          const overItem = formattedObject.find(card => card[0] === over.id || card[0] === overContainer);

          if (!activeItem || !overItem) return items;

          const newActiveIndex = formattedObject.indexOf(activeItem);
          const newOverIndex = formattedObject.indexOf(overItem);

          return Object.fromEntries(arrayMove(formattedObject, newActiveIndex, newOverIndex));
        }
        return ({
          ...items,
          [activeContainer]: arrayMove(items[activeContainer], activeIndex, overIndex)
        });
      });
    }
    setActiveItem(null);
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

  const openModal: ProjectProviderOperations["openModal"] = ({ target }) => {
    const cardId = target.closest(".card")?.getAttribute("id");
    const containerId = target.closest(".container")?.getAttribute("id");
    if (cardId && containerId) {
      const returnedCard = findItemById(cardId);
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
      addTags,
      updateContainer,
      updateCard,
      updateTags,
      removeContainer,
      removeCard,
      removeTags,
      handleDragStart,
      handleDragOver,
      handleDragEnd,
      findItemById,
      isModalOpen,
      modalData,
      setIsModalOpen,
      setModalData,
      openModal
    }}>
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjectProvider = () => useContext(ProjectContext);