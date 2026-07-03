import React, { useState } from 'react';
import { Icon } from '../Icon';

interface ResultDisplayProps {
  value: string | number;
  label?: string;
  details?: { label: string; value: string | number }[];
  onCopy?: () => void;
  onShare?: () => void;
  onSave?: () => void;
}

export function ResultDisplay({ value, label, details, onCopy, onShare, onSave }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = details
      ? `${label}: ${value}\n${details.map(d => `${d.label}: ${d.value}`).join('\n')}`
      : `${label ? label + ': ' : ''}${value}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onCopy?.();
  };

  const handleShare = async () => {
    const text = details
      ? `${label}: ${value}\n${details.map(d => `${d.label}: ${d.value}`).join('\n')}`
      : `${label ? label + ': ' : ''}${value}`;
    if (navigator.share) {
      await navigator.share({ text });
    } else {
      handleCopy();
    }
    onShare?.();
  };

  return (
    <div className="animate-scale-in card p-6 mt-6">
      <div className="text-center mb-4">
        {label && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{label}</p>
        )}
        <p className="text-4xl font-bold gradient-text">{value}</p>
      </div>

      {details && details.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          {details.map((detail, index) => (
            <div key={index} className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">{detail.label}</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">{detail.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center gap-3 mt-4">
        {onCopy !== undefined && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <Icon name={copied ? 'check' : 'copy'} size={16} />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
        {onShare !== undefined && (
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <Icon name="share" size={16} />
            Share
          </button>
        )}
        {onSave && (
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <Icon name="save" size={16} />
            Save
          </button>
        )}
      </div>
    </div>
  );
}