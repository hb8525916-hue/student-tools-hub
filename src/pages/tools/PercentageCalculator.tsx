import React, { useState, useEffect } from 'react';
import { Icon } from '../../components/Icon';
import { ResultDisplay } from '../../components/ui/ResultDisplay';
import { useApp } from '../../context/AppContext';
import { Tool } from '../../types';

const tool: Tool = {
  id: 'percentage',
  name: 'Percentage Calculator',
  description: 'Calculate percentages, percentage change, and percentage of numbers',
  icon: 'percent',
  path: '/tools/percentage',
  category: 'Mathematics',
};

interface RelatedToolsProps {
  tools: Tool[];
  currentToolId: string;
  onNavigate: (path: string) => void;
}

function RelatedTools({ tools, currentToolId, onNavigate }: RelatedToolsProps) {
  const related = tools.filter(t => t.id !== currentToolId).slice(0, 4);
  return (
    <div className="mt-12">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Related Tools</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {related.map(t => (
          <button
            key={t.id}
            onClick={() => onNavigate(t.path)}
            className="card p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
              <Icon name={t.icon as any} size={20} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900 dark:text-white">{t.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t.category}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

interface ToolLayoutProps {
  children: React.ReactNode;
  tool: Tool;
  onNavigate: (path: string) => void;
  allTools: Tool[];
}

function ToolLayout({ children, tool, onNavigate, allTools }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
        >
          <Icon name="chevron-right" size={16} className="rotate-180" />
          Back to Home
        </button>

        {/* Header */}
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

        <RelatedTools tools={allTools} currentToolId={tool.id} onNavigate={onNavigate} />
      </div>
    </div>
  );
}

export function PercentageCalculator({ onNavigate, allTools }: { onNavigate: (path: string) => void; allTools: Tool[] }) {
  const { addToHistory } = useApp();
  const [mode, setMode] = useState<'percent' | 'change' | 'of'>('percent');
  const [values, setValues] = useState({
    part: '',
    whole: '',
    percent: '',
    oldValue: '',
    newValue: '',
    number: '',
    percentage: '',
  });
  const [result, setResult] = useState<{ value: string; details?: { label: string; value: string }[] } | null>(null);

  const calculate = () => {
    if (mode === 'percent') {
      const part = parseFloat(values.part);
      const whole = parseFloat(values.whole);
      if (!isNaN(part) && !isNaN(whole) && whole !== 0) {
        const percent = (part / whole) * 100;
        setResult({
          value: `${percent.toFixed(2)}%`,
          details: [
            { label: 'Part', value: values.part },
            { label: 'Whole', value: values.whole },
          ],
        });
        addToHistory({
          toolId: tool.id,
          toolName: tool.name,
          input: { part, whole },
          result: `${percent.toFixed(2)}%`,
        });
      }
    } else if (mode === 'change') {
      const oldVal = parseFloat(values.oldValue);
      const newVal = parseFloat(values.newValue);
      if (!isNaN(oldVal) && !isNaN(newVal) && oldVal !== 0) {
        const change = ((newVal - oldVal) / oldVal) * 100;
        const changeType = change >= 0 ? 'increase' : 'decrease';
        setResult({
          value: `${Math.abs(change).toFixed(2)}% ${changeType}`,
          details: [
            { label: 'Old Value', value: values.oldValue },
            { label: 'New Value', value: values.newValue },
          ],
        });
        addToHistory({
          toolId: tool.id,
          toolName: tool.name,
          input: { oldValue: oldVal, newValue: newVal },
          result: `${Math.abs(change).toFixed(2)}% ${changeType}`,
        });
      }
    } else if (mode === 'of') {
      const number = parseFloat(values.number);
      const percent = parseFloat(values.percentage);
      if (!isNaN(number) && !isNaN(percent)) {
        const resultValue = (number * percent) / 100;
        setResult({
          value: resultValue.toFixed(2),
          details: [
            { label: 'Number', value: values.number },
            { label: 'Percentage', value: `${values.percentage}%` },
          ],
        });
        addToHistory({
          toolId: tool.id,
          toolName: tool.name,
          input: { number, percent },
          result: resultValue.toFixed(2),
        });
      }
    }
  };

  const reset = () => {
    setValues({
      part: '',
      whole: '',
      percent: '',
      oldValue: '',
      newValue: '',
      number: '',
      percentage: '',
    });
    setResult(null);
  };

  return (
    <ToolLayout tool={tool} onNavigate={onNavigate} allTools={allTools}>
      <div className="card p-6">
        {/* Mode selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'percent', label: 'What is X% of Y?' },
            { id: 'change', label: 'Percentage Change' },
            { id: 'of', label: 'X is what % of Y?' },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id as any);
                setResult(null);
              }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                mode === m.id
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          {mode === 'percent' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What percentage
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={values.percentage}
                    onChange={e => setValues({ ...values, percentage: e.target.value })}
                    placeholder="Enter percentage (e.g., 20)"
                    className="input-field pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  of
                </label>
                <input
                  type="number"
                  value={values.number}
                  onChange={e => setValues({ ...values, number: e.target.value })}
                  placeholder="Enter number (e.g., 500)"
                  className="input-field"
                />
              </div>
              {result && (
                <p className="text-center text-lg mt-4">
                  <span className="text-gray-600 dark:text-gray-400">Result: </span>
                  <span className="font-bold text-primary-600 dark:text-primary-400">
                    {(() => {
                      const number = parseFloat(values.number);
                      const percent = parseFloat(values.percentage);
                      if (!isNaN(number) && !isNaN(percent)) {
                        return ((number * percent) / 100).toFixed(2);
                      }
                      return '0';
                    })()}
                  </span>
                </p>
              )}
            </>
          )}

          {mode === 'change' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Old Value
                </label>
                <input
                  type="number"
                  value={values.oldValue}
                  onChange={e => setValues({ ...values, oldValue: e.target.value })}
                  placeholder="Enter old value"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Value
                </label>
                <input
                  type="number"
                  value={values.newValue}
                  onChange={e => setValues({ ...values, newValue: e.target.value })}
                  placeholder="Enter new value"
                  className="input-field"
                />
              </div>
            </>
          )}

          {mode === 'of' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Part Value
                </label>
                <input
                  type="number"
                  value={values.part}
                  onChange={e => setValues({ ...values, part: e.target.value })}
                  placeholder="Enter part value"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Whole Value
                </label>
                <input
                  type="number"
                  value={values.whole}
                  onChange={e => setValues({ ...values, whole: e.target.value })}
                  placeholder="Enter whole value"
                  className="input-field"
                />
              </div>
            </>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button onClick={calculate} className="btn-primary flex-1">
            Calculate
          </button>
          <button onClick={reset} className="btn-secondary">
            Reset
          </button>
        </div>

        {/* Result */}
        {result && mode !== 'percent' && (
          <ResultDisplay
            value={result.value}
            details={result.details}
            onCopy={() => {}}
            onShare={() => {}}
          />
        )}
      </div>
    </ToolLayout>
  );
}