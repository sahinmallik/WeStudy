"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, Sun } from "lucide-react";
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

const DashBoardHeader = () => {
  return (
    <header className="flex items-center justify-between h-14 px-4 border-b bg-background">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-5 w-5" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" className="text-lg font-medium">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-lg">Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search..."
            className="pl-3 pr-12 h-9 rounded-md"
          />
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
