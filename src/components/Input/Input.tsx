import "./Input.css"

type InputProps = {
  className?: string,
  type: "text" | "password" | "file",
  value: string,
  onChange: (e: any) => void,
  onKeydown?: (e: any) => void,
  maxLength?: number,
  accept?: ".jpg, .jpeg, .png"
}

const Input = ({ className = "", type = "text", value = "", onChange, onKeydown, maxLength, accept }: InputProps) => {
  return (
    <input
      className={className}
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={onKeydown}
      maxLength={maxLength}
      accept={accept}
      autoFocus
    />
  )
}

export default Input