import AuthLayout from "../components/Auth-Layout/AuthLayout"

const Signup = () => {
  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <AuthLayout header={"Sign Up"} fields={["Username", "Email", "Password", "Confirm Password"]} />
      </div>
    </div>
  )
}

export default Signup