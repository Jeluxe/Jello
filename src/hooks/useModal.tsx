import { useState } from "react";
import { ModalDataTypes, ModalTypes } from "../types/global";

const useModal = (type: ModalTypes) => {
  const modalType: ModalTypes = type;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<ModalDataTypes | null>(null)

  return { modalType, isModalOpen, setIsModalOpen, modalData, setModalData }
}

export default useModal