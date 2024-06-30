const cards = [
    { content: 'Apple', id: 1 },
    { content: 'Banana', id: 2 },
    { content: 'Cherry', id: 3 },
    { content: 'Date', id: 4 },
    { content: 'Elderberry', id: 5 },
    { content: 'Fig', id: 6 },
    { content: 'Grape', id: 7 },
    { content: 'Honeydew', id: 8 },
    { content: 'Kiwi', id: 9 },
    { content: 'Lemon', id: 10 },
    { content: 'Mango', id: 11 },
    { content: 'Nectarine', id: 12 }
];

let selectedCards = [];
let matchedCards = 0;
let timerInterval;
let elapsedTime = 0;

const timer = document.getElementById('timer');

setupBoard();


function createCard(card, type) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.content = card.content;
    cardElement.dataset.id = card.id;
    cardElement.dataset.type = type;
    cardElement.textContent = type === 'word' ? card.content : '🔊';
    
    cardElement.addEventListener('click', selectCard);
    return cardElement;
}

function setupBoard() {
    const voicesBoard = document.querySelector('.voices');
    const wordsBoard = document.querySelector('.words');
    
    cards.sort(() => 0.5 - Math.random()).forEach(card => {
        voicesBoard.appendChild(createCard(card, 'voice'));
    });

    cards.sort(() => 0.5 - Math.random()).forEach(card => {
        wordsBoard.appendChild(createCard(card, 'word'));
    });

    resetTimer();
    startTimer();
}

function selectCard(e) {
    const clickedCard = e.target;

    if (clickedCard.dataset.type === 'voice') {
        playVoice(clickedCard.dataset.content);
    }

    if (selectedCards.length < 2 && !selectedCards.includes(clickedCard)) {
        selectedCards.push(clickedCard);
        clickedCard.classList.add('selected');

        if (selectedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = selectedCards;
    const isMatch = card1.dataset.id === card2.dataset.id;
    isMatch ? removeCards(card1, card2) : unmatchCards(card1, card2);
    selectedCards = [];
}

function removeCards(card1, card2) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards += 1;

    if (matchedCards === cards.length) {
        stopTimer();
        alert('You won!');
    }
}

function unmatchCards(card1, card2) {
    card1.classList.add('unmatched');
    card2.classList.add('unmatched');

    setTimeout(() => {
        card1.classList.remove('unmatched', 'selected');
        card2.classList.remove('unmatched', 'selected');
    }, 300);
}

function resetGame() {
    voicesBoard.innerHTML = "";
    wordsBoard.innerHTML = "";
    matchedCards = 0;
    setupBoard();
}

function playVoice(text) {
    var msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
}

// function playVoice(file) {
//     const audio = new Audio(file);
//     audio.play();
// }


function startTimer() {
    timerInterval = setInterval(() => {
        elapsedTime++;
        timer.textContent = formatTime(elapsedTime);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timer.textContent = '00:00';
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}


function OptionsAlert(){
    Swal.fire({
        position: "top",
        title: "Options",
        html: `
            <div class="swal2-checkbox">
                <label for="custom-checkbox">Study only starred terms</label>
                <input type="checkbox" id="custom-checkbox">
            </div>
        `,
        showCloseButton: true,
        showConfirmButton: false,
    });
}

