import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QueryProvider from "@/lib/QueryProvider";
import ReduxProvider from "@/store/ReduxProvider";

export const metadata: Metadata = {
  title: "PlanMyWedding.ai — Plan your dream wedding with AI",
  description:
    "Find trusted venues, photographers and caterers, matched to your budget and taste by AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body">
        <ReduxProvider>
          <QueryProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
