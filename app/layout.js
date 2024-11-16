
import "../styles/globals.css";
import "../styles/skstyle.css";
import "../styles/nstyle.css";
import "../styles/forms.css";
import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ClientComponent from "./clientComponent";
import Redux from "./redux";
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "Kentwood Public Schools - Strategic Plan Dashboard",
  description: "Welcome to Kentwood Public Schools",
  icons: {
    icon: [{ url: "/logo.png" }],
  },
};

export default function RootLayout({ children }) {
  return (

    <>
      <html lang="en">
        <body className={`${inter.className}`}>
          <GoogleOAuthProvider clientId={"402911696235-rch5lm39f478aoghohcvnjbmqgra7uks.apps.googleusercontent.com"}>
            <Redux>
              <ClientComponent>
                {children}
              </ClientComponent>

              <ToastContainer position="top-right" autoClose={3000} />
            </Redux>
          </GoogleOAuthProvider>
        </body>
      </html>
    </>
  );
}
