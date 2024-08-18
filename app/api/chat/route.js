// app/api/chat/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { query, isFirstInteraction } = await req.json();

    let prompt = '';

    if (isFirstInteraction) {
      prompt = "Welcome to the News Bot! How can I assist you today?";
    } else {
      prompt = query;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) { // Too Many Requests
        // Retry logic with exponential backoff
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        return POST(req); // Retry request
      }
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const botReply = data.choices[0]?.message?.content || 'Sorry, I could not process your request.';

    return new NextResponse(JSON.stringify({ response: botReply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return new NextResponse(JSON.stringify({ response: 'An error occurred. Please try again later.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
