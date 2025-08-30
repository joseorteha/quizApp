import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

export async function GET() {
  try {
    const apiKey = process.env.HUGGING_FACE_API_KEY;
    
    console.log('[TEST API] Testing Hugging Face API...');
    console.log('[TEST API] API Key:', apiKey ? apiKey.substring(0, 8) + '...' : 'undefined');
    
    if (!apiKey || apiKey === 'tu_api_key_aqui' || apiKey === 'demo_mode' || apiKey.length < 10) {
      return NextResponse.json({ 
        success: false, 
        message: 'No valid API key found',
        apiKey: apiKey ? 'Present but invalid' : 'Not found'
      });
    }

    const hf = new HfInference(apiKey);
    
    // Modelos para probar (más actualizados)
    const testModels = [
      'google/flan-t5-small',
      'microsoft/DialoGPT-medium',
      'facebook/blenderbot-400M-distill',
      'HuggingFaceH4/zephyr-7b-beta',
      'mistralai/Mistral-7B-Instruct-v0.1'
    ];

    const results = [];

    for (const model of testModels) {
      try {
        console.log(`[TEST API] Testing model: ${model}`);
        
        const response = await hf.textGeneration({
          model: model,
          inputs: 'What is the capital of France?',
          parameters: {
            max_new_tokens: 30,
            temperature: 0.7,
            return_full_text: false,
          },
        });
        
        console.log(`[TEST API] ✅ ${model} SUCCESS:`, response.generated_text);
        results.push({
          model,
          success: true,
          response: response.generated_text
        });
        
        // Si encontramos uno que funciona, usar ese
        return NextResponse.json({
          success: true,
          workingModel: model,
          response: response.generated_text,
          allResults: results
        });
        
      } catch (error: any) {
        console.log(`[TEST API] ❌ ${model} FAILED:`, error.message);
        results.push({
          model,
          success: false,
          error: error.message
        });
      }
    }
    
    return NextResponse.json({
      success: false,
      message: 'All models failed',
      allResults: results
    });
    
  } catch (error: any) {
    console.error('[TEST API] Error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    });
  }
}
