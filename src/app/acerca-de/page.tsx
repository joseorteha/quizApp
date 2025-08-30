'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';

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
  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      {/* Fondo de matriz */}
      <MatrixBackground />
      
      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <Link href="/" className="text-2xl font-bold tracking-wider hover:text-green-300 transition-colors">
              <span className="text-white">QUIZ</span>
              <span className="text-green-400">AI</span>
            </Link>
            <div className="flex space-x-6">
              <Link href="/" className="hover:text-green-300 transition-colors">Inicio</Link>
              <Link href="/caracteristicas" className="hover:text-green-300 transition-colors">Características</Link>
              <Link href="/acerca-de" className="text-green-300 font-semibold">Acerca de</Link>
            </div>
          </nav>
        </header>

        {/* Contenido principal */}
        <main className="flex-1 px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-green-300 to-green-500 bg-clip-text text-transparent">
                Acerca de QuizAI
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Un proyecto de pasión nacido en Zongolica, Veracruz
              </p>
            </div>

            {/* About the Project */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div className="bg-black/30 backdrop-blur-sm border border-green-400/30 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">🎯 Sobre el Proyecto</h2>
                <p className="text-gray-300 mb-4">
                  QuizAI nació de la idea de revolucionar la forma en que aprendemos y nos divertimos. 
                  No me conformaba con los quizzes tradicionales con preguntas repetitivas, quería crear algo diferente.
                </p>
                <p className="text-gray-300 mb-4">
                  Utilizando la potencia de Google Gemini AI, cada pregunta es única y se genera dinámicamente, 
                  proporcionando una experiencia de aprendizaje personalizada y desafiante.
                </p>
                <p className="text-green-400 font-semibold">
                  &ldquo;Si puedes soñarlo, puedes programarlo&rdquo; - Mi filosofía de desarrollo.
                </p>
              </div>

              <div className="bg-black/30 backdrop-blur-sm border border-green-400/30 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">⚡ Tecnología de Vanguardia</h2>
                <p className="text-gray-300 mb-6">
                  Este proyecto está construido con las tecnologías más modernas del desarrollo web:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {technologies.map((tech, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-green-400/10 rounded-lg">
                      <span className="text-2xl">{tech.icon}</span>
                      <span className="text-green-400 font-medium">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* About Me */}
            <div className="bg-gradient-to-r from-green-400/10 to-green-500/10 rounded-3xl p-12 border border-green-400/30 mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-1 text-center">
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <Image
                      src="/yo.jpeg"
                      alt="José Ortega - Desarrollador"
                      fill
                      className="rounded-full object-cover border-4 border-green-400/50"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">José Ortega</h3>
                  <p className="text-green-400 font-semibold mb-4">
                    Fundador de Cyber Código | Desarrollador Web & Digital Maker
                  </p>
                </div>

                <div className="lg:col-span-2">
                  <h2 className="text-3xl font-bold text-white mb-6">👋 ¡Hola! Soy José</h2>
                  <p className="text-gray-300 mb-4">
                    Desde niño siempre fui curioso. No me bastaba con usar las cosas, quería 
                    entender <span className="text-green-400 font-semibold">cómo funcionaban por dentro</span>. 
                    Así terminé metido en el mundo del código, donde descubrí algo increíble: 
                    <span className="text-white font-semibold"> con programación puedes construir lo que te imagines</span>.
                  </p>
                  
                  <p className="text-gray-300 mb-4">
                    Soy estudiante en el <a href="https://zongolica.tecnm.mx/" target="_blank" className="text-green-400 hover:text-green-300 transition-colors underline">Instituto Tecnológico Superior de Zongolica</a>, 
                    y actualmente estoy cumpliendo un sueño personal con <a href="https://cybercodigo-seven.vercel.app/" target="_blank" className="text-green-400 hover:text-green-300 transition-colors font-semibold">Cyber Código</a>: 
                    ayudar a que los negocios locales tengan acceso a las herramientas digitales que usan las grandes marcas.
                  </p>

                  <p className="text-gray-300 mb-6">
                    <span className="text-green-400 font-semibold">QuizAI</span> es uno de mis proyectos favoritos porque combina 
                    mis dos pasiones: la tecnología y el aprendizaje. Me gusta el café, el diseño limpio y 
                    ver a la banda local progresar.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-green-400/20 hover:bg-green-400/30 rounded-lg transition-all duration-300 transform hover:scale-105"
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
            <div className="text-center bg-black/30 backdrop-blur-sm border border-green-400/30 rounded-2xl p-12">
              <h2 className="text-3xl font-bold text-white mb-6">🚀 Mi Misión</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
                Crear tecnología que inspire, eduque y empodere. QuizAI es más que un juego, 
                es una herramienta para el crecimiento personal y el aprendizaje continuo.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-green-400/10 rounded-xl">
                  <div className="text-3xl mb-3">🌟</div>
                  <h3 className="text-lg font-bold text-white mb-2">Innovación</h3>
                  <p className="text-gray-300 text-sm">Siempre buscando nuevas formas de mejorar la experiencia del usuario</p>
                </div>
                <div className="p-6 bg-green-400/10 rounded-xl">
                  <div className="text-3xl mb-3">🎓</div>
                  <h3 className="text-lg font-bold text-white mb-2">Educación</h3>
                  <p className="text-gray-300 text-sm">Hacer el aprendizaje divertido y accesible para todos</p>
                </div>
                <div className="p-6 bg-green-400/10 rounded-xl">
                  <div className="text-3xl mb-3">🌍</div>
                  <h3 className="text-lg font-bold text-white mb-2">Impacto</h3>
                  <p className="text-gray-300 text-sm">Conectar el talento local con el mundo digital</p>
                </div>
              </div>
            </div>
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
