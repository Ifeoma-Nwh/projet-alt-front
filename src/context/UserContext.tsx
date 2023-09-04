import { useQuery } from "@apollo/client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../graphql/users.server";
import { IUser } from "../graphql/interfaces/user";

export const UserContext = createContext<{
  user: IUser | null | undefined;
  email: string | null | undefined;
  role: number | null | undefined; // Ajoutez le rôle de l'utilisateur
  logout: () => void;
  login: (token: string) => void;
}>({
  user: undefined,
  email: null,
  role: null, // Initialisez le rôle à null
  logout: () => {},
  login: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null | undefined>(undefined);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { data, refetch } = useQuery(getMe, {
    fetchPolicy: "network-only",
    onError: (e) => {
      setError(e);
    },
  });

  useEffect(() => {
    if (error) {
      setUser(null);
      setRole(null);
    }
  }, [error]);

  useEffect(() => {
    if (data && data.GetMe) {
      setUser(data.GetMe);
      setEmail(data.GetMe.email);
      setRole(data.GetMe.role);
    }
  }, [data]);

  function onTokenChange(token?: string) {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    setUser(undefined);
    refetch();
  }

  const logout = () => {
    onTokenChange();
    window.location.reload();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        email,
        logout,
        role,
        login: (token) => onTokenChange(token),
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
