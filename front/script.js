// MESSAGE INPUT
const textarea = document.querySelector('.chatbox-message-input')
const chatboxForm = document.querySelector('.chatbox-message-form')
let textoescrito ='';


textarea.addEventListener('input', function () {
    let line = textarea.value.split('\n').length

    if(textarea.rows < 6 || line < 6) {
        textarea.rows = line
    }

    if(textarea.rows > 1) {
        chatboxForm.style.alignItems = 'flex-end'
    } else {
        chatboxForm.style.alignItems = 'center'
    }
})



// TOGGLE CHATBOX
const chatboxToggle = document.querySelector('.chatbox-toggle')
const chatboxMessage = document.querySelector('.chatbox-message-wrapper')

chatboxToggle.addEventListener('click', function () {
    chatboxMessage.classList.toggle('show')
})



// DROPDOWN TOGGLE
const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle')
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu')

dropdownToggle.addEventListener('click', function () {
    dropdownMenu.classList.toggle('show')
})

document.addEventListener('click', function (e) {
    if(!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
        dropdownMenu.classList.remove('show')
    }
})







// CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector('.chatbox-message-content')
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message')

chatboxForm.addEventListener('submit', function (e) {
    console.log('submit')
    e.preventDefault()


    if(isValid(textarea.value)) {
        writeMessage()
        //setTimeout(autoReply, 1000)
        setTimeout(getResponse, 1000)
    }
})

async function getResponse() {

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("text", textarea.value.trim().replace(/\n/g, '<br>\n'));

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("http://localhost:3000", requestOptions)
        .then(response => response.text())
        .then(result => {
            const today = new Date()
            const data = JSON.parse(result)
            let message = `
		<div class="chatbox-message-item received">
			<span class="chatbox-message-item-text">
			 ${data.data}
			</span>
			<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
		</div>
	`
            chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
            scrollBottom()

        })
        .catch(error => console.log('error', error));
        textarea.value = ''

}




function addZero(num) {
    return num < 10 ? '0'+num : num
}

function writeMessage() {
    const today = new Date()
    let message = `
		<div class="chatbox-message-item sent">
			<span class="chatbox-message-item-text">
				${textarea.value.trim().replace(/\n/g, '<br>\n')}
			</span>
			<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
		</div>
	`
    chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
    chatboxForm.style.alignItems = 'center'
    textarea.rows = 1
    textarea.focus()
    // setTimeout(function () {
    //     textarea.value = ''
    //
    // },1200)
    chatboxNoMessage.style.display = 'none'
    scrollBottom()
}

function autoReply() {
    const today = new Date()
    let message = `
		<div class="chatbox-message-item received">
			<span class="chatbox-message-item-text">
				Thank you for your awesome support!
			</span>
			<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
		</div>
	`
    chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
    scrollBottom()
}

function scrollBottom() {
    chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight)
}

function isValid(value) {
    let text = value.replace(/\n/g, '')
    text = text.replace(/\s/g, '')

    return text.length > 0
}
