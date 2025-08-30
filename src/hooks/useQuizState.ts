import { useState, useCallback } from 'react';
import { QuizQuestion } from '../utils/huggingface';
import { QUIZ_CONFIG } from '../config/quiz';

export type GameState = 'setup' | 'playing' | 'completed';
export type QuizCategory = 'mixto' | 'programación' | 'historia' | 'ciencia' | 'geografía' | 'arte' | 'deportes' | 'tecnología' | 'música' | 'cine' | 'literatura';

interface QuizState {
  gameState: GameState;
  selectedCategory: QuizCategory;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  selectedOptionIndex: number | null;
  score: number;
  loading: boolean;
  answerRevealed: boolean;
}

const initialState: QuizState = {
  gameState: 'setup',
  selectedCategory: 'mixto',
  questions: [],
  currentQuestionIndex: 0,
  selectedOptionIndex: null,
  score: 0,
  loading: false,
  answerRevealed: false,
};

export function useQuizState() {
  const [state, setState] = useState<QuizState>(initialState);

  const updateState = useCallback((updates: Partial<QuizState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const resetQuiz = useCallback(() => {
    setState(initialState);
  }, []);

  const nextQuestion = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      selectedOptionIndex: null,
      answerRevealed: false,
    }));
  }, []);

  const selectAnswer = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      selectedOptionIndex: index,
    }));
  }, []);

  const revealAnswer = useCallback((isCorrect: boolean) => {
    setState(prev => ({
      ...prev,
      answerRevealed: true,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  }, []);

  const completeQuiz = useCallback(() => {
    setState(prev => ({
      ...prev,
      gameState: 'completed',
    }));
  }, []);

  const startQuiz = useCallback((questions: QuizQuestion[], category: QuizCategory) => {
    setState(prev => ({
      ...prev,
      gameState: 'playing',
      questions,
      selectedCategory: category,
      currentQuestionIndex: 0,
      selectedOptionIndex: null,
      score: 0,
      answerRevealed: false,
    }));
  }, []);

  return {
    state,
    updateState,
    resetQuiz,
    nextQuestion,
    selectAnswer,
    revealAnswer,
    completeQuiz,
    startQuiz,
  };
}
