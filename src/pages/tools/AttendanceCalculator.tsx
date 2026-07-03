import React, { useState } from 'react';
import { Icon } from '../../components/Icon';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';

const tool: Tool = {
  id: 'attendance',
  name: 'Attendance Calculator',
  description: 'Calculate attendance percentage and track your attendance requirements',
  icon: 'users',
  path: '/tools/attendance',
  category: 'Academics',
};

function ToolLayout({ children, tool, onNavigate }: { children: React.ReactNode; tool: Tool; onNavigate: (path: string) => void }) {
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

export function AttendanceCalculator({ onNavigate }: { onNavigate: (path: string) => void }) {
  const { addToHistory } = useApp();
  const [mode, setMode] = useState<'percentage' | 'required'>('percentage');
  const [totalClasses, setTotalClasses] = useState('');
  const [attendedClasses, setAttendedClasses] = useState('');
  const [requiredPercentage, setRequiredPercentage] = useState('75');
  const [result, setResult] = useState<{
    percentage: string;
    status: string;
    canSkip?: number;
    needToAttend?: number;
    colorClass: string;
  } | null>(null);

  const calculate = () => {
    const total = parseInt(totalClasses);
    const attended = parseInt(attendedClasses);
    const reqPercent = parseFloat(requiredPercentage);

    if (isNaN(total) || isNaN(attended) || total <= 0 || attended < 0 || attended > total) {
      return;
    }

    const percentage = (attended / total) * 100;

    if (mode === 'percentage') {
      const isOnTrack = percentage >= reqPercent;
      let status = '';
      let colorClass = '';

      if (percentage >= reqPercent) {
        const canSkip = Math.floor((attended - (reqPercent / 100) * total) / (reqPercent / 100));
        status = `Great! You can skip ${canSkip} more classes and still maintain ${reqPercent}% attendance.`;
        colorClass = 'text-green-600 dark:text-green-400';
        setResult({
          percentage: percentage.toFixed(2),
          status,
          canSkip,
          colorClass,
        });
      } else {
        const needed = Math.ceil((reqPercent / 100 * total - attended) / (1 - reqPercent / 100));
        status = `You need to attend ${needed} more consecutive classes to reach ${reqPercent}% attendance.`;
        colorClass = 'text-red-600 dark:text-red-400';
        setResult({
          percentage: percentage.toFixed(2),
          status,
          needToAttend: needed,
          colorClass,
        });
      }

      addToHistory({
        toolId: tool.id,
        toolName: tool.name,
        input: { totalClasses, attendedClasses },
        result: `${percentage.toFixed(2)}%`,
      });
    } else {
      let status = '';
      let colorClass = '';

      if (percentage >= reqPercent) {
        const canSkip = Math.floor((attended - (reqPercent / 100) * total) / (reqPercent / 100));
        status = `You can skip ${canSkip} more classes.`;
        colorClass = 'text-green-600 dark:text-green-400';
      } else {
        const needed = Math.ceil((reqPercent / 100 * total - attended) / (1 - reqPercent / 100));
        status = `You need to attend ${needed} more classes consecutively.`;
        colorClass = 'text-red-600 dark:text-red-400';
      }

      setResult({ percentage: percentage.toFixed(2), status, colorClass });

      addToHistory({
        toolId: tool.id,
        toolName: tool.name,
        input: { totalClasses, attendedClasses, requiredPercentage },
        result: `${percentage.toFixed(2)}%`,
      });
    }
  };

  const reset = () => {
    setTotalClasses('');
    setAttendedClasses('');
    setRequiredPercentage('75');
    setResult(null);
  };

  return (
    <ToolLayout tool={tool} onNavigate={onNavigate}>
      <div className="card p-6">
        <div className="flex justify-center gap-4 mb-6">
          <button onClick={() => { setMode('percentage'); setResult(null); }} className={`px-6 py-3 rounded-xl font-medium transition-all ${mode === 'percentage' ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            Calculate Percentage
          </button>
          <button onClick={() => { setMode('required'); setResult(null); }} className={`px-6 py-3 rounded-xl font-medium transition-all ${mode === 'required' ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            Check Requirements
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Classes</label>
              <input
                type="number"
                value={totalClasses}
                onChange={e => setTotalClasses(e.target.value)}
                placeholder="Enter total classes"
                min="1"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attended Classes</label>
              <input
                type="number"
                value={attendedClasses}
                onChange={e => setAttendedClasses(e.target.value)}
                placeholder="Enter attended classes"
                min="0"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Required Attendance (%)</label>
            <input
              type="number"
              value={requiredPercentage}
              onChange={e => setRequiredPercentage(e.target.value)}
              placeholder="75"
              min="0"
              max="100"
              className="input-field"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button onClick={calculate} className="btn-primary flex-1">Calculate</button>
          <button onClick={reset} className="btn-secondary">Reset</button>
        </div>

        {result && (
          <div className="mt-8 animate-scale-in">
            <div className="card bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/30 border-none p-8 text-center">
              <div className="relative inline-block mb-6">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" fill="none" className="text-gray-200 dark:text-gray-700" strokeWidth="12" />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="12"
                    strokeLinecap="round"
                    className={parseFloat(result.percentage) >= parseFloat(requiredPercentage) ? 'text-green-500' : 'text-red-500'}
                    strokeDasharray={352}
                    strokeDashoffset={352 - (352 * parseFloat(result.percentage)) / 100}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{result.percentage}%</span>
                </div>
              </div>

              <p className={`text-lg font-medium mb-4 ${result.colorClass}`}>
                {result.status}
              </p>

              <div className="flex justify-center gap-6 text-sm">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{attendedClasses}/{totalClasses}</p>
                  <p className="text-gray-500 dark:text-gray-400">Classes Attended</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{requiredPercentage}%</p>
                  <p className="text-gray-500 dark:text-gray-400">Required</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}