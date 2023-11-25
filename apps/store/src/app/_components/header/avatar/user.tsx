import { useUser } from "@clerk/nextjs";
import { getInitials } from "@packages/shared/lib/utils";
import { Avatar, AvatarFallback } from "@shared/components/ui/avatar";

export default function UserAvatar() {
  const { isSignedIn, user } = useUser();
  let initials = "";
  
  if (isSignedIn && user.firstName && user.lastName) {
    initials = getInitials(user.firstName, user.lastName);
  }

  return (
    <Avatar>
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
