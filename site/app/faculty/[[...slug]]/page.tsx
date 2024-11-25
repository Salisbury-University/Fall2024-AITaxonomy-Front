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
    const slug = resolvedParams.slug ? resolvedParams.slug[resolvedParams.slug.length - 1] : '';

    
    const documents = await collection.find({"_id": slug}).toArray();


    if (documents.length === 0) return <p>Data not found</p>;
    // Transform documents to CategoryInfo type
    const faculty: CrossrefFacultyDetails = {

      name: documents[0].name,
      tc_count: documents[0].tc_count,
      department_affiliations: documents[0].department_affiliations,
      dois: documents[0].dois,
      titles: documents[0].titles,
      categories: documents[0].categories,
      top_level_categories: documents[0].top_level_categories,
      mid_level_categories: documents[0].mid_level_categories,
      low_level_categories: documents[0].low_level_categories,
      category_urls: documents[0].category_urls,
      top_category_urls: documents[0].top_category_urls,
      mid_category_urls: documents[0].mid_category_urls,
      low_category_urls: documents[0].low_category_urls,
      themes: documents[0].themes,
      journal: documents[0].journal,
    };
    return (
      <div className="min-h-screen bg-suGray dark:bg-black text-black dark:text-white">
          <Header />
          <div className="container mx-auto text-center bg-suMaroon">
              <h1 className="text-2xl font-bold">Faculty</h1>
          </div>
  
          {/* Content */}
          <main className="container mx-auto py-8 px-4">
              <h2 className="text-xl font-semibold mb-4 text-suMaroon">{faculty.name}</h2>
  
              {/* Metadata */}
              <div className="mb-6">
                  <p className="text-gray-700 dark:text-gray-300">
                      <strong>Journal:</strong> {faculty.journal}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                      <strong>DOI:</strong>{' '}
                      <a
                          href={`https://doi.org/${faculty.dois[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-suGold hover:underline"
                      >
                          {faculty.dois[0]}
                      </a>
                  </p>
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
                                  className="text-suGold hover:underline"
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
