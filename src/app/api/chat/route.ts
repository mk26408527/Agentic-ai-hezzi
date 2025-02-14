import { NextResponse } from 'next/server';

const HUGGING_FACE_API_URL = "https://api-inference.huggingface.co/models/gpt2";

export async function POST(req: Request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;

    const response = await fetch(HUGGING_FACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HF_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: lastMessage,
        parameters: {
          max_new_tokens: 50,
          return_full_text: false
        }
      }),
    });

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    return NextResponse.json({
      role: 'assistant',
      content: result[0]?.generated_text || "I'm here to help. What would you like to know?"
    }, { headers });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({
      role: 'assistant',
      content: "I apologize, but I'm having trouble processing your request. Please try again later."
    }, { headers });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
} 