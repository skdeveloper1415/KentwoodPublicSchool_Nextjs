"use client";
import Top from "./top";
import { useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Layout({ children, ...pageProps }) {

  const [topShow, setTopShow] = useState(true);

  return (
    <>
      {topShow === true ?
        <Top handleGoogleLogout={pageProps.handleGoogleLogout}
        handleGoogleLogin={pageProps.handleGoogleLogin}
        isAuthenticated={pageProps.isAuthenticated} topTab={pageProps.topTab} pageTitle={pageProps.pageTitle} pageName={pageProps.pageName} parentPageName={pageProps.parentPageName} setActiveIndexList={pageProps.setActiveIndexList}/>
        : null
      }
      <div className={`${inter.className}`}>
        <main>
          {children}
        </main>
      </div>
    </>
  );
}
