tempQuestions = [1,2,3,4,5,6,7]
newArray = []

let tempIndex = (Math.floor(Math.random() * tempQuestions.length))
let currentItem = tempQuestions[tempIndex]
console.log('First temp index' + tempIndex)
console.log('first item' + currentItem)
newArray = []
newArray.push(currentItem)
tempQuestions.splice(tempIndex, 1)
console.log(tempQuestions)


for (i=tempQuestions.length; i > 0){
  tempIndex = (Math.floor(Math.random() * tempQuestions.length))
  currentItem = tempQuestions[tempIndex]
  newArray.push(currentItem)
  console.log('new index ' + tempIndex)
  console.log('new item ' + currentItem)
  tempQuestions.splice(tempIndex, 1)
  console.log(tempQuestions)
  console.log('temp questions length: ' + tempQuestions.length)
  console.log('i: ' + i)
}

console.log(newArray)