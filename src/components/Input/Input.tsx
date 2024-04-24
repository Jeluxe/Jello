import "./Input.css"

type InputProps = {
  className?: string,
  value: string,
  onChange: (e: any) => void,
  onKeydown?: (e: any) => void,
  maxLength?: number
}

const Input = ({ className = "", value = "", onChange, onKeydown, maxLength }: InputProps) => {
  return (
    <input
      className={className}
      value={value}
      onChange={onChange}
      onKeyDown={onKeydown}
      maxLength={maxLength}
      autoFocus
    />
  )
}

export default Input