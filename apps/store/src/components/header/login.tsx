"use client";
import { AuthContext } from "@/context/authContext";
import { LOGIN_PAGE } from "@/lib/routes";
import { Button } from "@shared/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Login() {
  const { isSignedIn } = React.useContext(AuthContext);
  return (
    <div hidden={isSignedIn}>
      <div className="hidden md:inline-block">
        <Button asChild size={"sm"} variant={"default"}>
          <Link href={LOGIN_PAGE}>Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
