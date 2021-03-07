// Selects element by class
var timeEl = $('.timer');
var dateAtStart = moment().unix()
timeEl.text(moment.unix(dateAtStart).format("MMM Do, YYYY, hh:mm:ss"))
// var usersContainer = document.getElementById('users');
// var fetchButton = document.getElementById('fetch-button');

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


function getApi() {
  var requestUrl = 'https://www.loc.gov/search/?q=baseball&fo=json';

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //Using console.log to examine the data
      console.log(data);
      // for (var i = 0; i < data.length; i++) {
      //   //Creating a h3 element and a p element
      //   var userName = document.createElement('h3');
      //   var userUrl = document.createElement('p');

      //   //Setting the text of the h3 element and p element.
      //   userName.textContent = data[i].login;
      //   userUrl.textContent = data[i].url;

      //   //Appending the dynamically generated html to the div associated with the id="users"
      //   //Append will attach the element as the bottom most child.
      //   usersContainer.append(userName);
      //   usersContainer.append(userUrl);
      // }
    });
}
getApi()
// fetchButton.addEventListener('click', getApi);
