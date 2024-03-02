import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from '@/provider/react-query'
import { Toaster } from "@/components/ui/toaster"
import { AppProvider } from '@/provider/state-manager'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookReco",
  description: "Platfom for your favorite books.",
  icons: {
    icon: '/images/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
        <ReactQueryProvider>
        {children}
        </ReactQueryProvider>
        </AppProvider>
        <Toaster  />
        </body>
    </html>
  );
}
