import React from 'react';
import { Mail, Github, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <footer className="py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6 dark:text-white">Get in Touch</h2>
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="mailto:darshil.dhandhiya03@gmail.com"
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          >
            <Mail className="w-6 h-6 dark:text-white" />
          </a>
          <a
            href="https://github.com/DarshilDhandhiya"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          >
            <Github className="w-6 h-6 dark:text-white" />
          </a>
          <a
            href="https://www.instagram.com/wh3re.is.d/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          >
            <Instagram className="w-6 h-6 dark:text-white" />
          </a>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Let's work together to master the art of capturing your perfect moments.
        </p>

        <div className="text-xs text-center text-gray-600 dark:text-gray-400 mt-2">
          <p>© {new Date().getFullYear()} PhotoVista. All rights reserved.</p>
        </div>
      </div>

    </footer>
  );
};

export default Contact;