
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
                        <div className="flex justify-center items-center rounded-xl text-center bg-white dark:bg-suMaroon shadow-md row-span-1">
                            {/* <div className="mb-6">
                                <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Faculty Members</h2>
                                <div className="grid grid-flow-col auto-rows-max gap-x-4">
                                    {Array.from({ length: Math.ceil(category.faculty.length / 6) }, (_, columnIndex) => (
                                        <ul key={columnIndex} className="list-disc list-inside">
                                            {category.faculty
                                                .slice(columnIndex * 6, columnIndex * 6 + 6)
                                                .map((faculty, index) => (
                                                    <li key={index} className="text-base text-gray-700 dark:text-white">
                                                        {faculty}
                                                    </li>
                                            ))}
                                        </ul>
                                    ))}
                                </div>
                            </div> */}
                            <Carousel className="w-full max-w-xs md:m-10">
                                <CarouselContent>
                                    {Array.from({ length: category.departments.length / 10 }).map((_, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-5">
                                        <div className="rounded-lg bg-white dark:bg-suMaroon p-10 md:p-2">
                                            <h1 className="text-2xl font-semibold mb-2 text-black dark:text-white">Faculty</h1>
                                            <ul className="h-full w-full">
                                                {category.faculty.slice(index * 10, index * 10 + 10).map((faculty, index) => (
                                                    <li key={index} className="text-black dark:text-white">
                                                        { faculty }
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        </div>
                                    </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>

                        <div className=" grid md:grid-rows-subgrid md:row-span-2 max-w-lg rounded-xl bg-white dark:bg-suMaroon p-12 rounded-lg dark:border-white">
                                <Carousel className="w-full max-w-xs md:m-10 md:col-start-3">
                                    <CarouselContent>
                                        {Array.from({ length: category.themes.length / 10 }).map((_, index) => (
                                        <CarouselItem key={index}>
                                            <div className="p-5">
                                            <div className="rounded-lg bg-white dark:bg-suMaroon p-10 md:p-2">
                                                <h1 className="text-2xl font-semibold mb-2 text-black dark:text-white">Themes</h1>
                                                <ul className="list-disc h-full w-full">
                                                    {category.themes.slice(index * 10, index * 10 + 10).map((theme, index) => (
                                                        <li key={index} className="text-black dark:text-white">
                                                            {theme}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            </div>
                                        </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious />
                                    <CarouselNext />
                                </Carousel>
                                
                        </div>
                
            
            
                        <div className="flex justify-center items-center rounded-xl bg-white dark:bg-suMaroon p-4 overflow-scroll dark:border-white">
                            {/* <div className="rounded-lg bg-white dark:bg-suMaroon p-2">
                                <h1 className="text-2xl font-semibold text-black dark:text-white mb-4">Articles</h1>
                                <ul className="space-y-2 list-disc">
                                    {category.titles.map((title, index) => (
                                    <li key={index} className="text-black dark:text-white">
                                        
                                        <Link href={"/article/"+ category.doi_list[index].replace('/', '-')} className="hover:underline">
                                            { title }
                                        </Link>
                                    </li>
                                ))}
                                </ul>
                            </div> */}
                            <Carousel className="w-full max-w-xs md:m-10">
                                <CarouselContent>
                                    {Array.from({ length: category.titles.length / 10 }).map((_, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-5">
                                        <div className="rounded-lg bg-white dark:bg-suMaroon p-10 md:p-2">
                                            <h1 className="text-2xl font-semibold mb-2 text-black dark:text-white">Articles</h1>
                                            <ul className="list-disc h-full w-full">
                                                {category.titles.slice(index * 10, index * 10 + 10).map((title, index) => (
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
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>

                        <div className="flex justify-center items-center w-full h-auto p-4 rounded-xl bg-white dark:bg-suMaroon">


                            <Carousel className="w-full max-w-xs md:m-10">
                                <CarouselContent>
                                    {Array.from({ length: category.departments.length / 10 }).map((_, index) => (
                                    <CarouselItem key={index}>
                                        <div className="p-5">
                                        <div className="rounded-lg bg-white dark:bg-suMaroon p-10 md:p-2">
                                            <h1 className="text-2xl font-semibold mb-2 text-black dark:text-white">Departments</h1>
                                            <ul className="list-disc h-full w-full">
                                                {category.departments.slice(index * 10, index * 10 + 10).map((department, index) => {
                                                    if (department.toLowerCase().includes("salisbury university")) {
                                                        const trimmed = department.split(",")[0][0];
                                                        return (
                                                            <li key={index} className="text-black dark:text-white w-full">
                                                                {trimmed}
                                                            </li>
                                                        );
                                                    }
                                                    return null; // Skip rendering if the condition is not met
                                                })}
                                            </ul>
                                        </div>
                                        </div>
                                    </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>


            </div>
            </div>
        </div>
    );
}