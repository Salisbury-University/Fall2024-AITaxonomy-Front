import  clientPromise  from '@/lib/mongodb';
import { Category } from '@/components/category';
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Footer } from "@/components/Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Int32 } from 'mongodb';

interface CrossrefArticleDetails {
  /**
   * An interface representing details about an individual article.
   *
   * Attributes:
   *     tc_count (number): Total citation count for the article.
   *     faculty_members (string[]): List of faculty members associated with the article.
   *     faculty_affiliations (Record<string, string[]>): Mapping of faculty members to their affiliations.
   */
  title: string[];
  tc_count: number;
  faculty_members: string[];
  faculty_affiliations: Record<string, string>;
  abstract: string;
  date_published_print: string;
  journal: string;
  download_url: string;
  doi: string;
  themes: string[];
  categories: string[];
  category_urls: string[];
}

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
    url: string;
    category_name: string,
    faculty_count: number;
    department_count: number;
    article_count: number;
    faculty: string[];
    departments: string[];
    titles: string[];
    tc_count: number;
    citation_average: number;
    doi_list: string[];
    themes: string[]
    
}

interface CategoryPageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

interface doiProps {
  get_doi: string;
  avg: number;
}
interface Article {
  url: string;
  doi: string;
  tc_count: number;
}

async function get_most_cited(doiList: string[], avg: number) {
  const client = await clientPromise;
  const db = client.db('Site_Data'); // Replace with your actual DB name
  const collection = db.collection('article_data');

  // Fetch all articles matching the list of DOIs
  const articles = await collection.find({"url": { $in : doiList}}).toArray();
  if (articles.length === 0) {
    return null; // No articles found
  }

  // Find the most cited article (above average citations, if specified)
  let mostCited = articles[0];
  for (const article of articles) {
    if (
      article.tc_count > mostCited.tc_count ||
      (article.tc_count === mostCited.tc_count && doiList.indexOf(article.doi) < doiList.indexOf(mostCited.doi))
    ) {
      mostCited = article;
    }
  }
  
  return mostCited.title;
}


export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const slugArray = resolvedParams.slug ? resolvedParams.slug : [];
  // Determine the category level based on the number of slugs
  const [topLevelCategory, midLevelCategory, lowLevelCategory] = slugArray;

  // Display content based on the category level
  let title = '';
  if (lowLevelCategory) {
    title = topLevelCategory+"/"+midLevelCategory+"/"+lowLevelCategory;
  } else if (midLevelCategory) {
    title = topLevelCategory+"/"+midLevelCategory;
  } else if (topLevelCategory) {
    title = topLevelCategory;
  } else {
    title = 'Categories';
  }

  const client = await clientPromise;

  const db = client.db('Site_Data'); // Replace with your actual DB name
  const collection = await db.collection('category_data');
    
    // Query MongoDB for the field (e.g., "category_name")
  const results = await collection
  .find({}, { projection: { url: 1, _id: 0 } }) // Include "category_name" and exclude "_id"
  .toArray();

  // Extract the field values
  const categoryNames = results.map((doc) => doc.url);


  if(title != 'Categories'){
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
      <div className="min-w-full">
        <SidebarProvider className="">
            <AppSidebar categories={categoryNames}/>
            <div className="fixed top-0 left-0 z-50 p-2">
              <SidebarTrigger className="ml-1 bg-white dark:bg-black text-suGold dark:text-white rounded-md shadow-md" />
            </div>
            <SidebarInset>
            <Header/>
            <main className="bg-white dark:bg-black">
              
              <div className="ml-6 mt-2">
              
              {/* Breadcrumb Section */}
              <Breadcrumb className="flex-grow text-black dark:text-white">
              <BreadcrumbList className="flex gap-2 text-black dark:text-white">
                {slugArray.length > 0 ? (
                  slugArray.map((slug, index) => {
                    // Build the cumulative path dynamically
                    const cumulativePath = slugArray.slice(0, index + 1).join("/");

                    return (
                      <div key={index} className="flex items-center pb-2 pt-0">
                        <BreadcrumbItem className="hidden md:block flex items-center pr-1">
                          <BreadcrumbLink href={`/categories/${cumulativePath}`}>
                            {decodeURIComponent(slug)}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < slugArray.length - 1 && (
                          <BreadcrumbSeparator className="hidden md:block" />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage>No breadcrumbs available</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbList>
              </Breadcrumb>
              </div>
              <Category className="bg-white dark:bg-black" category={category}/>
            </main>
          </SidebarInset>
      </SidebarProvider>
      </div>
    );
  }else{
    
      // Get the last element in the slug array or default to an empty string
    const documents = await collection.find({}).toArray();


    if (documents.length === 0) return <p>Data not found</p>;
    // Transform documents to CategoryInfo type
    const categories: CategoryInfo [] = documents.map((document) => ({
        url: document.url,
        category_name: document.category_name,
        faculty_count: document.faculty_count,
        department_count: document.department_count,
        article_count: document.article_count,
        faculty: document.faculty,
        departments: document.departments,
        titles: document.titles,
        tc_count: document.tc_count,
        citation_average: document.citation_average,
        doi_list: document.doi_list,
        themes: document.themes
    
    }));

    

    return (
        <SidebarProvider>
          <AppSidebar categories={categoryNames}/>
            <div className="absolute top-0 left-0 z-50 p-2">
              <SidebarTrigger className="ml-1 bg-white dark:bg-black text-suGold dark:text-white rounded-md shadow-md" />
            </div>
          <SidebarInset>
            <Header/>
            <main className="bg-white dark:bg-black">
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                {categories.map((category, index) => (
                  <div key={index} className="flex flex-col justify-center items-center text-center aspect-square rounded-xl bg-muted/50 p-12" >
                    <h1 className="font-bold p-4">{category.category_name}</h1>
                    <div className="space-y-2">
                      <p>Faculty Count: {category.faculty_count}</p>
                      <p>Department Count: {category.department_count}</p>
                      <p>Article Count: {category.article_count}</p>
                      <p>Total Citations: {category.tc_count}</p>
                      <p>Citation Average: {Math.round(category.citation_average)}</p>
                      <p className="font-semibold text-xl">Most Cited Article</p>
                      <p className="font-semibold">{get_most_cited(category.doi_list, category.citation_average)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </main>
            <Footer/>
          </SidebarInset>
        </SidebarProvider>
    );
  }
}