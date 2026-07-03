import React, { useState } from 'react';
import { Icon } from '../../components/Icon';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';

const tool: Tool = {
  id: 'marks',
  name: 'Marks Calculator',
  description: 'Calculate total marks, average marks, and percentage from multiple subjects',
  icon: 'file-text',
  path: '/tools/marks',
  category: 'Academics',
};

interface SubjectMark {
  id: string;
  name: string;
  obtained: string;
  maximum: string;
}

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

export function MarksCalculator({ onNavigate }: { onNavigate: (path: string) => void }) {
  const { addToHistory } = useApp();
  const [subjects, setSubjects] = useState<SubjectMark[]>([
    { id: '1', name: 'Mathematics', obtained: '85', maximum: '100' },
    { id: '2', name: 'Physics', obtained: '78', maximum: '100' },
    { id: '3', name: '', obtained: '', maximum: '' },
  ]);
  const [result, setResult] = useState<{
    totalObtained: number;
    totalMaximum: number;
    percentage: string;
    average: string;
    grade: string;
  } | null>(null);

  const { GRADE_SCALES } = require('../../../constants');

  const addSubject = () => {
    setSubjects([...subjects, { id: crypto.randomUUID(), name: '', obtained: '', maximum: '' }]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(s => s.id !== id));
    }
  };

  const updateSubject = (id: string, field: keyof SubjectMark, value: string) => {
    setSubjects(subjects.map(s => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const calculate = () => {
    let totalObtained = 0;
    let totalMaximum = 0;

    subjects.forEach(sub => {
      const obtained = parseFloat(sub.obtained);
      const maximum = parseFloat(sub.maximum);
      if (!isNaN(obtained) && !isNaN(maximum) && obtained >= 0 && maximum > 0) {
        totalObtained += obtained;
        totalMaximum += maximum;
      }
    });

    if (totalMaximum > 0) {
      const percentage = (totalObtained / totalMaximum) * 100;
      const average = totalObtained / subjects.filter(s => s.obtained && s.maximum).length;
      const grade = GRADE_SCALES.standard.find((g: any) => percentage >= g.min && percentage <= g.max);

      setResult({
        totalObtained,
        totalMaximum,
        percentage: percentage.toFixed(2),
        average: average.toFixed(2),
        grade: grade?.grade || 'F',
      });

      addToHistory({
        toolId: tool.id,
        toolName: tool.name,
        input: { subjects: subjects.filter(s => s.obtained && s.maximum) },
        result: `${percentage.toFixed(2)}% - Grade: ${grade?.grade || 'F'}`,
      });
    }
  };

  const reset = () => {
    setSubjects([
      { id: '1', name: '', obtained: '', maximum: '' },
      { id: '2', name: '', obtained: '', maximum: '' },
      { id: '3', name: '', obtained: '', maximum: '' },
    ]);
    setResult(null);
  };

  return (
    <ToolLayout tool={tool} onNavigate={onNavigate}>
      <div className="card p-6">
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          <div className="col-span-4 sm:col-span-5">Subject Name</div>
          <div className="col-span-3 sm:col-span-2">Obtained</div>
          <div className="col-span-3 sm:col-span-2">Maximum</div>
          <div className="col-span-2 sm:col-span-3"></div>
        </div>

        <div className="space-y-3">
          {subjects.map((sub, index) => (
            <div key={sub.id} className="grid grid-cols-12 gap-4 items-center animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <div className="col-span-4 sm:col-span-5">
                <input
                  type="text"
                  value={sub.name}
                  onChange={e => updateSubject(sub.id, 'name', e.target.value)}
                  placeholder={`Subject ${index + 1}`}
                  className="input-field text-sm"
                />
              </div>
              <div className="col-span-3 sm:col-span-2">
                <input
                  type="number"
                  value={sub.obtained}
                  onChange={e => updateSubject(sub.id, 'obtained', e.target.value)}
                  placeholder="0"
                  min="0"
                  className="input-field text-sm text-center"
                />
              </div>
              <div className="col-span-3 sm:col-span-2">
                <input
                  type="number"
                  value={sub.maximum}
                  onChange={e => updateSubject(sub.id, 'maximum', e.target.value)}
                  placeholder="100"
                  min="1"
                  className="input-field text-sm text-center"
                />
              </div>
              <div className="col-span-2 sm:col-span-3 flex justify-end">
                <button onClick={() => removeSubject(sub.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors" disabled={subjects.length <= 1}>
                  <Icon name="x" size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={addSubject} className="mt-4 flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
          <Icon name="plus" size={18} />
          Add Subject
        </button>

        <div className="flex gap-4 mt-6">
          <button onClick={calculate} className="btn-primary flex-1">Calculate Marks</button>
          <button onClick={reset} className="btn-secondary">Reset</button>
        </div>

        {result && (
          <div className="mt-8 animate-scale-in">
            <div className="card bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/30 border-none p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <p className="text-3xl font-bold gradient-text">{result.percentage}%</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Percentage</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{result.grade}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Grade</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{result.totalObtained}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Obtained</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{result.totalMaximum}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Maximum</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-600 dark:text-gray-400">Average per subject: <span className="font-bold text-gray-900 dark:text-white">{result.average}</span></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}