import { PlusIcon } from '../../../assets/icons';
import { ProjectProviderOperations, useProjectProvider } from '../../../context/ProjectContext';
import { InputHook } from '../../../hooks/InputHook';
import Input from '../../Input/Input';
import './NewContainer.css';

type NewContainerProps = { setIsOpen: React.Dispatch<boolean> }

const NewContainer = ({ setIsOpen }: NewContainerProps) => {
  const { addContainer }: Pick<ProjectProviderOperations, "addContainer"> = useProjectProvider();
  const { value, error, handleChange, onAction, onKeyDown } = InputHook(addContainer, setIsOpen)

  return (
    <div className='container new-container'>
      <Input
        className={"container-input"}
        value={value}
        onKeydown={onKeyDown}
        onChange={handleChange}
        maxLength={24}
      />
      <PlusIcon className='button' onClick={onAction} />
      {error.error ? <span className='error-message'>{error.message}</span> : null}
    </div>
  )
};

export default NewContainer;