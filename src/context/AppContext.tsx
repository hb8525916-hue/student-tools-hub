import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CalculationHistory } from '../types';

interface AppContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
  history: CalculationHistory[];
  addToHistory: (entry: Omit<CalculationHistory, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [history, setHistory] = useState<CalculationHistory[]>(() => {
    const saved = localStorage.getItem('calculationHistory');
    if (saved) {
      return JSON.parse(saved, (key, value) => {
        if (key === 'timestamp') return new Date(value);
        return value;
      });
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('calculationHistory', JSON.stringify(history));
  }, [history]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addToHistory = (entry: Omit<CalculationHistory, 'id' | 'timestamp'>) => {
    const newEntry: CalculationHistory = {
      ...entry,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setHistory(prev => [newEntry, ...prev].slice(0, 50));
  };

  const clearHistory = () => setHistory([]);

  const removeFromHistory = (id: string) => {
    setHistory(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode, history, addToHistory, clearHistory, removeFromHistory }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}