import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({})

  return { isModalOpen, setIsModalOpen, modalData, setModalData }
}

export default useModal