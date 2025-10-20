// ===== SECURE CHATBOT - NO API KEYS IN FRONTEND =====
// API calls now go through Netlify Functions

// ===== CHATBOT STATE =====
let threadId = null;
let isProcessing = false;

// ===== INITIALIZE CHATBOT =====
function initializeChatbot() {
    const modal = document.getElementById('chatbotModal');
    const chatbotContent = modal.querySelector('.chatbot-content');
    
    // Replace placeholder with actual chat interface
    chatbotContent.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
            <div id="chatMessages" style="flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 1rem; background: white;">
                <div class="bot-message">
                    <div style="background: #f0f0f0; padding: 0.75rem 1rem; border-radius: 12px; max-width: 80%;">
                        <strong style="color: #DD292F;">SIA Assistant:</strong>
                        <p style="margin: 0.5rem 0 0 0; color: #333;">Hello! I'm here to help you learn about <strong>SHE IS AI</strong>. Ask me anything about our mission, programs, how to get involved, or our community!</p>
                    </div>
                </div>
            </div>
            <div style="padding: 1rem; background: white; border-top: 1px solid #ddd;">
                <div style="display: flex; gap: 0.5rem;">
                    <input 
                        type="text" 
                        id="userInput" 
                        placeholder="Ask about SHE IS AI..."
                        style="flex: 1; padding: 0.75rem; border: 2px solid #114E8E; border-radius: 8px; font-family: 'Open Sans', sans-serif;"
                    >
                    <button 
                        id="sendButton"
                        style="background: #114E8E; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 8px; cursor: pointer; font-weight: 700;"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    `;

    // Add event listeners
    const sendButton = document.getElementById('sendButton');
    const userInput = document.getElementById('userInput');
    
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// ===== SEND MESSAGE =====
async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    
    if (!message || isProcessing) return;
    
    isProcessing = true;
    const sendButton = document.getElementById('sendButton');
    sendButton.textContent = 'Sending...';
    sendButton.disabled = true;
    
    // Display user message
    displayMessage(message, 'user');
    userInput.value = '';
    
    try {
        // Create thread if it doesn't exist
        if (!threadId) {
            threadId = await createThread();
        }
        
        // Send message and get run ID
        const runId = await addMessageAndRun(threadId, message);
        
        // Poll for completion
        const response = await waitForCompletion(threadId, runId);
        
        // Display bot response
        displayMessage(response, 'bot');
        
    } catch (error) {
        console.error('Error:', error);
        displayMessage('Sorry, I encountered an error. Please try again.', 'bot');
    } finally {
        isProcessing = false;
        sendButton.textContent = 'Send';
        sendButton.disabled = false;
    }
}

// ===== CREATE THREAD =====
async function createThread() {
    const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'createThread'
        })
    });
    
    const data = await response.json();
    return data.threadId;
}

// ===== ADD MESSAGE AND RUN =====
async function addMessageAndRun(threadId, message) {
    const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: 'sendMessage',
            threadId: threadId,
            message: message
        })
    });
    
    const data = await response.json();
    return data.runId;
}

// ===== WAIT FOR COMPLETION =====
async function waitForCompletion(threadId, runId) {
    while (true) {
        const response = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'checkStatus',
                threadId: threadId,
                runId: runId
            })
        });
        
        const data = await response.json();
        
        if (data.status === 'completed') {
            return data.message;
        }
        
        if (data.status === 'failed' || data.status === 'cancelled' || data.status === 'expired') {
            throw new Error('Assistant run failed');
        }
        
        // Wait 1 second before checking again
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

// ===== DISPLAY MESSAGE =====
function displayMessage(message, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div style="background: #114E8E; color: white; padding: 0.75rem 1rem; border-radius: 12px; max-width: 80%; margin-left: auto; text-align: right;">
                ${escapeHtml(message)}
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div style="background: #f0f0f0; padding: 0.75rem 1rem; border-radius: 12px; max-width: 80%;">
                <strong style="color: #DD292F;">SIA Assistant:</strong>
                <p style="margin: 0.5rem 0 0 0; color: #333;">${escapeHtml(message)}</p>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== ESCAPE HTML =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== INITIALIZE ON CHATBOT OPEN =====
const originalToggleChatbot = window.toggleChatbot;
window.toggleChatbot = function() {
    const modal = document.getElementById('chatbotModal');
    const isCurrentlyHidden = modal.style.display !== 'flex';
    
    if (isCurrentlyHidden && !modal.dataset.initialized) {
        initializeChatbot();
        modal.dataset.initialized = 'true';
    }
    
    originalToggleChatbot();
};

// ===== ADD STYLES =====
const style = document.createElement('style');
style.textContent = `
    #chatMessages::-webkit-scrollbar {
        width: 8px;
    }
    
    #chatMessages::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    #chatMessages::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 4px;
    }
    
    #chatMessages::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
`;
document.head.appendChild(style);