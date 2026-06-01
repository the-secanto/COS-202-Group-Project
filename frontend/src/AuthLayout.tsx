import { type ReactNode } from 'react';
import { Link } from "react-router-dom";
import notebooks from "./assets/notebooks.jpg";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-sm rounded-md overflow-hidden min-h-[640px] border border-gray-100">
        {/* Left brand panel */}
        <div
          className="relative hidden md:flex flex-col justify-between p-12 text-white bg-indigo-600"
        >
          <img
            src={notebooks}
            alt=""
            aria-hidden="true"
            width={1024}
            height={1280}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="relative z-10">
            <p className="text-base font-medium tracking-tight">Curated thought.</p>
            <p className="mt-6 italic text-sm text-indigo-50 max-w-sm leading-relaxed">
              "Writing is the only way I have to explain things to myself."
            </p>
            <Link to="/" className="mt-3 block text-xs font-semibold tracking-[0.2em] text-indigo-200 no-underline hover:text-white transition-colors">
              MUSK EDITORIAL
            </Link>
          </div>
          <div className="relative z-10" />
        </div>

        {/* Right form panel */}
        <div className="flex flex-col items-center justify-center p-8 sm:p-12 lg:p-16 relative">
          <Link 
            to="/" 
            className="absolute top-6 right-8 text-xs font-medium text-gray-400 no-underline hover:text-gray-900 transition-colors flex items-center gap-1.5"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
