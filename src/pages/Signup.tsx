import AuthLayout from "../components/Auth-Layout/AuthLayout"

const Signup = () => {
  return (
    <div className="container">
      <AuthLayout header={"Sign Up"} fields={["Username", "Email", "Password", "Confirm Password"]} />
    </div>
  )
}

export default Signup