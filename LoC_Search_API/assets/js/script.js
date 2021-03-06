// Selects element by class
var timeEl = $('.timer');
var dateAtStart = moment().unix()
timeEl.text(moment.unix(dateAtStart).format("MMM Do, YYYY, hh:mm:ss"))

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    dateAtStart += timerInterval
    timeEl.text(moment.unix(dateAtStart).format("MMM Do, YYYY, hh:mm:ss"));
    
  }, 1000);
}
setTime();

// Date dropdown for Modal
$(function () {
$('#projectDate').datepicker({
  changeMonth: true,
  changeYear: true,
});
});

var hitLOC_API = function(){
  baseURL = 'https://www.loc.gov/'
  paramOne = 'photos'
  paramTwo = 'football'
  paramThree = ''
  apiURL = baseURL + paramOne + '/?q=' + paramTwo + '&fo=json'
  console.log(apiURL)
  
  fetch(apiURL).then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
hitLOC_API()