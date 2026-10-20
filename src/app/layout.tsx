import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ModalProvider } from "@/components/modals/ModalProvider";
import { StoreProvider } from "@/redux";
import { GoogleTranslate } from "@/components/common/GoogleTranslate";
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (window.location.search && window.location.search.indexOf('reset=1') !== -1) {
                    localStorage.removeItem('preferred_language');
                    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname + ';';
                  }

                  var preferred = localStorage.getItem('preferred_language');
                  var cookies = document.cookie;
                  var hasGoogtrans = cookies.indexOf('googtrans=') !== -1;

                  if (preferred === 'en') {
                    // User explicitly chose English
                    if (!hasGoogtrans || cookies.indexOf('/en') === -1) {
                      document.cookie = 'googtrans=/en/en; path=/;';
                    }
                  } else {
                    // Default is French on first visit or if preferred is 'fr' or unset
                    if (!preferred) {
                      localStorage.setItem('preferred_language', 'fr');
                    }
                    if (!hasGoogtrans || cookies.indexOf('/fr') === -1) {
                      document.cookie = 'googtrans=/en/fr; path=/;';
                      document.cookie = 'googtrans=/auto/fr; path=/;';
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <StoreProvider>
          <ModalProvider>
            {children}
            <GoogleTranslate />
          </ModalProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
