const chatBox = document.getElementById('chat-box');
const userMessageInput = document.getElementById('user-message');
const sendMessageButton = document.getElementById('send-button');

sendMessageButton.addEventListener('click', sendMessage);
userMessageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

async function sendMessage() {
    const message = userMessageInput.value.trim();
    if (!message) return;

    displayMessage(message, 'user');
    userMessageInput.value = '';

    try {
        const response = await fetch('https://backend-chabot.onrender.com/get_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        if (data.response) {
            displayMessage(data.response, 'bot');
        } else {
            displayMessage("Sorry, I couldn't understand that. Please try again.", 'bot');
        }
    } catch (error) {
        console.error('Error:', error);
        displayMessage("Oops! Something went wrong. Try again later.", 'bot');
    }
}

function displayMessage(message, sender) {
    const messageDiv = document.createElement('div');
    if (sender === 'user') {
        messageDiv.classList.add('user');
    } else {
        messageDiv.classList.add('bot');
    }
    messageDiv.innerText = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
