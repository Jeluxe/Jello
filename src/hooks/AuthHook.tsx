import { useState } from "react";

export type User = {
  id: string | null,
  username: string | null,
  avatar: string | null,
}

export type AuthProps = {
  user: User,
  authenticated: boolean,
  login: (obj: any) => void,
  signup: (obj: any) => void,
  logout: () => void
}

export type LoginProps = {
  email: string,
  password: string
}

export interface SignupProps extends LoginProps {
  username: string,
  confirmPassword: string
}

const INIT_USER = { id: null, username: null, avatar: null }

export const useAuth = () => {
  const [user, setUser] = useState<User>(INIT_USER);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const login = (loginData: LoginProps) => {
    console.log(loginData)
    setUser({ id: "Ffffff", username: "fksos", avatar: "dddd.png" });
    setAuthenticated(true);
  }

  const signup = (SignupData: SignupProps) => {
    console.log(SignupData)
    setUser({ id: "Ffffff", username: "fksos", avatar: "dddd.png" });
    setAuthenticated(true);
  }

  const logout = () => {
    setUser(INIT_USER);
    setAuthenticated(false);
  }

  return {
    user, authenticated, login, signup, logout
  }
}