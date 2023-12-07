import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Contact",
	description: "Contact us for any queries or support. We are happy to help you!",
};

export default function ContactUs() {
	return (
		<div className="py-10">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-200 dark:divide-gray-700 lg:mx-0 lg:max-w-none">
					<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
						<div>
							<h2 className="text-3xl font-bold tracking-tight">Get in touch</h2>
							<p className="mt-4 leading-7 text-muted-foreground">
								Got some queries? Reach out to us and we&apos;ll be more than happy to assist you!
							</p>
						</div>
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
							<div className="rounded-2xl bg-gray-100 dark:bg-gray-900 p-10">
								<h3 className="text-base font-semibold leading-7">Support</h3>
								<dl className="mt-3 space-y-1 text-sm leading-6">
									<div>
										<dt className="sr-only">Email</dt>
										<dd>
											<Link
												className="font-semibold hover:underline"
												href="mailto:help@example.com">
												help@example.com
											</Link>
										</dd>
									</div>
								</dl>
							</div>
							<div className="rounded-2xl bg-gray-100 dark:bg-gray-900 p-10">
								<h3 className="text-base font-semibold leading-7">Whatsapp</h3>
								<dl className="mt-3 space-y-1 text-sm leading-6">
									<div className="mt-1">
										<dt className="sr-only">Phone number</dt>
										<dd className="hover:underline">+91 (999) 999-1234</dd>
									</div>
								</dl>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-x-8 gap-y-10 pt-16 lg:grid-cols-3">
						<div>
							<h2 className="text-3xl font-bold tracking-tight">Locations</h2>
						</div>
						<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
							<div className="rounded-2xl bg-gray-100 dark:bg-gray-900 p-10">
								<h3 className="text-base font-semibold leading-7 text-gray-900">New Delhi</h3>
								<address className="mt-3 space-y-1 text-sm not-italic leading-6 text-muted-foreground">
									<p>Panchavati</p>
									<p>7, Lok Kalyan Marg</p>
									<p>New Delhi, India - 110011</p>
								</address>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
