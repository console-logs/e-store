import FooterLink from "@/components/footer/footerLink";
import { COUNTRY, WEBSITE_NAME } from "@/lib/constants";
import {
  ABOUT_PAGE,
  CONTACT_US_PAGE,
  PRIVACY_POLICY_PAGE,
  SHIPPING_PAGE,
  TERMS_AND_CONDITIONS_PAGE,
} from "@/lib/pageRoutes";
import { Icons } from "@shared/components/Icons";
import { getCurrentYear } from "@shared/lib/utils";

const footerNavigationLinks = [
  { name: "About Us", url: ABOUT_PAGE },
  { name: "Privacy Policy", url: PRIVACY_POLICY_PAGE },
  { name: "Terms & Conditions", url: TERMS_AND_CONDITIONS_PAGE },
  { name: "Shipping & Returns", url: SHIPPING_PAGE },
  { name: "Contact Us", url: CONTACT_US_PAGE },
];

export default function Footer() {
  const currYear = getCurrentYear();
  return (
    <footer>
      <div className="mx-auto max-w-7xl overflow-hidden border-t px-6 py-10 sm:py-10 lg:px-8">
        <nav
          className="-mb-6 columns-2 sm:flex sm:columns-1 sm:justify-center"
          aria-label="Footer"
        >
          {footerNavigationLinks.map((link) => (
            <FooterLink key={link.name} name={link.name} url={link.url} />
          ))}
        </nav>
        ̦
        <p className="text-muted-foreground mt-5 text-center text-sm leading-5">
          &copy; {currYear} {WEBSITE_NAME}. All rights reserved.
        </p>
        <p className="mt-2 flex items-center justify-center text-sm leading-5">
          Made with <Icons.heartFilled className="mx-1" /> in {COUNTRY}
        </p>
      </div>
    </footer>
  );
}
