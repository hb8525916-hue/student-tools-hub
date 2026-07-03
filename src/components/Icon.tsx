import {
  Percent,
  GraduationCap,
  Calendar,
  TrendingUp,
  FileText,
  Award,
  Users,
  Sun,
  Moon,
  Menu,
  X,
  Search,
  Copy,
  Share2,
  Save,
  Check,
  ChevronDown,
  ChevronRight,
  Trash2,
  History,
  Home,
  Info,
  Mail,
  Shield,
  FileQuestion,
  HelpCircle,
  Calculator,
  Clock,
  Plus,
} from 'lucide-react';

const iconMap = {
  percent: Percent,
  'graduation-cap': GraduationCap,
  calendar: Calendar,
  'trending-up': TrendingUp,
  'file-text': FileText,
  award: Award,
  users: Users,
  sun: Sun,
  moon: Moon,
  menu: Menu,
  x: X,
  search: Search,
  copy: Copy,
  share: Share2,
  save: Save,
  check: Check,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
  trash: Trash2,
  history: History,
  home: Home,
  info: Info,
  mail: Mail,
  shield: Shield,
  'file-question': FileQuestion,
  'help-circle': HelpCircle,
  calculator: Calculator,
  clock: Clock,
  plus: Plus,
};

interface IconProps {
  name: keyof typeof iconMap;
  size?: number;
  className?: string;
}

export function Icon({ name, size = 24, className = '' }: IconProps) {
  const IconComponent = iconMap[name];
  return <IconComponent size={size} className={className} />;
}