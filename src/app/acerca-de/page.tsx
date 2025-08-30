'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const MatrixBackground = dynamic(() => import('../../components/MatrixBackground'), {
  ssr: false,
});

const technologies = [
  { name: 'Next.js 15', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Google Gemini AI', icon: '🤖' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Framer Motion', icon: '✨' },
  { name: 'Vercel', icon: '▲' }
];

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/joseorteha', icon: '🐙' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/jose-orteg4/', icon: '💼' },
  { name: 'Instagram', url: 'https://www.instagram.com/mr.orteg4/', icon: '📸' },
  { name: 'Cyber Código', url: 'https://cybercodigo-seven.vercel.app/', icon: '🚀' },
  { name: 'Portafolio', url: 'https://jose-ortega-dev.netlify.app/', icon: '🌐' }
];

export default function AcercaDe() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      {/* Fondo de matriz */}
      <MatrixBackground />
      
      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 sm:p-6">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <Link href="/" className="text-xl sm:text-2xl font-bold tracking-wider hover:text-green-300 transition-colors">
              <span className="text-white">QUIZ</span>
              <span className="text-green-400">AI</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="hover:text-green-300 transition-colors">Inicio</Link>
              <Link href="/caracteristicas" className="hover:text-green-300 transition-colors">Características</Link>
              <Link href="/acerca-de" className="text-green-300 font-semibold">Acerca de</Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-green-400 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </nav>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-green-400/30">
              <div className="flex flex-col space-y-4 pt-4">
                <Link 
                  href="/" 
                  className="hover:text-green-300 transition-colors text-center py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link 
                  href="/caracteristicas" 
                  className="hover:text-green-300 transition-colors text-center py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Características
                </Link>
                <Link 
                  href="/acerca-de" 
                  className="text-green-300 font-semibold text-center py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Acerca de
                </Link>
              </div>
            </div>
          )}
        </header>

        {/* Contenido principal */}
        <main className="flex-1 px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">
                Acerca de QuizAI
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                Un proyecto de pasión nacido en Zongolica, Veracruz
              </p>
            </div>

            {/* About the Project */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
              <div className="bg-black/30 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">🎯 Sobre el Proyecto</h2>
                <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                  QuizAI nació de la idea de revolucionar la forma en que aprendemos y nos divertimos. 
                  No me conformaba con los quizzes tradicionales con preguntas repetitivas, quería crear algo diferente.
                </p>
                <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                  Utilizando la potencia de Google Gemini AI, cada pregunta es única y se genera dinámicamente, 
                  proporcionando una experiencia de aprendizaje personalizada y desafiante.
                </p>
                <p className="text-green-400 font-semibold text-sm sm:text-base">
                  &ldquo;Si puedes soñarlo, puedes programarlo&rdquo; - Mi filosofía de desarrollo.
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">⚡ Tecnología de Vanguardia</h2>
                <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                  Este proyecto está construido con las tecnologías más modernas del desarrollo web:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {technologies.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-green-400/10 rounded-lg">
                      <span className="text-xl sm:text-2xl">{tech.icon}</span>
                      <span className="text-green-400 font-medium text-sm sm:text-base">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* About Me */}
            <div className="bg-gradient-to-r from-green-400/10 to-green-500/10 rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-green-400/30 mb-12 sm:mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-center">
                <div className="lg:col-span-1 text-center">
                  <div className="relative w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-4 sm:mb-6">
                    <Image
                      src="/yo.jpeg"
                      alt="José Ortega - Desarrollador"
                      fill
                      className="rounded-full object-cover border-4 border-green-400/50"
                    />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-2">José Ortega</h3>
                  <p className="text-green-400 font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
                    Fundador de Cyber Código | Desarrollador Web & Digital Maker
                  </p>
                </div>

                <div className="lg:col-span-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">👋 ¡Hola! Soy José</h2>
                  <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                    Desde niño siempre fui curioso. No me bastaba con usar las cosas, quería 
                    entender <span className="text-green-400 font-semibold">cómo funcionaban por dentro</span>. 
                    Así terminé metido en el mundo del código, donde descubrí algo increíble: 
                    <span className="text-white font-semibold"> con programación puedes construir lo que te imagines</span>.
                  </p>
                  
                  <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                    Soy estudiante en el <a href="https://zongolica.tecnm.mx/" target="_blank" className="text-green-400 hover:text-green-300 transition-colors underline">Instituto Tecnológico Superior de Zongolica</a>, 
                    y actualmente estoy cumpliendo un sueño personal con <a href="https://cybercodigo-seven.vercel.app/" target="_blank" className="text-green-400 hover:text-green-300 transition-colors font-semibold">Cyber Código</a>: 
                    ayudar a que los negocios locales tengan acceso a las herramientas digitales que usan las grandes marcas.
                  </p>

                  <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                    <span className="text-green-400 font-semibold">QuizAI</span> es uno de mis proyectos favoritos porque combina 
                    mis dos pasiones: la tecnología y el aprendizaje. Me gusta el café, el diseño limpio y 
                    ver a la banda local progresar.
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1 sm:py-2 bg-green-400/20 hover:bg-green-400/30 rounded-lg transition-all duration-300 transform hover:scale-105 text-xs sm:text-sm"
                      >
                        <span>{link.icon}</span>
                        <span className="text-green-400 font-medium">{link.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="text-center bg-black/30 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6">🚀 Mi Misión</h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-4xl mx-auto px-4">
                Crear tecnología que inspire, eduque y empodere. QuizAI es más que un juego, 
                es una herramienta para el crecimiento personal y el aprendizaje continuo.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-4 sm:p-6 bg-green-400/10 rounded-xl">
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🌟</div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">Innovación</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">Siempre buscando nuevas formas de mejorar la experiencia del usuario</p>
                </div>
                <div className="p-4 sm:p-6 bg-green-400/10 rounded-xl">
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🎓</div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">Educación</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">Hacer el aprendizaje divertido y accesible para todos</p>
                </div>
                <div className="p-4 sm:p-6 bg-green-400/10 rounded-xl">
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🌍</div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 sm:mb-2">Impacto</h3>
                  <p className="text-gray-300 text-xs sm:text-sm">Conectar el talento local con el mundo digital</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
         <footer className="relative z-10 p-4 sm:p-6 mt-auto border-t border-green-400/20 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              Desarrollado con ❤️ por <span className="text-green-400 font-semibold">José Ortega</span>
            </p>
            <p className="text-gray-500 text-xs mt-1 sm:mt-2">
              © 2025 QuizAI. Zongolica, Veracruz • <a href="https://cybercodigo-seven.vercel.app/" className="text-green-400 hover:text-green-300 transition-colors">Cyber Código</a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
