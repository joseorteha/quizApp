module.exports = {
  // Configuración existente...
  env: {
    HUGGING_FACE_API_KEY: process.env.HUGGING_FACE_API_KEY,
  },
};/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuración para manejar módulos de Hugging Face
  webpack: (config) => {
    // Resolver problemas con módulos de Node.js en el navegador
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    return config;
  },
  // Set output file tracing root to avoid workspace root warning
  outputFileTracingRoot: __dirname
};

module.exports = nextConfig;