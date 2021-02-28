var container = document.getElementById('container');
var storedHighScores = JSON.parse(localStorage.getItem("StockScores"));

var sortedHighScores = []

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1
};

function defaultCompare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function bubbleSort(arr, compare = defaultCompare) {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - 1 - i; j++) { // refer to note below
            if (compare(arr[j].score, arr[j + 1].score) === Compare.LESS_THAN) {
                swap(arr, j, j + 1);
            }
        }
    }
    return arr;
}


var newHighScores = bubbleSort(storedHighScores, compare = defaultCompare)
console.log(newHighScores)

  // Render a new li for each todo
  var scoreContainer = document.createElement("ul")
  scoreContainer.setAttribute("id", 'finalScore');

  for (var i = 0; i < storedHighScores.length; i++) {
    console.log(storedHighScores[i])
    var li = document.createElement("li");
    li.textContent = storedHighScores[i].user + ': ' + storedHighScores[i].score;
    li.setAttribute("data-index", i);
    li.setAttribute("style", "list-style-type: none, ");


    scoreContainer.appendChild(li);
  }

  container.appendChild(scoreContainer);
