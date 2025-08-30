'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Suspense } from 'react';

// Importar dinámicamente los componentes para evitar errores de SSR
const Quiz = dynamic(() => import('../components/Quiz'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400 mx-auto"></div>
        <p className="mt-4 text-green-400">Inicializando IA...</p>
      </div>
    </div>
  ),
});

const MatrixBackground = dynamic(() => import('../components/MatrixBackground'), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      {/* Fondo de matriz */}
      <MatrixBackground />
      
      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="text-2xl font-bold tracking-wider">
              <span className="text-white">QUIZ</span>
              <span className="text-green-400">AI</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/caracteristicas" className="hover:text-green-300 transition-colors">Características</Link>
              <Link href="/acerca-de" className="hover:text-green-300 transition-colors">Acerca de</Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">
              El Verdadero Quiz
            </h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light mb-8 text-white">
              Colabora con
              <span className="block text-green-400 font-bold">Inteligencia Artificial</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              QuizAI es tu compañero de 10x que puede generar preguntas dinámicas 
              e inteligentes para ti de forma independiente.
            </p>
          </div>

          {/* Quiz Component */}
          <div className="w-full max-w-4xl">
            <Suspense fallback={
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-pulse text-green-400 text-xl mb-4">
                    🤖 Cargando Inteligencia Artificial...
                  </div>
                </div>
              </div>
            }>
              <Quiz />
            </Suspense>
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 p-6 mt-auto border-t border-green-400/20 bg-black/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400 text-sm">
              Desarrollado con ❤️ por <span className="text-green-400 font-semibold">José Ortega</span> usando Next.js, TypeScript, Tailwind CSS y Google Gemini AI
            </p>
            <p className="text-gray-500 text-xs mt-2">
              © 2025 QuizAI. Zongolica, Veracruz • <a href="https://cybercodigo-seven.vercel.app/" className="text-green-400 hover:text-green-300 transition-colors">Cyber Código</a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
