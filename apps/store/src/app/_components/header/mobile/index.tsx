import Brand from "@/app/_components/header/mobile/brand";
import Navigation from "@/app/_components/header/mobile/navigation";
import SidebarTrigger from "@/app/_components/header/mobile/trigger";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@shared/components/ui/sheet";

export default function Mobile() {
  return (
    <Sheet>
      <SheetTrigger asChild className="xl:hidden">
        <SidebarTrigger />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="flex w-64 grow flex-col gap-y-4 overflow-y-auto border-r px-6 dark:bg-black"
      >
        <SheetHeader>
          <SheetTitle>
            <Brand />
          </SheetTitle>
        </SheetHeader>
        <Navigation />
      </SheetContent>
    </Sheet>
  );
}
