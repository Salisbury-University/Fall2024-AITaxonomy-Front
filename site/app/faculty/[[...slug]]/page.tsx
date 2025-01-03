import  clientPromise  from '@/lib/mongodb';
import Link from 'next/link';
import { Header } from "@/components/Header";




interface CrossrefFacultyDetails {
    /**
     * An interface representing details about an individual article.
     *
     * Attributes:
     *     tc_count (number): Total citation count for the article.
     *     faculty_members (string[]): List of faculty members associated with the article.
     *     faculty_affiliations (Record<string, string[]>): Mapping of faculty members to their affiliations.
     */
    name: string;
    tc_count: number;
    department_affiliations: string[];
    dois: string[];
    titles: string[];
    categories: string[];
    top_level_categories: string[];
    mid_level_categories: string[];
    low_level_categories: string[];
    category_urls: string[];
    top_category_urls: string[];
    mid_category_urls: string[];
    low_category_urls: string[];
    themes: string[];
    journal: string;
}

interface PageProps {
    params: Promise<{
        slug?: string[];
    }>;
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    const client = await clientPromise;

    

    const db = client.db('Site_Data'); // Replace with your actual DB name
    const collection = await db.collection('faculty_data')
    // Get the last element in the slug array or default to an empty string
    const slug: String = resolvedParams.slug ? resolvedParams.slug[resolvedParams.slug.length - 1] : '';

    
    const document = await collection.findOne({"_id": slug});

    if (!document) {
        return <h1>Faculty Not found</h1>
    }
    // Transform documents to CategoryInfo type
    const faculty: CrossrefFacultyDetails = {
      name: document.name,
      tc_count: document.tc_count,
      department_affiliations: document.department_affiliations,
      dois: document.dois,
      titles: document.titles,
      categories: document.categories,
      top_level_categories: document.top_level_categories,
      mid_level_categories: document.mid_level_categories,
      low_level_categories: document.low_level_categories,
      category_urls: document.category_urls,
      top_category_urls: document.top_category_urls,
      mid_category_urls: document.mid_category_urls,
      low_category_urls: document.low_category_urls,
      themes: document.themes,
      journal: document.journal,
    };
    return (
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
          <Header />
          <div className="container mx-auto text-center bg-white dark:bg-suMaroon">
              <h1 className="text-2xl font-bold text-suMaroon dark:text-white">Faculty</h1>
          </div>
  
          {/* Content */}
          <main className="container mx-auto py-8 px-4">
              <h2 className="text-xl font-semibold mb-4 text-suMaroon">{faculty.name}</h2>
  
              {/* Metadata */}
              <div className="mb-6">
                  <p className="text-gray-700 dark:text-gray-300">
                      <strong>Journal:</strong> {faculty.journal}
                  </p>
                  <h3>DOI: </h3>
                  <ul className="text-gray-700 dark:text-gray-300">
                    {faculty.dois.map((doi, index) => (
                      <li key={index}>
                        <Link
                            href={`https://doi.org/${doi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-suGold hover:underline"
                        >
                            {doi}
                        </Link>
                      </li>
                    ))}
                  </ul>
              </div>
  
              {/* Department Affiliations */}
              <section className="mb-6">
                  <h3 className="text-lg font-semibold text-suMaroon">Department Affiliations</h3>
                  <ul className="mt-2 list-disc list-inside">
                      {faculty.department_affiliations.map((affiliation, index) => (
                          <li key={index} className="text-gray-800 dark:text-gray-200">
                              {affiliation}
                          </li>
                      ))}
                  </ul>
              </section>
  
              {/* Themes */}
              <section className="mb-6">
                  <h3 className="text-lg font-semibold text-suMaroon">Themes</h3>
                  <ul className="mt-2 list-disc list-inside">
                      {faculty.themes.map((theme, index) => (
                          <li key={index} className="text-gray-800 dark:text-gray-200">
                              {theme}
                          </li>
                      ))}
                  </ul>
              </section>
  
              {/* Categories */}
              <section className="mb-6">
                  <h3 className="text-lg font-semibold text-suMaroon">Categories</h3>
                  <ul className="mt-2 list-disc list-inside">
                      {faculty.categories.map((category, index) => (
                          <li key={index}>
                              <Link
                                  href={`/categories/${faculty.category_urls[index]}`}
                                  className="text-black dark:text-suGold hover:underline"
                              >
                                  {category}
                              </Link>
                          </li>
                      ))}
                  </ul>
              </section>
          </main>
      </div>
  );
}
