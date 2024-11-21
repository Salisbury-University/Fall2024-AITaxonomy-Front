import Link from 'next/link';
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
        <div className="">
        <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">{category.category_name}</h1>
        <div className="flex flex-col md:flex-row">
        
            <div className="flex flex-grow flex-row md:flex-col gap-4 p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1 xl:grid-cols-2">
                    {/* Center Content */}
                    
                    <div className="rounded-xl p-4 overflow-y-auto bg-white dark:bg-suMaroon shadow-md">
                        <div className="max-w-4xl mx-auto p-1">
                            <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Statistics</h2>
                            <p className="text-base text-gray-700 dark:text-white mb-2">Faculty Count: {category.faculty_count}</p>
                            <p className="text-base text-gray-700 dark:text-white mb-2">Department Count: {category.department_count}</p>
                            <p className="text-base text-gray-700 dark:text-white mb-2">Article Count: {category.article_count}</p>
                            <p className="text-base text-gray-700 dark:text-white mb-2">Total Citations: {category.tc_count}</p>
                            <p className="text-base text-gray-700 dark:text-white mb-2">Citation Average: {category.citation_average}</p>
                        </div>
                    </div>
                    <div className="rounded-xl p-4 overflow-y-auto bg-white dark:bg-suMaroon shadow-md">
                        <div className="mb-6">
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
                        </div>
                    </div>

                    <div className="rounded-xl bg-white dark:bg-suMaroon p-4 overflow-scroll dark:border-white">
                        <div className="rounded-lg bg-white dark:bg-suMaroon p-2">
                            <h1 className="text-2xl font-semibold text-black dark:text-white mb-4">Articles</h1>
                            <ul className="space-y-2">
                                {category.titles.map((title, index) => (
                                <li key={index} className="text-black dark:text-white">
                                    <details className="group">
                                        <summary className="flex items-center cursor-pointer">
                                            <span className="mr-2 text-lg font-bold group-open:rotate-90 transform transition-transform">▸</span>
                                            <Link href={"/article/"+ category.doi_list[index].replace('/', '-')} className="hover:underline">
                                                { title }
                                            </Link>
                                        </summary>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 ml-6">
                                            DOI: { category.doi_list[index] }
                                        </p>
                                    </details>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </div>

                    <div className=" rounded-xl bg-white dark:bg-suMaroon p-4 rounded-lg overflow-scroll dark:border-white">
                        <div className="rounded-lg bg-white dark:bg-suMaroon p-2">
                            <h1 className="text-2xl font-semibold mb-2 text-black dark:text-white">Departments</h1>
                            <ul className="list-disc h-full w-full">
                                {category.departments.map((department, index) => {
                                    if (department.toLowerCase().includes("salisbury university")) {
                                        const trimmedText = department.split(",")[0]; // Extract text up to the first comma
                                        return (
                                            <li key={index} className="text-black dark:text-white">
                                                {trimmedText}
                                            </li>
                                        );
                                    }
                                    return null; // Skip rendering if the condition is not met
                                })}
                            </ul>
                        </div>
                    </div>

                
                </div>
            
            </div>
            <div className="flex-grow rounded-xl bg-white dark:bg-suMaroon p-4 rounded-lg overflow-y-scroll dark:border-white my-4">
                    <div className="rounded-lg bg-white dark:bg-suMaroon p-2">
                        <h1 className="text-2xl font-semibold mb-2 text-black dark:text-white">Themes</h1>
                        <ul className="list-disc h-full w-full">
                            {category.themes.map((theme, index) => (
                                <li key={index} className="text-black dark:text-white">
                                    {theme}
                                </li>
                            ))}
                        </ul>
                    </div>
            </div>
        </div>
        </div>
    );
}