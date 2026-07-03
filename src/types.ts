export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  category: string;
}

export interface CalculationHistory {
  id: string;
  toolId: string;
  toolName: string;
  input: Record<string, unknown>;
  result: string;
  timestamp: Date;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CalculatorResult {
  value: number | string;
  label?: string;
  details?: Record<string, unknown>;
}