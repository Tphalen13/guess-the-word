const guessedLettersEl = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const placeholder = function(word){
    const placeholderLetters = [];
    for (const letter of word){
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

guessButton.addEventListener("click", function(e){
    e.preventDefault();

    message.innerText - " ";

    const letterGuess = letterInput.value;
    console.log(letterGuess);
   
    const acceptedGuess = inputValidation(letterGuess);

    if(acceptedGuess){
        makeGuess(letterGuess);
    }
    letterInput.value = "";
});

const inputValidation = function(letterInput){
    const acceptedLetter = /[a-zA-Z]/;
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
    }
    updateGuessedLetters();
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
    for (const letter of wordArray){
        if(guessedLetters.includes(letter)){
            revealWord.push(letter.toUpperCase);
        } else{
            revealWord.push("");
        }
    }
    wordInProgress.innerText = revealWord.join("●");
    checkIfWin();
};

const checkIfWin = function(){
    if(word.toUpperCase() === wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML = '<p class = "highlight">You guessed the word! Yay!</p>';
     }
     
};