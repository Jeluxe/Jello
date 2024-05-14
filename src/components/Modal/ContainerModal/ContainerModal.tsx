import { useState } from 'react'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import { ProjectProviderOperations, useProjectProvider } from '../../../context/ProjectContext';

const ContainerModal = ({ modalData }: { modalData: any }) => {
  const { updateContainer, removeContainer, setModalData, setIsModalOpen }: ProjectProviderOperations = useProjectProvider()
  const [containerName, setContainerName] = useState<string>(modalData.name)
  const [newChanges, setNewChanges] = useState<boolean>(false)

  const changeName = (value: string) => {
    setNewChanges(false);
    if (containerName !== value) {
      setNewChanges(true);
    }
    setContainerName(value)
  }

  const saveChanges = () => {
    if (newChanges) {
      updateContainer(modalData.name, containerName)
    }
    closeModal()
  }

  const cancelChanges = () => {
    if (!newChanges) {
      closeModal()
    } else if (confirm("do you wish to discard the changes you have made?")) {
      closeModal()
    }
  }

  const deleteContainer = () => {
    removeContainer(modalData.name)
    closeModal()
  }

  const closeModal = () => {
    setModalData(null);
    setIsModalOpen(false)
  }

  return (
    <div className='modal-wrapper'>
      <div>
        <span>name:</span> <Input value={containerName ?? modalData.name} onChange={(e) => changeName(e.target.value)} />

        <div className='container-modal-actions'>
          <Button title={"save"} width={80} padding={false} height={40} onClick={saveChanges} />
          <Button title={"cancel"} color='orange' padding={false} width={80} height={40} onClick={cancelChanges} />
          <Button title={"delete"} color='salmon' padding={false} width={80} height={40} onClick={deleteContainer} />
        </div>
      </div>
    </div>
  )
}

export default ContainerModal