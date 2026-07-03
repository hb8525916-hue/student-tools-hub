import React from 'react';
import { Icon } from '../Icon';
import { Tool } from '../../types';

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
  index: number;
}

export function ToolCard({ tool, onClick, index }: ToolCardProps) {
  return (
    <button
      onClick={onClick}
      className={`card card-hover p-6 text-left w-full group animate-fade-in stagger-${index + 1}`}
      style={{ opacity: 0, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-xl group-hover:shadow-primary-500/40 transition-all duration-300 group-hover:scale-110">
          <Icon name={tool.icon as any} size={28} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {tool.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {tool.description}
          </p>
          <span className="inline-block mt-2 px-2.5 py-1 text-xs font-medium rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
            {tool.category}
          </span>
        </div>
        <Icon
          name="chevron-right"
          size={20}
          className="text-gray-300 dark:text-gray-600 group-hover:text-primary-500 group-hover:translate-x-1 transition-all"
        />
      </div>
    </button>
  );
}