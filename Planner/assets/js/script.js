// Selects element by class
var timeEl = $('.timer');
var dateAtStart = moment().unix()
timeEl.text(moment.unix(dateAtStart).format("MMM Do, YYYY, hh:mm:ss"))
var projectForm = $('#projectForm');


function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    dateAtStart += timerInterval
    timeEl.text(moment.unix(dateAtStart).format("MMM Do, YYYY, hh:mm:ss"));
    
  }, 1000);
}

setTime();

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

$(function () {
$('#datepicker').datepicker({
    changeMonth: true,
    changeYear: true,
});
});

var handleFormSubmit = function (event) {
    event.preventDefault();
    console.log('stuff')
    projectForm.modal('hide')
    return false;
    // var nameInput = nameInputEl.val();
    // var dateInput = dateInputEl.val();
  
    // if (!nameInput || !dateInput) {
    //   console.log('You need to fill out the form!');
    //   return;
    // }
  
    // printSkills(nameInput, dateInput);
  
    // // resets form
    // nameInputEl.val('');
    // dateInputEl.val('');
  };
  
  projectForm.on('submit', handleFormSubmit);