import React, { useState } from 'react';
import { Icon } from '../../components/Icon';
import { ResultDisplay } from '../../components/ui/ResultDisplay';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';

const tool: Tool = {
  id: 'age',
  name: 'Age Calculator',
  description: 'Calculate your exact age in years, months, days, hours, and minutes',
  icon: 'calendar',
  path: '/tools/age',
  category: 'Utilities',
};

interface ToolLayoutProps {
  children: React.ReactNode;
  tool: Tool;
  onNavigate: (path: string) => void;
}

function ToolLayout({ children, tool, onNavigate }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => onNavigate('/')} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors">
          <Icon name="chevron-right" size={16} className="rotate-180" />
          Back to Home
        </button>
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/25">
            <Icon name={tool.icon as any} size={32} className="text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">{tool.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export function AgeCalculator({ onNavigate }: { onNavigate: (path: string) => void }) {
  const { addToHistory } = useApp();
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    hours: number;
    minutes: number;
    nextBirthday: { days: number; months: number };
  } | null>(null);

  const calculate = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (birth > target) return;

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const hours = totalDays * 24;
    const minutes = hours * 60;

    // Next birthday
    let nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= target) {
      nextBirthday = new Date(target.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      hours,
      minutes,
      nextBirthday: { days: daysUntilBirthday, months: Math.floor(daysUntilBirthday / 30) },
    });

    addToHistory({
      toolId: tool.id,
      toolName: tool.name,
      input: { birthDate, targetDate },
      result: `${years} years, ${months} months, ${days} days`,
    });
  };

  const reset = () => {
    setBirthDate('');
    setTargetDate(new Date().toISOString().split('T')[0]);
    setResult(null);
  };

  return (
    <ToolLayout tool={tool} onNavigate={onNavigate}>
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
            <input
              type="date"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              className="input-field"
              max={targetDate}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Calculate Age On</label>
            <input
              type="date"
              value={targetDate}
              onChange={e => setTargetDate(e.target.value)}
              className="input-field"
              min={birthDate}
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button onClick={calculate} className="btn-primary flex-1">Calculate Age</button>
          <button onClick={reset} className="btn-secondary">Reset</button>
        </div>

        {result && (
          <div className="mt-8">
            <div className="card bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/30 border-none p-8">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 text-center mb-6">Your Age</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <p className="text-4xl font-bold gradient-text">{result.years}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Years</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <p className="text-4xl font-bold gradient-text">{result.months}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Months</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <p className="text-4xl font-bold gradient-text">{result.days}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Days</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                {[
                  { label: 'Total Days', value: result.totalDays.toLocaleString() },
                  { label: 'Total Weeks', value: result.totalWeeks.toLocaleString() },
                  { label: 'Total Months', value: result.totalMonths.toLocaleString() },
                  { label: 'Total Hours', value: result.hours.toLocaleString() },
                  { label: 'Total Minutes', value: result.minutes.toLocaleString() },
                ].map((item, i) => (
                  <div key={i} className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {result.nextBirthday.days > 0 && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
                <Icon name="calendar" size={20} className="inline-block text-green-600 dark:text-green-400 mr-2" />
                <span className="text-green-700 dark:text-green-300 font-medium">
                  Your next birthday is in {result.nextBirthday.months} months and {result.nextBirthday.days % 30} days!
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}