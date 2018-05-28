
import request from 'superagent'
import $ from 'jquery'
window.$ = $

let htmlToPage = []

$('#search').on('submit', (e) => {
  e.preventDefault()
  const search = $('#input').val().split(' ').join('+')
  request
    .get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=16e988fdeac45c2f91be93eb25384173&text=${search}&per_page=6&page=1&format=json&nojsoncallback=1&media=photos`)
    .then(response => {
      $('#flickr-photo-display-area').html('')
      let searchResults = response.body.photos.photo
      getPhotoInfo(searchResults)
      $('#flickr-photo-display-area').html(`<p><i class="subtitle fab fa-flickr"></i></p><a href="https://www.flickr.com/search/?text=${search}">${htmlToPage.join('')}</a>`)
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
  <div>
    <img class="flickrPhoto" style="width:100%" src="https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_z.jpg">
  </div>
  `
}
