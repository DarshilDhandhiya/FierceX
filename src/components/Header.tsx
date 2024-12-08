import React from 'react';
import { Camera, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { Category } from '../types';
import { usePhotoStore } from '../store/usePhotoStore';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const categories: Category[] = ['All', 'Sky', 'Mountain', 'City', 'Ocean', 'Forest'];

export const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  const { selectedCategory, setSelectedCategory } = usePhotoStore();

  return (
    <header className="sticky top-0 z-10 backdrop-blur-lg shadow-sm dark:bg-gray-900/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-7">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Camera size={24} className="text-blue-500" />
            </motion.div>
            <h1 className="text-xl font-bold">PhotoVista</h1>
          </div>

          <nav className="hidden space-x-4 md:flex">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={onToggleDarkMode}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="scroll-hidden -mx-4 overflow-x-auto pb-4 md:hidden">
          <div className="flex space-x-2 px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};