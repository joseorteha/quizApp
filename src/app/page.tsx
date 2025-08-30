'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Importar dinámicamente el componente Quiz para evitar errores de SSR con Hugging Face
const Quiz = dynamic(() => import('../components/Quiz'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-foreground mx-auto"></div>
        <p className="mt-4">Cargando Quiz...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Quiz App con Estilo Terminal</h1>
      <Suspense fallback={<div>Cargando...</div>}>
        <Quiz />
      </Suspense>
      <footer className="mt-8 text-center text-sm opacity-70">
        Creado por José - Usando Next.js, TypeScript, Tailwind CSS y Hugging Face GPT-2
      </footer>
    </div>
  );
}
