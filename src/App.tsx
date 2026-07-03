import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { HistoryPage } from './pages/HistoryPage';
import { PercentageCalculator } from './pages/tools/PercentageCalculator';
import { GPACalculator } from './pages/tools/GPACalculator';
import { AgeCalculator } from './pages/tools/AgeCalculator';
import { CGPACalculator } from './pages/tools/CGPACalculator';
import { MarksCalculator } from './pages/tools/MarksCalculator';
import { GradeCalculator } from './pages/tools/GradeCalculator';
import { AttendanceCalculator } from './pages/tools/AttendanceCalculator';
import { TOOLS } from './constants';

function AppContent() {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={navigate} />;
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage onNavigate={navigate} />;
      case '/privacy':
        return <PrivacyPage onNavigate={navigate} />;
      case '/terms':
        return <TermsPage onNavigate={navigate} />;
      case '/history':
        return <HistoryPage onNavigate={navigate} />;
      case '/tools/percentage':
        return <PercentageCalculator onNavigate={navigate} allTools={TOOLS} />;
      case '/tools/gpa':
        return <GPACalculator onNavigate={navigate} />;
      case '/tools/age':
        return <AgeCalculator onNavigate={navigate} />;
      case '/tools/cgpa':
        return <CGPACalculator onNavigate={navigate} />;
      case '/tools/marks':
        return <MarksCalculator onNavigate={navigate} />;
      case '/tools/grade':
        return <GradeCalculator onNavigate={navigate} />;
      case '/tools/attendance':
        return <AttendanceCalculator onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header currentPath={currentPath} onNavigate={navigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={navigate} />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;