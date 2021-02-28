var headerEl = document.getElementById('header');
var container = document.getElementById('container');
var startButton = document.querySelector('.start-button')

var numCorrect = 0
var numAnswered = 0
const numQuestions = questions.length
let tempQuestions = questions
let tempIndex = (Math.floor(Math.random() * tempQuestions.length))
let currentItem = tempQuestions[tempIndex]
let qChoice
tempQuestions.splice(tempIndex, 1)
newArray = []
newArray.push(currentItem)

startButton.addEventListener("click", function(event) {
  event.preventDefault();
  startButton.style.display = 'none'

  console.log('First Item')
  console.log(currentItem)

// Create Container
  var qContainer = document.createElement("div");
  qContainer.setAttribute("id", 'qContainer');
  container.appendChild(qContainer);

  var qTitle = document.createElement("div");
  qTitle.setAttribute('id', "qTitle")
  qTitle.textContent = currentItem.title

  var choiceContainer = document.createElement("div");
  choiceContainer.setAttribute('id', "choiceContainer")

  for (var z=0; z < currentItem.choices.length; z++){
    var qChoice = document.createElement("button");
    qChoice.setAttribute('id', "qChoice")
    qChoice.setAttribute('textContent', currentItem.choices[z])
    qChoice.textContent = currentItem.choices[z]
    choiceContainer.appendChild(qChoice);
    qTitle.appendChild(choiceContainer);
  }

  qContainer.appendChild(qTitle);

  game()
  });

function game() {
  timeInterval = countdown()
  buttonEventListen(timeInterval)
}

function countdown() {
  var timeLeft = 60;
  var timeHeader = document.createElement("div");
  timeHeader.setAttribute("id", 'timeHeader');
  timeHeader.textContent = 'Good Luck!'
  headerEl.appendChild(timeHeader);

  var timeInterval = setInterval(function () {
    timeHeader.textContent = 'Time Left:  ' + timeLeft
    if (timeLeft >= 1) {
        // console.log(timeLeft)
        timeLeft--;
    } 
    else {
        clearInterval(timeInterval);
        endOfGame()
    }
  }, 1000);
  return timeInterval
}


function randItem(tempQuestions){
  if (tempQuestions.length > 0){
    tempIndex = Math.floor(Math.random() * tempQuestions.length)
    currentItem = tempQuestions[tempIndex]
    newArray.push(currentItem)
    tempQuestions.splice(tempIndex, 1)
    console.log(currentItem)
  }
  else{
    currentItem = tempQuestions[0]
    newArray.push(currentItem)
    console.log(currentItem)
  }
}

function endOfGame(timeInterval) {
    clearInterval(timeInterval)
    timeHeader.textContent = 'Final Score 👇'
    document.getElementById('container').innerHTML = ""
    console.log("Num Answered: " + String(numAnswered))
    console.log("Num Correct: " + String(numCorrect))

    var finalScore = document.createElement("div");
    finalScore.setAttribute("id", 'finalScore');
    finalScore.textContent = 'You answered ' + String(numCorrect) + ' correct out of ' + String(numAnswered) + '.'

    container.appendChild(finalScore);

    nameInput()
  
  }


function buttonEventListen(timeInterval){
  document.addEventListener("click", function(event) {
    element = event.target
    var currentButtonID = event.path[0].id
    if (currentButtonID == 'qChoice'){
      console.log(tempQuestions)
      numAnswered += 1
      var userChoice = element.getAttribute("textContent");
      if (numAnswered == numQuestions){
        if (userChoice == currentItem.answer){
          numCorrect+=1
          endOfGame(timeInterval)
        }
        else{
          endOfGame(timeInterval)
        }
      }
      else if (userChoice == currentItem.answer){
        numCorrect += 1
        document.getElementById('container').innerHTML = ""
        randItem(tempQuestions)
        checkStatusAndDisplay()
      }
      else{
        console.log('else else else')
        document.getElementById('container').innerHTML = ""
        randItem(tempQuestions)
        checkStatusAndDisplay()
      } 
    }
  });

}

function checkStatusAndDisplay(){
    // Create Container
    var qContainer = document.createElement("div");
    qContainer.setAttribute("id", 'qContainer');
    container.appendChild(qContainer);

    var qTitle = document.createElement("div");
    qTitle.setAttribute('id', "qTitle")
    qTitle.textContent = currentItem.title

    var choiceContainer = document.createElement("div");
    choiceContainer.setAttribute('id', "choiceContainer")

    for (var z=0; z < currentItem.choices.length; z++){
      var qChoice = document.createElement("button");
      qChoice.setAttribute('id', "qChoice")
      qChoice.setAttribute('textContent', currentItem.choices[z])
      qChoice.textContent = currentItem.choices[z]
      choiceContainer.appendChild(qChoice);
      qTitle.appendChild(choiceContainer);
    }

    qContainer.appendChild(qTitle);
    console.log(currentItem)

}

function nameInput(){
  var nameForm = document.createElement('form');
  nameForm.setAttribute('id', "nameForm")

  var formLabel = document.createElement('label')
  formLabel.setAttribute('for', "nameText")
  formLabel.textContent = 'Enter name to High Scores: '

  var formInput = document.createElement('input')
  formInput.setAttribute('id', "nameText")
  formInput.setAttribute('name', "nameText")

  formLabel.appendChild(formInput);
  nameForm.appendChild(formLabel);
  container.appendChild(nameForm);

  // var todoText = todoInput.value.trim();

// Add submit event to form
  container.addEventListener("submit", function(event) {
  var nameInput = document.querySelector("#nameText").value.trim();
  console.log(nameInput)
  event.preventDefault();
  if (nameInput === "") {
    return;
  }


  let newScore = {
    user:nameInput,
    score:  Math.round((numCorrect/numAnswered) * 10) / 10
  }

  var storedHighScores = JSON.parse(localStorage.getItem("StockScores"));
  var highScores = [];

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedHighScores !== null) {
    highScores = storedHighScores;
  }
  
  console.log(highScores)
  highScores.push(newScore)
  localStorage.setItem("StockScores", JSON.stringify(highScores))
  nameForm.innerHTML = "";

  var t4P = document.createElement("div");
  t4P.setAttribute("id", 't4P');
  t4P.textContent = 'Thanks for playing 🤝'
  
  var highScores = document.createElement("a");
  highScores.setAttribute("id", 'highScores');
  highScores.setAttribute("href", 'highscores.html');
  highScores.setAttribute("class", 'highscores.html');

  highScores.textContent = 'View HighScores'
  t4P.appendChild(highScores);
  nameForm.appendChild(t4P);


  });

}