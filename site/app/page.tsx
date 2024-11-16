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
    <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                {slugArray.length > 0 ? (
                    slugArray.map((slug, index) => (
                      <div>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink href="#">
                            {slug}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < slugArray.length - 1 && (
                          <BreadcrumbSeparator className="hidden md:block" />
                        )}
                        </div>
                    ))
                  ) : (
                    <BreadcrumbItem>
                      <BreadcrumbPage>No breadcrumbs available</BreadcrumbPage>
                    </BreadcrumbItem>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </header>
            <main>

            </main>
          </SidebarInset>
      </SidebarProvider>
  );
}
