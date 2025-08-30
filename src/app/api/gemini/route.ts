import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
  try {
    const { prompt, maxTokens = 100, temperature = 0.7 } = await request.json();
    
    // Validar que tenemos una API key
    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      console.log('❌ Google Gemini API key not found');
      return NextResponse.json({
        success: false,
        message: 'Google Gemini API key not configured',
        model: 'none'
      });
    }
    
    console.log('🚀 Using Google Gemini API...');
    
    // Inicializar Google Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Lista de modelos para probar
    const modelsToTry = [
      "gemini-1.5-flash",
      "gemini-1.5-pro", 
      "gemini-pro",
      "models/gemini-1.5-flash",
      "models/gemini-pro"
    ];
    
    let lastError = null;
    
    for (const modelName of modelsToTry) {
      try {
        console.log(`🧪 Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        // Configurar parámetros de generación
        const generationConfig = {
          temperature: temperature,
          topK: 1,
          topP: 1,
          maxOutputTokens: maxTokens,
        };
        
        // Generar contenido
        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig,
        });
        
        const response = await result.response;
        const text = response.text();
        
        console.log(`✅ Success with model: ${modelName}`);
        
        return NextResponse.json({
          success: true,
          text: text.trim(),
          model: modelName,
          provider: 'Google Gemini'
        });
        
      } catch (modelError: any) {
        console.log(`❌ Model ${modelName} failed:`, modelError.message);
        lastError = modelError;
        continue;
      }
    }
    
    // Si todos los modelos fallan
    throw lastError || new Error('All models failed');
    
  } catch (error: any) {
    console.error('❌ Google Gemini API error:', error);
    
    return NextResponse.json({
      success: false,
      message: `Google Gemini error: ${error.message}`,
      model: 'gemini-api'
    });
  }
}
