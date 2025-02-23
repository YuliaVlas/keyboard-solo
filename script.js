const words = ["apple", "banana", "cherry", "grape", "kiwi", "egg", "milk"];
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
        clearInterval(interval);
        alert(`Поздравляем! Вы выиграли! Время: ${format(minutes)}:${format(seconds)}`);
        resetGame();
    } else if (wrongCount === 5) {
        clearInterval(interval);
        alert(`К сожалению, вы проиграли. Время: ${format(minutes)}:${format(seconds)}`);
        resetGame();
    }
}

function format(time) {
    return time < 10 ? '0' + time : time;
}

const interval = setInterval(() => {
    seconds++;

    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    timerElement.textContent = `${format(minutes)}:${format(seconds)}`;
}, 1000);

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
            wordMistakesElement.textContent = currentMistakes;
        }

        if (currentIndex === currentWord.length) {
            if (currentMistakes === 0) {
                correctCount++; 
                correctCountElement.textContent = correctCount; 
            } else {
                wrongCount++;
                wrongCountElement.textContent = wrongCount;    
            }

            setTimeout(checkGameStatus, 0);

            setTimeout(() => {
                currentIndex = 0;
                playGame();
            }, 500);
        }
    }
});

function resetGame() {
    correctCount = 0;
    correctCountElement.textContent = correctCount;
    wrongCount = 0;
    wrongCountElement.textContent = wrongCount;
    currentIndex = 0;
    currentMistakes = 0;
    wordMistakesElement.textContent = currentMistakes;
    playGame();
}

function playGame() {
    currentWord = getRandomWord();
    currentMistakes = 0;
    wordMistakesElement.textContent = currentMistakes;
    displayWord();
    
}

playGame();