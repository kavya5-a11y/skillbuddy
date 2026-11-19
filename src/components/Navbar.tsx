import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type PageView = 'home' | 'details' | 'hub';

interface NavbarProps {
  activePage: PageView;
  enrolledCount: number;
  onNavigateHome: () => void;
  onNavigateCatalog: () => void;
  onNavigateHub: () => void;
}

export function Navbar({
  activePage,
  enrolledCount,
  onNavigateHome,
  onNavigateCatalog,
  onNavigateHub,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element brand wordmark */}
        <button
          type="button"
          onClick={() => handleLinkClick(onNavigateHome)}
          className="text-xl font-bold tracking-tight text-slate-900 hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 rounded"
        >
          Skill Buddy
        </button>

        {/* Zone 2: Concise single-line desktop nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          <button
            type="button"
            onClick={onNavigateHome}
            className={`py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
              activePage === 'home'
                ? 'text-emerald-700 border-emerald-600 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={onNavigateCatalog}
            className="py-2 border-b-2 border-transparent hover:text-slate-900 hover:border-slate-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            All Courses
          </button>
          <button
            type="button"
            onClick={onNavigateHub}
            className={`py-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
              activePage === 'hub'
                ? 'text-emerald-700 border-emerald-600 font-semibold'
                : 'border-transparent hover:text-slate-900 hover:border-slate-300'
            }`}
          >
            Learning Hub
          </button>
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleLinkClick(onNavigateHub)}
            className="hidden sm:inline-flex items-center justify-center min-h-[42px] px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <span className="tabular-nums">My Learning ({enrolledCount})</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Website Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          <button
            type="button"
            onClick={() => handleLinkClick(onNavigateHome)}
            className={`w-full min-h-[48px] px-4 rounded-xl text-left text-base font-medium transition-colors flex items-center justify-between cursor-pointer ${
              activePage === 'home'
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Home</span>
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick(onNavigateCatalog)}
            className="w-full min-h-[48px] px-4 rounded-xl text-left text-base font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between cursor-pointer"
          >
            <span>Browse All Courses</span>
          </button>
          <button
            type="button"
            onClick={() => handleLinkClick(onNavigateHub)}
            className={`w-full min-h-[48px] px-4 rounded-xl text-left text-base font-semibold transition-colors flex items-center justify-between cursor-pointer ${
              activePage === 'hub'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span>Learning Hub</span>
            <span className="text-sm tabular-nums">{enrolledCount} enrolled</span>
          </button>
        </div>
      )}
    </header>
  );
}
