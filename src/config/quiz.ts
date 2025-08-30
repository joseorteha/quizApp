// Configuración del Quiz App
export const QUIZ_CONFIG = {
  MAX_QUESTIONS: 10,
  MIN_QUESTIONS: 5,
  DIFFICULTY_LEVELS: ['fácil', 'medio', 'difícil'] as const,
  DEFAULT_CATEGORY: 'mixto' as const,
  FEEDBACK_DELAY: 1500, // ms
  AUTO_ADVANCE_DELAY: 3000, // ms
};

export const CATEGORY_DESCRIPTIONS = {
  'mixto': 'Una mezcla de todas las categorías disponibles',
  'programación': 'Preguntas sobre lenguajes de programación, frameworks y desarrollo',
  'historia': 'Eventos históricos, personajes y fechas importantes',
  'ciencia': 'Física, química, biología y ciencias naturales',
  'geografía': 'Países, capitales, ríos, montañas y geografía mundial',
  'arte': 'Pintura, escultura, artistas famosos y movimientos artísticos',
  'deportes': 'Deportes populares, atletas famosos y competiciones',
  'tecnología': 'Innovaciones tecnológicas, empresas y gadgets',
  'música': 'Artistas, géneros musicales e instrumentos',
  'cine': 'Películas, directores, actores y historia del cine',
  'literatura': 'Libros, autores y movimientos literarios'
} as const;

export const DIFFICULTY_PROMPTS = {
  'fácil': 'Genera preguntas básicas y de conocimiento general sobre',
  'medio': 'Genera preguntas de dificultad intermedia sobre',
  'difícil': 'Genera preguntas avanzadas y específicas sobre'
} as const;

export const SCORE_MESSAGES = {
  perfect: "🏆 ¡Perfecto! Eres un verdadero experto.",
  excellent: "⭐ ¡Excelente trabajo! Tienes un gran conocimiento.",
  good: "👍 ¡Buen trabajo! Sigues mejorando.",
  average: "📚 ¡No está mal! Hay espacio para mejorar.",
  needsWork: "💪 ¡Sigue practicando! Cada intento te hace mejor."
} as const;

export function getScoreMessage(score: number, total: number): string {
  const percentage = (score / total) * 100;
  
  if (percentage === 100) return SCORE_MESSAGES.perfect;
  if (percentage >= 80) return SCORE_MESSAGES.excellent;
  if (percentage >= 60) return SCORE_MESSAGES.good;
  if (percentage >= 40) return SCORE_MESSAGES.average;
  return SCORE_MESSAGES.needsWork;
}

export function getScoreColor(score: number, total: number): 'success' | 'info' | 'warning' | 'error' {
  const percentage = (score / total) * 100;
  
  if (percentage >= 80) return 'success';
  if (percentage >= 60) return 'info';
  if (percentage >= 40) return 'warning';
  return 'error';
}
