import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MatchMyResume",
  description: "Say goodbye to endless job hunting and hello to your perfect match!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <main className="p-12 m-4 ">
             {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
