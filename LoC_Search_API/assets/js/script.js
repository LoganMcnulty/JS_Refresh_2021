// Selects element by class
var timeEl = $('.timer');
var dateAtStart = moment().unix()
timeEl.text(moment.unix(dateAtStart).format("MMM Do, YYYY, hh:mm:ss"))
var contentType = $('#contentType')
var sortBy = $('#sortBy')
var searchInput = $('#searchInput')
var submitSearch = $('#submitSearch')
var searchForm = $('#searchForm')
var resultsContainer = $('#resultsContainer')


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

var hitLOC_API = function(search){
  paramOne = search.contentType
  paramTwo = search.string
  paramThree = search.sortBy

  apiURL = 'https://www.loc.gov/' + paramOne + '/?q=' + paramTwo + '&sb=' + paramThree + '&fo=json'

  console.log(apiURL)

  fetch(apiURL).then(function (response) {
      return response.json();
    }).then(function (data) {
      projectData(data, search);
    });
    
}

var handleFormSubmit = function (event) {
  event.preventDefault();

  search = {
    contentType: contentType.val(),
    sortBy: sortBy.val(),
    string: searchInput.val()
  }
  search = cleanSearch(search)
  searchForm.trigger('reset')
  hitLOC_API(search)

  // if (isNa(project.rate)){
  //   alert('Please enter a number value in the rate field')
  //   console.log(projectRate)
  //   projectRate.reset()
  // }
  // else{
  //   printProject(project)
  //   projectForm[0].reset();
  // }

  };
  searchForm.on('submit',handleFormSubmit);

function cleanSearch(search){

  console.log(search)

  if (search.contentType == 'Maps' || 'Audio' || 'Photos' || 'Manuscripts' || 'Newspapers' || 'Websites'){
    search.contentType = search.contentType.toLowerCase()
  }
  else if (search.contentType == 'Film and Videos'){
    search.contentType = 'film-and-videos'
  }
  else if (search.contentType == 'Notated Music'){
    search.contentType = 'notated-music'
  }
  else{
    console.log('Something went wrong')
  }

  if (search.sortBy == 'Oldest'){
    search.sortBy = 'date'
  }
  else if (search.sortBy == 'Most Recent'){
    search.sortBy = 'date_desc'
  }
  else if (search.sortBy == 'By Title'){
    search.sortBy = 'title_s'
  }
  else if (search.sortBy == 'By Title Reversed'){
    search.sortBy = 'title_s_desc'
  }
  else{
    console.log('Something went wrong')
  }

  search.string = search.string.trim()
  console.log('Search Cleaned')
  console.log(search)
  return search
}


function projectData(data, search){
  resultsContainer.empty()
  console.log(data)
  console.log(search)

  if (search.contentType == 'photos'){
    for(i=0; i < data.results.length; i++){

      imageURL = data.results[i].image_url[2]
      if(imageURL == undefined){
        if (data.results[i].image_url[1] == undefined){
          imageURL = data.results[i].image_url[0]
        }
        else{
          imageURL = data.results[i].image_url[1]
        }
      }

      try{
        text = data.results[i].description[0]
      }
      catch(error){
        console.log(error)
      }

      if (text != undefined){
        contentURL = data.results[i].url
        resultsContainer.append(createCardImage(imageURL, text, contentURL))
      }
    }
    
  }
  else{
    console.log('finish later')
  }

}

function createCardImage(imageURL, text, contentUrl){
  var cardEl = $('<div>').addClass('card').attr('style','width:20rem')
  var imageEl = $('<img>').addClass('card-img-top').attr('src',imageURL).attr('alt','URL unavailable')
  var cardBodyEl = $('<div>').addClass('card-body')
  var cardText = $('<p>').addClass('card-text text-dark')

  if (text.length > 300){
    cardText.text(text.slice(0,300) + '...' )
    var aTagEl = $('<a>').attr('href',contentUrl).text('See More').attr('target','_blank')
    cardText.append(aTagEl)
    cardBodyEl.append(cardText)
  }
  else{
    cardText.text(text)
    var aTagEl = $('<a>').attr('href',contentUrl).text(' See More').attr('target','_blank')
    cardBodyEl.append(cardText)
    cardBodyEl.append(aTagEl)
  }

  cardEl.append(imageEl)
  cardEl.append(cardBodyEl)

  return cardEl
}

function makeCardDeck(){
  var cardDeck = $('')

  return cardDeck
}