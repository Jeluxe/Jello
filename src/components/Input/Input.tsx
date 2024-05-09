import "./Input.css"

type InputProps = {
  className?: string,
  type: "text" | "password" | "file" | "color",
  value: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onKeyDown?: (e: React.KeyboardEvent) => void,
  maxLength?: number,
  style?: React.CSSProperties
}

type TextInputProps = {
  value: string,
  onKeyDown?: (e: React.KeyboardEvent) => void,
  maxLength?: number
}

type FileInputProps = { accept: string }

type ColorInputProps = { value: string }

type customInputProps = TextInputProps | FileInputProps | ColorInputProps | {}

const Input = ({ className = "", type = "text", value = "", onChange, onKeyDown, maxLength, style }: InputProps) => {
  const getInputProps = (): customInputProps => {
    switch (type) {
      case "text":
      case "password":
        return { value, onKeyDown, maxLength }
      case "file":
        return { accept: ".jpg, .jpeg, .png" }
      case "color":
        return { value }
      default:
        return {};
    }
  }

  return (
    <input
      className={className}
      type={type}
      onChange={onChange}
      {...getInputProps()}
      style={style}
      autoFocus
    />
  )
}

export default Input