import { ROADMAP_PAGE } from "@/lib/routes";
import { Button } from "@shared/components/ui/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Coming Soon",
};
export default function ComingSoon() {
  return (
    <main className="grid min-h-full place-items-center px-10 py-24 sm:py-32 lg:px-10">
      <div>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Coming soon...
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Thanks for showing interest on our newest features. Our team is
          working round the clock get these features up and running. <br />
          We&apos;ll let you know once they are ready! In the meanwhile if you
          are interested to find out on what features we are planning to realse
          in the coming weeks, head over to our roadmaps page and take a look.
        </p>

        <div className="mt-10 gap-x-6">
          <Button asChild>
            <Link href={ROADMAP_PAGE}>Go to Roadmaps</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
