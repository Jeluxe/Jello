import "./Input.css"
const Input = ({ value = "", onChange, onKeydown, maxLength }: { value: string, onChange: (e: any) => void, onKeydown: (e: any) => void, maxLength?: number }) => {
  return (
    <input value={value} onChange={onChange} onKeyDown={onKeydown} maxLength={maxLength} />
  )
}

export default Input