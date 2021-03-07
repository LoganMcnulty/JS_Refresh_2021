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

  apiURL = 'https://www.loc.gov/' + paramOne + '/?q=' + paramTwo + '&sb=' + paramThree 

  if (paramOne === 'websites'){
    apiURL += '&sp=1'
  }
  apiURL += '&fo=json'
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

  return search
}


function projectData(data, search){
  resultsContainer.empty()
  console.log(data)
  console.log(search)
  console.log(data.results.length)

  for(i=0; i < data.results.length; i++){
    contentURL = data.results[i].url
    title = data.results[i].title

    if (search.contentType === 'photos' || 
        search.contentType === 'maps'){
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
          resultsContainer.append(createCardImage(imageURL, text, contentURL, title, i))
        }
      }
    
  else if (search.contentType === 'manuscripts' || 
          search.contentType === 'newspapers' || 
          search.contentType === 'notated-music' ||
          search.contentType === 'audio' ||
          search.contentType === 'websites')
          {
            description = data.results[i].description
            // if (search.contentType === 'websites'){
            //   // websiteURLs = data.results[i].item.scopes
            //   // console.log(websiteURLs)
            //   resultsContainer.append(createTextCard(description, contentURL, title, search))
            // }
            // else {
              resultsContainer.append(createTextCard(description, contentURL, title))
            // }
          }

  else if (search.contentType === 'films-and-videos'){
    console.log(data.results[i])
    // for(i=0; i < data.results.length; i++){
    //   title = data.results[i].title
    //   description = data.results[i].description
    //   url = data.results[i].url
    // }
  }
  else{
    console.log('something went wrong')
  }

}

}

function createCardImage(imageURL, text, contentUrl, title, i=''){
// Create Card
  var cardEl = $('<div>').addClass('card').attr('style','width:20rem')
  var imageEl = $('<img>').addClass('card-img-top btn p-0, m-0 zoom').attr('src',imageURL).attr('alt','URL unavailable').attr('data-toggle','modal').attr('data-target','#imageModal'+i).attr('id','imageModal')
  var cardBodyEl = $('<div>').addClass('card-body')

  var cardTitleEl = $('<h5>').addClass('card-title').text(title)
  if (title.length > 60){
    cardTitleEl.text(title.slice(0,60) + '...' )
  }
  var cardText = $('<p>').addClass('card-text text-dark')
  cardBodyEl.append(cardTitleEl)

  if (text.length > 300){
    cardText.text(text.slice(0,300) + '...' )
    var aTagEl = $('<a>').attr('href',contentUrl).text(' See More').attr('target','_blank')
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

// Add Modal to card
  var modalEl = imageToModal(imageURL)
  cardEl.append(modalEl)
  cardEl.append(cardBodyEl)

  return cardEl
}


function createTextCard(text, contentUrl, title, search='', websiteURLs=[]){
  // Create Card
    var cardEl = $('<div>').addClass('card').attr('style','width:20rem')
    var cardBodyEl = $('<div>').addClass('card-body')
    var cardTitleEl = $('<h5>').addClass('card-title').text(title)
    if (title.length > 100){
      cardTitleEl.text(title.slice(0,100) + '...' )
    }
    var cardText = $('<p>').addClass('card-text text-dark')
    cardBodyEl.append(cardTitleEl)
  

    if (search.contentType === 'websites'){
      for (i=0; i < websiteURLs.length; i++){
        var aTagEl = $('<a>').attr('href',websiteURLs[i]).text(' See More').attr('target','_blank')
        cardBodyEl.append(aTagEl)
      }
    }

    else if (typeof text === 'undefined'){
      text = 'Description Unavailable'
      cardText.text(text)
      var aTagEl = $('<a>').attr('href',contentUrl).text(' See More').attr('target','_blank')
      cardBodyEl.append(cardText)
      cardBodyEl.append(aTagEl)
    }
    else{
      text = text[0]
      if (text.length > 300){
        console.log('true')
        cardText.text(text.slice(0,300) + '...' )
        var aTagEl = $('<a>').attr('href',contentUrl).text(' See More').attr('target','_blank')
        cardText.append(aTagEl)
        cardBodyEl.append(cardText)
      }
      else{
        cardText.text(text)
        var aTagEl = $('<a>').attr('href',contentUrl).text(' See More').attr('target','_blank')
        cardBodyEl.append(cardText)
        cardBodyEl.append(aTagEl)
      }

    }
    cardEl.append(cardBodyEl)
    return cardEl
  }


function imageToModal(imageURL){
  var modalEl = $('<div>').addClass('modal fade text-dark m-0').attr('id','imageModal'+i).attr('tabindex','-1').attr('role','dialog').attr('aria-hidden','true')
  var modalDialogEl= $('<div>').addClass('modal-dialog')
  var modalContent = $('<div>').addClass('modal-content')
  var closeModal = $('<button>').addClass('btn btn-primary close').attr('type','button').attr('data-dismiss','modal').attr('aria-label','Close')
  var spanEl = $('<span>').attr('aria-hidden','true').html('&times;')
  closeModal.append(spanEl)
  var modalImage = $('<img>').attr('src',imageURL).addClass('img-responsive').attr('style','width:150%')
  modalContent.append(modalImage)
  modalDialogEl.append(modalContent)
  modalEl.append(closeModal, modalDialogEl)
  return modalEl
}