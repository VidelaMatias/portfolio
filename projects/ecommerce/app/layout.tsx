import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/footer";
import ClientLayout from "./clientLayout";
import { Suspense } from "react";
import Loader from "@/components/Loader/loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ECommerce Next App",
  description: "E-commerce app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          <Header />
          <Suspense fallback={<Loader />} >
            {children}
          </Suspense>
        </ClientLayout>
        <Footer />
      </body>
    </html>
  );
}
