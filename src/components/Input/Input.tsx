import "./Input.css"
const Input = ({ className = "", value = "", onChange, onKeydown, maxLength }: { className?: string, value: string, onChange: (e: any) => void, onKeydown?: (e: any) => void, maxLength?: number }) => {
  return (
    <input className={className} value={value} onChange={onChange} onKeyDown={onKeydown} maxLength={maxLength} />
  )
}

export default Input