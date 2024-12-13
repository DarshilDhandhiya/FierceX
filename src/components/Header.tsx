import React, { useEffect, useState } from 'react';
import { Camera, Moon, Sun } from 'lucide-react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { Category } from '../types';
import { usePhotoStore } from '../store/usePhotoStore';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const categories: Category[] = ['All', 'Sky', 'Mountain', 'City', 'Ocean', 'Forest'];

export const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode }) => {
  const { selectedCategory, setSelectedCategory } = usePhotoStore();
  const { scrollY } = useViewportScroll();
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]
  );
  const headerBackgroundDark = useTransform(
    scrollY,
    [0, 100],
    ["rgba(17, 24, 39, 0)", "rgba(17, 24, 39, 1)"]
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-10 backdrop-blur-lg shadow-sm transition-colors"
      style={{ backgroundColor: darkMode ? headerBackgroundDark : headerBackground }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Camera size={24} className="text-blue-500" />
            </motion.div>
            <h1 className="text-xl font-bold">PhotoVista</h1>
          </motion.div>

          <nav className={isMobile ? "hidden" : "flex space-x-4"}>
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {category}
              </motion.button>
            ))}
          </nav>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={onToggleDarkMode}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
          </motion.div>
        </div>

        {isMobile && (
          <div className="scroll-hidden -mx-4 overflow-x-auto pb-4">
            <div className="flex space-x-2 px-4">
              {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  </motion.header>
  );
};

export default Header;

