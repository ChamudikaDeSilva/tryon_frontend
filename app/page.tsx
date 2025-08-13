import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Navbar */}
      <nav className="flex justify-end items-center mb-8">
        <Link
          href="/register"
          className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex items-center gap-2"
          aria-label="Go to Register"
        >
          {/* Inline User Icon SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A8.966 8.966 0 0112 15a8.966 8.966 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="hidden sm:inline">Register</span>
        </Link>
      </nav>

      {/* Main content */}
      <main className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16">
       
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center mt-16">
        
      </footer>
    </div>
  );
}
