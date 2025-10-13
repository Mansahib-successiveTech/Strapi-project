import "./globals.css";
import Providers from "@/components/Provider";
import Navbar from "@/components/Navbar";
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-ZT4QGH99SZ`}
           strategy="lazyOnload"
        />
        <Script id="google-analytics"  strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZT4QGH99SZ', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
