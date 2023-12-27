"use client";
import { GuestAvatar } from "@/components/header/avatar/guest-avatar";
import { AuthContext } from "@/context/auth-context";
import { LOGIN_PAGE, ORDER_HISTORY_PAGE, SIGNUP_PAGE } from "@/lib/routes";
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

export default function GuestMenuDropdown() {
	const { isSignedIn } = React.useContext(AuthContext);
	return (
		<div hidden={isSignedIn}>
			<div className="flex items-center">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							className="md:hidden"
							variant={"ghost"}
							size={"icon"}>
							<GuestAvatar />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56">
						<DropdownMenuItem>
							<Link href={LOGIN_PAGE}>Log In</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href={SIGNUP_PAGE}>Sign Up</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Link href={ORDER_HISTORY_PAGE}>Order History</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
