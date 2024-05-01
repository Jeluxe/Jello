import { useNavigate } from "react-router-dom";
import { AuthLayout } from "../components";
import { useAuthProvider } from "../context/AuthContext";
import { LoginProps } from "../hooks/useAuth";

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
    <AuthLayout header={"Login"} fields={["Email", "Password"]} onClick={onClick} />
  )
}

export default Login;