import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Header from "@/components/Header";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WeStudy",
  description:
    "WeStudy is a platform for students to study together. and this will allow the student to connect with other students and study together. This will also allow the student to get help from other students and also help other students through the forums of this application also the student can ask questions and get answers from other students and also the student can answer questions and help other students. also there will be feature of the video calling and the document management system.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <main className="min-h-screen">{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
