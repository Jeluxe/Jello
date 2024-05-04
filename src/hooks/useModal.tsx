import { useState } from "react";
import { ModalProps } from "../types/global";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalProps>(null)

  return { isModalOpen, setIsModalOpen, modalData, setModalData }
}

export default useModal