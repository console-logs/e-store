import Cart from "@/components/header/cart";
import Login from "@/components/header/login";
import Main from "@/components/header/main";
import GuestMenu from "@/components/header/menu/guest";
import UserMenu from "@/components/header/menu/user";
import Mobile from "@/components/header/mobile";

export default function Header() {
  return (
    <header className="bg-background sticky top-0 z-50 mx-auto mb-12 w-full px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center">
        <Main />
        <Mobile />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {/* Refer developer notes #2 */}
            {/* <NavbarPartsSearchForm />
            <MobileNavbarPartsSearchForm /> */}
            <UserMenu />
            <GuestMenu />
            <Login />
            <Cart />
          </nav>
        </div>
      </div>
    </header>
  );
}
