//Get DOM element
const word = document.getElementById('word');
const userword = document.getElementById('user-word');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const settingsBtn = document.getElementById('settings-btn');
const settingsContainer = document.getElementById('settings');
const settingsForm = document.getElementById('form');
const difficultyDropdown = document.getElementById('difficulty');
const gameover = document.getElementById('gameover')

const words = [
   'ability','able','about','above','accept','according','account','across','act','action','activity','actually','add','address','administration','admit','adult','affect','after','again','against','age','agency','agent','ago','agree','agreement','ahead','air','all','allow','almost','alone','along','already','also','although','always','American','among','amount','analysis','and','animal','another','answer','any','anyone','anything','appear','apply','approach','area','argue','arm','around','arrive','art','article','artist','as','ask','assume','at','attack','attention','attorney','audience','author','authority','available','avoid','away','baby','back','bad','bag','ball','bank','bar','base','be','beat','beautiful','because','become','bed','before','begin','behavior','behind','believe','benefit','best','better','between','beyond','big','bill','billion','bit','black','blood','blue','board','body','book','born','both','box','boy','break','bring','brother','budget','build','building','business','but','buy','by','call','camera','campaign','can','cancer','candidate','capital','car','card','care','career','carry','case','catch','cause','cell','center','central','century','certain','certainly','chair','challenge','chance','change','character','charge','check','child','choice','choose','church','citizen','city','civil','claim','class','clear','clearly','close','coach','cold','collection','college','color','come','commercial','common','community','company','compare','computer','concern','condition','conference','Congress','consider','consumer','contain','continue','control','cost','could','country','couple','course','court','cover','create','crime','cultural','culture','cup','current','customer','cut','dark','data','daughter','day','dead','deal','death','debate','decade','decide','decision','deep','defense','degree','Democrat','democratic','describe','design','despite','detail','determine','develop','development','die','difference','different','difficult','dinner','direction','director','discover','discuss','discussion','disease','do','doctor','dog','door','down','draw','dream','drive','drop','drug','during','each','early','east','easy','eat','economic','economy','edge','education','effect','effort','eight','either','election','else','employee','end','energy','enjoy','enough','enter','entire','environment','environmental','especially','establish','even','evening','event','ever','every','everybody','everyone','everything','evidence','exactly','example','executive','exist','expect','experience','expert','explain','eye','face','fact','factor','fail','fall','family','far','fast','father','fear','federal','feel','feeling','few','field','fight','figure','fill','film','final','finally','financial','find','fine','finger','finish','fire','firm','first','fish','five','floor','fly','focus','follow','food','foot','for','force','foreign','forget','form','former','forward','four','free','friend','from','front','full','fund','future','game','garden','gas','general','generation','get','girl','give','glass','go','goal','good','government','great','green','ground','group','grow','growth','guess','gun','guy','hair','half','hand','hang','happen','happy','hard','have','he','head','health','hear','heart','heat','heavy','help','her','here','herself','high','him','himself','his','history','hit','hold','home','hope','hospital','hot','hotel','hour','house','how','however','huge','human','hundred','husband','I','idea','identify','if','image','imagine','impact','important','improve','in','include','including','increase','indeed','indicate','individual','industry','information','inside','instead','institution','interest','interesting','international','interview','into','investment','involve','issue','it','item','its','itself','job','join','just','keep','key','kid','kill','kind','kitchen','know','knowledge','land','language','large','last','late','later','laugh','law','lawyer','lay','lead','leader','learn','least','leave','left','leg','legal','less','let','letter','level','lie','life','light','like','likely','line','list','listen','little','live','local','long','look','lose','loss','lot','love','low','machine','magazine','main','maintain','major','majority','make','man','manage','management','manager','many','market','marriage','material','matter','may'
];

//Placeholder for selected word
let randomWord;

//Initialize score 
let score = 0 ;

//Initialize time 
let time = 60;

//Intialize difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';

//Render the value for difficulty in difficulty dropdown
difficultyDropdown.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';

//When page load, automatically focus on the user input field
userword.focus();

//Function to generate a random word from the word arrray
function generateWord() {
    const generatedWord = words[Math.floor(Math.random() * words.length)]
    return generatedWord;
}

//Function to render the new word
function renderWord() {
    //Generate a new random word
    randomWord = generateWord();
    //Update the DOM word element's inner HTML to render the new word
    word.innerHTML = randomWord;
}

//Function to increment the score by 1
function incrementScore() {
    //increment by 1
    score++;
    //Render new score by DOM
    scoreElement.innerHTML = score;
};

//Start timer countdown
const timerInterval = setInterval(decrementTimer, 1000);


// Function to decrement the timer by 1 second
function decrementTimer() {
    //Decrement time by 1 second
    time--;
    // Render new time in DOM
    timeElement.innerHTML = time;
    //Check if timer reaches 0
    if (time == 0) {
        //When timer reaches 0, stop the setInterval function to decrement
        clearInterval(timerInterval);
        //Display the gameover container
        gameOver();
    }
}

//Function to handle when the game is over
function gameOver() {
    //Display the gameover container
    gameover.style.display = 'flex';
    // Update the content to dipaly in the gameover container
    gameover.innerHTML = `
     <h1>Times Up !</h1>
     <p>Good game! Your score is: ${score} </p>
     <button onclick="location.reload()"> Play Again</button>
    `;
};


//Event Listener
//Listen for input in the userWord input element
userword.addEventListener('input', e => {
    //Save the value in the input field
    const userInput = e.target.value;
    //Check to see if userInput matches the random word
    if ( userInput === randomWord ) {
        //If the user has typed the correct word
        renderWord();
        //Increment score by 1
        incrementScore();
        //Clear the user input field
        e.target.value = '';
        //Check the difficulty setting
        if (difficulty === 'easy') {
            time += 3;
        } else if (difficulty === 'medium') {
            //if the difficulty is medium, increment timer by 2
            time += 2;
        } else {
            //if the difficulty is hard, increment by 1
            time += 1;
        }
        // Render new time in DOM
        timeElement.innerHTML = time;
    }
});

//Listen for a click on the setting button 
settingsBtn.addEventListener('click', () => settingsContainer.classList.toggle('hide'));

//Listen for a change in the difficulty
difficultyDropdown.addEventListener('change', e => {
    //Update the difficulty using the newly selected value from dropdown in settings
    difficulty = e.target.value;
    //Use localstorage to save the difficulty setting
    localStorage.setItem('difficulty', difficulty);

})


//Run the renderWord function on page load
renderWord();