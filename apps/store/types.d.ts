type AuthContextType = {
  isSignedIn: boolean | undefined;
  isLoaded: boolean;
  user: UserResource | null | undefined;
};

type AuthContextProviderType = {
  children: React.ReactNode;
};

type ListItemsProps = {
  title: string;
  href: string;
  children: React.ReactNode;
};

