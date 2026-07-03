import React from 'react';
import { Icon } from '../Icon';
import { TOOLS } from '../../constants';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = TOOLS.slice(0, 4);
  const moreLinks = TOOLS.slice(4);

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                <Icon name="calculator" size={22} className="text-white" />
              </div>
              <span className="font-bold text-gray-900 dark:text-white">
                Student Tools Hub
              </span>
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Free online calculators for students. Calculate GPA, CGPA, percentage, age, marks, grades, and attendance instantly.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Popular Tools</h3>
            <ul className="space-y-2">
              {quickLinks.map(tool => (
                <li key={tool.id}>
                  <button
                    onClick={() => onNavigate(tool.path)}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {tool.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">More Tools</h3>
            <ul className="space-y-2">
              {moreLinks.map(tool => (
                <li key={tool.id}>
                  <button
                    onClick={() => onNavigate(tool.path)}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {tool.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('/privacy')}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} Student Tools Hub. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Made with ❤️ for students worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}