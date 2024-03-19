import AuthLayout from "../components/Auth-Layout/AuthLayout"

const Signin = () => {
  return (
    <div className="container">
      <AuthLayout header={"Sign In"} fields={["Email", "Password"]} />
    </div>
  )
}

export default Signin