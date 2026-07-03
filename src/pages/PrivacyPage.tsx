import React from 'react';
import { Icon } from '../components/Icon';

interface PrivacyPageProps {
  onNavigate: (path: string) => void;
}

export function PrivacyPage({ onNavigate }: PrivacyPageProps) {
  const lastUpdated = 'June 24, 2026';

  const sections = [
    {
      title: 'Information We Collect',
      content: 'Student Tools Hub operates entirely in your browser. We do not collect, store, or transmit any personal information to our servers. All calculations are performed locally on your device.',
    },
    {
      title: 'Local Storage',
      content: 'We use your browser\'s local storage to save your calculation history and preferences (like dark mode settings). This data never leaves your device and can be cleared at any time through your browser settings or by using the "Clear History" feature.',
    },
    {
      title: 'Cookies',
      content: 'We use essential cookies to maintain your preferences (such as theme settings) and to improve your experience. These cookies are stored locally and are not used for tracking or advertising purposes.',
    },
    {
      title: 'Third-Party Services',
      content: 'We may use third-party analytics services (like Google Analytics) to understand how visitors use our site. These services collect anonymous, aggregated data only. We do not share any personal data with third parties.',
    },
    {
      title: 'Analytics & Performance',
      content: 'To improve our service, we may collect anonymous usage statistics such as page views, popular tools, and general traffic patterns. This data helps us understand which calculators are most useful and how we can improve.',
    },
    {
      title: 'Data Security',
      content: 'Since all calculations happen locally on your device, your data never travels across the internet. This approach ensures maximum privacy and security for your calculations.',
    },
    {
      title: 'Children\'s Privacy',
      content: 'Student Tools Hub is designed for students of all ages. We do not knowingly collect any personal information from children or adults. Our service is designed to be privacy-first, with no registration required.',
    },
    {
      title: 'Your Rights',
      content: 'You have complete control over your data. You can clear your calculation history at any time, and all your preferences are stored locally where you can delete them through your browser settings.',
    },
    {
      title: 'Changes to This Policy',
      content: 'We may update this privacy policy to reflect changes in our practices or for legal reasons. We will post any changes on this page and update the "Last Updated" date.',
    },
    {
      title: 'Contact Us',
      content: 'If you have questions about this privacy policy, please contact us at privacy@studenttoolshub.com or use our contact page.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => onNavigate('/')} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors">
          <Icon name="chevron-right" size={16} className="rotate-180" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/25">
            <Icon name="shield" size={32} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="text-gray-600 dark:text-gray-400">Last updated: {lastUpdated}</p>
        </div>

        <div className="card p-8 mb-8">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            At Student Tools Hub, we are committed to protecting your privacy. This policy explains how we handle information when you use our free online calculators.
          </p>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{section.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-8 bg-gradient-to-r from-primary-600 to-blue-500 text-white text-center">
          <Icon name="shield" size={40} className="mx-auto mb-4 opacity-80" />
          <h3 className="text-xl font-bold mb-2">Your Privacy Matters</h3>
          <p className="text-primary-100">
            We designed Student Tools Hub to respect your privacy. No accounts, no data collection, no tracking.
          </p>
        </div>
      </div>
    </div>
  );
}