import "./Input.css"

type InputProps = {
  className?: string,
  type: "text" | "password" | "file",
  value: string,
  onChange: (e: any) => void,
  onKeydown?: (e: any) => void,
  maxLength?: number
}

const Input = ({ className = "", type = "text", value = "", onChange, onKeydown, maxLength }: InputProps) => {
  return (
    <input
      className={className}
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeydown}
      maxLength={maxLength}
      autoFocus
    />
  )
}

export default Input