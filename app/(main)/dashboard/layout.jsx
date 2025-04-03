import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashBoardHeader from "@/components/DashBoardHeader";
import { Toaster } from "sonner";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashBoardHeader />
        <Toaster />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
