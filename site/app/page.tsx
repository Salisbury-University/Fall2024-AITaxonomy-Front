import Image from "next/image";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
export default function Home(slugs? : String[]) {
  const slugArray = slugs ? slugs : [];

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
