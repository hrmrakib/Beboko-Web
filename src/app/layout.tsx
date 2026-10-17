import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ModalProvider } from "@/components/modals/ModalProvider";
import { StoreProvider } from "@/redux";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Dar Dar Food & Groceries, Delivered",
  description: "Food, groceries and everyday essentials delivered to your door.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <StoreProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
