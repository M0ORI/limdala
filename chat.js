 const API_KEY = ''
 
 async function getCompletition() {
   const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + API_KEY,
            body : JSON.stringify({
                model : 'gpt-3.5-turbo-16k',
                prompt: 'Dame un nombre aleatorio de un leguaje de programacion',
                max_tokens: 5
            })
        }
    })

    const data = await res.json();
    console.log(data)
 }

//  getCompletition()
 
 
 
 
 // Función para enviar un mensaje del usuario al chat
 function sendMessage() {
    var userInput = document.getElementById('user-input').value;
    appendMessage('Tú', userInput);

    // Llamar a la función para que el bot responda
    botResponse(userInput);

    document.getElementById('user-input').value = ''; // Limpiar el campo de entrada después de enviar el mensaje
}

// Función para agregar un mensaje al registro del chat
function appendMessage(sender, message) {
    var messageLog = document.getElementById('message-log');
    messageLog.value += sender + ': ' + message + '\n';

    // Hacer scroll automático hacia abajo para mostrar el mensaje más reciente
    messageLog.scrollTop = messageLog.scrollHeight;
}

// Función para que el bot responda
function botResponse(userInput) {
    // Aquí puedes agregar la lógica para que el bot responda al mensaje del usuario
    // Por ahora, simplemente responderemos con un mensaje predefinido
    var botResponse = "¡Hola! Soy un bot. Gracias por tu mensaje: '" + userInput + "'.";
    appendMessage('Bot', botResponse);
}