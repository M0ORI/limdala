const API_KEY = '';

// URLs de los modelos 3D para diferentes estados emocionales
const models = {
    "feliz": "https://prod.spline.design/f7l2nf5ghJiFh30g/scene.splinecode",
    "triste": "https://prod.spline.design/sad_model_url/scene.splinecode",
    "enojado": "https://prod.spline.design/P-MFqIrOB8GX8kQP/scene.splinecode",
    "deprimido": "https://prod.spline.design/depressed_model_url/scene.splinecode",
    "neutral": "https://prod.spline.design/LXqZ5ydB8lt-MHam/scene.splinecode"
    // Agrega más estados y URLs según sea necesario
};

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
                { role: "system", content: "Eres un asistente virtual de apoyo personal para la salud mental. Responde de manera empática, comprensiva y de apoyo. Brinda sugerencias y consejos útiles, y siempre anima a los usuarios a buscar ayuda profesional si es necesario. Evita respuestas muy largas, ademas solo haz enfasis en problemas relacionados a los sentimientos o problemas personales de una persona o grupo, no hagas tareas o cosas similares (diseño, programacion) etc. En nuestro sitio al lado del chat hay un cerebro que cambiara de color dependiendo las emociones que exprese el usuario, puedes hacer comentarios respecto a eso tambien, los colores por emocion son: (enojo: rojo, triste: azul,apagado, feliz: amarillo, dorado entre otros, me gustaria que en el segundo mensaje del usuario hagas alucion a eso y como pueden afectar las malas emociones en nuestra cabeza" },
                { role: "user", content: prompt }
            ],
            temperature: 0.7
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
    typeText(response.choices[0].message.content);
    updateModel(prompt);
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
        typeText(response.choices[0].message.content);
        updateModel(prompt);
    }
});

function sendMessage(prompt) {
    messsageAppend(true, prompt);
    document.getElementById('user-input').value = '';
}

function botResponse(message) {
    messsageAppend(false, message);
}

function messsageAppend(sender, message) {
    const chat = document.getElementById('message-log');
    const nuevoMensaje = document.createElement("div");
    nuevoMensaje.className = sender ? 'message sent' : 'message received';
    const texto = document.createElement("p");
    texto.textContent = message;
    nuevoMensaje.appendChild(texto);
    chat.appendChild(nuevoMensaje);
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
            chat.scrollTop = chat.scrollHeight;
            setTimeout(type, 20);
        }
    }
    type();
}

function updateModel(message) {
    let emotion = "neutral"; // Por defecto
    if (message.includes("feliz") || message.includes("alegre") || message.includes("contento")|| message.includes("Buen dia")|| message.includes("japi")) {
        emotion = "feliz";
    } else if (message.includes("triste") || message.includes("deprimido")|| message.includes("sad")) {
        emotion = "triste";
    } else if (message.includes("enojado") || message.includes("furioso") || message.includes("molesto")) {
        emotion = "enojado";
    }
    
    console.log(`Detected emotion: ${emotion}`); // Agrega esta línea para depuración
    
    const modelURL = models[emotion];
    console.log(`Model URL: ${modelURL}`); // verificar la URL
    const canvasContainer = document.getElementById('canvas-container');
    const oldViewer = document.getElementById('spline-viewer');
    
    // Remover el antiguo spline-viewer
    if (oldViewer) {
        canvasContainer.removeChild(oldViewer);
    }
    // Crear un nuevo spline-viewer
    const newViewer = document.createElement('spline-viewer');
    newViewer.setAttribute('id', 'spline-viewer');
    newViewer.setAttribute('loading-anim-type', 'spinner-small-light');
    newViewer.setAttribute('url', modelURL);
    canvasContainer.appendChild(newViewer);
}

document.addEventListener('DOMContentLoaded', () => {
    const initialMessage = "Hola, soy Limdala y estoy aquí para apoyarte en lo que necesites. ¿En qué puedo ayudarte hoy?";
    botResponse(initialMessage);
});
