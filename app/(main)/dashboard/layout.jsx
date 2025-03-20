import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashBoardHeader from "@/components/DashBoardHeader";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashBoardHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
