import { SHIPPING_POLICY_CONTENT } from "@/content/shippingPolicy";
import { HOME_PAGE } from "@/lib/routes";
import { getCurrentYear } from "@packages/shared/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Returns",
};

export default function ShippingAndReturns() {
  const currYear = getCurrentYear();
  return (
    <div className="px-4 sm:px-32">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Shipping and Return Policy
      </h1>
      <div className="space-y-2 mt-10">
        <p className="text-muted-foreground">
          This policy was last modified on {currYear}.
        </p>
        <p className="font-semibold">Interpretations and Definitions:</p>
      </div>
      <div className="space-y-8 mt-10 text-justify">
        <div>
          <p className="font-semibold">Interpretations:</p>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions and these definitions shall
            have the same meaning regardless of whether they appear in singular
            or in plural.
          </p>
        </div>
        <div>
          <p className="font-semibold">Definitions:</p>
          <p>
            For the purposes of this Disclaimer: <br />
            “Company” - referred to as either “the Company”,
            <br />
            “We”, “Us” or “Our” in this Disclaimer refers to E-Store{" "}
            <br />
            “Goods” refers to the items offered for sale on the Service. <br />
            “Orders” means a request by You to purchase Goods from Us. <br />
            “Service” refers to the Website. <br />
            “Website” refers to E-Store website, accessible from{" "}
            <Link href={HOME_PAGE}>Home</Link> <br />
            “You” means the individual accessing the Service, or the company, or
            other legal entity on behalf of which such individual is accessing
            or using the Service, as applicable.
          </p>
        </div>
        <div>
          <p>
            The following terms and conditions constitute our Domestic Shipping
            Policy:
          </p>
        </div>

        {SHIPPING_POLICY_CONTENT.map((condition, index) => (
          <div key={index}>
            <p className="font-semibold">{condition.HEADING}</p>
            <p>{condition.BODY}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
