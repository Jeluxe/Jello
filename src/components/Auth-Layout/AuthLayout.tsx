import { useState } from "react"
import { arrayToObject } from "../../helpers"
import Button from "../Button/Button"
import "./AuthLayout.css"

type Props = {
  header: string
  fields: string[]
}

const AuthLayout = ({ header, fields }: Props) => {
  const [userInfo, setUserInfo] = useState<{ [key: string]: string }>(arrayToObject(fields))

  const handleClick = () => {
    console.log(userInfo)
  }

  return (
    <div className="auth-layout">
      <h2 className="header">{header}</h2>
      <div className="body">
        {
          fields?.map((field: string, idx: number) => {
            return <div className="auth-field" key={idx}>
              <span>{field}</span> <input onChange={({ target: { value } }) => setUserInfo(prevInfo => ({ ...prevInfo, [field]: value }))} />
            </div>
          })
        }
      </div>
      <div className="footer">
        <Button title={header} onClick={handleClick} />
      </div>
    </div>
  )
}

export default AuthLayout