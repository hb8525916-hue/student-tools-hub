import React from 'react';
import { Icon } from '../components/Icon';
import { SearchBar } from '../components/ui/SearchBar';
import { ToolCard } from '../components/ui/ToolCard';
import { FAQSection } from '../components/ui/FAQ';
import { TOOLS, FAQS } from '../constants';
import { Tool } from '../types';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const handleToolSelect = (tool: Tool) => {
    onNavigate(tool.path);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-5 dark:opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
              Student Tools Hub
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in stagger-1" style={{ opacity: 0, animationFillMode: 'forwards' }}>
              Free online calculators for students. Fast, accurate, and easy to use.
            </p>

            <div className="animate-fade-in stagger-2" style={{ opacity: 0, animationFillMode: 'forwards' }}>
              <SearchBar tools={TOOLS} onToolSelect={handleToolSelect} />
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in stagger-3" style={{ opacity: 0, animationFillMode: 'forwards' }}>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Icon name="calculator" size={16} className="text-primary-500" />
                <span>7+ Calculators</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Icon name="check" size={16} className="text-green-500" />
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Icon name="clock" size={16} className="text-blue-500" />
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Choose Your Calculator
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Select from our collection of powerful student calculators
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TOOLS.map((tool, index) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onClick={() => handleToolSelect(tool)}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Why Choose Student Tools Hub?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Built for students, by students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Accurate Results', description: 'Precise calculations using standard formulas', icon: 'check' },
              { title: 'Easy to Use', description: 'Clean interface designed for simplicity', icon: 'calculator' },
              { title: 'Save History', description: 'Keep track of your past calculations', icon: 'history' },
              { title: 'Mobile Friendly', description: 'Works perfectly on all devices', icon: 'users' },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: 'forwards' }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                  <Icon name={feature.icon as any} size={28} className="text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQSection faqs={FAQS} />
        </div>
      </section>
    </div>
  );
}