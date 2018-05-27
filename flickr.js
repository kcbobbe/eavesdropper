
import request from 'superagent'
import $ from 'jquery'
window.$ = $

let htmlToPage = []

$('#search').on('submit', (e) => {
  e.preventDefault()
  const search = $('#input').val().split(' ').join('+')
  request
    .get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=16e988fdeac45c2f91be93eb25384173&text=${search}&per_page=4&page=1&format=json&nojsoncallback=1&media=photos`)
    // .auth('16e988fdeac45c2f91be93eb25384173', '46661d21626543cd')
    .then(response => {
      console.log(response)
      $('#flickr-photo-display-area').html('')
      let searchResults = response.body.photos.photo
      getPhotoInfo(searchResults)
      htmlToPage.push(`<a class="prev" onclick="${plusSlides(-1)}">&#10094;</a><a class="next" onclick="${plusSlides(1)}">&#10095;</a>`)
      console.log(htmlToPage)
      $('#flickr-photo-display-area').html(htmlToPage)
    })
}
)

function getPhotoInfo (searchResults) {
  htmlToPage = []
  searchResults.forEach(photo => {
    let farm = photo.farm
    let server = photo.server
    let id = photo.id
    let secret = photo.secret
    let x = resultsToHTML(farm, server, id, secret)
    htmlToPage.push(x)
  })
}

function resultsToHTML (farm, server, id, secret) {
  return `
  <div class="mySlides fade">
    <img class="flickrPhoto" style="width:100%" src="https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_z.jpg">
  </div>
  `
}

var slideIndex = 1
showSlides(slideIndex)

// Next/previous controls
function plusSlides (n) {
  showSlides(slideIndex += n)
}

function showSlides (n) {
  var i
  var slides = document.getElementsByClassName('.mySlides')
  console.log(slides)
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].display = 'none'
  } slides[ slideIndex - 1 ].style.display = 'block'
}
