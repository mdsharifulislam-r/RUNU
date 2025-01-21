import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Toaster } from "react-hot-toast";

;

export const metadata: Metadata = {
  title: "Runu",
  description: "The Real Time Chatting Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <StoreProvider>
        {children}
        </StoreProvider>
       <Toaster
       position="top-center"
       />
      </body>
    </html>
  );
}
