// Funciones utilitarias para el Quiz App

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function validateQuizData(data: any): boolean {
  if (!data || typeof data !== 'object') return false;
  if (!data.question || typeof data.question !== 'string') return false;
  if (!Array.isArray(data.options) || data.options.length !== 4) return false;
  if (typeof data.correctIndex !== 'number' || data.correctIndex < 0 || data.correctIndex > 3) return false;
  return true;
}

export class QuizError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'QuizError';
  }
}

export function handleQuizError(error: unknown): string {
  if (error instanceof QuizError) {
    return error.message;
  }
  if (error instanceof Error) {
    return `Error: ${error.message}`;
  }
  return 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.';
}
