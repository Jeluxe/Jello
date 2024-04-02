import { useNavigate } from "react-router-dom"
import AuthLayout from "../components/Auth-Layout/AuthLayout"
import { useAuthProvider } from "../context/AuthContext"
import { SignupProps } from "../hooks/AuthHook"

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuthProvider()

  const onClick = (signupInfo: SignupProps) => {
    if (Object.values(signupInfo).every(val => !!val)) {
      signup(signupInfo)
      navigate("/")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <AuthLayout header={"Sign Up"} fields={["Username", "Email", "Password", "Confirm Password"]} onClick={onClick} />
      </div>
    </div>
  )
}

export default Signup