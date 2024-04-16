import { useState } from "react";

export type User = {
  id: string | null,
  username: string | null,
  avatar: string | null,
}

export type AuthProps = {
  user: User,
  isAuthenticated: boolean,
  login: (obj: any) => void,
  signup: (obj: any) => void,
  logout: () => void
}

export type SignupProps = {
  email: string,
  password: string
  username: string,
  confirmPassword: string
}

export type LoginProps = Pick<SignupProps, "username">;

const INIT_USER = { id: null, username: null, avatar: null }

export const useAuth = () => {
  const [user, setUser] = useState<User>(INIT_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (loginData: LoginProps) => {
    setError(null)
    setLoading(true)
    try {
      console.log(loginData)
      // const { data } = await axios.post("/login", loginData)
      setUser({ id: "fh34q6vh74erfr", username: "fooster", avatar: "fhdsyfh.image" });
      setIsAuthenticated(true);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Login failed. Please try again later.";
      setError(errorMessage);
    } finally {
      setLoading(false)
    }
  }

  const signup = async (signupData: SignupProps) => {
    setError(null)
    setLoading(true)
    try {
      console.log(signupData)
      // const { data } = await axios.post("/Signup", SignupData)
      setUser({ id: "fh34q6vh74erfr", username: "fooster", avatar: "fhdsyfh.image" });
      setIsAuthenticated(true);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Signup failed. Please try again later.";
      setError(errorMessage);
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setError(null)
    setLoading(true)
    try {
      // await axios.get("/logout");
      setUser(INIT_USER);
      setIsAuthenticated(false);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Something went wrong.";
      setError(errorMessage);
    } finally {
      setLoading(false)
    }
  }

  return {
    user, isAuthenticated, login, signup, logout, error, loading
  }
}