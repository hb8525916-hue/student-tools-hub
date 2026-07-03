import React, { useState } from 'react';
import { Icon } from '../../components/Icon';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';

const tool: Tool = {
  id: 'cgpa',
  name: 'CGPA Calculator',
  description: 'Calculate your Cumulative Grade Point Average across multiple semesters',
  icon: 'trending-up',
  path: '/tools/cgpa',
  category: 'Academics',
};

interface Semester {
  id: string;
  name: string;
  gpa: string;
  credits: string;
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

export function CGPACalculator({ onNavigate }: { onNavigate: (path: string) => void }) {
  const { addToHistory } = useApp();
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: '1', name: 'Semester 1', gpa: '3.5', credits: '15' },
    { id: '2', name: 'Semester 2', gpa: '3.8', credits: '18' },
    { id: '3', name: '', gpa: '', credits: '' },
  ]);
  const [result, setResult] = useState<{ cgpa: string; totalCredits: number; semestersCount: number } | null>(null);

  const addSemester = () => {
    const nextNum = semesters.length + 1;
    setSemesters([...semesters, { id: crypto.randomUUID(), name: `Semester ${nextNum}`, gpa: '', credits: '' }]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(s => s.id !== id));
    }
  };

  const updateSemester = (id: string, field: keyof Semester, value: string) => {
    setSemesters(semesters.map(s => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    let validSemesters = 0;

    semesters.forEach(sem => {
      const gpa = parseFloat(sem.gpa);
      const credits = parseFloat(sem.credits);
      if (!isNaN(gpa) && !isNaN(credits) && gpa >= 0 && gpa <= 4 && credits > 0) {
        totalPoints += gpa * credits;
        totalCredits += credits;
        validSemesters++;
      }
    });

    if (totalCredits > 0) {
      const cgpa = totalPoints / totalCredits;
      setResult({ cgpa: cgpa.toFixed(2), totalCredits, semestersCount: validSemesters });
      addToHistory({
        toolId: tool.id,
        toolName: tool.name,
        input: { semesters: semesters.filter(s => s.gpa && s.credits) },
        result: `CGPA: ${cgpa.toFixed(2)}`,
      });
    }
  };

  const reset = () => {
    setSemesters([
      { id: '1', name: '', gpa: '', credits: '' },
      { id: '2', name: '', gpa: '', credits: '' },
      { id: '3', name: '', gpa: '', credits: '' },
    ]);
    setResult(null);
  };

  return (
    <ToolLayout tool={tool} onNavigate={onNavigate}>
      <div className="card p-6">
        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
          <div className="col-span-4">Semester Name</div>
          <div className="col-span-3">GPA (0-4)</div>
          <div className="col-span-3">Credits</div>
          <div className="col-span-2"></div>
        </div>

        <div className="space-y-3">
          {semesters.map((sem, index) => (
            <div key={sem.id} className="grid grid-cols-12 gap-4 items-center animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <div className="col-span-4">
                <input
                  type="text"
                  value={sem.name}
                  onChange={e => updateSemester(sem.id, 'name', e.target.value)}
                  placeholder={`Semester ${index + 1}`}
                  className="input-field text-sm"
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  value={sem.gpa}
                  onChange={e => updateSemester(sem.id, 'gpa', e.target.value)}
                  placeholder="0.0"
                  min="0"
                  max="4"
                  step="0.01"
                  className="input-field text-sm text-center"
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  value={sem.credits}
                  onChange={e => updateSemester(sem.id, 'credits', e.target.value)}
                  placeholder="0"
                  min="0"
                  className="input-field text-sm text-center"
                />
              </div>
              <div className="col-span-2 flex justify-end">
                <button onClick={() => removeSemester(sem.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors" disabled={semesters.length <= 1}>
                  <Icon name="x" size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button onClick={addSemester} className="mt-4 flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
          <Icon name="plus" size={18} />
          Add Semester
        </button>

        <div className="flex gap-4 mt-6">
          <button onClick={calculate} className="btn-primary flex-1">Calculate CGPA</button>
          <button onClick={reset} className="btn-secondary">Reset</button>
        </div>

        {result && (
          <div className="mt-8 animate-scale-in">
            <div className="card bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/30 border-none p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Your CGPA</h3>
              <p className="text-6xl font-bold gradient-text mb-6">{result.cgpa}</p>
              <div className="flex justify-center gap-8">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.totalCredits}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Credits</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.semestersCount}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Semesters</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}