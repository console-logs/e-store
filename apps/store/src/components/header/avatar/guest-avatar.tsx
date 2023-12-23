import { Icons } from "@packages/shared/components/Icons";
import { Avatar, AvatarFallback } from "@shared/components/ui/avatar";

export function GuestAvatar() {
  return (
    <Avatar>
      <AvatarFallback>
        <Icons.guest />
      </AvatarFallback>
    </Avatar>
  );
}
