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
      <Header/>
            
            <main className="flex flex-col items-center justify-start w-full h-full overflow-y-auto bg-background p-4 sm:p-6">
              <div className="max-w-4xl w-full">
                {/* Welcome Section */}
                <div className="bg-card shadow-md rounded-lg p-4 sm:p-6 mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Welcome to the home of Salisbury University Categorization Engine</h1>
                  <p className=" text-lg">
                  Salisbury University Categorization Engine is a groundbreaking initiative designed to categorize academic research articles based on their abstract. 
                    Our goal is to create a easy to follow user interface to show the public what research is being done at Salisbury University.
                  </p>
                </div>
                {/* About the Project */}
                <div className="bg-card shadow-md rounded-lg p-4 sm:p-6 mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">About the Project</h2>
                  <p className="">
                    This project focuses on [insert details about what the project does or solves]. Whether youre interested in 
                    [specific area 1], [specific area 2], or just curious about how it works, youll find valuable insights here.
                  </p>
                </div>
                {/* How It Works */}
                <div className="bg-card shadow-md rounded-lg p-4 sm:p-6 mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">How It Works</h2>
                  <p className="">
                    We utilize [briefly mention technologies, tools, or methodologies]. By [highlight a key aspect of the workflow], 
                    we aim to deliver [mention the primary benefit or outcome].
                  </p>
                </div>
                {/* Call to Action */}
                <div className="bg-card shadow-md rounded-lg p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">Get Involved</h2>
                  <p className="">
                    Want to learn more or contribute to the project? Reach out to us, explore our work, and become part of this journey!
                    Together, we can make a difference.
                  </p>
                </div>
              </div>
            </main>
    </>
  );
}
