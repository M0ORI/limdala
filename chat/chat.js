 const API_KEY = ''
 
 async function getCompletition(prompt) {
   const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + API_KEY
        },
        body : JSON.stringify({
            model : 'gpt-3.5-turbo',
            messages : [{role: "system", content: prompt }]
            //max_tokens: 10,
            //temperature : 0.9
        })
    })

    const data = await res.json();
    //console.log(data)
    return data;
 }

const button = document.getElementById('send');
const userInput = document.getElementById('user-input');

button.addEventListener('click', async () => {
    if(!userInput.value){
        return
    }
    const prompt = userInput.value;
    //const response = await getCompletition(prompt);
    sendMessage(prompt)
    //console.log(response) 
    //botResponse(response.choices[0].messages.content)     
    //botResponse('soy el chat')
})
 
function sendMessage(prompt) {

    messsageAppend(true, prompt); //Menssaje enviado por el usuario

    document.getElementById('user-input').value = ''; // Limpiar el campo de entrada después de enviar el mensaje
}

function botResponse(prompt) {
    const botResponse = prompt;
    messsageAppend(false, botResponse); //Respusta del bot
}
 
 // Función para enviar un mensaje del usuario al chat
function messsageAppend(sender, message) {
    // Obtén el div por su id
    const chat = document.getElementById('message-log');

    // Crear el nuevo elemento 
    const nuevoMensaje = document.createElement("div");
    // true = mensaje envido por el susuario, false = mensaje enviado por el chatbot
    nuevoMensaje.className = sender ? 'message sent' : 'message received';

    // Crear el nuevo elemento <p>
    const texto = document.createElement("p");
    texto.textContent = message;

    //Insertar el <p> dentro del nuevo <div>
    nuevoMensaje.appendChild(texto);

    chat.appendChild(nuevoMensaje);

}



