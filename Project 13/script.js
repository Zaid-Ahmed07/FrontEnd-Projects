//Get DOM Element
const addCardBtn = document.getElementById('add-card');
const clearCardBtn = document.getElementById('clear-cards');
const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev-btn');
const currentCardNav = document.getElementById('current-card');
const nextBtn = document.getElementById('next-btn');
const cancelBtn = document.getElementById('cancel-btn');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const addCardSubmitBtn = document.getElementById('add-card-btn');
const addCardContainer = document.getElementById('add-card-container');

// ID of current card
let currentCardID = 0;

//Collection of Cards DOM Elements
const cards  = [];

//Collection of Cards data
const cardData = getCardData();
/*const cardData =  [
    {
        //0
        question: 'What is React',
        answer : 'React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript.'
    },
    {
        //1
        question: 'What is HTML',
        answer : 'HTML stands for Hyper Text Markup Language · HTML is the standard markup language for creating Web pages · HTML describes the structure of a Web'
    },
    {
        //2
        question: 'What is CSS',
        answer : 'Cascading Style Sheets (CSS) is a style sheet language used for specifying the presentation and styling of a document written in a markup language such as HTML'
    }
];*/

//Function to save card in local storage
function saveCardData(cardData) {
    localStorage.setItem('cards',JSON.stringify(cardData));
    window.location.reload();
}

//Function to get card from local storage
function getCardData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    //If data is there return from local storage, else return an empty arrat
    return cards === null ? [] : cards;
};

//Function to updateCurrentCardNav
function updatecurrentCardNav() {
    currentCardNav.innerText = `${currentCardID + 1} / ${cards.length}`;
};

//Function to generate cards based on cardData
function generateCards() {
    //Iterate over cardData and generates Cards
    cardData.forEach( ( data, index ) => generateCard(data, index) );
};

// Function to generate a single card
function generateCard(data, index) {
    //Create a div element for the card
    const card = document.createElement('div');
    //Assin the card class
    card.classList.add('card');
    // Only make the first card active
    if ( index === 0 ) {
        //If its the first card, assign active
        card.classList.add('active');
    }
    //Create the card content structure
    card.innerHTML = `
    <div class="inside-card">
    <div class="card-front">
        <p>
           ${data.question}
        </p>
    </div>
    <div class="card-back">
        <p>
           ${data.answer}
          </p>
        </div>
    </div>
    `;
    //Listen for click on card
    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    // Add the card into the DOM
    cards.push(card);
    // Append the card into the card container
    cardsContainer.appendChild(card);
    // Update text for currentCardNav
    updatecurrentCardNav();
};

//Event Listener
//1. Listen for click on the next button
nextBtn.addEventListener('click', () => {
    //Update the class for the current card to make it inactive
    cards[currentCardID].className = 'card left';
    //Increment currentCardID by 1
    currentCardID++;
    //Check if first card is reaced
    if ( currentCardID > cards.length -1 ) {
        currentCardID = 0
    }
    //Now make newly selected card active
    cards[currentCardID].className = 'card active';
    // Update text for currentCardNav
    updatecurrentCardNav();
});

//2. Listen for click on the previous button
prevBtn.addEventListener('click', () => {
    //Update the class for the curretn card to make it inactive
    cards[currentCardID].className = 'card right';
    //Decrement currentCardID by 1
    currentCardID--;
    //Check if first card is reaced
    if ( currentCardID < 0 ) {
        currentCardID = cards.length - 1
    }
    //Now make te newly selected card active
    cards[currentCardID].className = 'card active';
    // Update text for currentCardNav
    updatecurrentCardNav();
});

//3. Listen for a click on the addCardBtn
addCardBtn.addEventListener('click', () => addCardContainer.classList.add('active'));

//4. Listen for a click on the canceldBtn
cancelBtn.addEventListener('click', () => addCardContainer.classList.remove('active'));

//5. Listen for click on the addCardSubmitBtn
addCardSubmitBtn.addEventListener('click', () => {
    const question = questionInput.value;
    const answer = answerInput.value;
    //Check if values are valid
    if ( question.trim() && answer.trim() ) {
        // Create an object with q & a
        const nextCard = {question, answer};
        generateCard(nextCard);
        // Clear form fields
        questionInput.value = '';
        answerInput.value = '';
        //Hide the add card form
        addCardContainer.classList.remove('active');
        cardData.push(nextCard);
        //Save to localStorage
        saveCardData(cardData);
    }
})

//6. Listen for click on clearCardBtn
clearCardBtn.addEventListener('click', () => {
    //REmove card from localStorage
    localStorage.clear();
    //Clear cardsContainer
    cardsContainer.innerHTML = '';
    //Reload page
    window.location.reload();
})

generateCards();


