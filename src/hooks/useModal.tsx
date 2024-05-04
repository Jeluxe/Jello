import { useState } from "react";
import { ModalDataProps } from "../types/global";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalDataProps | null>(null)

  return { isModalOpen, setIsModalOpen, modalData, setModalData }
}

export default useModal