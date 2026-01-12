let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHigh = document.querySelector(".lowOrHigh");

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

function checkGuess() {
  const userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = "Propositions précédentes : ";
  }
  guesses.textContent = `${guesses.textContent} ${userGuess}`;

  if (userGuess === randomNumber) {
    lastResult.textContent = `Bravo, vous avez trouvé le nombre en ${guessCount} tour(s)`;
    lastResult.style.backgroundColor = "green";
    lowOrHigh.textContent = "";
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = "Tu as perdu :(";
    setGameOver();
  } else {
    lastResult.textContent = "Faux !";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHigh.textContent = "Le nombre saisi est trop petit !";
    } else if (userGuess > randomNumber) {
      lowOrHigh.textContent = "Le nombre saisi est trop grand !";
    }
  }

  guessCount++;
  guessField.value = "";
  guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess);

function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement("button");
  resetButton.textContent = "Démarrer une nouvelle partie";
  document.body.append(resetButton);
  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll(".resultParas p");
  for (const resetPara of resetParas) {
    resetPara.textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  lastResult.style.backgroundColor = "white";

  randomNumber = Math.floor(Math.random() * 100) + 1;
}
