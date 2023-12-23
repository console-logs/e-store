import { WEBSITE_NAME } from "@/lib/constants";
import { Icons } from "@packages/shared/components/Icons";

export default function Title() {
  return (
    <div className="flex h-16 shrink-0 items-center justify-center space-x-2">
      <Icons.triangle className="h-10 w-auto" />
      <h1 className="scroll-m-20 text-3xl font-bold tracking-tight transition-colors md:text-4xl">
        {WEBSITE_NAME}
      </h1>
    </div>
  );
}
