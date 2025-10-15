const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.handler = async (event, context) => {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { message, threadId } = JSON.parse(event.body);

    // Create or use existing thread
    let currentThreadId = threadId;
    if (!currentThreadId) {
      const thread = await openai.beta.threads.create();
      currentThreadId = thread.id;
    }

    // Add message to thread
    await openai.beta.threads.messages.create(currentThreadId, {
      role: 'user',
      content: message,
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(currentThreadId, {
      assistant_id: 'asst_ZhWcpqNTfqYdlImgbfqXyrSn',
    });

    // Wait for completion
    let runStatus = await openai.beta.threads.runs.retrieve(
      currentThreadId,
      run.id
    );

    // Poll until complete (with timeout)
    let attempts = 0;
    while (runStatus.status !== 'completed' && attempts < 30) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(
        currentThreadId,
        run.id
      );
      attempts++;
    }

    if (runStatus.status !== 'completed') {
      throw new Error('Assistant response timeout');
    }

    // Get messages
    const messages = await openai.beta.threads.messages.list(currentThreadId);
    const lastMessage = messages.data[0];
    const response = lastMessage.content[0].text.value;

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reply: response,
        threadId: currentThreadId,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};