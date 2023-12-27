import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AuthProvider } from "@/context/auth-context";
import { ReduxProvider } from "@/context/redux-context";
import { TRPCReactProvider } from "@/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";
import { Container } from "@shared/components/container";
import { Toaster } from "@shared/components/ui/toaster";
import "@shared/styles/globals.css";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "E-Store",
	description: "Open-source E-Commerce shopping platform for embedded electronics",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ClerkProvider>
			<html
				lang="en"
				className="h-full">
				<body className={inter.className}>
					<TRPCReactProvider cookies={cookies().toString()}>
						<AuthProvider>
							<Header />
							<ReduxProvider>
								<Container>{children}</Container>
							</ReduxProvider>
							<Footer />
						</AuthProvider>
						<Toaster />
					</TRPCReactProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
