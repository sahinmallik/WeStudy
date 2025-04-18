"use client";

import React, { useEffect } from "react";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import {
  LayoutDashboard,
  Users,
  MoreHorizontal,
  UserMinus,
  ChevronUp,
  Loader2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { usePathname } from "next/navigation";
import useFetch from "@/hooks/createSubject";
import { getSubjects } from "@/action/getSubjects";

export function AppSidebar(props) {
  const { user } = useUser();
  if (!user) return null;

  const pathName = usePathname();
  const paths = pathName.split("/").filter(Boolean);
  const lastPath = paths.length === 2 ? paths[1] : " ";

  const {
    loading: updateLoading,
    fn: getGroupsFn,
    data: userDetails,
  } = useFetch(getSubjects);

  useEffect(() => {
    getGroupsFn().catch(console.error);
  }, [pathName]);

  return (
    <Sidebar {...props} variant="floating">
      <SidebarHeader>
        <SidebarMenu className="flex">
          <SidebarMenuItem className="w-auto p-4">
            <Link href="/">
              <Image
                src="/logo.png"
                width={120}
                height={100}
                className="h-10 py-1 w-auto object-contain"
                alt="WeStudy Logo"
                style={{ marginBottom: "30px" }}
              />
            </Link>
            <div className="flex justify-end mb-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href="/dashboard/create-group">
                      <Button
                        variant="ghost"
                        className="text-amber-500 hover:text-amber-400 hover:bg-zinc-900 p-5"
                      >
                        <Users style={{ width: "20px", height: "20px" }} />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Create Group</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard/overview">
                <SidebarMenuButton isActive={lastPath === "overview"}>
                  <LayoutDashboard className="text-sidebar-foreground/70" />{" "}
                  Dashboard
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/groups">
                <SidebarMenuButton isActive={lastPath === "subjects"}>
                  <Users className="text-sidebar-foreground/70" /> Groups
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Groups</SidebarGroupLabel>
          <SidebarMenu>
            {updateLoading ? (
              <SidebarMenuItem className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </SidebarMenuItem>
            ) : userDetails?.groups?.length > 0 ? (
              userDetails.groups.map(({ group }) => (
                <SidebarMenuItem key={group.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/dashboard/group/${group.id}`}>
                      <Users />
                      <span>{group.groupName}</span>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 rounded-lg"
                      side="bottom"
                      align="end"
                    >
                      <Link href={`/dashboard/subject/${group.id}`}>
                        <DropdownMenuItem className="space-x-3">
                          <UserMinus className="text-muted-foreground w-4 h-4" />
                          <span>Leave Group</span>
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))
            ) : (
              <SidebarMenuItem className="flex items-center justify-center">
                <p className="text-center text-muted-foreground">
                  No Groups found.
                </p>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Users /> {user.fullName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <SignOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
