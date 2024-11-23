import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from './theme-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

export function Header() {
  return (

    <header className="py-4 border-b sticky top-0 w-full bg-white dark:bg-suMaroon text-black dark:text-white backdrop-filter backdrop-blur-md rounded-lg z-40">
      <div className="max-w-4xl w-full flex items-center justify-between px-4 mx-auto">
        <Link href="/categories">
            <FontAwesomeIcon icon={ faGraduationCap } className="mr-2 h-8 w-8 text-black dark:text-white" />
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-black dark:text-white">
          <Link title="Visualizations" href="/visualizations" className="hover:underline">
            Visualizations
          </Link>
          <Link title="Publications" href="/publications" className="hover:underline">
            Publications
          </Link>
          <Link title="Categories" href="/categories" className="hover:underline">
            Categories
          </Link>
          <Link title="Faculty" href="/faculty" className="hover:underline">
            Faculty
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
