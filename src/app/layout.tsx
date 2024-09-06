import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
import NavbarResume from "@/components/navbar-resume/NavbarResume";
import Template from "./template";

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
      <head>
        <link  
          rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Glegoo:wght@400;700&display=swap"/>
      </head>
      <body className={inter.className}>
        <UserProvider>
          <NavbarResume />
          <Template>
            <main className="p-12 m-4 ">
              {children}
            </main>
          </Template>
        </UserProvider>
      </body>
    </html>
  );
}
