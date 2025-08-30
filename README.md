# 🎯 Quiz Terminal App

## 🚀 Una Experiencia de Quiz Interactiva con Estilo Terminal Matrix

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Google-Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

[![GitHub stars](https://img.shields.io/github/stars/joseorteha/quizApp?style=social)](https://github.com/joseorteha/quizApp/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/joseorteha/quizApp?style=social)](https://github.com/joseorteha/quizApp/network/members)
[![GitHub issues](https://img.shields.io/github/issues/joseorteha/quizApp)](https://github.com/joseorteha/quizApp/issues)
[![License](https://img.shields.io/github/license/joseorteha/quizApp)](./LICENSE)

---

## 📖 Descripción

**Quiz Terminal App** es una aplicación web moderna que combina la nostalgia de las terminales clásicas con la potencia de la IA moderna. Disfruta de quizzes interactivos en múltiples categorías con una interfaz que te transportará al mundo de Matrix.

### ✨ **Características Destacadas**

- 🎮 **Interfaz Terminal Retro**: Experiencia visual inspirada en Matrix
- 🤖 **IA Integrada**: Preguntas generadas por Google Gemini API
- 📚 **Múltiples Categorías**: Programación, Historia, Ciencia, Geografía, Arte, Deportes, Tecnología, Música, Cine, Literatura
- 💾 **Sistema de Fallback**: 60+ preguntas locales cuando las APIs fallan
- 🎯 **Contador de Progreso**: Seguimiento dinámico de tu avance
- 📱 **Responsive Design**: Perfecto en desktop y móvil
- 🌟 **Efectos Glassmorphism**: Diseño moderno y elegante
- ⚡ **Super Rápido**: Optimizado con Next.js 15 y React 18

---

## 🖥️ Vista Previa

### 🏠 Pantalla Principal
*Selecciona tu categoría favorita y comienza la aventura*

### 🎯 Modo Quiz
*Interfaz terminal con preguntas dinámicas y explicaciones detalladas*

### 📊 Resultados
*Visualiza tu puntuación y progreso*

---

## 🚀 Instalación Rápida

### 📋 Prerequisitos

- **Node.js** 18.0 o superior
- **npm** o **yarn**
- **API Key de Google Gemini** (opcional)

### 🔧 Pasos de Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/joseorteha/quizApp.git
   cd quizApp
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Edita `.env.local` y agrega tu API key:
   ```env
   GOOGLE_GEMINI_API_KEY=tu_api_key_aqui
   ```

4. **Ejecuta en modo desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. **¡Abre tu navegador!**
   
   Visita [http://localhost:3000](http://localhost:3000) y disfruta del quiz 🎉

---

## 🎮 Cómo Usar

### 🌟 **Paso 1: Selecciona tu Categoría**
Elige entre 10 categorías diferentes según tus intereses:

- 💻 **Programación** - Para los amantes del código
- 📚 **Historia** - Viaja en el tiempo
- 🔬 **Ciencia** - Explora el universo
- 🌍 **Geografía** - Conoce el mundo
- 🎨 **Arte** - Descubre la belleza
- ⚽ **Deportes** - Vive la adrenalina
- 🚀 **Tecnología** - El futuro es ahora
- 🎵 **Música** - Siente el ritmo
- 🎬 **Cine** - Luces, cámara, acción
- 📖 **Literatura** - Palabras que inspiran

### 🎯 **Paso 2: Responde las Preguntas**
- Cada quiz contiene **10 preguntas únicas**
- Selecciona tu respuesta con un simple clic
- Obtén **explicaciones detalladas** de cada respuesta
- Observa tu **progreso en tiempo real**

### 📊 **Paso 3: Ve tus Resultados**
- Puntuación final detallada
- Porcentaje de aciertos
- Opción para repetir o cambiar de categoría

---

## 🛠️ Tecnologías

### 🚀 **Frontend**
- **Next.js 15.5.2** - Framework React de última generación
- **React 18** - Biblioteca de interfaces de usuario
- **TypeScript** - JavaScript con tipos estáticos
- **Tailwind CSS** - Framework de CSS utility-first

### 🤖 **IA y APIs**
- **Google Gemini API** - Generación inteligente de preguntas
- **HuggingFace API** - Modelos de IA alternativos
- **Sistema de Fallback** - Preguntas locales como respaldo

### 🎨 **Diseño y UX**
- **Glassmorphism Effects** - Efectos visuales modernos
- **Matrix Theme** - Estética terminal retro
- **CSS Custom Properties** - Variables CSS dinámicas
- **Responsive Design** - Adaptable a todos los dispositivos

---

## 📁 Estructura del Proyecto

```
🎯 Quiz Terminal App/
├── 📂 src/
│   ├── 📂 app/
│   │   ├── 📄 layout.tsx          # Layout principal
│   │   ├── 📄 page.tsx            # Página principal
│   │   ├── 📄 globals.css         # Estilos globales
│   │   └── 📂 api/
│   │       ├── 📂 generate/       # API de generación de preguntas
│   │       └── 📂 gemini/         # API de Google Gemini
│   ├── 📂 components/
│   │   ├── 📄 Quiz.tsx            # Componente principal del quiz
│   │   └── 📄 Terminal.tsx        # Componente de terminal
│   ├── 📂 styles/
│   │   └── 📄 terminal.css        # Estilos del terminal
│   └── 📂 utils/
│       └── 📄 huggingface.ts      # Utilities para HuggingFace
├── 📂 public/                     # Archivos estáticos
├── 📄 package.json               # Dependencias del proyecto
├── 📄 tailwind.config.js         # Configuración de Tailwind
├── 📄 next.config.js             # Configuración de Next.js
└── 📄 README.md                  # ¡Este archivo!
```

---

## 🎨 Características Técnicas

### ⚡ **Rendimiento**
- **Server-Side Rendering** con Next.js 15
- **Optimización automática** de imágenes y fonts
- **Code splitting** inteligente
- **Carga lazy** de componentes

### 🔒 **Seguridad**
- **Variables de entorno** protegidas
- **API routes** seguras
- **Validación de entrada** en todas las APIs
- **Rate limiting** para prevenir abuso

### 🌐 **Compatibilidad**
- **Todos los navegadores modernos**
- **PWA Ready** (Progressive Web App)
- **Mobile First** design
- **Accesibilidad** mejorada

### 🤖 **IA y Machine Learning**
- **Multiple AI Providers** (Gemini, HuggingFace)
- **Fallback System** robusto
- **Error handling** inteligente
- **Retry logic** automático

---

## 🎮 Comandos Disponibles

```bash
# 🚀 Desarrollo
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción
npm run lint         # Ejecuta el linter

# 🔧 Utilidades
npm run type-check   # Verificación de tipos TypeScript
npm run format       # Formatea el código con Prettier
```

---

## 🤝 Contribuir

¡Las contribuciones son siempre bienvenidas! 💪

### 🌟 **Cómo Contribuir**

1. **Fork** el proyecto
2. **Crea** tu feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la branch (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

### 🐛 **Reportar Bugs**

Si encuentras un bug, por favor [abre un issue](https://github.com/joseorteha/quizApp/issues/new) con:
- 📝 Descripción detallada del problema
- 🔄 Pasos para reproducir el bug
- 🖥️ Información del navegador/OS
- 📷 Screenshots si es posible

### 💡 **Sugerir Features**

¿Tienes una idea genial? [Compártela aquí](https://github.com/joseorteha/quizApp/issues/new) con:
- 🎯 Descripción de la feature
- 🤔 Por qué sería útil
- 📋 Casos de uso específicos

---

## 🔮 Próximas Características

### 🎯 **En Desarrollo**
- [ ] 🏆 **Sistema de Achievements** - Desbloquea logros
- [ ] 👥 **Modo Multijugador** - Compite con amigos
- [ ] 📈 **Analytics Avanzados** - Estadísticas detalladas
- [ ] 🎨 **Temas Personalizables** - Crea tu propio estilo

### 💭 **Ideas Futuras**
- [ ] 🔊 **Modo Audio** - Quiz con sonidos
- [ ] 📱 **App Móvil Nativa** - iOS y Android
- [ ] 🌐 **Internacionalización** - Múltiples idiomas
- [ ] 🤖 **Quiz Adaptativos** - Dificultad dinámica

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](./LICENSE) para más detalles.

---

## 👨‍💻 Autor

**José Orteha**
- 🐙 GitHub: [@joseorteha](https://github.com/joseorteha)
- 💼 LinkedIn: [José Orteha](https://linkedin.com/in/joseorteha)
- 📧 Email: joseorteha@example.com

---

## 🙏 Agradecimientos

- 🤖 **Google Gemini** por la API de IA
- 🔧 **Vercel** por el hosting
- 🎨 **Tailwind CSS** por el framework de estilos
- 💻 **Next.js Team** por el increíble framework
- 🌟 **Open Source Community** por las herramientas

---

## 📊 Estadísticas del Proyecto

![GitHub repo size](https://img.shields.io/github/repo-size/joseorteha/quizApp)
![GitHub code size](https://img.shields.io/github/languages/code-size/joseorteha/quizApp)
![GitHub top language](https://img.shields.io/github/languages/top/joseorteha/quizApp)
![GitHub last commit](https://img.shields.io/github/last-commit/joseorteha/quizApp)

---

<div align="center">

### 🎉 ¡Gracias por usar Quiz Terminal App! 🎉

Si este proyecto te gustó, ¡no olvides darle una ⭐!

**¡Que disfrutes el quiz!** 🚀✨

---

*Hecho con ❤️ y mucho ☕ por [José Orteha](https://github.com/joseorteha)*

</div>

