//Get DOM Elements
const word = document.getElementById('word');
const incorrectLetters = document.getElementById('incorrect-letters');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playBtn = document.getElementById('play-btn');
const notification = document.getElementById('notification-container');

//Get DOM Element for Hangman
const figureParts = document.querySelectorAll('.figure-part');

//This is he pool of words which will be used to select a random word
const words = ["church","fought","nuts","vote","system","could","audience","bend","exact","type","vote"];
//const words =["bad","no"] 

//Select a word at random from word array
let selectedWord = words[Math.floor(Math.random() * words.length)];

//Tracking arrays for corrrect and incorrevt guesses
const correctLettersArray = [];
const incorrectLettersArray = [];

//Function to display the selectedWord in the DOM
function displayWord() {
    //  Display the selected word
    word.innerHTML = `
    ${selectedWord
        .split('')
        .map(letter => `
            <span class="letter">
            ${correctLettersArray.includes(letter) ? letter : ''}
            </span>
            `
        )
        .join('')
    }
    `;
//Replace new line character and form inner word
    const innerWord = word.innerText.replace(/\n/g, '');

    console.log(word.innerText);
    console.log(innerWord);
//Compare innerword to selected word
    if(innerWord === selectedWord) {

        finalMessage.innerText = 'Congratulation! You Won!'
        popup.style.display = 'flex';
    }
};

//Function to show the notification
function showNotification() {
    //Add class show to the notifiction container
    notification.classList.add('show');
    //After 2 seconds, hide the notification
    setTimeout(() => {
        notification.classList.remove('show');
    },2000);
}

//Function to update incorrect letters
function updateIncorrectLetter() {
    incorrectLetters.innerHTML = `
    ${incorrectLettersArray.length > 0 ? '<p>Incorrect Letters</p>': ''}
    ${incorrectLettersArray.map(letter => `<span>${letter}</span>`)}
    `;

    //Display the hangman part
    figureParts.forEach((part, index) => {
        const errors = incorrectLettersArray.length;
        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    //Check if user lost
    if(incorrectLettersArray.length === figureParts.length) {
        finalMessage.innerText = 'You Lost!'
        popup.style.display = 'flex';
    }
}

//Event Handlers
//1. Listen for keyboard key press
window.addEventListener('keydown', e => {
    //Check if key pressedis a letter a = 65 and z = 90
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        //Check if letter is in the selected word
        if (selectedWord.includes(letter)) {
            //Check if letter is already in correctLtteresArray
            if (!correctLettersArray.includes(letter)) {
               //Add letter into the correctLettersArray
            correctLettersArray.push(letter);
            //Run the displayWord functiion again to display new letter
            displayWord();
        } else {
            showNotification();
        }
    } else {
            //Check if letter is already incorrectLttersArray
            if(!incorrectLettersArray.includes(letter)) {
                //Add letter into the incorrectLetterArray
                incorrectLettersArray.push(letter);
                //Update the incorrect letter UI
                updateIncorrectLetter();
            } else {
                showNotification();
            }
        }
    }
    })

    //2. Listen for click on play again buttom
    playBtn.addEventListener('click', () => {
        //Empty correctLettterArray & incorrectLetterArray
        correctLettersArray.splice(0);
        incorrectLettersArray.splice(0);
        //Select a new word
        selectedWord = words[Math.floor(Math.random() * words.length)];
        //Clear incorrrect letters display
        updateIncorrectLetter();
        //Hide the popup
        popup.style.display = 'none';
        //Refresh displayed word
        displayWord();
    })
//Execute displayWord on page load
displayWord();