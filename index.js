const chatLog = document.getElementById('chat-log'),
userInput = document.getElementById('user-input'),
sendButton = document.getElementById('send-button'),
buttonIcon = document.getElementById('button-icon'),
info = document.querySelector(".info");

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event)=>{
    if(event.key == 'Enter'){
        sendMessage();
    }
})

function sendMessage(){
    const message = userInput.value.trim();
    // if message  = empty do nothing
    if(message === ''){
        return;
    }
    // if message = developer - show my message
    else if(message === 'developer'){
        // clear input value
        userInput.value = '';
        // append message as user - we will code its function
        appendMessage('user', message);
        // sets a fake timeout that showing loading on send button
        setTimeout(() =>{
            // send ou rmessage as bot(sender : bot)
            appendMessage('bot', 'This Source coded by Ahmed using Reza video');
            // change button icon to default
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }, 2000);
        return;
    }

    // else if none of above
    // appends users message to screen
    appendMessage('user', message);
    userInput.value = '';
    const options = {
        method: 'POST',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': '1cb13c73efmshe1fbdbf9b87b8eap1a9911jsn4d0b871ae53f',
		'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
	    },
        body: `{"messages":[{"role":"user","content":"${message}"}]}`
    };

    
    fetch('https://chatgpt53.p.rapidapi.com/', options).then((response) => response.json()).then((response) => {
        appendMessage('bot', response.choices[0].message.content);

        buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
        buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
    }).catch((err) => {
        if (err.name === 'TypeError') {
            appendMessage('bot', 'Error : Check Your Api Key!');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }
    });
}
function appendMessage(sender, message){
    info.style.display = "none";
    // change send button icon to loading using fontawesome
    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');
    
    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    // add icons depending on who send message bot or user
    if(sender === 'user'){
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    }
    else {
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }

    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTo = chatLog.scrollHeight;
}