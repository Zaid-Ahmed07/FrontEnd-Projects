//Get DOM Elements
const balance = document.getElementById('balance');
const moneyCredit = document.getElementById('money-credit');
const moneyDebit = document.getElementById('money-debit');
const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');
const list = document.getElementById('list');

//Temperary array of transactions - to be replaced with local storage
const Transactions = [
    //{ id: 1, reason: 'Salary', amount: 5000 },
    //{ id: 2, reason: 'Breakfast', amount: -20 },
    //{ id: 3, reason: 'Lunch', amount: -30 },
    //{ id: 4, reason: 'Dinner', amount: -60 },
];

// Get transaction data from storage
let transactions = Transactions;


//Function to display transactions in DOM - History section
function displayTransaction(transaction) {
    //Calculate if transaction is Credit or Debit
    const type = transaction.amount > 0 ? '+' : '-'
    //Create a list item for the transaction
    const transactionLI = document.createElement('li');
    //Determine class based on transaction type.If positive, then credit,otherwise debit
    transactionLI.classList.add(transaction.amount > 0 ? 'credit' : 'debit');
    //Assign the inner HTML for the transaction li
    transactionLI.innerHTML = `
    ${transaction.reason} <span>${transaction.amount}</span>
    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">X</button>
    `;
    //Add the li in the DOM under the transaction history list
    list.appendChild(transactionLI);
};

//Function to update all balance
function updateBalance() {
    //Create a new array with just the amount from the transaction array
    const transactionAmounts = transactions.map(transaction => transaction.amount);
    //Calculate total balance value
    const totlBalance = transactionAmounts.reduce((acc, amount) => (acc += amount), 0);
    //Calculate total credit balance value
    const creditBalance = transactionAmounts
        .filter(amount => amount > 0)
        .reduce((acc, amount) => (acc += amount), 0)
    //Calculate total debit balance value
    const debitBalance = transactionAmounts
        .filter(amount => amount < 0)
        .reduce((acc, amount) => (acc += amount), 0);
    //Update values in the DOM
    balance.innerText = `$${totlBalance}`;
    moneyCredit.innerText = `$${creditBalance}`;
    moneyDebit.innerHTML = `$${debitBalance}`;

};

//Function to create a random ID
function createID() {
    return Math.floor(Math.random() * 10000000);
}

//Function to add a transaction form the form
function addTransaction(e) {
    e.preventDefault();
    //Check if form have valid data
    if (reason.value.trim() === '' || amount.value.trim() === '') {
        //Display error message if form is not complete
        alert('Please provide a valide reason and transaction amount.')
    } else {
        //Create an object for the transaction containing id,
        //text for the reason, and the transaction amount
        const transaction = {
            id: createID(),
            reason: reason.value,
            amount: +amount.value
        }
        //Push the new transaction into the transaction array
        Transactions.push(transaction);
        //display the new transaction in the DOM
        displayTransaction(transaction);
        //Update all balance value
        updateBalance();
        //Clear form fields
        reason.value = '';
        amount.value = '';
    }
};

//Function to remove the transaction from the history
function deleteTransaction(id) {
    //Filter out the transaction with provided id
    transactions = transactions.filter( transaction => transaction.id !== id);
    //Initialize the app again to update DOM
    init();

};

//Initialize Application
function init() {
    // Clear all transaction history
    list.innerHTML = '';
    //Display all transactions in db in the DOM
    transactions.forEach(displayTransaction);
    //Update all balance value
    updateBalance();
};

//Event listener
// 1. Listen for form submit to add a transaction
form.addEventListener('submit', addTransaction);

//Initialize the Application
init();