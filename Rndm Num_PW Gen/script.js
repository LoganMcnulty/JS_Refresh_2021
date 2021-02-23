// Array of special characters to be included in password

var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var letters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

var allCharacters = {
  specialCharacters: specialCharacters, 
  numbers: numericCharacters, 
  letters: letters
}

// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var criteria = promptInput()
  var password = generatePassword(criteria);
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);


// prompt and validate input from the user
// cannot be all false (N) or have length outside of bounds 8 and 128
function promptInput() {
  var userInput = true
  var allFalse = true
  var pwDict = {
    num: false,
    lowerCase: false,
    upperCase: false,
    specChar: false,
    length: 0,
  }

  while (allFalse){
    while (userInput){
      alert("Welcome to password generator")
      pwDict.num = useSomething('Numbers')
      pwDict.lowerCase = useSomething('lowercase letters')
      pwDict.upperCase = useSomething('uppercase letters')
      pwDict.specChar = useSomething('special characters')
      promptLength = true

      while(promptLength){
        x = parseFloat(prompt("Enter a PW length between 8 and 128"))
          if (x && (8 <=x) && ( x < 128)){
            pwDict.length = x
            promptLength = false
          }
          else{alert("please enter a number between 8 to 128")}
        }
      var check = (pwDict.num === false) && (pwDict.lowerCase === false) && (pwDict.upperCase === false) && (pwDict.specChar === false)

      if (check)
        {
        alert('Please try again without entering N for all entries')
      }
      else{allFalse = false; userInput = false}
    }
  }
return pwDict
}

// prompt user to see if they'd like to use an input
function useSomething(something){
  var inputOccuring = true
  var somethingInPW = false
  while(inputOccuring){
    useValue = prompt("Would you like to include " + something + "? Enter Y or N").toUpperCase()
    if (['Y','N'].includes(useValue)){
      if (useValue == 'Y'){
        somethingInPW = true
        inputOccuring = false
      }
      else {inputOccuring = false}
    }
    else{alert('Please make a valid entry of Y or N')}
    }
    return somethingInPW
}


function generatePassword(criteria) {
  var password = ''
  console.log(criteria)
  var loopCount = criteria.length
  for (i=0; i < loopCount; i++){
    var keys = Object.keys(allCharacters);
    var array = allCharacters[keys[keys.length * Math.random() << 0]]
    validation = true

    while (validation){
    
      if ((array == allCharacters.letters) && (criteria.upperCase || criteria.lowerCase)){
        if (criteria.upperCase && (criteria.lowerCase == false)){
          var index = (Math.floor(Math.random() * array.length))
          password += (array[index]).toUpperCase()
          validation = false
        }
        else if (((Math.random() * 2) < 1) && criteria.upperCase){
          var index = (Math.floor(Math.random() * array.length))
          password += (array[index]).toUpperCase()
          validation = false
        }
        else{
          var index = (Math.floor(Math.random() * array.length))
          password += (array[index])
          validation = false
        }
      }

      else if (criteria.specChar && (array == allCharacters.specialCharacters)){
        var index = Math.floor(Math.random() * (array.length))
        password += (array[index])
        validation = false
      }

      else if (criteria.num && (array == (allCharacters.numbers))){
        var index = Math.floor(Math.random() * (array.length))
        password += (array[index])
        validation = false
      }
      else{
        loopCount += 1
        validation = false
      }
    }
  }
  return password
}
