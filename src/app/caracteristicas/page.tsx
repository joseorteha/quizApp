'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';

const MatrixBackground = dynamic(() => import('../../components/MatrixBackground'), {
  ssr: false,
});

const features = [
  {
    icon: '🤖',
    title: 'Inteligencia Artificial Avanzada',
    description: 'Utilizamos Google Gemini AI para generar preguntas dinámicas y únicas en cada partida.',
    details: ['Preguntas generadas en tiempo real', 'Explicaciones inteligentes', 'Múltiples niveles de dificultad']
  },
  {
    icon: '🎯',
    title: 'Categorías Diversas',
    description: 'Desde programación hasta historia, tenemos categorías para todos los gustos.',
    details: ['10+ categorías disponibles', 'Modo mixto para máximo desafío', 'Contenido actualizado constantemente']
  },
  {
    icon: '⚡',
    title: 'Interfaz Ultramoderna',
    description: 'Diseño inspirado en terminales futuristas con efectos visuales impresionantes.',
    details: ['Efectos Matrix en tiempo real', 'Glassmorphism y animaciones', 'Diseño responsive']
  },
  {
    icon: '🔄',
    title: 'Sistema de Respaldo Inteligente',
    description: 'Si la IA principal falla, nuestro sistema de respaldo garantiza la continuidad.',
    details: ['Múltiples APIs de IA', 'Preguntas de fallback de calidad', 'Sin interrupciones en el juego']
  },
  {
    icon: '📱',
    title: 'Completamente Responsive',
    description: 'Funciona perfectamente en dispositivos móviles, tablets y computadoras.',
    details: ['Optimizado para touch', 'Interfaz adaptable', 'Experiencia fluida en todos los dispositivos']
  },
  {
    icon: '🚀',
    title: 'Tecnología de Vanguardia',
    description: 'Construido con las últimas tecnologías web para máximo rendimiento.',
    details: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
  }
];

export default function Caracteristicas() {
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
              <Link href="/caracteristicas" className="text-green-300 font-semibold">Características</Link>
              <Link href="/acerca-de" className="hover:text-green-300 transition-colors">Acerca de</Link>
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
                  className="text-green-300 font-semibold text-center py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Características
                </Link>
                <Link 
                  href="/acerca-de" 
                  className="hover:text-green-300 transition-colors text-center py-2"
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
                Características
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                Descubre por qué QuizAI es la plataforma de quizzes más avanzada del mercado
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-black/30 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6 sm:p-8 hover:border-green-400/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{feature.icon}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-green-400 text-xs sm:text-sm">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-2 sm:mr-3 flex-shrink-0"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="text-center bg-gradient-to-r from-green-400/10 to-green-500/10 rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-green-400/30">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
                ¿Listo para poner a prueba tu conocimiento?
              </h2>
              <p className="text-gray-300 mb-6 sm:mb-8 text-base sm:text-lg px-4">
                Experimenta la nueva generación de quizzes impulsados por IA
              </p>
              <Link 
                href="/"
                className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-400 to-green-500 text-black font-bold rounded-lg hover:from-green-300 hover:to-green-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-400/25 text-sm sm:text-base"
              >
                🚀 Comenzar Quiz
              </Link>
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
