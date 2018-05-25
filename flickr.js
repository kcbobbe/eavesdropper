
import request from 'superagent'
import $ from 'jquery'
import { debug } from 'util';
window.$ = $

let htmlToPage = []

$('#search').on('submit', (e) => {
  e.preventDefault()
  // $('#flickr-photo-display-area').html('')
  const search = $('#input').val().split(' ').join('+')
  request
    .get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=16e988fdeac45c2f91be93eb25384173&text=${search}&per_page=4&page=1&format=json&nojsoncallback=1&content_type=1&min_upload_date=1500000000`)
    // .auth('16e988fdeac45c2f91be93eb25384173', '46661d21626543cd')
    .then(response => {
      console.log(response)
      $('#flickr-photo-display-area').html('')
      let searchResults = response.body.photos.photo
      getPhotoInfo(searchResults)
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
  <img class="flickrPhoto" src="https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_q.jpg">
  `
}
