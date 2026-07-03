import React, { useState } from 'react';
import { Icon } from '../../components/Icon';
import { useApp } from '../../context/AppContext';
import { GRADE_SCALES } from '../../constants';
import { Tool } from '../../types';

const tool: Tool = {
  id: 'grade',
  name: 'Grade Calculator',
  description: 'Convert your marks or percentage to equivalent grades using standard grading scales',
  icon: 'award',
  path: '/tools/grade',
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

export function GradeCalculator({ onNavigate }: { onNavigate: (path: string) => void }) {
  const { addToHistory } = useApp();
  const [mode, setMode] = useState<'percentage' | 'marks'>('percentage');
  const [percentage, setPercentage] = useState('');
  const [obtained, setObtained] = useState('');
  const [total, setTotal] = useState('');
  const [result, setResult] = useState<{
    grade: string;
    points: number;
    percentage: string;
    description: string;
  } | null>(null);

  const getGradeInfo = (percent: number) => {
    const gradeInfo = GRADE_SCALES.standard.find((g: any) => percent >= g.min && percent <= g.max);
    return gradeInfo || { grade: 'F', points: 0 };
  };

  const getDescription = (grade: string) => {
    const descriptions: Record<string, string> = {
      'A+': 'Outstanding Performance',
      'A': 'Excellent Performance',
      'A-': 'Very Good Performance',
      'B+': 'Good Performance',
      'B': 'Above Average Performance',
      'B-': 'Average Performance',
      'C+': 'Satisfactory Performance',
      'C': 'Acceptable Performance',
      'C-': 'Below Average Performance',
      'D+': 'Marginal Performance',
      'D': 'Passing Performance',
      'F': 'Failing Performance',
    };
    return descriptions[grade] || 'Unknown Grade';
  };

  const calculate = () => {
    let percent = 0;

    if (mode === 'percentage') {
      percent = parseFloat(percentage);
    } else {
      const obtainedVal = parseFloat(obtained);
      const totalVal = parseFloat(total);
      if (!isNaN(obtainedVal) && !isNaN(totalVal) && totalVal > 0) {
        percent = (obtainedVal / totalVal) * 100;
      }
    }

    if (!isNaN(percent) && percent >= 0 && percent <= 100) {
      const gradeInfo = getGradeInfo(percent);
      setResult({
        grade: gradeInfo.grade,
        points: gradeInfo.points,
        percentage: percent.toFixed(2),
        description: getDescription(gradeInfo.grade),
      });

      addToHistory({
        toolId: tool.id,
        toolName: tool.name,
        input: mode === 'percentage' ? { percentage } : { obtained, total },
        result: `${percent.toFixed(2)}% - Grade: ${gradeInfo.grade}`,
      });
    }
  };

  const reset = () => {
    setPercentage('');
    setObtained('');
    setTotal('');
    setResult(null);
  };

  return (
    <ToolLayout tool={tool} onNavigate={onNavigate}>
      <div className="card p-6">
        <div className="flex justify-center gap-4 mb-6">
          <button onClick={() => { setMode('percentage'); setResult(null); }} className={`px-6 py-3 rounded-xl font-medium transition-all ${mode === 'percentage' ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            From Percentage
          </button>
          <button onClick={() => { setMode('marks'); setResult(null); }} className={`px-6 py-3 rounded-xl font-medium transition-all ${mode === 'marks' ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
            From Marks
          </button>
        </div>

        {mode === 'percentage' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enter Percentage (0-100)</label>
            <div className="relative">
              <input
                type="number"
                value={percentage}
                onChange={e => setPercentage(e.target.value)}
                placeholder="Enter your percentage"
                min="0"
                max="100"
                step="0.01"
                className="input-field pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Obtained Marks</label>
              <input
                type="number"
                value={obtained}
                onChange={e => setObtained(e.target.value)}
                placeholder="Enter obtained marks"
                min="0"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Total Marks</label>
              <input
                type="number"
                value={total}
                onChange={e => setTotal(e.target.value)}
                placeholder="Enter total marks"
                min="1"
                className="input-field"
              />
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-6">
          <button onClick={calculate} className="btn-primary flex-1">Calculate Grade</button>
          <button onClick={reset} className="btn-secondary">Reset</button>
        </div>

        {result && (
          <div className="mt-8 animate-scale-in">
            <div className="card bg-gradient-to-br from-primary-50 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/30 border-none p-8 text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center">
                <span className="text-4xl font-bold gradient-text">{result.grade}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">{result.description}</h3>
              <div className="flex justify-center gap-8 mt-6">
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.percentage}%</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Percentage</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.points}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Grade Points</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Grading Scale</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {GRADE_SCALES.standard.map((g: any) => (
              <div key={g.grade} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">{g.grade}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{g.min}-{g.max}%</p>
                <p className="text-xs text-primary-600 dark:text-primary-400">{g.points} points</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}