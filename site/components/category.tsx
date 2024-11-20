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
        <div className="flex flex-col md:flex-row w-full h-full gap-10 min-w-full">
            {/* Center Content */}
            <div className=" flex-grow flex-1/2 p-4 overflow-y-auto bg-white dark:bg-suMaroon shadow-md rounded-lg">
                <div className="max-w-4xl mx-auto p-1">
                    <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">{category.category_name}</h1>
                    <p className="text-base text-gray-700 dark:text-white mb-2">Faculty Count: {category.faculty_count}</p>
                    <p className="text-base text-gray-700 dark:text-white mb-2">Department Count: {category.department_count}</p>
                    <p className="text-base text-gray-700 dark:text-white mb-2">Article Count: {category.article_count}</p>
                    <p className="text-base text-gray-700 dark:text-white mb-2">Total Citations: {category.tc_count}</p>
                    <p className="text-base text-gray-700 dark:text-white mb-2">Citation Average: {category.citation_average}</p>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">DOI List</h2>
                        <ul className="list-disc list-inside">
                            {category.doi_list.map((doi, index) => (
                                <li key={index} className="text-base text-gray-700 dark:text-white">
                                    {doi}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">Faculty List</h2>
                        <ul className="list-disc list-inside">
                            {category.faculty.map((faculty, index) => (
                                <li key={index} className="text-base text-gray-700 dark:text-white">
                                    {faculty}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                </div>
            </div>
            {/* Right Sidebar */}
            <div className="flex-grow flex-1/2 w-full md:w-1/3 h-full bg-white dark:bg-suMaroon p-4 rounded-lg overflow-scroll dark:border-white">
                <div className=" rounded-lg bg-white dark:bg-suMaroon p-2">
                    <h1 className="text-2xl font-semibold text-black dark:text-white">Articles</h1>
                    <ul className="list-disc h-full w-full">
                        {category.titles.map((title, index) => (
                            <li key={index} className="text-black dark:text-white">
                                <Link href={"/article/"+category.doi_list[index].replace('/', '-')}>
                                    {title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="rounded-lg bg-white dark:bg-suMaroon p-2">
                    <h1 className="text-2xl font-semibold mb-2 text-black dark:text-white">Departments</h1>
                    <ul className="list-disc h-full w-full">
                        {category.departments.map((department, index) => (
                            <li key={index} className="text-black dark:text-white">
                                {department}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className=" rounded-lg bg-white dark:bg-suMaroon p-2">
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
    );
}