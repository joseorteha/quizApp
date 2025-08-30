import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

// Esta API route se ejecuta en el servidor donde las variables de entorno están disponibles
export async function POST(request: NextRequest) {
  try {
    const { prompt, maxTokens = 100, temperature = 0.7 } = await request.json();
    
    // Verificar API key en el servidor
    const apiKey = process.env.HUGGING_FACE_API_KEY;
    
    if (!apiKey || apiKey === 'tu_api_key_aqui' || apiKey === 'demo_mode' || apiKey.length < 10) {
      return NextResponse.json({ 
        success: false, 
        message: 'No valid API key found',
        usesFallback: true 
      });
    }

    const hf = new HfInference(apiKey);
    
    // Modelos que están actualmente disponibles
    const availableModels = [
      'google/flan-t5-small',
      'microsoft/DialoGPT-medium', 
      'facebook/blenderbot-400M-distill',
      'microsoft/DialoGPT-small',
      'distilgpt2'
    ];

    // Intentar con cada modelo
    for (const model of availableModels) {
      try {
        console.log(`[API] Trying model: ${model}`);
        
        const response = await hf.textGeneration({
          model: model,
          inputs: prompt,
          parameters: {
            max_new_tokens: maxTokens,
            temperature: temperature,
            return_full_text: false,
          },
        });

        console.log(`[API] Success with model: ${model}`);
        
        return NextResponse.json({
          success: true,
          text: response.generated_text.trim(),
          model: model,
          usesFallback: false
        });
        
      } catch (error: unknown) {
        const err = error as Error;
        console.log(`[API] Model ${model} failed:`, err.message);
        continue;
      }
    }
    
    // Si todos fallan
    return NextResponse.json({ 
      success: false, 
      message: 'All models failed',
      usesFallback: true 
    });
    
  } catch (error: unknown) {
    const err = error as Error;
    console.error('[API] Error:', err);
    return NextResponse.json({ 
      success: false, 
      message: err.message,
      usesFallback: true 
    });
  }
}
