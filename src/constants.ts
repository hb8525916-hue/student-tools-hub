import { Tool, FAQ } from './types';

export const TOOLS: Tool[] = [
  {
    id: 'percentage',
    name: 'Percentage Calculator',
    description: 'Calculate percentages, percentage change, and percentage of numbers quickly and accurately.',
    icon: 'percent',
    path: '/tools/percentage',
    category: 'Mathematics',
  },
  {
    id: 'gpa',
    name: 'GPA Calculator',
    description: 'Calculate your Grade Point Average (GPA) based on course credits and grades.',
    icon: 'graduation-cap',
    path: '/tools/gpa',
    category: 'Academics',
  },
  {
    id: 'age',
    name: 'Age Calculator',
    description: 'Calculate your exact age in years, months, days, hours, and minutes from your birth date.',
    icon: 'calendar',
    path: '/tools/age',
    category: 'Utilities',
  },
  {
    id: 'cgpa',
    name: 'CGPA Calculator',
    description: 'Calculate your Cumulative Grade Point Average (CGPA) across multiple semesters.',
    icon: 'trending-up',
    path: '/tools/cgpa',
    category: 'Academics',
  },
  {
    id: 'marks',
    name: 'Marks Calculator',
    description: 'Calculate total marks, average marks, and percentage from multiple subjects.',
    icon: 'file-text',
    path: '/tools/marks',
    category: 'Academics',
  },
  {
    id: 'grade',
    name: 'Grade Calculator',
    description: 'Convert your marks or percentage to equivalent grades using standard grading scales.',
    icon: 'award',
    path: '/tools/grade',
    category: 'Academics',
  },
  {
    id: 'attendance',
    name: 'Attendance Calculator',
    description: 'Calculate attendance percentage and track your attendance requirements.',
    icon: 'users',
    path: '/tools/attendance',
    category: 'Academics',
  },
];

export const FAQS: FAQ[] = [
  {
    question: 'What is GPA and how is it calculated?',
    answer: 'GPA (Grade Point Average) is a standard way of measuring academic achievement. It\'s calculated by multiplying each course grade by its credit hours, summing these products, and dividing by total credit hours.',
  },
  {
    question: 'How do I calculate percentage of a number?',
    answer: 'To find a percentage of a number, multiply the number by the percentage and divide by 100. For example, 20% of 150 is (150 × 20) ÷ 100 = 30.',
  },
  {
    question: 'What is the difference between GPA and CGPA?',
    answer: 'GPA is calculated for a single semester, while CGPA (Cumulative GPA) is the average of GPA scores across multiple semesters or your entire academic program.',
  },
  {
    question: 'How is attendance percentage calculated?',
    answer: 'Attendance percentage is calculated by dividing the number of classes attended by the total number of classes held, then multiplying by 100.',
  },
  {
    question: 'Can I save my calculation results?',
    answer: 'Yes! Each calculator has a "Save to History" button that stores your calculations locally. You can view your history anytime and copy results to share.',
  },
  {
    question: 'Is Student Tools Hub free to use?',
    answer: 'Yes, all calculators on Student Tools Hub are completely free to use with no registration required.',
  },
  {
    question: 'How accurate are these calculators?',
    answer: 'Our calculators use precise mathematical formulas and are regularly tested for accuracy. Results are calculated instantly with high precision.',
  },
  {
    question: 'Can I use this site on my mobile phone?',
    answer: 'Yes! Student Tools Hub is fully responsive and works perfectly on all devices including smartphones, tablets, and desktop computers.',
  },
];

export const GRADE_SCALES = {
  standard: [
    { min: 90, max: 100, grade: 'A+', points: 4.0 },
    { min: 85, max: 89, grade: 'A', points: 4.0 },
    { min: 80, max: 84, grade: 'A-', points: 3.7 },
    { min: 77, max: 79, grade: 'B+', points: 3.3 },
    { min: 73, max: 76, grade: 'B', points: 3.0 },
    { min: 70, max: 72, grade: 'B-', points: 2.7 },
    { min: 67, max: 69, grade: 'C+', points: 2.3 },
    { min: 63, max: 66, grade: 'C', points: 2.0 },
    { min: 60, max: 62, grade: 'C-', points: 1.7 },
    { min: 55, max: 59, grade: 'D+', points: 1.3 },
    { min: 50, max: 54, grade: 'D', points: 1.0 },
    { min: 0, max: 49, grade: 'F', points: 0.0 },
  ],
};