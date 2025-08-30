# 🎯 Quiz Terminal App con IA

Una aplicación de quiz interactiva con estilo de terminal que genera preguntas dinámicamente usando **Google Gemini AI** y Hugging Face como fallback.

![Quiz Terminal App](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google)

## ✨ Características Principales

### 🤖 Preguntas Dinámicas con IA
- **Generación automática** de preguntas usando **Google Gemini AI** (principal)
- **Fallback robusto** con Hugging Face y preguntas predefinidas
- **10 categorías** diferentes: Programación, Historia, Ciencia, Geografía, Arte, Deportes, Tecnología, Música, Cine, Literatura
- **Modo mixto** que combina todas las categorías
- **Respuestas explicadas** por IA para cada pregunta
- **Preguntas de nivel profesional** - complejas y educativas

### 🎮 Experiencia de Usuario Mejorada
- **Interfaz de terminal** auténtica con colores y animaciones
- **Navegación limpia** - cada pregunta es una nueva "sesión"
- **Sistema de progreso** visual con barra de progreso
- **Límite de 10 preguntas** por quiz para mantener la atención
- **Puntuación en tiempo real** con mensajes personalizados

### 🎨 Diseño y UX
- **Estilo terminal retro** con colores verdes y efectos de typing
- **Animaciones suaves** entre preguntas
- **Responsive design** que funciona en móviles y desktop
- **Selector de categorías** visual con emojis
- **Feedback inmediato** con colores para respuestas correctas/incorrectas

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 18+ 
- npm o yarn
- **Google Gemini API Key** (requerida - gratuita)
- Cuenta en Hugging Face (opcional, para fallback)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/joseorteha/quizApp.git
cd quizApp
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Copiar el archivo de ejemplo
copy .env.example .env.local

# Editar .env.local y agregar tus API keys
# REQUERIDO: Google Gemini API Key
GOOGLE_GEMINI_API_KEY=tu_google_gemini_api_key

# OPCIONAL: Hugging Face API Key (para fallback)
HUGGING_FACE_API_KEY=tu_hugging_face_api_key
```

#### 🔑 Obtener API Keys:

**Google Gemini (GRATIS - Requerida):**
1. Ve a [Google AI Studio](https://ai.google.dev/)
2. Inicia sesión con tu cuenta Google
3. Haz clic en "Get API Key"
4. Copia la key y pégala en `.env.local`

**Hugging Face (GRATIS - Opcional):**
1. Ve a [Hugging Face](https://huggingface.co/settings/tokens)
2. Crea una cuenta gratuita
3. Genera un token de acceso
4. Copia la key y pégala en `.env.local`

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

5. **Abrir en el navegador**
```
http://localhost:3000
```

## 🎯 Cómo Usar

### Inicio del Quiz
1. **Selecciona una categoría** de las 10 disponibles o elige "Mixto"
2. **Haz clic en "Comenzar Quiz"** para generar preguntas dinámicamente
3. **Espera** mientras la IA genera las preguntas (puede tomar unos segundos)

### Durante el Quiz
1. **Lee la pregunta** que aparece en el terminal
2. **Selecciona una opción** haciendo clic en las opciones A, B, C, o D
3. **Recibe feedback inmediato** con explicación generada por IA
4. **Haz clic en "Siguiente Pregunta"** para continuar
5. **Ve tu progreso** en la barra inferior

### Finalización
1. **Ve tu puntuación final** con porcentaje y mensaje personalizado
2. **Inicia un nuevo quiz** haciendo clic en "🔄 Nuevo Quiz"

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15.5.2** - Framework React con SSR
- **TypeScript** - Tipado estático para mejor desarrollo
- **Tailwind CSS 4.0** - Estilos utilitarios modernos
- **React Hooks** - Manejo de estado moderno

### IA y Backend
- **Google Gemini AI** - Generación principal de preguntas y explicaciones
- **Hugging Face Inference API** - Sistema de fallback para IA
- **Next.js API Routes** - Endpoints para integración con APIs de IA
- **Server-side Processing** - Manejo seguro de API keys
- **Sistema de Fallback Robusto** - 300+ preguntas predefinidas de alta calidad
- **Hugging Face Inference API** - Para GPT-2 y generación de texto
- **Fallback System** - Preguntas predefinidas cuando la API no está disponible
- **Edge Runtime** - Optimizado para Vercel y similares

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **TypeScript** - Verificación de tipos

## 🔧 Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── Quiz.tsx          # Componente principal del quiz
│   └── Terminal.tsx      # Componente de terminal
├── config/               # Configuración
│   └── quiz.ts          # Configuraciones del quiz
├── hooks/               # React Hooks personalizados
│   └── useQuizState.ts  # Hook para manejo de estado
├── styles/              # Estilos CSS
│   └── terminal.css     # Estilos del terminal
└── utils/               # Utilidades
    └── huggingface.ts   # Funciones de IA y Hugging Face
```

## 🎨 Personalización

### Modificar Categorías
Edita `src/utils/huggingface.ts` para agregar nuevas categorías:

```typescript
export const QUIZ_CATEGORIES = [
  'programación',
  'historia',
  // ... agregar nuevas categorías
  'nueva-categoria'
];
```

### Cambiar Límite de Preguntas
Modifica `src/config/quiz.ts`:

```typescript
export const QUIZ_CONFIG = {
  MAX_QUESTIONS: 15, // Cambiar de 10 a 15
  // ...
};
```

### Personalizar Estilos
Edita `src/styles/terminal.css` para cambiar colores y efectos:

```css
:root {
  --terminal-bg: #1e1e1e;     # Color de fondo
  --terminal-green: #4caf50;   # Color principal
  /* ... */
}
```

## 🚀 Mejoras Implementadas

### ✅ Problemas Resueltos
- ❌ **Preguntas repetidas en terminal** → ✅ **Cada pregunta limpia el terminal**
- ❌ **Preguntas estáticas** → ✅ **Generación dinámica con GPT-2**
- ❌ **Sin límite de preguntas** → ✅ **Límite configurable de 10 preguntas**
- ❌ **Interfaz confusa** → ✅ **Navegación clara y progreso visual**

### 🆕 Nuevas Características
- 🎯 **Selector de categorías** con emojis y descripciones
- 🤖 **Preguntas completamente dinámicas** generadas por IA
- 📊 **Sistema de puntuación mejorado** con porcentajes y mensajes
- 🎨 **Animaciones y transiciones** suaves
- 📱 **Diseño responsive** para todos los dispositivos
- 🔄 **Sistema de reinicio** completo del quiz

## 🚀 Posibles Mejoras Futuras

### 🎯 Funcionalidades Avanzadas
- **Modo multijugador** - Competir con otros usuarios
- **Historial de puntuaciones** - Guardar resultados localmente
- **Dificultad variable** - Fácil, medio, difícil
- **Temporizador** - Preguntas con límite de tiempo
- **Achievements** - Sistema de logros y medallas

### 🤖 Mejoras de IA
- **Múltiples modelos** - Integrar GPT-3, Claude, etc.
- **Preguntas adaptativas** - Dificultad basada en respuestas anteriores
- **Categorías personalizadas** - Crear categorías específicas
- **Explicaciones mejoradas** - Feedback más detallado

### 🎨 Mejoras de UX/UI
- **Temas personalizables** - Terminal verde, azul, etc.
- **Efectos de sonido** - Sonidos de terminal retro
- **Modo oscuro/claro** - Alternar entre temas
- **Animaciones 3D** - Efectos visuales avanzados

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**José** - Desarrollador Full Stack

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
