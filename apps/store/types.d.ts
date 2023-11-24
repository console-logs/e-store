type AuthContextType = {
  isSignedIn: boolean | undefined;
  isLoaded: boolean;
  user: UserResource | null | undefined;
};

type AuthContextProviderType = {
  children: React.ReactNode;
};
