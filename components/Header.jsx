import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  await checkUser();
  return (
    <header className="fixed top-0 backdrop-blur-md bg-backgroud/80 w-full z-100 supports[backdrop-filter]:bg-background/60 border-b">
      <nav className="flex justify-between items-center px-4 h-16">
        <Link href="/">
          <Image
            src="/logo.png"
            width={120}
            height={100}
            className="h-10 py-1 w-auto object-contain mix-blend-color-burn"
            alt="WeStudy Logo"
          />
        </Link>
        <div className="flex items-center space-x-3">
          <Link href="/dashboard" className="opacity-0 lg:opacity-100">
            <Button variant="outline">
              <LayoutDashboard /> Dashboard
            </Button>
          </Link>
          <SignedIn>
            <UserButton
              showName
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
                mode: "dark",
              }}
            />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="outline">Sign In</Button>
            </Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
