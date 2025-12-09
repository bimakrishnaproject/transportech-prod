'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useThemeStore } from '@/store/themeStore';
import { useFavoriteStore } from '@/store/favoriteStore';

export default function Header() {
  const { theme, toggleTheme } = useThemeStore();
  const { favorites } = useFavoriteStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header 
      className="sticky top-0 z-50 w-full backdrop-blur-md border-b transition-all duration-300 relative"
      style={{ 
        backgroundColor: 'var(--card-bg)', 
        borderColor: 'var(--border-subtle)',
        opacity: 0.98,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo - Refined typography */}
        <Link 
          href="/" 
          className="text-base font-medium transition-opacity hover:opacity-70"
          style={{ color: 'var(--foreground)', letterSpacing: '-0.01em' }}
          onClick={closeMenu}
        >
          Rick & Morty
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/"
            className="text-sm font-normal transition-opacity hover:opacity-70"
            style={{ color: 'var(--muted)' }}
          >
            Characters
          </Link>
          <Link
            href="/episodes"
            className="text-sm font-normal transition-opacity hover:opacity-70"
            style={{ color: 'var(--muted)' }}
          >
            Episodes
          </Link>
          <Link
            href="/favorites"
            className="text-sm font-normal transition-opacity hover:opacity-70 flex items-center gap-2"
            style={{ color: 'var(--muted)' }}
          >
            Favorites
            {favorites.length > 0 && (
              <span className="text-xs font-normal" style={{ color: 'var(--muted-light)' }}>
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Theme Toggle - Refined */}
          <button
            onClick={toggleTheme}
            className="p-2 transition-opacity hover:opacity-70"
            style={{ color: 'var(--muted)' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 transition-opacity hover:opacity-70"
            style={{ color: 'var(--muted)' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>
          
          <button
            onClick={toggleMenu}
            className="p-2 transition-opacity hover:opacity-70"
            style={{ color: 'var(--foreground)' }}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden border-t transition-all duration-300"
          style={{ 
            borderColor: 'var(--border-subtle)',
            backgroundColor: 'var(--card-bg)'
          }}
        >
          <nav className="flex flex-col py-4">
            <Link
              href="/"
              className="px-4 py-3 text-sm font-normal transition-opacity hover:opacity-70"
              style={{ color: 'var(--muted)' }}
              onClick={closeMenu}
            >
              Characters
            </Link>
            <Link
              href="/episodes"
              className="px-4 py-3 text-sm font-normal transition-opacity hover:opacity-70"
              style={{ color: 'var(--muted)' }}
              onClick={closeMenu}
            >
              Episodes
            </Link>
            <Link
              href="/favorites"
              className="px-4 py-3 text-sm font-normal transition-opacity hover:opacity-70 flex items-center gap-2"
              style={{ color: 'var(--muted)' }}
              onClick={closeMenu}
            >
              Favorites
              {favorites.length > 0 && (
                <span className="text-xs font-normal" style={{ color: 'var(--muted-light)' }}>
                  {favorites.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
