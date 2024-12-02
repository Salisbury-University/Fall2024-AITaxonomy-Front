import { Header } from "@/components/Header";
import { CategoryFaculty } from "@/components/cat-faculty";
import { ArticleCategory } from "@/components/articles-pie";
import  clientPromise  from '@/lib/mongodb';
import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import ArticlesPerYearChart from "@/components/articles-per-year";

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
  departments: String[];
  titles: string[];
  tc_count: number;
  citation_average: number;
  doi_list: string[];
  themes: string[]
  
}

const perYearData = [
  { year: 2018, articles: 120 },
  { year: 2019, articles: 150 },
  { year: 2020, articles: 180 },
  { year: 2021, articles: 210 },
  { year: 2022, articles: 250 },
  { year: 2023, articles: 300 },
  { year: 2024, articles: 400 },
]

export default async function Page() {
  const client = await clientPromise;

  const db = client.db('Site_Data'); // Replace with your actual DB name
  const collection = await db.collection('category_data')
  // Get the last element in the slug array or default to an empty string
  const documents = await collection.find({}).toArray();

  const article_collection = await db.collection('article_data');

  
  const perYearData = [];
  for (let year = 2017; year <= 2024; year++) {
      const count = await article_collection.countDocuments({
          date_published_print: {
              $gte: `${year}-01-01`,
              $lt: `${year + 1}-01-01`,
          },
      });
      perYearData.push({ year: year, articles: count });
  }
  // Transform documents to CategoryInfo type
  const categories: CategoryInfo[] = documents.map((doc: any) => ({
    url: doc.url,
    category_name: doc.category_name,
    faculty_count: doc.faculty_count,
    department_count: doc.department_count,
    article_count: doc.article_count,
    faculty: doc.faculty,
    departments: doc.departments,
    titles: doc.titles,
    tc_count: doc.tc_count,
    citation_average: doc.citation_average,
    doi_list: doc.doi_list,
    themes: doc.themes,
  }));
  const chartData: { category: string; faculty: number }[] = categories.map((doc: CategoryInfo) =>({
    category: doc.category_name,
    faculty: doc.faculty_count
  }));

  const pieChart: {category: string; articles: number }[] = categories.map((doc: CategoryInfo) => ({
    category: doc.category_name,
    articles: doc.article_count
  }))

  const shuffleArray = (array: any) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };
  
  const newData = shuffleArray(chartData);

  return (
    <>
      <Header />

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div className="relative flex flex-col justify-center items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div className="w-full max-w-xs">
          <Carousel className="relative">
            <CarouselContent className="p-4">
              {Array.from({ length: Math.ceil(newData.length / 5) }).map((_, index) => (
                <CarouselItem key={index}>
                  <h1 className="text-lg font-semibold mb-2">Faculty Per Category</h1>
                  <CategoryFaculty data={newData.slice(index * 5, index * 5 + 5)} />
                </CarouselItem>
              ))}
            </CarouselContent>
          
          <div className="flex justify-between mt-4">
            <CarouselPrevious className="relative text-white rounded-full p-2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" />
            <CarouselNext className="relative text-white rounded-full p-2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" />
          </div>
          </Carousel>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <ArticlesPerYearChart chartData={perYearData} className="min-h-[250px] w-full" />
      </div>
    </div>

      
    </> 
  );
}
