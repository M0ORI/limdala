 const API_KEY = ''
 
 async function getCompletition() {
   const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + API_KEY
        },
        body : JSON.stringify({
            model : 'gpt-3.5-turbo-16k',
            prompt: 'Dame un nombre aleatorio de un leguaje de programacion',
            max_tokens: 5,
            temperature : 0.9
        })
    })

    const data = await res.json()
    console.log(data)
 }

//getCompletition()
 
 
 // Función para enviar un mensaje del usuario al chat
 function messsageAppend(sender, message) {
    // Obtén el div por su id
    var chat = document.getElementById('message-log');

    // Crear el nuevo elemento 
    var nuevoMensaje = document.createElement("div");
    nuevoMensaje.className = sender == 'user' ? 'message sent' : 'message received';

    // Crear el nuevo elemento <p>
    var texto = document.createElement("p");
    texto.textContent = message;

    //Insertar el <p> dentro del nuevo <div>
    nuevoMensaje.appendChild(texto);

    chat.appendChild(nuevoMensaje);

}

