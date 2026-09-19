import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import AnimatedBackground from "@/components/AnimatedBackground";
import Themeprovider from "@/components/Themeprovider";


const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Sparkcart",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <AnimatedBackground />
      <html lang="en" className="light" style={{colorScheme: "light"}}>
        <body className={`${outfit.className} antialiased text-gray-700`} >
          <Toaster />
          <AppContextProvider>
            <Themeprovider>
            {children}
            </Themeprovider>
          </AppContextProvider>
        </body>
      </html>
      </ClerkProvider>
  );
}
