$(document).ready(function() {
    var user;
    if(!localStorage.getItem('usuario')){
        user = prompt("Escribe tu usuario: ");
        while(user == null || user == "" && user == 'System'){
            user = prompt("Escribe tu usuario: ");
            
        }
        localStorage.setItem("usuario",user);
    }else{
        user = localStorage.getItem('usuario')
    }

    var socket = io();
    const chatMessages = $('.chat-messages');
  
    // Manejar el evento 'chat message' en la carga de la página
    socket.on('chat message', function(msg) {
      const messageElement = $('<div class="externo">').addClass('message').text( msg.username + ": " + msg.message);
      chatMessages.append(messageElement);
      chatMessages.scrollTop(chatMessages.prop('scrollHeight'));
    });
  
    // Función para enviar mensajes
    function sendMessage() {
      const messageInput = $('#message-input');
      const message = messageInput.val().trim();
  
      if (message !== '') {
        //Escribe el mensaje en el chat del usuario que lo envía
        messageElement = $('<div class="propio">').addClass('message').text(message);
        chatMessages.append(messageElement);
        chatMessages.scrollTop(chatMessages.prop('scrollHeight'));

        // Emitir el mensaje al servidor
        socket.emit('chat message', {username: user, message: message});
  
        // Limpiar el campo de entrada
        messageInput.val('');
      }
    }
  
    // Event listeners usando jQuery
    $('#send-button').on('click', sendMessage);
    $('#message-input').on('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
      }
    });

    $('#close-button').on('click', function() {
        socket.disconnect() 
    });

  });
  