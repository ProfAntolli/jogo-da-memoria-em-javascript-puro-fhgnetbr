const cards = document.querySelectorAll('.memory-card');
const homeScreen = document.querySelectorAll('.home-screen');
const finishScreen = document.querySelectorAll('.finish-screen');
const attempts = document.getElementById("attempts");
const score = document.getElementById("score");
const attemptsFinish = document.getElementById("attempts-finish");
const scoreFinish = document.getElementById("score-finish");

var audioMatch = new Audio('sound/match.mp3');
var audioNoMatch = new Audio('sound/nomatch.mp3');
var audioBackground = new Audio('sound/background.mp3');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false
let currentAttempts = 0;
let currentScore = 0;

function startGame() {
    currentAttempts = 0;
    currentScore = 0;

    attempts.textContent = currentAttempts;
    attemptsFinish.textContent = currentAttempts;
    score.textContent = currentScore;
    scoreFinish.textContent = currentScore;
    
    audioBackground.pause();
    audioBackground.currentTime = 0;
    
    cards.forEach(element => {
        element.classList.remove('flip');

        element.addEventListener('click', flipCard);
        element.addEventListener('click', flipCard);            
    });

    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });

    audioBackground.volume = 0.2;
    audioBackground.play();

    homeScreen[0].style.display = "none";
    finishScreen[0].style.display = "none";
}

function getStartGame() {
    finishScreen[0].style.display = "none";
    homeScreen[0].style.display = "block";

    audioBackground.pause();
    audioBackground.currentTime = 0;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;        

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        secondCard = this;

        currentAttempts ++;
        attempts.textContent = currentAttempts;
        attemptsFinish.textContent = currentAttempts;
    
        checkForMatch();
    }
}
 
function checkForMatch() {
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
      disableCards();
      audioMatch.play();

      currentScore ++;
      score.textContent = currentScore;
      scoreFinish.textContent = currentScore;

      if (currentScore == 8)
      {
        finishScreen[0].style.display = "block";
      }

      return;
    }
 
    audioNoMatch.play();
    unflipCards();
}
 
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}
 
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      lockBoard = false;
      resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


(function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });

    finishScreen[0].style.display = "none";
})();

cards.forEach(card => card.addEventListener('click', flipCard));