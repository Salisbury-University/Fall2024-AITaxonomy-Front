import  clientPromise  from '@/lib/mongodb';
import { Category } from '@/components/category';
import { AppSidebar } from "@/components/app-sidebar";

import { ObjectId} from 'mongodb';
import { ThemeProvider } from "@/components/theme-provider";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";


interface CategoryInfo {
    /**
     * A TypeScript interface representing information about an academic category.
     *
     * Attributes:
     *     url (string): A URL-friendly version of the category name.
     *     faculty_count (number): The number of faculty members in this category.
     *     department_count (number): The number of departments in this category.
     *     article_count (number): The number of articles in this category.
     *     files (Set<string>): A set of file names associated with this category.
     *     faculty (Set<string>): A set of faculty names in this category.
     *     departments (Set<string>): A set of department names in this category.
     *     titles (Set<string>): A set of article titles in this category.
     *     tc_count (number): Total citation count for articles in this category.
     *     tc_list (number[]): A list of individual citation counts for articles.
     *     citation_average (number): The average number of citations per article.
     *     doi_list (Set<string>): A set of DOIs associated with this category.
     */
    url: String;
    category_name: String,
    faculty_count: number;
    department_count: number;
    article_count: number;
    faculty: String[];
    departments: String[];
    titles: String[];
    tc_count: number;
    citation_average: number;
    doi_list: String[];
    themes: String[]
    
}

interface CategoryPageProps {
  params: {
    slug?: string[];
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const slugArray = params?.slug ? params.slug : [];
  // Determine the category level based on the number of slugs
  const [topLevelCategory, midLevelCategory, lowLevelCategory] = slugArray;

  // Display content based on the category level
  let title = '';
  if (lowLevelCategory) {
    title = lowLevelCategory;
  } else if (midLevelCategory) {
    title = midLevelCategory;
  } else if (topLevelCategory) {
    title = topLevelCategory;
  } else {
    title = 'Categories';
  }

  if(title != 'Categories'){
    const client = await clientPromise;

    const db = client.db('Site_Data'); // Replace with your actual DB name
    const collection = await db.collection('category_data')
      // Get the last element in the slug array or default to an empty string
    const documents = await collection.find({"url": title}).toArray();


    if (documents.length === 0) return <p>Data not found</p>;
    // Transform documents to CategoryInfo type
    const category: CategoryInfo = {
        url: documents[0].url,
        category_name: documents[0].category_name,
        faculty_count: documents[0].faculty_count,
        department_count: documents[0].department_count,
        article_count: documents[0].article_count,
        faculty: documents[0].faculty,
        departments: documents[0].departments,
        titles: documents[0].titles,
        tc_count: documents[0].tc_count,
        citation_average: documents[0].citation_average,
        doi_list: documents[0].doi_list,
        themes: documents[0].themes
    
    };

    return (
        <SidebarProvider className="">
            <AppSidebar className=""/>
            <div className="top-0 left-0 p-1 h-10 text-white z-50 bg-white dark:bg-black">
                <SidebarTrigger className="ml-1" />
            </div>
            <SidebarInset>
            <main className="bg-white dark:bg-black">
              
              <div className="ml-6 mt-2">
              
              {/* Breadcrumb Section */}
              <Breadcrumb className="flex-grow text-black dark:text-white">
                <BreadcrumbList className="flex gap-2 text-black dark:text-white">
                      {slugArray.length > 0 ? (
                        slugArray.map((slug, index) => (
                          <>
                            <BreadcrumbItem key={index} className="hidden md:block flex items-center p-4 pt-0">
                              <BreadcrumbLink href="#">{decodeURIComponent(slug)}</BreadcrumbLink>
                              
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                          </>
                      ))
                  ) : (
                <BreadcrumbItem>
                  <BreadcrumbPage>No breadcrumbs available</BreadcrumbPage>
                </BreadcrumbItem>
                )}
                </BreadcrumbList>
              </Breadcrumb>
              </div>
              <Category className="bg-white dark:bg-suMaroon" category={category}/>
            </main>
          </SidebarInset>
      </SidebarProvider>
    );
  }else{
    return (
        <SidebarProvider className="bg-white dark:bg-suMaroon">
        <AppSidebar />
        <SidebarInset>
          <header className="flex sticky top-0 bg-white dark:bg-suMaroon h-16 shrink-0 items-center gap-2 border-b px-4 text-black dark:text-white">
            {/* Sidebar Trigger and Separator */}
            <div className="flex items-center gap-2">
              <SidebarTrigger className="ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
            </div>

        </header>

        <main className="bg-white dark:bg-black">

        
        <div className="flex flex-col md:flex-row w-full h-full">
                {/* Left Sidebar (Taxonomy) */}
                {/* Center Content */}
                <div className="flex-grow bg-white dark:bg-black p-4 overflow-y-auto">
                  <h1>Hello, Welcome to the Category Menu</h1>
                </div>

                {/* Right Sidebar */}
                <div className="w-full md:w-1/4 bg-white dark:bg-suMaroon p-4 overflow-y-auto rounded-lg">
                  <h2 className="text-lg font-semibold text-black dark:text-suGold">Right Sidebar</h2>
                  <p className="text-gray-700 dark:text-suGold">Additional content or filters can go here.</p>
                </div>
              </div>
        </main>
      </SidebarInset>
  </SidebarProvider>
    );
  }
}