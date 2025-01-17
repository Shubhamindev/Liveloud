import { Titillium_Web } from "next/font/google";
import "./globals.css";
import ThemeProvider, { ThemeContext, useTheme } from "@/contexts/themeContext";
import ThemeWrapper from "./components/ThemeWrapper";
import AuthProvider, { useAuth } from "@/contexts/auth/context";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
import ChatContextProvider from "@/contexts/chatContext";
=======
import Loader from "./components/Loader";
import VarificationBarrier from "./components/VarificationBarrier";
>>>>>>> 62c7c0bd668754cb987cdaa3ddb436fe32d1e0c2

const FONT = Titillium_Web({
  style: "normal",
  weight: ["400", "700"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata = {
  title: "LiveLoud",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <ThemeWrapper>
<<<<<<< HEAD
        <ChatContextProvider>
          <body className={`bg-gray-100 dark:bg-gray-800 ${FONT.className}`}>
            <AuthProvider>{children}</AuthProvider>
          </body>
        </ChatContextProvider>
=======
        <body className={`bg-gray-100 dark:bg-gray-800 ${FONT.className}`}>
          <AuthProvider>
            <Loader />
            <VarificationBarrier>{children}</VarificationBarrier>
          </AuthProvider>
        </body>
>>>>>>> 62c7c0bd668754cb987cdaa3ddb436fe32d1e0c2
      </ThemeWrapper>
    </ThemeProvider>
  );
}
