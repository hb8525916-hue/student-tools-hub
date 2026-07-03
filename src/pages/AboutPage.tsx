import React from 'react';
import { Icon } from '../components/Icon';
import { TOOLS } from '../constants';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const stats = [
    { label: 'Calculators', value: '7+' },
    { label: 'Students Helped', value: '100K+' },
    { label: 'Countries', value: '50+' },
    { label: 'Calculations', value: '1M+' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => onNavigate('/')} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors">
          <Icon name="chevron-right" size={16} className="rotate-180" />
          Back to Home
        </button>

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/25">
            <Icon name="calculator" size={40} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">About Student Tools Hub</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your one-stop destination for free, accurate, and easy-to-use student calculators
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="card p-6 text-center">
              <p className="text-3xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Student Tools Hub was created with a simple mission: to provide students worldwide with free, reliable, and accurate calculation tools. We believe that every student deserves access to quality resources without having to pay for expensive software or navigate complex interfaces.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Our calculators are designed by educators and students who understand the real-world needs of academic life. Whether you're calculating your GPA, tracking attendance, or converting grades, our tools are here to help you succeed.
          </p>
        </div>

        {/* Features */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: '100% Free', description: 'All our calculators are completely free with no hidden fees or subscriptions.', icon: 'check' },
              { title: 'Always Accurate', description: 'Our calculations use standard formulas trusted by institutions worldwide.', icon: 'calculator' },
              { title: 'Privacy First', description: 'Your data stays on your device. We never store or share your calculations.', icon: 'shield' },
              { title: 'Mobile Friendly', description: 'Works perfectly on all devices - phones, tablets, and computers.', icon: 'users' },
              { title: 'Fast & Easy', description: 'Get instant results with our intuitive, user-friendly interface.', icon: 'clock' },
              { title: 'Save History', description: 'Keep track of past calculations locally on your device.', icon: 'history' },
            ].map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <Icon name={feature.icon as any} size={24} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Tools */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOOLS.map(tool => (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.path)}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <Icon name={tool.icon as any} size={24} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{tool.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="card bg-gradient-to-r from-primary-600 to-blue-500 p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Have Questions or Feedback?</h2>
          <p className="text-primary-100 mb-6">We'd love to hear from you. Reach out with suggestions, feedback, or just to say hello!</p>
          <button onClick={() => onNavigate('/contact')} className="bg-white text-primary-600 font-medium px-8 py-3 rounded-xl hover:bg-primary-50 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}