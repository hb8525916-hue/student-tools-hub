import React from 'react';
import { Icon } from '../components/Icon';
import { useApp } from '../context/AppContext';

interface HistoryPageProps {
  onNavigate: (path: string) => void;
}

export function HistoryPage({ onNavigate }: HistoryPageProps) {
  const { history, clearHistory, removeFromHistory } = useApp();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => onNavigate('/')} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors">
          <Icon name="chevron-right" size={16} className="rotate-180" />
          Back to Home
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/25">
            <Icon name="history" size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculation History</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {history.length} calculations saved locally on your device
          </p>
        </div>

        {history.length > 0 ? (
          <>
            <div className="flex justify-end mb-4">
              <button onClick={clearHistory} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                <Icon name="trash" size={16} />
                Clear All
              </button>
            </div>

            <div className="space-y-3">
              {history.map((entry, index) => (
                <div key={entry.id} className="card p-4 animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                          {entry.toolName}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(entry.timestamp).toLocaleDateString()} {new Date(entry.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        Result: {entry.result}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Input: {JSON.stringify(entry.input).length > 100
                          ? JSON.stringify(entry.input).substring(0, 100) + '...'
                          : JSON.stringify(entry.input)}
                      </p>
                    </div>
                    <button onClick={() => removeFromHistory(entry.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <Icon name="x" size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="card p-12 text-center">
            <Icon name="history" size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No History Yet</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Start using calculators and save your results to see them here.
            </p>
            <button onClick={() => onNavigate('/')} className="btn-primary">
              Start Calculating
            </button>
          </div>
        )}
      </div>
    </div>
  );
}