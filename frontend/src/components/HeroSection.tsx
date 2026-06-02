import { useEffect, useState } from 'react';

const tags = ['#Lifestyle', '#Digitalnomad', '#AdventureCapital'];

const words = ['best blogging', 'creative writing', 'modern content', 'story sharing'];

interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function HeroSection({ searchTerm, onSearchChange }: HeroSectionProps) {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mb-12 text-center">

      <p className="mb-5 text-4xl text-black font-bold">
        Your{' '}
        <span className="text-indigo-600 transition-all duration-300">
          {words[currentWord]}
        </span>{' '}
        platform
      </p>

      <div className="mx-auto mb-5 flex w-full max-w-xl items-center rounded-md border border-gray-200 px-3 py-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="mr-2 h-4 w-4 text-gray-400"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for stories, authors, or topics..."
          className="w-full border-none bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
        />
      </div>


      <p className="mb-3 text-lg uppercase tracking-wide font-bold text-black">
        Trending now
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500"
          >
            {tag}
          </span>
        ))}
      </div>

    </section>
  );
}