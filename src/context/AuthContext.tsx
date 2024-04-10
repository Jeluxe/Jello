import React, { createContext, useContext } from "react";
import { AuthProps, useAuth } from "../hooks/AuthHook";


const AuthContext = createContext<null | AuthProps>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authData = useAuth()

  return <AuthContext.Provider value={authData}>
    {children}
  </AuthContext.Provider>
}

export const useAuthProvider: () => any = () => useContext(AuthContext);