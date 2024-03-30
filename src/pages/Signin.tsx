import AuthLayout from "../components/Auth-Layout/AuthLayout"

const Signin = () => {
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <AuthLayout header={"Sign In"} fields={["Email", "Password"]} />
      </div>
    </div>
  )
}

export default Signin