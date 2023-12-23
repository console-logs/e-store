import { CartButton } from "@/components/header/cart-button";
import LoginButton from "@/components/header/login-button";
import GuestMenuDropdown from "@/components/header/dropdown/guest-menu-dropdown";
import { UserMenuDropdown } from "@/components/header/dropdown/user-menu-dropdown";
import { MobileNavSidebar } from "@/components/header/mobile-nav-sidebar";
import { MainNavBar } from "@/components/header/main-nav-bar";

export function Header() {
	return (
		<header className="bg-background sticky top-0 z-50 mx-auto mb-12 w-full px-4 sm:px-6 lg:px-8">
			<div className="flex h-16 items-center">
				<MainNavBar />
				<MobileNavSidebar />
				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-2">
						<UserMenuDropdown />
						<GuestMenuDropdown />
						<LoginButton />
						<CartButton />
					</nav>
				</div>
			</div>
		</header>
	);
}
