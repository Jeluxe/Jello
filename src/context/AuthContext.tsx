import React, { createContext, useContext } from "react";
import { AuthProps, useAuth } from "../hooks/useAuth";


const AuthContext = createContext<null | AuthProps>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authData = useAuth()

  return <AuthContext.Provider value={authData}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider;

export const useAuthProvider: () => any = () => useContext(AuthContext);