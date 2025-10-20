// Netlify Serverless Function for Chatbot
// This keeps your API keys secure

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    // Get API key from environment variables
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const ASSISTANT_ID = process.env.ASSISTANT_ID;

    if (!OPENAI_API_KEY || !ASSISTANT_ID) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Server configuration error' })
        };
    }

    try {
        const { action, threadId, message, runId } = JSON.parse(event.body);

        switch (action) {
            case 'createThread':
                return await createThread(OPENAI_API_KEY);
            
            case 'sendMessage':
                return await sendMessage(OPENAI_API_KEY, ASSISTANT_ID, threadId, message);
            
            case 'checkStatus':
                return await checkStatus(OPENAI_API_KEY, threadId, runId);
            
            default:
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Invalid action' })
                };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};

// Create a new thread
async function createThread(apiKey) {
    const response = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'OpenAI-Beta': 'assistants=v2'
        }
    });
    
    const data = await response.json();
    
    return {
        statusCode: 200,
        body: JSON.stringify({ threadId: data.id })
    };
}

// Send message and run assistant
async function sendMessage(apiKey, assistantId, threadId, message) {
    // Add message to thread
    await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'OpenAI-Beta': 'assistants=v2'
        },
        body: JSON.stringify({
            role: 'user',
            content: message
        })
    });

    // Create run
    const runResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'OpenAI-Beta': 'assistants=v2'
        },
        body: JSON.stringify({
            assistant_id: assistantId
        })
    });
    
    const run = await runResponse.json();
    
    return {
        statusCode: 200,
        body: JSON.stringify({ runId: run.id })
    };
}

// Check run status and get response
async function checkStatus(apiKey, threadId, runId) {
    // Check run status
    const statusResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'OpenAI-Beta': 'assistants=v2'
        }
    });
    
    const status = await statusResponse.json();
    
    if (status.status === 'completed') {
        // Get messages
        const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'OpenAI-Beta': 'assistants=v2'
            }
        });
        
        const messages = await messagesResponse.json();
        const lastMessage = messages.data[0];
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                status: 'completed',
                message: lastMessage.content[0].text.value
            })
        };
    }
    
    return {
        statusCode: 200,
        body: JSON.stringify({
            status: status.status
        })
    };
}