import request from 'superagent'
import $ from 'jquery'

$('#search').on('submit', (e) => {
  e.preventDefault()
  const search = $('#input').val().split(' ').join('+')
  request
    .get(`http://localhost:8000/1.1/search/tweets.json?q=${search}&result_type=popular&tweet_mode=extended&lang=en`)
    .then(res => {
      return JSON.parse(res.text)
    })
    .then(tweets => {
      console.log(tweets.statuses)
      console.log(search)
      $('.content').html('')
      for (var i = 0; i < tweets.statuses.length; i++) {
        $('.content').append(`
        <a href="https://twitter.com/${tweets.statuses[i].user.screen_name}/status/${tweets.statuses[i].id_str}" target="_blank">
          <div class="tweet">
            <img class="tweet__img" src="${tweets.statuses[i].user.profile_image_url}">
            <h1 class="tweet__name">${tweets.statuses[i].user.name}</h1>
            <h2 class="tweet__screen-name">@${tweets.statuses[i].user.screen_name}</h2>
            <p class="tweet__content">${tweets.statuses[i].full_text}</p>
            <div class="tweet__clout">
              <span class="rt"><i class="fas fa-retweet"></i> ${tweets.statuses[i].retweet_count}</span>
              <span class="fav"><i class="far fa-heart"></i> ${tweets.statuses[i].favorite_count}</span>
            </div>
          </div>
        </a>
        `)
      }
    })
})
