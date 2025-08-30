// Categorías disponibles para generar preguntas
export const QUIZ_CATEGORIES = [
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

// Interfaz para las preguntas generadas
export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex?: number;
}

/**
 * Genera una respuesta utilizando Google Gemini API primero, luego Hugging Face como fallback
 * @param prompt El texto de entrada para el modelo
 * @param maxTokens Número máximo de tokens a generar
 * @param temperature Controla la aleatoriedad de las respuestas (0-1)
 * @returns El texto generado
 */
export async function generateText(prompt: string, maxTokens: number = 100, temperature: number = 0.7): Promise<string> {
  try {
    // Intentar primero con Google Gemini
    const geminiResponse = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        maxTokens,
        temperature
      })
    });
    
    const geminiData = await geminiResponse.json();
    
    if (geminiData.success) {
      return geminiData.text;
    }
    
    // Si Gemini falla, intentar con Hugging Face
    const hfResponse = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        maxTokens,
        temperature
      })
    });
    
    const hfData = await hfResponse.json();
    
    if (hfData.success) {
      return hfData.text;
    } else {
      return generarRespuestaFallback(prompt);
    }
    
  } catch {
    return generarRespuestaFallback(prompt);
  }
}

/**
 * Crea un prompt para el modelo GPT-2 basado en una pregunta y respuesta
 * @param question La pregunta del quiz
 * @param userAnswer La respuesta del usuario
 * @param options Las opciones disponibles
 * @returns El prompt formateado
 */
export function createQuizPrompt(question: string, userAnswer: string, options: string[]): string {
  return `Pregunta: ${question}\nRespuesta del usuario: ${userAnswer}\nOpciones disponibles: ${options.join(', ')}\nExplicación detallada:`;
}

/**
 * Genera feedback para una respuesta de quiz
 * @param question La pregunta del quiz
 * @param userAnswer La respuesta del usuario
 * @param options Las opciones disponibles
 * @returns Una explicación generada por IA
 */
export async function generateQuizFeedback(question: string, userAnswer: string, options: string[]): Promise<string> {
  const prompt = createQuizPrompt(question, userAnswer, options);
  return generateText(prompt, 150, 0.7);
}

/**
 * Genera una respuesta de fallback cuando las APIs no están disponibles
 * @param prompt El prompt original
 * @returns Una respuesta predefinida basada en el contenido del prompt
 */
function generarRespuestaFallback(prompt: string): string {
  // Respuestas predefinidas para diferentes tipos de preguntas
  if (prompt.includes('capital de Francia')) {
    return 'París es la capital de Francia. Es conocida como la "Ciudad de la Luz" y es famosa por la Torre Eiffel, el Louvre y su rica historia cultural.';
  } else if (prompt.includes('lenguaje de programación')) {
    return 'TypeScript es un lenguaje de programación desarrollado por Microsoft que extiende JavaScript añadiendo tipado estático opcional. Es muy utilizado en el desarrollo web moderno.';
  } else if (prompt.includes('framework')) {
    return 'Next.js es un framework de React que permite funcionalidades como renderizado del lado del servidor (SSR), generación de sitios estáticos (SSG), y muchas optimizaciones de rendimiento.';
  } else if (prompt.includes('modelo de IA')) {
    return 'Google Gemini es un modelo de lenguaje desarrollado por Google que puede generar texto coherente y contextualmente relevante. Es muy útil para crear contenido educativo.';
  } else if (prompt.includes('biblioteca de estilos')) {
    return 'Tailwind CSS es una biblioteca de utilidades CSS de bajo nivel que permite construir diseños personalizados sin salir de tu HTML. Se enfoca en clases de utilidad en lugar de componentes predefinidos.';
  } else {
    return 'Esta es una respuesta generada localmente. En un entorno de producción con API configurada, recibirías una explicación más detallada generada por IA.';
  }
}

/**
 * Genera una pregunta de quiz con opciones utilizando IA o fallback
 * @param category La categoría de la pregunta (programación, historia, ciencia, etc.)
 * @returns Una pregunta con opciones y la respuesta correcta
 */
export async function generateQuizQuestion(category: string): Promise<QuizQuestion> {
  try {
    // Agregar variedad al prompt con elementos aleatorios
    const randomElements = [
      "innovadora", "desafiante", "interesante", "educativa", "sorprendente", "creativa"
    ];
    const randomElement = randomElements[Math.floor(Math.random() * randomElements.length)];
    
    // Prompt mejorado con más variedad
    const prompt = `Genera una pregunta de opción múltiple ÚNICA y ORIGINAL sobre ${category}. 
IMPORTANTE: Evita preguntas repetitivas sobre términos básicos. Sé creativo y variado.
Haz una pregunta ${randomElement} que desafíe el conocimiento.

Formato EXACTO:
Pregunta: [Tu pregunta aquí]
A) [Opción 1]
B) [Opción 2] 
C) [Opción 3]
D) [Opción 4]
Respuesta correcta: [A, B, C o D]

Categorías de ${category}:
- Si es programación: incluye diferentes lenguajes, frameworks, conceptos
- Si es deportes: varía entre diferentes deportes, reglas, equipamiento
- Si es historia: diferentes épocas, civilizaciones, eventos
- Si es ciencia: física, química, biología, astronomía
- Si es geografía: países, capitales, ríos, montañas, continentes
- Si es arte: pintores, escultores, movimientos artísticos, obras famosas
- Si es tecnología: inventos, empresas, dispositivos, innovaciones
- Si es música: instrumentos, compositores, géneros, bandas
- Si es cine: directores, actores, películas, géneros
- Si es literatura: autores, obras, géneros, personajes

Ejemplo para deportes:
Pregunta: ¿Cuántos jugadores conforman un equipo de voleibol en la cancha?
A) 5
B) 6
C) 7
D) 8
Respuesta correcta: B`;
    
    // Generar la pregunta con Google Gemini
    const response = await generateText(prompt, 200, 0.8);
    
    console.log('Generated response:', response);
    
    // Intentar parsear la respuesta de la IA
    const parsedQuestion = parseAIResponse(response);
    if (parsedQuestion) {
      return parsedQuestion;
    }
    
    // Si el parsing falla, usar fallback
    console.log('AI parsing failed, using fallback');
    return generarPreguntaFallback(category);
    
  } catch (error) {
    console.error('Error al generar pregunta de quiz:', error);
    return generarPreguntaFallback(category);
  }
}

/**
 * Parsea la respuesta de la IA para extraer pregunta y opciones
 * @param response La respuesta cruda de la IA
 * @returns Una pregunta parseada o null si falla
 */
function parseAIResponse(response: string): QuizQuestion | null {
  try {
    const lines = response.split('\n').filter(line => line.trim());
    
    // Buscar pregunta
    const questionLine = lines.find(line => line.toLowerCase().includes('pregunta:'));
    if (!questionLine) return null;
    
    const question = questionLine.replace(/pregunta:\s*/i, '').trim();
    
    // Buscar opciones
    const options: string[] = [];
    const optionRegex = /^[A-D]\)\s*(.+)$/i;
    
    for (const line of lines) {
      const match = line.match(optionRegex);
      if (match) {
        options.push(match[1].trim());
      }
    }
    
    if (options.length !== 4) return null;
    
    // Buscar respuesta correcta
    const answerLine = lines.find(line => line.toLowerCase().includes('respuesta correcta:'));
    let correctIndex = 0;
    
    if (answerLine) {
      const answerMatch = answerLine.match(/respuesta correcta:\s*([A-D])/i);
      if (answerMatch) {
        correctIndex = answerMatch[1].toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
      }
    }
    
    return {
      question,
      options,
      correctIndex
    };
    
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return null;
  }
}

/**
 * Genera una pregunta de fallback cuando la API no está disponible
 * @param category La categoría de la pregunta
 * @returns Una pregunta predefinida con opciones y respuesta correcta
 */
function generarPreguntaFallback(category: string): QuizQuestion {
  // Preguntas predefinidas por categoría - más variadas
  const preguntasPorCategoria: Record<string, QuizQuestion[]> = {
    'programación': [
      {
        question: '¿Qué lenguaje de programación es conocido por su uso en desarrollo web y tiene tipado estático opcional?',
        options: ['Java', 'Python', 'TypeScript', 'C++'],
        correctIndex: 2
      },
      {
        question: '¿Cuál de estos es un framework de JavaScript para frontend?',
        options: ['Django', 'React', 'Laravel', 'Spring'],
        correctIndex: 1
      },
      {
        question: '¿Qué significa "API" en programación?',
        options: ['Application Programming Interface', 'Advanced Programming Integration', 'Automated Program Instruction', 'Application Process Integration'],
        correctIndex: 0
      },
      {
        question: '¿Cuál es el paradigma de programación principal de Python?',
        options: ['Funcional', 'Orientado a objetos', 'Multiparadigma', 'Declarativo'],
        correctIndex: 2
      },
      {
        question: '¿Qué comando se usa para instalar paquetes en Node.js?',
        options: ['pip install', 'npm install', 'apt install', 'brew install'],
        correctIndex: 1
      },
      {
        question: '¿Cuál es la complejidad temporal del algoritmo quicksort en el caso promedio?',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
        correctIndex: 1
      }
    ],
    'historia': [
      {
        question: '¿En qué año comenzó la Segunda Guerra Mundial?',
        options: ['1935', '1939', '1941', '1945'],
        correctIndex: 1
      },
      {
        question: '¿Quién fue el primer emperador de Roma?',
        options: ['Julio César', 'Augusto', 'Nerón', 'Trajano'],
        correctIndex: 1
      },
      {
        question: '¿En qué año cayó el Muro de Berlín?',
        options: ['1987', '1989', '1991', '1993'],
        correctIndex: 1
      },
      {
        question: '¿Qué imperio construyó Machu Picchu?',
        options: ['Azteca', 'Maya', 'Inca', 'Olmeca'],
        correctIndex: 2
      },
      {
        question: '¿En qué año llegó Cristóbal Colón a América?',
        options: ['1490', '1492', '1494', '1498'],
        correctIndex: 1
      },
      {
        question: '¿Quién fue el líder de la Revolución Rusa de 1917?',
        options: ['Stalin', 'Trotsky', 'Lenin', 'Kerensky'],
        correctIndex: 2
      }
    ],
    'ciencia': [
      {
        question: '¿Cuál es el elemento químico más abundante en el universo?',
        options: ['Oxígeno', 'Carbono', 'Hidrógeno', 'Helio'],
        correctIndex: 2
      },
      {
        question: '¿Cuántos huesos tiene el cuerpo humano adulto?',
        options: ['198', '206', '214', '220'],
        correctIndex: 1
      },
      {
        question: '¿Cuál es la velocidad de la luz en el vacío?',
        options: ['299,792,458 m/s', '300,000,000 m/s', '299,000,000 m/s', '301,000,000 m/s'],
        correctIndex: 0
      },
      {
        question: '¿Cuál es la fórmula química del agua?',
        options: ['H2O', 'CO2', 'NaCl', 'CH4'],
        correctIndex: 0
      },
      {
        question: '¿Qué planeta es conocido como el "planeta rojo"?',
        options: ['Venus', 'Júpiter', 'Marte', 'Saturno'],
        correctIndex: 2
      },
      {
        question: '¿Cuál es la unidad básica de la herencia genética?',
        options: ['Cromosoma', 'Gen', 'ADN', 'ARN'],
        correctIndex: 1
      }
    ],
    'geografía': [
      {
        question: '¿Cuál es el país más grande del mundo por área territorial?',
        options: ['China', 'Estados Unidos', 'Canadá', 'Rusia'],
        correctIndex: 3
      },
      {
        question: '¿Cuál es el río más largo del mundo?',
        options: ['Amazonas', 'Nilo', 'Yangtsé', 'Misisipi'],
        correctIndex: 1
      },
      {
        question: '¿En qué continente está ubicado Machu Picchu?',
        options: ['Asia', 'África', 'América del Sur', 'Europa'],
        correctIndex: 2
      },
      {
        question: '¿Cuál es la capital de Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
        correctIndex: 2
      },
      {
        question: '¿Cuál es el monte más alto del mundo?',
        options: ['K2', 'Everest', 'Kangchenjunga', 'Lhotse'],
        correctIndex: 1
      },
      {
        question: '¿En qué país se encuentra la región de Transilvania?',
        options: ['Hungría', 'Bulgaria', 'Rumania', 'Serbia'],
        correctIndex: 2
      }
    ],
    'arte': [
      {
        question: '¿Quién pintó "La noche estrellada"?',
        options: ['Pablo Picasso', 'Vincent van Gogh', 'Leonardo da Vinci', 'Claude Monet'],
        correctIndex: 1
      },
      {
        question: '¿En qué museo se encuentra la Mona Lisa?',
        options: ['Museo del Prado', 'Louvre', 'Museo Británico', 'MoMA'],
        correctIndex: 1
      },
      {
        question: '¿Cuál es el estilo artístico de Salvador Dalí?',
        options: ['Impresionismo', 'Cubismo', 'Surrealismo', 'Expresionismo'],
        correctIndex: 2
      },
      {
        question: '¿Quién esculpió "El David"?',
        options: ['Donatello', 'Miguel Ángel', 'Bernini', 'Rodin'],
        correctIndex: 1
      },
      {
        question: '¿En qué siglo vivió Leonardo da Vinci?',
        options: ['XIV', 'XV', 'XVI', 'XVII'],
        correctIndex: 2
      },
      {
        question: '¿Cuál es la técnica de pintura que usa puntos de color?',
        options: ['Impresionismo', 'Cubismo', 'Puntillismo', 'Fauvismo'],
        correctIndex: 2
      }
    ],
    'deportes': [
      {
        question: '¿En qué deporte se utiliza un disco (puck)?',
        options: ['Hockey sobre hielo', 'Golf', 'Tenis', 'Fútbol'],
        correctIndex: 0
      },
      {
        question: '¿Cada cuántos años se celebran los Juegos Olímpicos?',
        options: ['2 años', '3 años', '4 años', '5 años'],
        correctIndex: 2
      },
      {
        question: '¿Cuál es el único país que ha participado en todas las Copas del Mundo de fútbol?',
        options: ['Argentina', 'Brasil', 'Alemania', 'Italia'],
        correctIndex: 1
      },
      {
        question: '¿Cuántos jugadores hay en un equipo de baloncesto en la cancha?',
        options: ['4', '5', '6', '7'],
        correctIndex: 1
      },
      {
        question: '¿En qué deporte se compite por la Copa Davis?',
        options: ['Golf', 'Tenis', 'Fútbol', 'Cricket'],
        correctIndex: 1
      },
      {
        question: '¿Cuál es la distancia de un maratón?',
        options: ['40 km', '42.195 km', '45 km', '50 km'],
        correctIndex: 1
      }
    ],
    'tecnología': [
      {
        question: '¿Quién fundó Microsoft?',
        options: ['Steve Jobs', 'Bill Gates', 'Mark Zuckerberg', 'Elon Musk'],
        correctIndex: 1
      },
      {
        question: '¿En qué año se lanzó el primer iPhone?',
        options: ['2005', '2006', '2007', '2008'],
        correctIndex: 2
      },
      {
        question: '¿Qué significa "WWW"?',
        options: ['World Wide Web', 'World Web Wide', 'Wide World Web', 'Web World Wide'],
        correctIndex: 0
      },
      {
        question: '¿Cuál fue la primera red social masiva?',
        options: ['Facebook', 'MySpace', 'Friendster', 'LinkedIn'],
        correctIndex: 2
      },
      {
        question: '¿Qué empresa desarrolló el sistema operativo Android?',
        options: ['Apple', 'Microsoft', 'Google', 'Samsung'],
        correctIndex: 2
      },
      {
        question: '¿En qué año se fundó YouTube?',
        options: ['2003', '2004', '2005', '2006'],
        correctIndex: 2
      }
    ],
    'música': [
      {
        question: '¿Qué instrumento tocaba principalmente Jimi Hendrix?',
        options: ['Batería', 'Bajo', 'Piano', 'Guitarra'],
        correctIndex: 3
      },
      {
        question: '¿Cuántas sinfonías compuso Beethoven?',
        options: ['7', '8', '9', '10'],
        correctIndex: 2
      },
      {
        question: '¿Qué banda británica cantó "Bohemian Rhapsody"?',
        options: ['The Beatles', 'Queen', 'Led Zeppelin', 'The Rolling Stones'],
        correctIndex: 1
      },
      {
        question: '¿De qué país es originario el tango?',
        options: ['Brasil', 'Argentina', 'Uruguay', 'Chile'],
        correctIndex: 1
      },
      {
        question: '¿Cuántas cuerdas tiene una guitarra estándar?',
        options: ['4', '5', '6', '7'],
        correctIndex: 2
      },
      {
        question: '¿Quién compuso "El lago de los cisnes"?',
        options: ['Mozart', 'Chopin', 'Tchaikovsky', 'Bach'],
        correctIndex: 2
      }
    ],
    'cine': [
      {
        question: '¿Quién dirigió la película "El Padrino"?',
        options: ['Martin Scorsese', 'Steven Spielberg', 'Francis Ford Coppola', 'Quentin Tarantino'],
        correctIndex: 2
      },
      {
        question: '¿En qué año se estrenó "Titanic"?',
        options: ['1995', '1997', '1999', '2001'],
        correctIndex: 1
      },
      {
        question: '¿Cuál fue la primera película animada de Disney?',
        options: ['Blancanieves', 'Bambi', 'Pinocho', 'Cenicienta'],
        correctIndex: 0
      },
      {
        question: '¿Qué actor interpretó a Jack Sparrow?',
        options: ['Orlando Bloom', 'Johnny Depp', 'Brad Pitt', 'Leonardo DiCaprio'],
        correctIndex: 1
      },
      {
        question: '¿Cuál es la película más taquillera de todos los tiempos (sin ajustar por inflación)?',
        options: ['Titanic', 'Avatar', 'Avengers: Endgame', 'Star Wars'],
        correctIndex: 2
      },
      {
        question: '¿En qué película aparece la frase "Que la fuerza te acompañe"?',
        options: ['Star Trek', 'Star Wars', 'Guardians of the Galaxy', 'Matrix'],
        correctIndex: 1
      }
    ],
    'literatura': [
      {
        question: '¿Quién escribió "Cien años de soledad"?',
        options: ['Jorge Luis Borges', 'Gabriel García Márquez', 'Mario Vargas Llosa', 'Julio Cortázar'],
        correctIndex: 1
      },
      {
        question: '¿Cuál es la primera novela de la saga de Harry Potter?',
        options: ['La Cámara Secreta', 'El Prisionero de Azkaban', 'La Piedra Filosofal', 'El Cáliz de Fuego'],
        correctIndex: 2
      },
      {
        question: '¿Quién escribió "1984"?',
        options: ['Aldous Huxley', 'George Orwell', 'Ray Bradbury', 'Isaac Asimov'],
        correctIndex: 1
      },
      {
        question: '¿En qué país nació William Shakespeare?',
        options: ['Francia', 'España', 'Inglaterra', 'Italia'],
        correctIndex: 2
      },
      {
        question: '¿Quién escribió "Don Quijote de la Mancha"?',
        options: ['Miguel de Cervantes', 'Lope de Vega', 'Federico García Lorca', 'Antonio Machado'],
        correctIndex: 0
      },
      {
        question: '¿Cuál es el primer libro de "El Señor de los Anillos"?',
        options: ['Las Dos Torres', 'El Retorno del Rey', 'La Comunidad del Anillo', 'El Hobbit'],
        correctIndex: 2
      }
    ]
  };
  
  // Si la categoría existe, seleccionar una pregunta aleatoria
  if (preguntasPorCategoria[category]) {
    const preguntas = preguntasPorCategoria[category];
    return preguntas[Math.floor(Math.random() * preguntas.length)];
  }
  
  // Si la categoría no existe, devolver una pregunta general aleatoria
  const todasLasPreguntas = Object.values(preguntasPorCategoria).flat();
  return todasLasPreguntas[Math.floor(Math.random() * todasLasPreguntas.length)];
}

/**
 * Genera un conjunto de preguntas para un quiz completo
 * @param numQuestions Número de preguntas a generar
 * @param categories Categorías para las preguntas (opcional)
 * @returns Array de preguntas con opciones y respuestas correctas
 */
export async function generateQuizSet(numQuestions: number = 5, categories?: string[]): Promise<QuizQuestion[]> {
  const quizQuestions: QuizQuestion[] = [];
  const usedCategories = categories || [...QUIZ_CATEGORIES];
  
  // Generar preguntas en paralelo
  const promises = [];
  
  for (let i = 0; i < numQuestions; i++) {
    // Seleccionar una categoría aleatoria
    const randomCategory = usedCategories[Math.floor(Math.random() * usedCategories.length)];
    promises.push(generateQuizQuestion(randomCategory));
  }
  
  try {
    // Esperar a que todas las preguntas se generen
    const results = await Promise.all(promises);
    quizQuestions.push(...results);
  } catch (error) {
    console.error('Error al generar conjunto de preguntas:', error);
    
    // Si hay un error, generar preguntas de fallback
    for (let i = 0; i < numQuestions; i++) {
      const randomCategory = usedCategories[Math.floor(Math.random() * usedCategories.length)];
      quizQuestions.push(generarPreguntaFallback(randomCategory));
    }
  }
  
  return quizQuestions;
}
