import Link from 'next/link';
import Image from 'next/image';
import { ModeToggle } from './theme-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

export function Header() {
  return (
    <header className="z-10 py-4 border-b sticky top-0 w-full bg-white dark:bg-suMaroon backdrop-filter backdrop-blur-md">
      <div className="max-w-4xl w-full flex items-center justify-between px-4 mx-auto">
        <Link href="/">
            <FontAwesomeIcon icon={ faGraduationCap } className="mr-2 h-8 w-8 text-white" />
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-white">
          <Link title="About" href="/#about" className="hover:underline">
            About
          </Link>
          <Link title="Publications" href="/#publications" className="hover:underline">
            Publications
          </Link>
          <Link title="Projects" href="/projects" className="hover:underline">
            Projects
          </Link>
          <Link title="Misc" href="/misc" className="hover:underline">
            Misc
          </Link>
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
