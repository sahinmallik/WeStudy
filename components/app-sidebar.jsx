"use client";

import React, { useEffect } from "react";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import {
  BookOpen,
  Bot,
  Folder,
  Forward,
  Frame,
  LayoutDashboard,
  Map,
  MoreHorizontal,
  NotebookPen,
  PieChart,
  Settings2,
  SquareTerminal,
  Trash2,
  Notebook,
  ChevronUp,
  User2,
  Book,
  Loader2,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { createSubject } from "@/action/subject";
import useFetch from "@/hooks/createSubject";
import { getSubjects } from "@/action/getSubjects";

// This is sample data.

export function AppSidebar(props) {
  const { user } = useUser();
  if (!user) {
    return null;
  }

  const pathName = usePathname();
  const paths = pathName.split("/").filter(Boolean);
  const lastPath = paths.length == 2 ? paths[1] : " ";

  const {
    loading: updateLoading,
    fn: getSubjectsFn,
    data: subjects,
  } = useFetch(getSubjects);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        await getSubjectsFn();
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubjects();
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
                    <Link href="/dashboard/create-subject">
                      <Button style={{ padding: "15px" }}>
                        <BookOpen style={{ width: "20px", height: "20px" }} />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Create Subject</p>
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
              <Link href="/dashboard/subjects">
                <SidebarMenuButton isActive={lastPath === "subjects"}>
                  <Book className="text-sidebar-foreground/70" /> Subjects
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            {/* {data.navMain.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))} */}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>Subjects</SidebarGroupLabel>
          <SidebarMenu>
            {updateLoading ? (
              <SidebarMenuItem className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </SidebarMenuItem>
            ) : subjects?.length > 0 ? (
              subjects.map((subject) => (
                <SidebarMenuItem key={subject.id}>
                  <SidebarMenuButton asChild>
                    <a href={`/dashboard/subject/${subject.id}`}>
                      <BookOpen />
                      <span>{subject.subjectName}</span>
                    </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 rounded-lg"
                      side="bottom"
                      align="end"
                    >
                      <Link href={`/dashboard/subject/${subject.id}`}>
                        <DropdownMenuItem className="space-x-3">
                          <Folder className="text-muted-foreground w-4 h-4" />
                          <span>View Subject</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <Link href={`/dashboard/subject/${subject.id}`}>
                        <DropdownMenuItem className="space-x-3">
                          <Trash2 className="text-muted-foreground w-4 h-4" />
                          <span>Delete Subject</span>
                        </DropdownMenuItem>
                      </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))
            ) : (
              <SidebarMenuItem className="flex items-center justify-center">
                <p className="text-center text-muted-foreground">
                  No subjects found.
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
                  <User2 /> {user.fullName}
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
