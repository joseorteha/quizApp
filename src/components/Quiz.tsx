import React, { useState, useEffect } from 'react';
import Terminal, { TerminalLine, TerminalPrompt, TerminalOutput, TerminalInput } from './Terminal';
import { generateQuizFeedback, generateQuizSet, QUIZ_CATEGORIES, QuizQuestion } from '../utils/huggingface';

// Fallback para QUIZ_CATEGORIES si no se importa correctamente
const FALLBACK_CATEGORIES = [
  'programación',
  'historia',
  'ciencia',
  'geografía',
  'arte',
  'deportes',
  'tecnología',
  'música',
  'cine',
  'literatura'
] as const;

// Usar QUIZ_CATEGORIES si está disponible, sino usar fallback
const CATEGORIES = QUIZ_CATEGORIES || FALLBACK_CATEGORIES;

type GameState = 'setup' | 'playing' | 'completed';
type QuizCategory = (typeof CATEGORIES)[number] | 'mixto';

const Quiz: React.FC = () => {
  // Estados principales
  const [gameState, setGameState] = useState<GameState>('setup');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory>('mixto');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<React.ReactNode[]>([]);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [keyCounter, setKeyCounter] = useState(0);

  const MAX_QUESTIONS = 10;
  const currentQuestion = questions[currentQuestionIndex];

  // Función para generar preguntas dinámicamente
  const generateQuestions = async (category: QuizCategory) => {
    setLoading(true);
    try {
      let categories: string[] = [];
      
      if (category === 'mixto') {
        categories = [...CATEGORIES];
      } else {
        categories = [category];
      }
      
      console.log('Generando preguntas para categorías:', categories);
      
      // Mostrar mensaje de carga
      addToTerminalHistory(
        <TerminalLine>
          <TerminalOutput type="info">
            🤖 Generando preguntas con IA... Esto puede tomar unos segundos.
          </TerminalOutput>
        </TerminalLine>
      );
      
      const generatedQuestions = await generateQuizSet(MAX_QUESTIONS, categories);
      setQuestions(generatedQuestions);
      setGameState('playing');
      
      // Limpiar terminal y mostrar primera pregunta
      clearTerminalAndShowQuestion(0, generatedQuestions[0]);
      
    } catch (error) {
      console.error('Error generando preguntas:', error);
      addToTerminalHistory(
        <>
          <TerminalLine>
            <TerminalOutput type="error">
              ❌ Error al generar preguntas dinámicas.
            </TerminalOutput>
          </TerminalLine>
          <TerminalLine>
            <TerminalOutput type="warning">
              🔄 Usando preguntas predefinidas como respaldo.
            </TerminalOutput>
          </TerminalLine>
        </>
      );
      
      // Intentar con preguntas de fallback
      try {
        let fallbackCategories: string[] = [];
        if (category === 'mixto') {
          fallbackCategories = [...CATEGORIES];
        } else {
          fallbackCategories = [category];
        }
        
        const fallbackQuestions = await generateQuizSet(MAX_QUESTIONS, fallbackCategories);
        setQuestions(fallbackQuestions);
        setGameState('playing');
        clearTerminalAndShowQuestion(0, fallbackQuestions[0]);
      } catch (fallbackError) {
        addToTerminalHistory(
          <TerminalLine>
            <TerminalOutput type="error">
              💥 Error crítico. Por favor, recarga la página.
            </TerminalOutput>
          </TerminalLine>
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para limpiar terminal y mostrar nueva pregunta
  const clearTerminalAndShowQuestion = (questionIndex: number, question: QuizQuestion) => {
    setTerminalHistory([]);
    setKeyCounter(0);
    
    addToTerminalHistory(
      <>
        <TerminalLine>
          <TerminalOutput type="info">
            Pregunta {questionIndex + 1} de {MAX_QUESTIONS}
          </TerminalOutput>
        </TerminalLine>
        <TerminalLine>
          <TerminalOutput>
            <div className="quiz-question">{question.question}</div>
          </TerminalOutput>
        </TerminalLine>
      </>
    );
  };

  // Función para manejar selección de respuesta
  const handleOptionSelect = async (index: number) => {
    if (selectedOptionIndex !== null || loading || !currentQuestion) return;
    
    setSelectedOptionIndex(index);
    setLoading(true);
    
    const correctIndex = currentQuestion.correctIndex || 0;
    const isCorrect = index === correctIndex;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    try {
      // Generar feedback con GPT-2
      const aiFeedback = await generateQuizFeedback(
        currentQuestion.question,
        currentQuestion.options[index],
        currentQuestion.options
      );
      
      // Agregar resultado a la historia del terminal
      addToTerminalHistory(
        <>
          <TerminalLine>
            <TerminalPrompt text=">" />
            <TerminalOutput>Seleccionaste: {currentQuestion.options[index]}</TerminalOutput>
          </TerminalLine>
          <TerminalLine>
            <TerminalOutput type={isCorrect ? 'success' : 'error'}>
              {isCorrect ? '¡Correcto!' : `Incorrecto. La respuesta correcta es: ${currentQuestion.options[correctIndex]}`}
            </TerminalOutput>
          </TerminalLine>
          <TerminalLine>
            <TerminalOutput type="info">{aiFeedback}</TerminalOutput>
          </TerminalLine>
        </>
      );
      
      setAnswerRevealed(true);
      
    } catch (error) {
      console.error('Error al generar feedback:', error);
      addToTerminalHistory(
        <>
          <TerminalLine>
            <TerminalPrompt text=">" />
            <TerminalOutput>Seleccionaste: {currentQuestion.options[index]}</TerminalOutput>
          </TerminalLine>
          <TerminalLine>
            <TerminalOutput type={isCorrect ? 'success' : 'error'}>
              {isCorrect ? '¡Correcto!' : `Incorrecto. La respuesta correcta es: ${currentQuestion.options[correctIndex]}`}
            </TerminalOutput>
          </TerminalLine>
          <TerminalLine>
            <TerminalOutput type="error">
              No se pudo generar explicación. Intenta de nuevo.
            </TerminalOutput>
          </TerminalLine>
        </>
      );
    } finally {
      setLoading(false);
    }
  };

  // Función para ir a la siguiente pregunta
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Ir a la siguiente pregunta
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedOptionIndex(null);
      setAnswerRevealed(false);
      
      // Limpiar terminal y mostrar nueva pregunta
      clearTerminalAndShowQuestion(nextIndex, questions[nextIndex]);
    } else {
      // Completar quiz
      setGameState('completed');
      setTerminalHistory([]);
      
      addToTerminalHistory(
        <>
          <TerminalLine>
            <TerminalOutput type="success">
              🎉 ¡Quiz completado! 🎉
            </TerminalOutput>
          </TerminalLine>
          <TerminalLine>
            <TerminalOutput type="info">
              Tu puntuación final: {score} de {MAX_QUESTIONS} ({Math.round((score / MAX_QUESTIONS) * 100)}%)
            </TerminalOutput>
          </TerminalLine>
          <TerminalLine>
            <TerminalOutput>
              {score === MAX_QUESTIONS 
                ? "¡Perfecto! Eres un experto." 
                : score >= MAX_QUESTIONS * 0.8 
                ? "¡Excelente trabajo!" 
                : score >= MAX_QUESTIONS * 0.6 
                ? "¡Buen trabajo!" 
                : "¡Sigue practicando!"}
            </TerminalOutput>
          </TerminalLine>
        </>
      );
    }
  };

  // Función para reiniciar el quiz
  const resetQuiz = () => {
    setGameState('setup');
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setAnswerRevealed(false);
    setQuestions([]);
    setTerminalHistory([]);
    setKeyCounter(0);
  };

  // Función para agregar contenido al historial del terminal
  const addToTerminalHistory = (content: React.ReactNode) => {
    setTerminalHistory(prev => {
      const newKey = prev.length; // Usar la longitud actual como key única
      return [...prev, <React.Fragment key={`terminal-entry-${Date.now()}-${newKey}`}>{content}</React.Fragment>];
    });
  };

  // Inicializar el terminal con mensaje de bienvenida
  useEffect(() => {
    if (gameState === 'setup') {
      setTerminalHistory([]);
      addToTerminalHistory(
        <>
          <TerminalLine>
            <TerminalOutput type="info">
              🎯 Bienvenido al Quiz Terminal Dinámico 🎯
            </TerminalOutput>
          </TerminalLine>
          <TerminalLine>
            <TerminalOutput>
              Selecciona una categoría para comenzar el quiz de {MAX_QUESTIONS} preguntas.
            </TerminalOutput>
          </TerminalLine>
          <TerminalLine>
            <TerminalOutput type="warning">
              Las preguntas se generan dinámicamente usando IA (GPT-2).
            </TerminalOutput>
          </TerminalLine>
        </>
      );
    }
  }, [gameState]);

  // Renderizar interfaz según el estado del juego
  const renderGameContent = () => {
    switch (gameState) {
      case 'setup':
        return (
          <div className="quiz-setup">
            <div className="quiz-categories">
              <div className="quiz-category-title">
                <TerminalOutput type="info">Selecciona una categoría:</TerminalOutput>
              </div>
              
              <div className="quiz-category-grid">
                <div 
                  className={`quiz-category-option ${selectedCategory === 'mixto' ? 'selected' : ''}`}
                  onClick={() => setSelectedCategory('mixto')}
                >
                  <span>🎲</span> Mixto (Todas las categorías)
                </div>
                
                {CATEGORIES && CATEGORIES.map((category) => (
                  <div
                    key={category}
                    className={`quiz-category-option ${selectedCategory === category ? 'selected' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <span>{getCategoryEmoji(category)}</span> {category.charAt(0).toUpperCase() + category.slice(1)}
                  </div>
                ))}
              </div>
              
              <div className="quiz-controls">
                <button
                  className="quiz-button quiz-button-primary"
                  onClick={() => generateQuestions(selectedCategory)}
                  disabled={loading}
                >
                  {loading ? 'Generando preguntas...' : `Comenzar Quiz (${selectedCategory})`}
                </button>
                
                <button
                  className="quiz-button"
                  onClick={async () => {
                    console.log('🧪 Testing Google Gemini API...');
                    try {
                      const response = await fetch('/api/gemini', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          prompt: 'Genera una pregunta simple de geografía sobre capitales',
                          maxTokens: 100,
                          temperature: 0.7
                        })
                      });
                      const result = await response.json();
                      
                      if (result.success) {
                        alert(`✅ Google Gemini funciona perfectamente!\n\nModelo: ${result.model}\nProveedor: ${result.provider}\n\nRespuesta:\n${result.text}`);
                      } else {
                        alert(`❌ Google Gemini no funciona.\nMotivo: ${result.message}\n\nUsando preguntas predefinidas de alta calidad.`);
                      }
                    } catch (error) {
                      alert('❌ Error al probar Google Gemini API. Usando preguntas predefinidas.');
                    }
                  }}
                  disabled={loading}
                >
                  🧪 Test Google Gemini
                </button>
              </div>
            </div>
          </div>
        );

      case 'playing':
        return currentQuestion ? (
          <>
            <div className="quiz-options">
              {currentQuestion.options.map((option, index) => (
                <div 
                  key={index}
                  className={`quiz-option ${
                    selectedOptionIndex === index ? 'quiz-option-selected' : ''
                  } ${
                    answerRevealed && index === (currentQuestion.correctIndex || 0)
                      ? 'quiz-option-correct' 
                      : answerRevealed && selectedOptionIndex === index && selectedOptionIndex !== (currentQuestion.correctIndex || 0)
                      ? 'quiz-option-incorrect' 
                      : ''
                  }`}
                  onClick={() => handleOptionSelect(index)}
                >
                  <span>{String.fromCharCode(65 + index)}.</span> {option}
                </div>
              ))}
            </div>
            
            {loading && (
              <TerminalLine>
                <TerminalOutput>Generando explicación...</TerminalOutput>
              </TerminalLine>
            )}
            
            {answerRevealed && !loading && (
              <div className="quiz-controls">
                <button 
                  className="quiz-button quiz-button-primary"
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                </button>
              </div>
            )}
            
            <div className="quiz-progress">
              <div 
                className="quiz-progress-bar" 
                style={{ width: `${((currentQuestionIndex + 1) / MAX_QUESTIONS) * 100}%` }} 
              />
              <div className="quiz-progress-text">
                {currentQuestionIndex + 1} / {MAX_QUESTIONS} | Puntos: {score}
              </div>
            </div>
          </>
        ) : null;

      case 'completed':
        return (
          <div className="quiz-completed">
            <div className="quiz-controls">
              <button 
                className="quiz-button quiz-button-primary"
                onClick={resetQuiz}
              >
                🔄 Nuevo Quiz
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Función para obtener emoji por categoría
  const getCategoryEmoji = (category: string): string => {
    const emojis: Record<string, string> = {
      'programación': '💻',
      'historia': '📚',
      'ciencia': '🔬',
      'geografía': '🌍',
      'arte': '🎨',
      'deportes': '⚽',
      'tecnología': '🚀',
      'música': '🎵',
      'cine': '🎬',
      'literatura': '📖'
    };
    return emojis[category] || '❓';
  };

  return (
    <Terminal title={`Quiz Terminal - ${gameState === 'playing' ? selectedCategory : 'Configuración'}`}>
      {terminalHistory}
      {renderGameContent()}
    </Terminal>
  );
};

export default Quiz;