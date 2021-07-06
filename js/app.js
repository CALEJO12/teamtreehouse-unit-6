const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');
const ulOfPhraseDiv = phrase.querySelector('ul');
const tries = document.querySelectorAll('.tries img');
const startScreen = document.getElementById('overlay');
const headline = document.querySelector('.title');
const keys = document.querySelectorAll('.keyrow button')
const fireEmoji = String.fromCodePoint(0x1F525);
const madEmoji = String.fromCodePoint(0x1F621);
let missed = 0;

startButton.addEventListener("click", () => {
    document.getElementById('overlay').style.display = 'none';
});

const phrases = [
    "Do it with passion or not at all",
    "You can totally do this",
    "It is not the length of life but the depth",
    "Old ways dont open new doors",
    "My life is my message"
];

// GET RANDOM PHRASE OF ARRAY //

const getRandomPhraseAsArray = (phrases) => {
    i = Math.floor(Math.random() * phrases.length);
    randomPhrase = phrases[i];
    return randomPhrase.toLowerCase().split("");
}
const phraseArray = getRandomPhraseAsArray(phrases);

// ADD PHRASE TO ARRAY //

const addPhraseToDisplay = (phraseArray) => {
    for (let i = 0; i < phraseArray.length; i ++) {
        const li = document.createElement('li');
        li.textContent = phraseArray[i];
        ulOfPhraseDiv.appendChild(li);
        if ( li.textContent === " " ) {
            li.className = "space";
        } else {
            li.className = "letter";
        }
    }
}
addPhraseToDisplay(phraseArray);

// CHECK LETTERS //

const checkLetter = (button) => {
    const letters = document.querySelectorAll(".letter");
    let match = null;
    for ( let i = 0; i < letters.length; i++ ) {
        if ( button === letters[i].textContent ) {
            letters[i].className += " show";
            match = letters[i].textContent;
        } else if (button !== letters.textContent) {
        }
    } 
    return match;
}

// ADD LISTENER TO KEYBOARD //

qwerty.addEventListener('click', (e) => {
    const button = e.target;
    if (e.target.tagName === 'BUTTON') {
        button.className = 'chosen';
        button.disabled = true;
        let letterFound = checkLetter(button.textContent);
        if (letterFound === null) {
            button.className += " wrong";
            tries[missed].src = "images/lostHeart.png";
            missed++;
        } else {
            button.className += " right";
        }
        checkWin();
    }
});

// CHECK WIN OR LOSE //

const checkWin = () => {
    let lettersToBeGuessed = document.querySelectorAll('.letter');
    let guessedLetters = document.querySelectorAll('.show');

    if (lettersToBeGuessed.length === guessedLetters.length) {
        startScreen.className = "start " + "win";
        startScreen.style.display = "";
        headline.textContent = 'You won! ' + fireEmoji;
        startScreen.display = "flex";
        reset()
    }

    if (missed > 4) {
        startScreen.className = "start " + 'lose';
        startScreen.style.display = "";
        headline.textContent = 'You lost! ' + madEmoji;
        startScreen.display = 'flex';
        reset()
    }
}

// RESET GAME //

function reset() {
    startButton.textContent = "Play Again";
    missed = 0;
    ulOfPhraseDiv.innerHTML = " ";
    let phraseChoice = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseChoice);
    let chosen = document.querySelectorAll(".chosen");
    for (let i = 0; i < chosen.length; i++) {
      chosen[i].classList.remove("chosen", "wrong", "right");
      chosen[i].disabled = false;
    }
  
    for (let i = 0; i < tries.length; i++) {
      tries[i].src = "images/liveHeart.png";
    }
  }