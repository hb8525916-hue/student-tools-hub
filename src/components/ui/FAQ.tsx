import React, { useState } from 'react';
import { Icon } from '../Icon';
import { FAQ } from '../../types';

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ faq, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="card overflow-hidden">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-white pr-4">{faq.question}</span>
        <Icon
          name="chevron-down"
          size={20}
          className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <p className="px-5 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Find answers to common questions about our tools
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}