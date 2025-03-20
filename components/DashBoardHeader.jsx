"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, Menu, Search, Sun } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

const DashBoardHeader = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);
  const lastPath = paths.length > 0 ? paths[paths.length - 1] : "Dashboard";
  return (
    <header className="flex items-center justify-between h-14 px-4 border-b bg-background">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="w-5 h-5" />
        <Breadcrumb>
          <BreadcrumbList className="hidden sm:flex">
            {paths.map((path, index) => {
              const url = `/${paths.slice(0, index + 1).join("/")}`;
              return (
                <BreadcrumbItem key={index}>
                  <Link
                    href={path === "dashboard" ? "/dashboard/overview" : url}
                  >
                    <BreadcrumbLink
                      className={
                        index === paths.length - 1 ? "font-medium" : ""
                      }
                    >
                      {path.charAt(0).toUpperCase() + path.slice(1)}
                    </BreadcrumbLink>
                  </Link>
                  {index < paths.length - 1 && <BreadcrumbSeparator />}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
          <span className="md:hidden font-medium">
            {lastPath.charAt(0).toUpperCase() + lastPath.slice(1)}
          </span>
        </Breadcrumb>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-full space-y-2 hidden md:flex">
          <Button
            variant="outline"
            className="relative h-9 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
          >
            <Search className="mr-2 h-4 w-4" />
            <span>Search...</span>
            <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
        </div>

        {/* <Avatar className="h-8 w-8 ml-2">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
          <AvatarFallback>J</AvatarFallback>
        </Avatar> */}

        {/* <Button variant="ghost" size="icon" className="h-8 w-8 ml-1">
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </Button> */}
        <UserButton />
      </div>
    </header>
  );
};

export default DashBoardHeader;
