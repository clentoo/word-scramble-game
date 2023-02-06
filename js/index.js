const wordText = document.querySelector(".word");
hintText = document.querySelector(".hint span");
timeText = document.querySelector(".time b");
inputField = document.querySelector("input");
refreshBtn = document.querySelector(".refresh-word");
checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }
    clearInterval(timer);
    alert(`Time Off! ${correctWord} is the correct word!`);
    initGame();
  }, 1000);
};

const initGame = () => {
  initTimer(30);
  let randomObj = words[Math.floor(Math.random() * words.length)]; //gets random object from word array
  let wordArray = randomObj.word.split(""); //splits the letters in random word
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerHTML = wordArray.join(""); //passes word as text
  hintText.innerHTML = randomObj.hint; //passes random object hint as hint text
  correctWord = randomObj.word.toLocaleLowerCase(); //passes random word to correct word
  inputField.value = ""; //Makes input field empty
  inputField.setAttribute("maxlength", correctWord.length); //sets max length attribute to same character length as correct word
};

initGame();

const checkWord = () => {
  let userWord = inputField.value.toLocaleLowerCase();
  if (!userWord) return alert(`please enter a word to check`); // if user doesn't input any word

  //if user word doesn't match the correct word
  if (userWord !== correctWord)
    return alert(`Oops! ${userWord} is not the correct word!`);

  //if userword matches the correct word
  alert(`Congrats! ${userWord} is the correct word!`);
  initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
