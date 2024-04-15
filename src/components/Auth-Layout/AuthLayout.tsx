import { useState } from "react"
import { arrayToObject } from "../../helpers"
import Button from "../Button/Button"
import Input from "../Input/Input"
import "./AuthLayout.css"

type Props = {
  header: string
  fields: string[],
  onClick: (userInfo: any) => void
}

const AuthLayout = ({ header, fields, onClick }: Props) => {

  const [userInfo, setUserInfo] = useState<{ [key: string]: string }>(arrayToObject(fields))

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-layout">
          <h2 className="header">{header}</h2>
          <div className="body">
            {
              fields?.map((field: string, idx: number) => {
                field = field.toLowerCase();
                return <div className="auth-field" key={idx}>
                  <span>{field.toCapitalize()}</span>
                  <Input
                    className="auth-input"
                    value={userInfo[field]}
                    onChange={({ target: { value } }) => (
                      setUserInfo(prevInfo => ({ ...prevInfo, [field]: value })
                      ))}
                  />
                </div>
              })
            }
          </div>
          <div className="footer">
            <Button title={header} onClick={() => onClick(userInfo)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout