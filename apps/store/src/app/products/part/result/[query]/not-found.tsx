import { HOME_PAGE } from "@/lib/routes";
import { Button } from "@shared/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import errorImage from "public/images/error.gif";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-10 flex flex-col items-center">
      <Image
        className="w-96"
        src={errorImage}
        alt="Wrong input. Please check input"
      />
      <p className="text-lg text-center">
        Oops! Looks like we couldn&apos;t find the requested part.
        <br />
        Try again with a different part number.
      </p>
      <p className="my-2 text-center">Or</p>
      <Button asChild>
        <Link href={HOME_PAGE}>Go to the Home Page</Link>
      </Button>
    </div>
  );
}
