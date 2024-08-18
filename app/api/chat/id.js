
export async function POST(req) {
    const { query, isFirstInteraction } = await req.json();
  
    let prompt = '';
  
    if (isFirstInteraction) {
      // Welcome message and prompt to ask about the user's need
      prompt = "Welcome to the News Bot! How can I assist you today?";
    } else {
      // Use the user's query directly
      prompt = query;
    }
  
    // Call OpenAI's API
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
  
    const data = await response.json();
    const botReply = data.choices[0].message.content;
  
    return new Response(JSON.stringify({ response: botReply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  