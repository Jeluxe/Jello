import { PlusIcon } from "../../../assets/icons";
import { ProjectProviderOperations, useProjectProvider } from "../../../context/ProjectContext";
import { InputHook } from "../../../hooks/InputHook";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import "./NewCard.css";

type NewCardProps = { setIsOpen: React.Dispatch<boolean>, containerId: string }

const NewCard = ({ setIsOpen, containerId }: NewCardProps) => {
  const { addCard }: Pick<ProjectProviderOperations, "addCard"> = useProjectProvider()
  const { value, error, handleChange, onAction, onKeyDown } = InputHook((name) => addCard(containerId, name), setIsOpen)


  return (
    <div className="card new-card">
      <Input className={"card-input"} value={value} onChange={handleChange} onKeydown={onKeyDown} maxLength={24} />
      {error.error && <span className='error-message'>{error.message}</span>}
      <Button className='button' title={<PlusIcon />} onClick={onAction}></Button>
    </div>
  )
};

export default NewCard;