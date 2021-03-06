// Selects element by class
var timeEl = $('.timer');
var dateAtStart = moment().unix()
timeEl.text(moment.unix(dateAtStart).format("MMM Do, YYYY, hh:mm:ss"))
var projectForm = $('#projectForm');
var projectModal = $('#projectModal');
var projectName = $('#projectName')
var projectType = $('#projectType')
var projectRate = $('#projectRate')
var projectDate = $('#projectDate')
var projectTable = $('#projectTable')

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    dateAtStart += timerInterval
    timeEl.text(moment.unix(dateAtStart).format("MMM Do, YYYY, hh:mm:ss"));
    
  }, 1000);
}
setTime();

var printProject = function (project) {
  console.log(project)


  var projectRow = $('<tr>').addClass('text-dark customRow align-items-center').attr('id','customRow').attr('status','inactive')
  var projectNameTd = $('<td>').text(project.name).addClass('align-middle sauce');
  var projectTypeTd = $('<td>').text(project.type).addClass('align-middle');
  var projectRateTd = $('<td>').text(project.rate).addClass('align-middle');
  var projectDateTd = $('<td>').text(project.date).addClass('align-middle');
  currentDate = moment.unix(dateAtStart).format("MM/DD/YYYY")
  var daysUntilDueTd = $('<td>').text(dateDifference(currentDate, project.date)).addClass('align-middle');
  var earningsTd = $('<td>').text("$" + Math.round(dateDifference(currentDate, project.date)*4*project.rate)).addClass('align-middle');
  var deleteButtonTd = $('<button>').text('x').attr('id','deleteProjectBtn').attr('type',"button").addClass("btn btn-outline-dark bg-light align-middle")
  

  projectRow.append(projectNameTd, projectTypeTd, projectRateTd, projectDateTd, daysUntilDueTd, earningsTd, deleteButtonTd)
  projectTable.append(projectRow)

  projectModal.modal('hide')

}
var rowSelect = $('.sauce')
rowSelect.on('click', '.customRow', rowSelect);
var rowSelect = function (project) {
  console.log('hitt')
}

var dateDifference = function(date1, date2){
  var date1 = new Date(date1); 
  var date2 = new Date(date2);

  // To calculate the time difference of two dates
  var diffInTime = date2.getTime() - date1.getTime();   
  // To calculate the no. of days between two dates and multiply 4 hours a day for the job
  var diffInDays = Math.round(diffInTime / (1000 * 3600 * 24))

  return diffInDays
}

var handleFormSubmit = function (event) {
  event.preventDefault();
  project = {
    name: projectName.val(),
    type: projectType.val(),
    rate: parseFloat(projectRate.val()),
    date: projectDate.val()
  }


  if (isNaN(project.rate)){
    alert('Please enter a number value in the rate field')
    console.log(projectRate)
    projectRate.reset()
  }
  else{
    printProject(project)
    projectForm[0].reset();
  }

  };
projectModal.on('submit', handleFormSubmit);

var handleDeleteProject = function (event) {
  var btnClicked = $(event.target);
  btnClicked.parent('tr').remove();
}
projectTable.on('click', '#deleteProjectBtn', handleDeleteProject);

var highlightRow = function (event){
  var rowClicked = $(event.target).parent('tr')

  if (rowClicked.attr('status') == 'active'){
    rowClicked.attr('status','inactive')
    rowClicked.attr('style','background-color:#aab9bf')

  }
  else{
    rowClicked.attr('status','active')
    rowClicked.attr('style','background-color:#fed8b1')
  
  }

}
projectTable.on('click', '#customRow', highlightRow);

// Modal Listener
$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

// Date dropdown for Modal
$(function () {
$('#projectDate').datepicker({
  changeMonth: true,
  changeYear: true,
});
});