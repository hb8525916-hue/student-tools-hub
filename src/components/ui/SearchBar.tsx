import React, { useState, useRef, useEffect } from 'react';
import { Icon } from '../Icon';
import { Tool } from '../../types';

interface SearchBarProps {
  tools: Tool[];
  onToolSelect: (tool: Tool) => void;
}

export function SearchBar({ tools, onToolSelect }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim()) {
      const filtered = tools.filter(
        tool =>
          tool.name.toLowerCase().includes(query.toLowerCase()) ||
          tool.description.toLowerCase().includes(query.toLowerCase()) ||
          tool.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTools(filtered);
      setIsOpen(true);
    } else {
      setFilteredTools([]);
      setIsOpen(false);
    }
  }, [query, tools]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (tool: Tool) => {
    onToolSelect(tool);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Icon
          name="search"
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Search calculators..."
          className="input-field pl-12 pr-4 py-4 text-base shadow-lg"
        />
      </div>

      {isOpen && filteredTools.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-slide-down"
        >
          {filteredTools.map(tool => (
            <button
              key={tool.id}
              onClick={() => handleSelect(tool)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                <Icon name={tool.icon as any} size={20} className="text-primary-600 dark:text-primary-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 dark:text-white">{tool.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{tool.description}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                {tool.category}
              </span>
            </button>
          ))}
        </div>
      )}

      {isOpen && query && filteredTools.length === 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 text-center animate-slide-down"
        >
          <p className="text-gray-500 dark:text-gray-400">No calculators found for \"{query}\"</p>
        </div>
      )}
    </div>
  );
}