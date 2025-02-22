const words = ["apple", "banana", "cherry", "grape", "kiwi"];
const wordContainer = document.querySelector('.word');
const timerElement = document.getElementById('timer');
const timeArray = timerElement.textContent.split(':');
const correctCountElement = document.querySelector('.correct-count');
const wrongCountElement = document.querySelector('.wrong-count');
const wordMistakesElement = document.querySelector('.word-mistakes');

let minutes = parseInt(timeArray[0], 10);
let seconds = parseInt(timeArray[1], 10);
let currentWord = '';
let currentIndex = 0;
let correctCount = 0;        
let wrongCount = 0;          
let currentMistakes = 0;     

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    wordContainer.innerHTML = '';
    currentMistakes = 0;  
    for (let letter of currentWord) {
        const span = document.createElement('span');
        span.textContent = letter;
        span.className = 'letter';
        wordContainer.appendChild(span);
    }
}

function checkGameStatus() {
    if (correctCount === 5) {
        alert('Поздравляем! Вы выиграли!');
        resetGame();
    } else if (wrongCount === 5) {
        alert('К сожалению, вы проиграли.');
        resetGame();
    }
}

document.addEventListener('keydown', (event) => {
    if (currentIndex < currentWord.length) {
        const pressedKey = event.key.toLowerCase();
        const currentLetter = currentWord[currentIndex];
        const letterSpans = document.querySelectorAll('.letter');

        if (pressedKey === currentLetter) {
            letterSpans[currentIndex].classList.add('c');
            letterSpans[currentIndex].classList.remove('w');
            currentIndex++;
        } else {
            letterSpans[currentIndex].classList.add('w');
            currentMistakes++;  
        }

        if (currentIndex === currentWord.length) {
            if (currentMistakes === 0) {
                correctCount++;  
            } else {
                wrongCount++;    
            }

            correctCountElement.textContent = correctCount;
            wrongCountElement.textContent = wrongCount;
            wordMistakesElement.textContent = currentMistakes;

            checkGameStatus();

            setTimeout(() => {
                currentIndex = 0;
                playGame();
            }, 1000);
        }
    }
});

function format(time) {
    return time < 10 ? '0' + time : time;
}

const interval = setInterval(() => {
    if (seconds > 0) {
        seconds--;
    } else if (minutes > 0) {
        minutes--;
        seconds = 59;
    } else {
        clearInterval(interval);
        alert('Время истекло!');
        return;
    }
    timerElement.textContent = `${format(minutes)}:${format(seconds)}`;
}, 1000);

function resetGame() {
    correctCount = 0;
    wrongCount = 0;
    currentIndex = 0;
    playGame();
}

function playGame() {
    currentWord = getRandomWord();
    displayWord();
}

playGame();