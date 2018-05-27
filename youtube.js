// import 'https://apis.google.com/js/api.js'
// import 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js'
const GOOGLE_API_KEY = 'AIzaSyCRvYV26aWufETmpUma7DIYxddjTz7g4O4'

function start() {
  gapi.client.init({
    'apiKey': GOOGLE_API_KEY
  }).then(function () {
    gapi.client.load('youtube', 'v3', function () {
      $('#search-button').attr('disabled', false);
    })
  })
}

// Search for a specified string.
function search() {
  var q = $('#input').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 1
  });

  request.execute(function (response) {
    // console.log('wow')
    console.log(response.result.items[0].snippet.channelTitle)
    console.log(response.result.items[0].snippet.title)
    let videoId = response.result.items[0].id.videoId
    let videoTitle = response.result.items[0].snippet.title
    let videoChannel = response.result.items[0].snippet.channelTitle
    document.getElementById('video-box').innerHTML =
    `<iframe width="420" height="315" 
    src="https://www.youtube.com/embed/${videoId}">
    </iframe>`
    document.getElementById('youtube-title').innerHTML =
    `<strong>${videoTitle}</strong>`
    document.getElementById('youtube-channel').innerHTML =
    `${videoChannel}`
    // var str = JSON.stringify(response.result)
    // $('#search-container').html('<pre>' + str + '</pre>')
    // (console.log(str))
  })
}

document.getElementById('search-button').addEventListener('click', function (e) { search() })

gapi.load('client', start)