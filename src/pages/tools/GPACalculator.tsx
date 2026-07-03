import React, { useState } from 'react';
import { Icon } from '../../components/Icon';
import { ResultDisplay } from '../../components/ui/ResultDisplay';
import { useApp } from '../../context/AppContext';
import { GRADE_SCALES } from '../../constants';
import { Tool } from '../../types';

const tool: Tool = {
  id: 'gpa',
  name: 'GPA Calculator',
  description: 'Calculate your Grade Point Average based on course credits and grades',
  icon: 'graduation-cap',
  path: '/tools/gpa',
  category: 'Academics',
};

interface Course {
  id: string;
  name: string;
  credits: string;
  grade: string;
}

interface ToolLayoutProps {
  children: React.ReactNode;
  tool: Tool;
  onNavigate: (path: string) => void;
}

export function ToolLayout({ children, tool, onNavigate }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
        >
          <Icon name="chevron-right" size={16} className="rotate-180" />
          Back to Home
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/25">
            <Icon name={tool.icon as any} size={32} className="text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {tool.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
        </div>

        {children}
      </div>
    </div>
  );
}

export function GPACalculator({ onNavigate }: { onNavigate: (path: string) => void }) {
  const { addToHistory } = useApp();
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Mathematics', credits: '3', grade: 'A' },
    { id: '2', name: 'Physics', credits: '4', grade: 'B+' },
    { id: '3', name: '', credits: '', grade: '' },
  ]);
  const [result, setResult] = useState<{ gpa: string; totalCredits: number; totalPoints: number } | null>(null);

  const gradeOptions = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

  const getGradePoints = (grade: string): number => {
    const scale = GRADE_SCALES.standard.find(g => g.grade === grade);
    return scale?.points ?? 0;
  };

  const addCourse = () => {
    setCourses([...courses, { id: crypto.randomUUID(), name: '', credits: '', grade: '' }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(courses.map(c => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      if (course.credits && course.grade) {
        const credits = parseFloat(course.credits);
        const points = getGradePoints(course.grade);
        if (!isNaN(credits) && credits > 0) {
          totalPoints += credits * points;
          totalCredits += credits;
        }
      }
    });

    if (totalCredits > 0) {
      const gpa = totalPoints / totalCredits;
      setResult({ gpa: gpa.toFixed(2), totalCredits, totalPoints });
      addToHistory({
        toolId: tool.id,
        toolName: tool.name,
        input: { courses: courses.filter(c => c.credits && c.grade) },
        result: `GPA: ${gpa.toFixed(2)}`,
      });
    }
  };

  const reset = () => {
    setCourses([
      { id: '1', name: '', credits: '', grade: '' },
      { id: '2', name: '', credits: '', grade: '' },
      { id: '3', name: '', credits: '', grade: '' },
    ]);
    setResult(null);
  };

  return (
    <ToolLayout tool={tool} onNavigate={onNavigate}>
      <div className="card p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            <div className="col-span-4 sm:col-span-5">Course Name</div>
            <div className="col-span-2">Credits</div>
            <div className="col-span-4 sm:col-span-3">Grade</div>
            <div className="col-span-2"></div>
          </div>

          {courses.map((course, index) => (
            <div key={course.id} className="grid grid-cols-12 gap-4 items-center animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
              <div className="col-span-4 sm:col-span-5">
                <input
                  type="text"
                  value={course.name}
                  onChange={e => updateCourse(course.id, 'name', e.target.value)}
                  placeholder={`Course ${index + 1}`}
                  className="input-field text-sm"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  value={course.credits}
                  onChange={e => updateCourse(course.id, 'credits', e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.5"
                  className="input-field text-sm text-center"
                />
              </div>
              <div className="col-span-4 sm:col-span-3">
                <select
                  value={course.grade}
                  onChange={e => updateCourse(course.id, 'grade', e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="">Select</option>
                  {gradeOptions.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 flex justify-end">
                <button
                  onClick={() => removeCourse(course.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  disabled={courses.length <= 1}
                >
                  <Icon name="x" size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addCourse}
          className="mt-4 flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
          <Icon name="plus" size={18} />
          Add Course
        </button>

        <div className="flex gap-4 mt-6">
          <button onClick={calculate} className="btn-primary flex-1">
            Calculate GPA
          </button>
          <button onClick={reset} className="btn-secondary">
            Reset
          </button>
        </div>

        {result && (
          <ResultDisplay
            value={result.gpa}
            label="Your GPA"
            details={[
              { label: 'Total Credits', value: result.totalCredits },
              { label: 'Total Points', value: result.totalPoints.toFixed(2) },
            ]}
            onCopy={() => {}}
            onShare={() => {}}
          />
        )}
      </div>
    </ToolLayout>
  );
}