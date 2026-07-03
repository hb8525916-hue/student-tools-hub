import React, { useState } from 'react';
import { Icon } from '../components/Icon';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => onNavigate('/')} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors">
          <Icon name="chevron-right" size={16} className="rotate-180" />
          Back to Home
        </button>

        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/25">
            <Icon name="mail" size={32} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Have a question, suggestion, or feedback? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <Icon name="mail" size={24} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Email Us</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">contact@studenttoolshub.com</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                  <Icon name="clock" size={24} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Response Time</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Within 24-48 hours</p>
                </div>
              </div>
            </div>

            <div className="card p-6 bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/30 border-none">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Follow Us</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Stay updated with new calculators and features!</p>
              <div className="flex gap-3">
                {['twitter', 'facebook', 'linkedin'].map((platform, i) => (
                  <button key={i} className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors shadow">
                    <Icon name="users" size={18} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Icon name="check" size={32} className="text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-gray-400">Thank you for reaching out. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="What's this about?"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us more..."
                      className="input-field resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 card p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Common Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: 'Is Student Tools Hub free to use?', a: 'Yes! All calculators are completely free with no hidden fees.' },
              { q: 'Do you store my calculation data?', a: 'No, all calculations are stored locally on your device for privacy.' },
              { q: 'Can I suggest a new calculator?', a: 'Absolutely! Use the form above to send us your suggestions.' },
              { q: 'How accurate are the calculations?', a: 'We use standard formulas trusted by educational institutions worldwide.' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">{item.q}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}