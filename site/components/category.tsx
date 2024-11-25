
import Link from 'next/link';
import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

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

interface CategoryProps {
    className: string;
    category: CategoryInfo;
}

export function Category({ className, category }: CategoryProps) {
      

    return (
        <div className={"w-full"+className}>
        
         <h1 className="text-3xl font-bold mb-4 text-center text-black dark:text-white">{category.category_name}</h1>
         <div className="flex flex-col gap-4 h-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-min">
                    
                        {/* Center Content */}
                        
                        <div className="flex justify-center items-center rounded-xl p-4 overflow-y-auto bg-white dark:bg-suMaroon shadow-md text-center row-span-1">
                            <div className="max-w-4xl mx-auto p-1">
                                <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Statistics</h2>
                                <p className="text-base text-gray-700 dark:text-white mb-2">Faculty Count: {category.faculty_count}</p>
                                <p className="text-base text-gray-700 dark:text-white mb-2">Department Count: {category.department_count}</p>
                                <p className="text-base text-gray-700 dark:text-white mb-2">Article Count: {category.article_count}</p>
                                <p className="text-base text-gray-700 dark:text-white mb-2">Total Citations: {category.tc_count}</p>
                                <p className="text-base text-gray-700 dark:text-white mb-2">Citation Average: {category.citation_average}</p>
                            </div>
                        </div>
                        <div className="relative flex justify-center items-center rounded-xl text-center bg-white dark:bg-suMaroon shadow-md row-span-1">
                            {/* Constrain the carousel width for mobile and desktop */}
                            <Carousel className="relative w-full max-w-full md:max-w-xs m-5">
                                <CarouselContent>
                                {Array.from({ length: Math.ceil(category.faculty.length / 10) }).map((_, index) => (
                                    <CarouselItem key={index}>
                                    <div className="p-5">
                                        <div className="rounded-lg bg-white dark:bg-suMaroon p-4 md:p-2">
                                        <h1 className="text-xl md:text-2xl font-semibold mb-2 text-black dark:text-white">
                                            Faculty
                                        </h1>
                                        <ul className="space-y-1">
                                            {category.faculty
                                            .slice(index * 10, index * 10 + 10)
                                            .map((item, facIndex) => (
                                                <li key={facIndex} className="text-black dark:text-white">
                                                <Link
                                                    href={"/faculty/" + item.toLowerCase().replaceAll(" ", "-")}
                                                    className="hover:underline"
                                                >
                                                    {item}
                                                </Link>
                                                </li>
                                            ))}
                                        </ul>
                                        </div>
                                    </div>
                                    </CarouselItem>
                                ))}
                                </CarouselContent>

                                {/* Buttons */}
                                <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-white rounded-full p-2 md:p-3 bg-red-600 hover:bg-red-100 border-none hover:border-black" />
                                <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-white rounded-full p-2 md:p-3 bg-red-600 hover:bg-red-100 border-none hover:border-black"/>
                            </Carousel>
                            </div>



                            <div className="relative flex justify-center items-center rounded-xl text-center bg-white dark:bg-suMaroon p-4 md:p-12 dark:border-white">
                                <Carousel className="relative w-full max-w-full md:max-w-md m-5">
                                    <CarouselContent>
                                    {Array.from({ length: Math.ceil(category.themes.length / 10) }).map((_, index) => (
                                        <CarouselItem key={index}>
                                        <div className="p-4 md:p-5">
                                            <div className="rounded-lg bg-white dark:bg-suMaroon p-4 md:p-6">
                                            <h1 className="text-xl md:text-2xl font-semibold mb-2 text-black dark:text-white">
                                                Themes
                                            </h1>
                                            <ul className="space-y-1">
                                                {category.themes
                                                .slice(index * 10, index * 10 + 10)
                                                .map((theme, themeIndex) => (
                                                    <li key={themeIndex} className="text-black dark:text-white">
                                                    {theme}
                                                    </li>
                                                ))}
                                            </ul>
                                            </div>
                                        </div>
                                        </CarouselItem>
                                    ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-white rounded-full p-2 md:p-3 bg-red-600 hover:bg-red-100 border-none hover:border-black" />
                                <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-white rounded-full p-2 md:p-3 bg-red-600 hover:bg-red-100 border-none hover:border-black"/>
                                </Carousel>
                            </div>


                
            
            
                        <div className="relative flex justify-center items-center rounded-xl text-center bg-white dark:bg-suMaroon p-4 md:p-12 dark:border-white">
                            
                            <Carousel className="relative w-full max-w-full md:max-w-md m-5">
                                <CarouselContent>
                                    {Array.from({ length: Math.ceil(category.titles.length / 10) }).map((_, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-4 md:p-5">
                                        <div className="rounded-lg bg-white dark:bg-suMaroon p-4 md:p-6">
                                            <h1 className="text-xl md:text-2xl font-semibold mb-2 text-black dark:text-white">Articles</h1>
                                            <ul className="space-y-1">
                                                {category.titles.slice(index * 5, index * 5 + 5).map((title, index) => (
                                                    <li key={index} className="text-black dark:text-white">
                                        
                                                    <Link href={"/article/"+ category.doi_list[index].replace('/', '-')} className="hover:underline">
                                                        { title }
                                                    </Link>
                                                </li>
                                                ))}
                                            </ul>
                                        </div>
                                        </div>
                                    </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-white rounded-full p-2 md:p-3 bg-red-600 hover:bg-red-100 border-none hover:border-black" />
                                <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-white rounded-full p-2 md:p-3 bg-red-600 hover:bg-red-100 border-none hover:border-black"/>
                            </Carousel>
                        </div>

                        <div className="relative flex justify-center items-center rounded-xl bg-white dark:bg-suMaroon p-4 md:p-12 ">


                            <Carousel className="relative w-full max-w-full md:max-w-md m-5">
                                <CarouselContent>
                                    {Array.from({ length:  Math.ceil(category.departments.length / 10) }).map((_, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-4 md:p-5">
                                        <div className="rounded-lg bg-white dark:bg-suMaroon p-4 md:p-6">
                                            <h1 className="text-xl md:text-2xl font-semibold mb-2 text-black dark:text-white">Departments</h1>
                                            <ul className="space-y-1">
                                                {category.departments
                                                .filter(department => department.toLowerCase().includes("salisbury university"))
                                                .slice(index * 5, index * 5 + 5)
                                                .map((department, index) => {
                                                    const trimmed = department.split(",")[0];
                                                    return (
                                                        <li key={index} className="text-black dark:text-white">
                                                            {department}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                        </div>
                                    </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 text-white rounded-full p-2 md:p-3 bg-red-600 hover:bg-red-100 border-none hover:border-black" />
                                <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 text-white rounded-full p-2 md:p-3 bg-red-600 hover:bg-red-100 border-none hover:border-black"/>
                            </Carousel>
                        </div>


            </div>
            </div>
        </div>
    );
}