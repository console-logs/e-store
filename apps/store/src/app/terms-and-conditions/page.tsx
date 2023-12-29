import { TERMS_AND_CONDITIONS } from "@/content/terms-and-conditions-info";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "T&C",
};

export default function TermsAndConditions() {
  return (
    <div className="px-4 sm:px-32">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Terms and Conditions
      </h1>
      <div className="space-y-2 mt-10">
        <p>Binding terms and conditions of sale</p>
        <p>
          The following are the terms and conditions of agreement (&quot;Terms
          and Conditions&quot;) for the sale of products (&quot;Products&quot;)
          by E-Store to E-Store&apos;s customers
          (&quot;Customers&quot;).
        </p>
      </div>
      <div className="space-y-8 mt-10 text-justify">
        {TERMS_AND_CONDITIONS.map((condition, index) => (
          <div key={index}>
            <p className="font-semibold">{condition.HEADING}</p>
            <p>{condition.BODY}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
