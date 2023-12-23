"use client";
import Loading from "@/app/loading";
import { useUser } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types";
import React from "react";

type AuthContextType = {
  isSignedIn: boolean | undefined;
  isLoaded: boolean;
  user: UserResource | undefined | null;
};

type AuthContextProviderType = {
  children: React.ReactNode;
};

export const AuthContext = React.createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthContextProviderType) => {
  const { user, isSignedIn, isLoaded } = useUser();
  return (
    <AuthContext.Provider value={{ isSignedIn, user, isLoaded }}>
      {isLoaded ? children : <Loading />}
    </AuthContext.Provider>
  );
};
