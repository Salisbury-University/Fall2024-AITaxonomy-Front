import { Header } from "@/components/Header";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";

export default function Home() {

  return (
    <>
      <SidebarProvider>
          <AppSidebar/>
            <div className="absolute top-0 left-0 z-50 p-2">
              <SidebarTrigger className="ml-1 bg-white dark:bg-black text-suGold dark:text-white rounded-md shadow-md" />
            </div>
          <SidebarInset>
            <Header/>
            <main className="bg-white dark:bg-black m-10">
            {/* <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-5">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="aspect-square rounded-xl bg-muted/50" />
                ))}
              </div>
            </div> */}
            {/* <div className="flex flex-col gap-4 p-4">
              <div className="flex-grow w-full aspect-square rounded-xl bg-muted/50">
                <p>hello world</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex-grow w-full aspect-square rounded-xl bg-muted/50 ">
                <p>hello world</p>
              </div>
            </div> */}
              

            </main>
          </SidebarInset>
        </SidebarProvider>
    </>
  );
}
