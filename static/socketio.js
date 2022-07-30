const socket = io();

document.querySelector('#content').addEventListener("keyup", enterPress);
function enterPress(event) {
    if (event.keyCode === 13) {
        document.querySelector('#sendMessage').click()
    }
}


document.querySelector('#sendMessage').onclick = () => {
    const username = document.querySelector('#username').textContent.replace('@', '');
    const content = document.querySelector('#content').value
    socket.send([username, content])
    document.querySelector('#content').value = ""
}


socket.on('message', createPost);
function createPost(DATA) {
    const parent = document.getElementById('posts')
    if (DATA[0] == 'join') {
        const joined = document.createElement('p')
        joined.classList.add('lead')
        joined.innerHTML = DATA[1] + ' just joined the room. Say Hi 👋'
        parent.prepend(joined)
    }
    else {
        const card = document.createElement('div')
        card.classList.add('card', 'mb-2')
        const card_header = document.createElement('div')
        card_header.classList.add('card-header')
        card_header.innerHTML = DATA[1]
        const card_body = document.createElement('div')
        card_body.classList.add('card-body')
        const card_title = document.createElement('h4')
        card_title.classList.add('card-title')
        card_title.innerHTML = DATA[2]
        const card_text = document.createElement('p')
        card_text.classList.add('card-text')
        card_text.innerHTML = DATA[3]
        card_body.append(card_title, card_text)
        card.append(card_header, card_body)
        parent.prepend(card)
    }
}