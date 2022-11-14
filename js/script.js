const guessedLettersEl = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesEl = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;


const getWord = async function(){
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt”");
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord(); 

const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word){
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

//placeholder(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();

    message.innerText = "";

    const letterGuess = letterInput.value;
    //console.log(letterGuess);
   
    const acceptedGuess = inputValidation(letterGuess);

    if(acceptedGuess) {
        makeGuess(letterGuess);
    }
    letterInput.value = "";
});

const inputValidation = function(letterInput){
    const acceptedLetter = `/[a-zA-Z]/`;
    if(letterInput.length === 0){
        message.innerText = "Please enter a letter.";
    } else if(letterInput.length > 1){
        message.innerText = "Please only one guess at a time.";
    } else if(!letterInput.match(acceptedLetter)){
        message.innerText = "Please enter a letter."
    }else{
        return letterInput;
    }
};

const makeGuess = function(letterGuess){
    letterGuess = letterGuess.toUppercase();
    if(guessedLetters.includes(letterGuess)){
        message.innerText = "Guess has already been entered. Please guess again.";
    } else {
        guessedLetters.push(letterGuess);
        console.log(guessedLetters)
        updateWordInProgress(guessedLetters);
        updateGuessedLetters();
        guessesLeft(letterGuess);
    }
   
};

const updateGuessedLetters = function(){
    guessedLettersEl.innerHTML = " ";
    for (const letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersEl.append(li);
    }
};

const updateWordInProgress = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray) {
        if(guessedLetters.includes(letter)){
            revealWord.push(letter.toUpperCase);
        } else{
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("●");
    checkIfWin();
};

const guessesLeft = function(letterGuess){
    const capWord = word.toUpperCase();
    if(!capWord.includes(letterGuess)){
        message.innerText=`Sorry that word has no ${letterGuess}`;
        remainingGuesses -=1;
    }else{
        message.innerText = `Good Guess! ${letterGuess} is in the word!`;
    } if (remainingGuesses === 0){
        message.innerText = `Game Over! The word was <span class = "highlight">${word}</span>`;
    } else if (remainingGuesses === 1){
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};   

const checkIfWin = function(){
    if(word.toUpperCase() === wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML = '<p class = "highlight">You guessed the word! Yay!</p>';
     }
     
};

const startOver = function(){
    guessButton.classList.add("hide");
    remainingGuessesEl.classList.add("hide");
    guessedLettersEl.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function(){
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersEl.innerHTML = " ";
    
    getWord();
    
    guessButton.classList.remove("hide");
    remainingGuessesEl.classList.remove("hide");
    guessedLettersEl.classList.removee("hide");
    playAgainButton.classList.add("hide");
});