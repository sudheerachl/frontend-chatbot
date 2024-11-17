document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('user-message').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

async function sendMessage() {
  const message = document.getElementById('user-message').value;
  if (!message) return;

  displayMessage(message, 'user');
  document.getElementById('user-message').value = '';

  try {
    const response = await fetch('http://127.0.0.1:5000/get_response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: message }),
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
  const chatBox = document.getElementById('chat-box');
  const messageDiv = document.createElement('div');

  if (sender === 'user') {
    messageDiv.innerText = message;
  } else {
    messageDiv.innerText = `Chatbot: ${message}`;
  }

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
