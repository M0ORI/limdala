const API_KEY = 'sk-proj-BPx2gOcQ0kyRftS7pDLmT3BlbkFJsxrgvP6W0om3DAvHyWTU';

async function getCompletition(prompt) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + API_KEY
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: "system", content: "Eres un asistente virtual de apoyo personal para la salud mental. Responde de manera empática, comprensiva y de apoyo. Brinda sugerencias y consejos útiles, y siempre anima a los usuarios a buscar ayuda profesional si es necesario. Evita respuestas muy largas, ademas solo haz enfasis en problemas relacionados a los sentimientos o problemas personales de una persona o grupo, no hagas tareas o cosas similares (diseño, programacion) etc." },
                { role: "user", content: prompt }
            ],
            temperature: 0.6
        })
    });

    const data = await res.json();
    return data;
}

const button = document.getElementById('send');
const userInput = document.getElementById('user-input');
const loadingIndicator = document.getElementById('loading');

button.addEventListener('click', async () => {
    if (!userInput.value) {
        return;
    }
    const prompt = userInput.value;
    sendMessage(prompt);
    loadingIndicator.style.display = 'block';
    const response = await getCompletition(prompt);
    loadingIndicator.style.display = 'none';
    //console.log(response);
    typeText(response.choices[0].message.content);
});

userInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {    
        if (!userInput.value) {
            return;
        }
        const prompt = userInput.value;
        sendMessage(prompt);
        loadingIndicator.style.display = 'block';
        const response = await getCompletition(prompt);
        loadingIndicator.style.display = 'none';
        //console.log(response);
        typeText(response.choices[0].message.content);
    }
});

function sendMessage(prompt) {
    messsageAppend(true, prompt); // Mensaje enviado por el usuario
    document.getElementById('user-input').value = ''; // Limpiar el campo de entrada después de enviar el mensaje
}

function botResponse(message) {
    messsageAppend(false, message); // Respuesta del bot
}

function messsageAppend(sender, message) {
    // Obtén el div por su id
    const chat = document.getElementById('message-log');

    // Crear el nuevo elemento
    const nuevoMensaje = document.createElement("div");
    // true = mensaje enviado por el usuario, false = mensaje enviado por el chatbot
    nuevoMensaje.className = sender ? 'message sent' : 'message received';

    // Crear el nuevo elemento <p>
    const texto = document.createElement("p");
    texto.textContent = message;

    // Insertar el <p> dentro del nuevo <div>
    nuevoMensaje.appendChild(texto);

    chat.appendChild(nuevoMensaje);

    // Desplazar hacia abajo al agregar un nuevo mensaje
    chat.scrollTop = chat.scrollHeight;
}

function typeText(text) {
    const messageContainer = document.createElement("div");
    messageContainer.className = 'message received';
    const messageElement = document.createElement("p");
    messageContainer.appendChild(messageElement);
    const chat = document.getElementById('message-log');
    chat.appendChild(messageContainer);

    let index = 0;
    function type() {
        if (index < text.length) {
            messageElement.textContent += text.charAt(index);
            index++;
            // Desplazar hacia abajo en cada iteración
            chat.scrollTop = chat.scrollHeight;
            setTimeout(type, 50);
        }
    }
    type();
}

// Inicializar el chat con un mensaje del bot cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    const initialMessage = "Hola, soy Limdala y estoy aquí para apoyarte en lo que necesites. ¿En qué puedo ayudarte hoy?";
    botResponse(initialMessage);
});

