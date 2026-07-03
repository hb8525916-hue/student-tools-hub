import React from 'react';
import { Icon } from '../components/Icon';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export function TermsPage({ onNavigate }: TermsPageProps) {
  const lastUpdated = 'June 24, 2026';

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing and using Student Tools Hub, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, you must not use our services.',
    },
    {
      title: 'Description of Service',
      content: 'Student Tools Hub provides free online calculators for educational purposes. Our tools include GPA calculators, CGPA calculators, percentage calculators, age calculators, marks calculators, grade calculators, and attendance calculators. All services are provided "as is" and free of charge.',
    },
    {
      title: 'User Responsibilities',
      content: 'You agree to use Student Tools Hub only for lawful purposes. You are responsible for ensuring the accuracy of your inputs and understanding that the results are calculated based on standard formulas. Users should verify important calculations independently.',
    },
    {
      title: 'Accuracy of Results',
      content: 'While we strive to provide accurate calculations, Student Tools Hub should be used as a guide only. We do not guarantee the accuracy of results for all situations. Educational institutions may use different calculation methods. Always verify with your institution\'s official methods.',
    },
    {
      title: 'Intellectual Property',
      content: 'All content, features, and functionality of Student Tools Hub, including but not limited to text, graphics, logos, and software, are the property of Student Tools Hub and are protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without permission.',
    },
    {
      title: 'Disclaimer of Warranties',
      content: 'Student Tools Hub is provided "as is" without warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, error-free, or free of viruses or other harmful components.',
    },
    {
      title: 'Limitation of Liability',
      content: 'Student Tools Hub and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services. In no event shall our liability exceed any amount paid by you, if any, for accessing our services.',
    },
    {
      title: 'Changes to Services',
      content: 'We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice. We may also update the formulas or grading scales used by our calculators to reflect changes in educational standards.',
    },
    {
      title: 'User Data',
      content: 'All calculation data is stored locally on your device. We do not access, store, or transmit your calculation inputs or results. You are solely responsible for maintaining the confidentiality of any data you choose to save on your device.',
    },
    {
      title: 'Governing Law',
      content: 'These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from these terms shall be resolved in the appropriate courts.',
    },
    {
      title: 'Contact Information',
      content: 'For questions about these Terms of Service, please contact us at legal@studenttoolshub.com.',
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
            <Icon name="file-text" size={32} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Terms & Conditions</h1>
          <p className="text-gray-600 dark:text-gray-400">Last updated: {lastUpdated}</p>
        </div>

        <div className="card p-8 mb-8">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Welcome to Student Tools Hub. By using our website, you agree to the following terms and conditions. Please read them carefully.
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

        <div className="card p-8 bg-gray-100 dark:bg-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Questions?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            If you have any questions about these Terms & Conditions, please contact us before using our services.
          </p>
          <button onClick={() => onNavigate('/contact')} className="btn-primary">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}