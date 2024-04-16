import "./Input.css"
const Input = ({ className = "", value = "", onChange, onKeydown, onBlur, maxLength }: { className?: string, value: string, onChange: (e: any) => void, onKeydown?: (e: any) => void, onBlur?: () => void, maxLength?: number }) => {
  return (
    <input className={className} value={value} onChange={onChange} onKeyDown={onKeydown} maxLength={maxLength} autoFocus onBlur={onBlur} />
  )
}

export default Input