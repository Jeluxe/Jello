import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/Auth-Layout/AuthLayout";
import { useAuthProvider } from "../context/AuthContext";
import { LoginProps } from "../hooks/AuthHook";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthProvider();

  const onClick = (userInfo: LoginProps) => {
    if (Object.values(userInfo).every(val => !!val)) {
      login(userInfo);
      navigate("/");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <AuthLayout header={"Login"} fields={["Email", "Password"]} onClick={onClick} />
      </div>
    </div>
  )
}

export default Login