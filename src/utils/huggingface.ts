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
 * @returns Una respuesta explicativa detallada
 */
function generarRespuestaFallback(prompt: string): string {
  // Generar explicaciones naturales y educativas
  if (prompt.includes('programación') || prompt.includes('TypeScript') || prompt.includes('JavaScript')) {
    return 'TypeScript es una excelente elección para el desarrollo moderno. Al agregar tipado estático a JavaScript, TypeScript ayuda a detectar errores en tiempo de compilación, mejora la productividad del desarrollador y facilita el mantenimiento de aplicaciones grandes. Su compatibilidad con JavaScript lo hace ideal para proyectos existentes.';
  } else if (prompt.includes('React') || prompt.includes('framework')) {
    return 'React se ha convertido en uno de los frameworks más populares debido a su enfoque basado en componentes y su virtual DOM. Permite crear interfaces de usuario interactivas y reutilizables. Su ecosistema robusto y la gran comunidad de desarrolladores lo hacen una excelente opción para proyectos web modernos.';
  } else if (prompt.includes('historia') || prompt.includes('guerra') || prompt.includes('imperio')) {
    return 'Los eventos históricos están interconectados y han moldeado el mundo actual. Comprender el contexto histórico nos ayuda a entender mejor las decisiones políticas, sociales y económicas de diferentes épocas. Cada civilización ha contribuido de manera única al desarrollo de la humanidad.';
  } else if (prompt.includes('ciencia') || prompt.includes('química') || prompt.includes('física')) {
    return 'La ciencia nos permite comprender los principios fundamentales que rigen nuestro universo. Desde las partículas subatómicas hasta las galaxias distantes, cada descubrimiento científico amplía nuestro conocimiento y nos ayuda a desarrollar tecnologías que mejoran la vida humana.';
  } else if (prompt.includes('geografía') || prompt.includes('país') || prompt.includes('capital')) {
    return 'La geografía influye profundamente en la cultura, economía y desarrollo de las sociedades. La ubicación geográfica determina el clima, los recursos naturales disponibles y las rutas comerciales, factores que han sido cruciales en la formación de civilizaciones a lo largo de la historia.';
  } else if (prompt.includes('arte') || prompt.includes('pintura') || prompt.includes('escultura')) {
    return 'El arte es una expresión fundamental de la experiencia humana que trasciende barreras culturales y temporales. Cada movimiento artístico refleja los valores, preocupaciones y aspiraciones de su época, creando un diálogo continuo entre el pasado y el presente.';
  } else if (prompt.includes('deportes') || prompt.includes('juego') || prompt.includes('competencia')) {
    return 'Los deportes van más allá de la competencia física; representan valores como trabajo en equipo, perseverancia y fair play. Cada deporte tiene reglas específicas y estrategias únicas que han evolucionado a lo largo del tiempo para crear experiencias emocionantes tanto para atletas como para espectadores.';
  } else if (prompt.includes('música') || prompt.includes('instrumento') || prompt.includes('compositor')) {
    return 'La música es un lenguaje universal que conecta emociones y culturas. Cada género musical tiene características distintivas que reflejan su origen cultural y histórico. Los grandes compositores han creado obras que continúan inspirando a nuevas generaciones de músicos y oyentes.';
  } else if (prompt.includes('cine') || prompt.includes('película') || prompt.includes('director')) {
    return 'El cine es un arte que combina narrativa visual, actuación, música y efectos para crear experiencias inmersivas. Los grandes directores han revolucionado la forma de contar historias, utilizando técnicas cinematográficas innovadoras que han influenciado el medium para siempre.';
  } else if (prompt.includes('literatura') || prompt.includes('libro') || prompt.includes('autor')) {
    return 'La literatura nos permite explorar la condición humana a través de diferentes perspectivas y épocas. Los grandes autores han creado obras que trascienden su tiempo, ofreciendo insights profundos sobre la naturaleza humana, la sociedad y nuestro lugar en el mundo.';
  } else {
    return 'Este tema requiere un análisis detallado considerando múltiples factores. La comprensión profunda viene de conectar diferentes conceptos y ver cómo se relacionan entre sí. Es importante considerar el contexto histórico, cultural y científico para obtener una perspectiva completa.';
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
      },
      {
        question: '¿Qué significa "SQL" en bases de datos?',
        options: ['Structured Query Language', 'Simple Query Language', 'System Query Language', 'Standard Quality Language'],
        correctIndex: 0
      },
      {
        question: '¿Cuál de estos NO es un patrón de diseño?',
        options: ['Singleton', 'Observer', 'Recursion', 'Factory'],
        correctIndex: 2
      },
      {
        question: '¿Qué es Git en programación?',
        options: ['Un lenguaje de programación', 'Un sistema de control de versiones', 'Un framework web', 'Un editor de código'],
        correctIndex: 1
      },
      {
        question: '¿Cuál es la diferencia principal entre "==" y "===" en JavaScript?',
        options: ['No hay diferencia', '=== compara tipo y valor, == solo valor', '== compara tipo y valor, === solo valor', 'Solo se puede usar === en funciones'],
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
      },
      {
        question: '¿En qué siglo vivió Napoleón Bonaparte?',
        options: ['XVII', 'XVIII', 'XIX', 'XX'],
        correctIndex: 2
      },
      {
        question: '¿Qué civilización antigua construyó las pirámides de Giza?',
        options: ['Babilónica', 'Egipcia', 'Griega', 'Romana'],
        correctIndex: 1
      },
      {
        question: '¿En qué año se firmó la Declaración de Independencia de Estados Unidos?',
        options: ['1774', '1775', '1776', '1777'],
        correctIndex: 2
      },
      {
        question: '¿Quién fue conocido como el "Rey Sol"?',
        options: ['Luis XIII', 'Luis XIV', 'Luis XV', 'Luis XVI'],
        correctIndex: 1
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
      },
      {
        question: '¿Quién propuso la teoría de la relatividad?',
        options: ['Newton', 'Einstein', 'Darwin', 'Galileo'],
        correctIndex: 1
      },
      {
        question: '¿Cuál es el órgano más grande del cuerpo humano?',
        options: ['Hígado', 'Cerebro', 'Pulmones', 'Piel'],
        correctIndex: 3
      },
      {
        question: '¿Qué proceso utilizan las plantas para convertir luz solar en energía?',
        options: ['Respiración', 'Fotosíntesis', 'Digestión', 'Fermentación'],
        correctIndex: 1
      },
      {
        question: '¿Cuál es el símbolo químico del oro?',
        options: ['Go', 'Au', 'Or', 'Ag'],
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
      },
      {
        question: '¿Cuál es el desierto más grande del mundo?',
        options: ['Sahara', 'Gobi', 'Kalahari', 'Antártida'],
        correctIndex: 3
      },
      {
        question: '¿Qué océano separa América de Europa?',
        options: ['Pacífico', 'Índico', 'Atlántico', 'Ártico'],
        correctIndex: 2
      },
      {
        question: '¿Cuál es la capital de Japón?',
        options: ['Osaka', 'Kioto', 'Tokio', 'Nagoya'],
        correctIndex: 2
      },
      {
        question: '¿En qué continente se encuentra el lago Baikal?',
        options: ['Europa', 'Asia', 'América del Norte', 'África'],
        correctIndex: 1
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
      },
      {
        question: '¿Quién pintó "Guernica"?',
        options: ['Salvador Dalí', 'Pablo Picasso', 'Joan Miró', 'Francisco Goya'],
        correctIndex: 1
      },
      {
        question: '¿En qué ciudad se encuentra la Capilla Sixtina?',
        options: ['Florencia', 'Venecia', 'Milán', 'Ciudad del Vaticano'],
        correctIndex: 3
      },
      {
        question: '¿Quién pintó "Las Meninas"?',
        options: ['El Greco', 'Velázquez', 'Goya', 'Murillo'],
        correctIndex: 1
      },
      {
        question: '¿Cuál es el movimiento artístico de Claude Monet?',
        options: ['Realismo', 'Impresionismo', 'Romanticism', 'Barroco'],
        correctIndex: 1
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
      },
      {
        question: '¿En qué deporte se utiliza una raqueta y una pelota amarilla?',
        options: ['Badminton', 'Squash', 'Tenis', 'Ping pong'],
        correctIndex: 2
      },
      {
        question: '¿Cuántos sets se necesitan ganar para ganar un partido de tenis masculino en Grand Slam?',
        options: ['2', '3', '4', '5'],
        correctIndex: 1
      },
      {
        question: '¿En qué año se celebraron los primeros Juegos Olímpicos modernos?',
        options: ['1892', '1896', '1900', '1904'],
        correctIndex: 1
      },
      {
        question: '¿Cuál es el máximo número de jugadores en un equipo de fútbol americano en el campo?',
        options: ['9', '10', '11', '12'],
        correctIndex: 2
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
      },
      {
        question: '¿Qué significa "CPU" en informática?',
        options: ['Central Processing Unit', 'Computer Processing Unit', 'Central Program Unit', 'Computer Program Unit'],
        correctIndex: 0
      },
      {
        question: '¿Quién fundó Tesla Motors?',
        options: ['Bill Gates', 'Steve Jobs', 'Elon Musk', 'Mark Zuckerberg'],
        correctIndex: 2
      },
      {
        question: '¿Qué lenguaje de programación desarrolló Guido van Rossum?',
        options: ['Java', 'Python', 'C++', 'JavaScript'],
        correctIndex: 1
      },
      {
        question: '¿En qué año se fundó Google?',
        options: ['1996', '1998', '2000', '2002'],
        correctIndex: 1
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
      },
      {
        question: '¿Qué género musical popularizó Bob Marley?',
        options: ['Jazz', 'Blues', 'Reggae', 'Rock'],
        correctIndex: 2
      },
      {
        question: '¿Cuál es el nombre real de Elton John?',
        options: ['Reginald Dwight', 'David Jones', 'George O\'Dowd', 'Robert Plant'],
        correctIndex: 0
      },
      {
        question: '¿En qué década surgió el movimiento punk?',
        options: ['1960s', '1970s', '1980s', '1990s'],
        correctIndex: 1
      },
      {
        question: '¿Qué instrumento es conocido como "el rey de los instrumentos"?',
        options: ['Piano', 'Violín', 'Órgano', 'Trompeta'],
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
      },
      {
        question: '¿Quién dirigió "Pulp Fiction"?',
        options: ['Martin Scorsese', 'Quentin Tarantino', 'Christopher Nolan', 'Tim Burton'],
        correctIndex: 1
      },
      {
        question: '¿En qué película Tom Hanks dice "La vida es como una caja de chocolates"?',
        options: ['Cast Away', 'Forrest Gump', 'Philadelphia', 'Big'],
        correctIndex: 1
      },
      {
        question: '¿Cuál fue la primera película de la saga "Matrix"?',
        options: ['1997', '1998', '1999', '2000'],
        correctIndex: 2
      },
      {
        question: '¿Qué director es conocido por películas como "Inception" y "The Dark Knight"?',
        options: ['Steven Spielberg', 'Christopher Nolan', 'Ridley Scott', 'James Cameron'],
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
      },
      {
        question: '¿Quién escribió "Orgullo y prejuicio"?',
        options: ['Charlotte Brontë', 'Emily Brontë', 'Jane Austen', 'Virginia Woolf'],
        correctIndex: 2
      },
      {
        question: '¿En qué siglo vivió Miguel de Cervantes?',
        options: ['XV', 'XVI', 'XVII', 'XVIII'],
        correctIndex: 2
      },
      {
        question: '¿Quién escribió "El gran Gatsby"?',
        options: ['Ernest Hemingway', 'F. Scott Fitzgerald', 'John Steinbeck', 'William Faulkner'],
        correctIndex: 1
      },
      {
        question: '¿Cuál es la obra más famosa de Edgar Allan Poe?',
        options: ['El cuervo', 'El gato negro', 'La caída de la Casa Usher', 'Ligeia'],
        correctIndex: 0
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
