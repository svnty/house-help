import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "HouseHelp — Housing Affordability Calculator",
  description:
    "Understand the real impact of housing affordability changes. Compare what buying a house meant then versus what it means for young Australians today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-16 min-h-screen" style={{ background: 'var(--background)' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
