 
 
 
 
 
 
 
 
 
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