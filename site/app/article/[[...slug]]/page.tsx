import  clientPromise  from '@/lib/mongodb';
import Link from 'next/link';
import { Header } from "@/components/Header";
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

interface PageProps {
    params: Promise<{
        slug?: string[];
    }>;
}

export default async function Page({ params }: PageProps) {
    const resolvedParams = await params;
    
    // Get the last element in the slug array or default to an empty string
    const slug = resolvedParams.slug ? resolvedParams.slug[resolvedParams.slug.length - 1] : '';

    if(slug){
      const client = await clientPromise;

      const db = client.db('Site_Data'); // Replace with your actual DB name
      const collection = await db.collection('article_data')
      const documents = await collection.find({'url': slug.replace('-', '/')}).toArray();


      if (documents.length === 0) return <p>Data not found</p>;
      // Transform documents to CategoryInfo type
      const article: CrossrefArticleDetails = {

          title: documents[0].title,
          tc_count: documents[0].tc_count,
          faculty_members: documents[0].faculty_members,
          faculty_affiliations: documents[0].faculty_affiliations,
          abstract: documents[0].abstract,
          date_published_print: documents[0].date_published_print,
          journal: documents[0].journal,
          download_url: documents[0].download_url,
          doi: documents[0].doi,
          themes:documents[0].themes,
          categories: documents[0].categories,
          category_urls: documents[0].category_urls,
      };
      return (
          <div className="min-h-screen bg-suGray dark:bg-black text-black dark:text-white">
          <Header/>
          <div className="container mx-auto text-center bg-suMaroon">
              <h1 className="text-2xl font-bold">Research Article</h1>
          </div>
    
          {/* Content */}
          <main className="container mx-auto py-8 px-4">
            <h2 className="text-xl font-semibold mb-4 text-suMaroon">{article.title[0]}</h2>
    
            {/* Metadata */}
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Published:</strong> {article.date_published_print || 'N/A'}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Journal:</strong> {article.journal}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>DOI:</strong>{' '}
                <a
                  href={`https://doi.org/${article.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-suGold hover:underline"
                >
                  {article.doi}
                </a>
              </p>
            </div>
    
            {/* Abstract */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-suMaroon">Abstract</h3>
              <p className="mt-2 text-gray-800 dark:text-gray-200">{article.abstract}</p>
            </section>
    
            {/* Faculty Members */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-suMaroon">Faculty Members</h3>
              <ul className="mt-2 list-disc list-inside">
                {article.faculty_members.map((faculty, index) => (
                  <li key={index} className="text-gray-800 dark:text-gray-200">
                    {faculty} -{' '}
                    <span className="text-gray-600 dark:text-gray-400">
                      {article.faculty_affiliations[faculty] || 'No affiliation'}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
    
            {/* Themes */}
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-suMaroon">Themes</h3>
              <ul className="mt-2 list-disc list-inside">
                {article.themes.map((theme, index) => (
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
                {article.categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      href={`/categories/${article.category_urls[index]}`}
                      className="text-suGold hover:underline"
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
    
            {/* Download Link */}
            <div>
              <a
                href={article.download_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-suMaroon text-suGold px-4 py-2 rounded-md hover:bg-suGold hover:text-suMaroon transition"
              >
                Download Article
              </a>
            </div>
          </main>
        </div>
      );
  }
  else{
    return <p>Article not found</p>;
  }
}
