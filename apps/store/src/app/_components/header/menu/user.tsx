"use client";
import UserAvatar from "@/app/_components/header/avatar/user";
import { AuthContext } from "@/context/authContext";
import { ACCOUNT_PAGE, ORDER_HISTORY_PAGE } from "@/lib/routes";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";

export default function UserMenu() {
  const { isSignedIn } = React.useContext(AuthContext);
  const { signOut } = useAuth();

  return (
    <div hidden={!isSignedIn}>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <UserAvatar />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>
              <Link href={ACCOUNT_PAGE}>Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={ORDER_HISTORY_PAGE}>Order History</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
