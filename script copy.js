const groupA = ['us', 'gb'];
const groupB = ['cn'];
const url = 'https://newsdata.io/api/1/news?apikey=pub_5763c297d03864a740f8bd4e878cb8dae01f&';

//https://newsapi.org/v2/top-headlines?country=us&apiKey=f1f4d5a2ed1e43d3aeecb6550f9306a1
const btn = document.getElementById('search-btn')
btn.addEventListener('click', () => {
  manipulateDOM.clearDOM();
  let searchTerm = 'q=' + document.getElementById('search-topic').value;
  let country = '&country' + '=' + document.getElementById('search-country').value;
  let fullURL = url + searchTerm + country;
  console.log(fullURL)
  const req = new Request(fullURL);
  sendRequest(req);
  }
)

const sendRequest = (req) => {
  fetch(req)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    populateContent(data);
  })
  .then(getOpposite)
}

const populateContent = (data) => {
  const countryTitle = document.querySelector('.country-title');
      switch (document.getElementById('search-country').value) {
        case 'us':
          countryTitle.textContent = '🇺🇸 United States';
          break;
        case 'cn':
          countryTitle.textContent = '🇨🇳 China';
          break;
        case 'ru':
          countryTitle.textContent = '🇷🇺 Russia';
          break;
        case 'gb':
          countryTitle.textContent = '🇬🇧 United Kingdom';
          break;
      }
  if (data['results'].length !== 0) {
    if (data['results'].length > 5) {
      for (let i = 0; i < 4; i++) {
        manipulateDOM.displayCountryArticles(i, data);
      }
    }
    else {
      for (let i = 0; i < data['results'].length; i++) {
        manipulateDOM.displayCountryArticles(i, data);
      }
    }
  }
  else {
    const error = document.createElement('div');
    error.classList.add('error');
    error.textContent = 'No news articles found';
    document.querySelector('.country-results').appendChild(error);
  }  
}

let randomOpposite;
const getOpposite = () => {
  //find which group country is in
  if (groupA.includes(document.getElementById('search-country').value)) {
    randomOpposite = groupB[Math.floor(Math.random() * groupB.length)];
  }
  else {
    randomOpposite = groupA[Math.floor(Math.random() * groupA.length)];
  }
  let oppSearchTerm = 'q=' + document.getElementById('search-topic').value;
  let oppCountry = '&country' + '=' + randomOpposite;
  let oppURL = url + oppSearchTerm + oppCountry;
  console.log(oppURL);
  const oppReq = new Request(oppURL);
  sendOppositeRequest(oppReq);
}

const sendOppositeRequest = (oppReq) => {
  fetch(oppReq)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    populateOppositeContent(data);
  })
}

const populateOppositeContent = (data) => {
  const oppCountryTitle = document.querySelector('.opposite-title');
    switch (randomOpposite) {
      case 'us':
        oppCountryTitle.textContent = '🇺🇸 United States';
        break;
      case 'cn':
        oppCountryTitle.textContent = '🇨🇳 China';
        break;
      case 'ru':
        oppCountryTitle.textContent = '🇷🇺 Russia';
        break;
      case 'gb':
        oppCountryTitle.textContent = '🇬🇧 United Kingdom';
        break;
    }
  if (data['results'].length !== 0) {
    if (data['results'].length > 5) {
      for (let i = 0; i < 4; i++) {
        manipulateDOM.displayOppositeArticles(i, data);
      }
    }
    else {
      for (let i = 0; i < data['results'].length; i++) {
        manipulateDOM.displayOppositeArticles(i, data);
      }
    }
  }
  else {
    const error = document.createElement('div');
    error.classList.add('error');
    error.textContent = 'No news articles found';
    document.querySelector('.opposite-results').appendChild(error);
  }  
}

const manipulateDOM = (() => {
  const clearDOM = () => {
    document.querySelectorAll('.article').forEach(div => div.remove());
    if (document.querySelector('.error') !== null) {
      document.querySelector('.error').remove();
    }
  }
  const displayCountryArticles = (i, data) => {
    const resultsDiv = document.querySelector('.country-results');
    const article = document.createElement('div');
    article.classList.add('article');
    resultsDiv.appendChild(article);
    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = data['results'][i]['title'];
    article.appendChild(title);
    const date = document.createElement('div');
    date.classList.add('date');
    date.textContent = data['results'][i]['pubDate'];
    article.appendChild(date);
    const desc = document.createElement('div');
    desc.classList.add('description');
    desc.textContent = data['results'][i]['description'];
    article.appendChild(desc);
    const link = document.createElement('div');
    link.classList.add('link');
    link.textContent = data['results'][i]['source_id'];
    article.appendChild(link);
  }
  const displayOppositeArticles = (i, data) => {
    const oppositeDiv = document.querySelector('.opposite-results');
    const oppArticle = document.createElement('div');
    oppArticle.classList.add('article');
    oppositeDiv.appendChild(oppArticle);
    const oppTitle = document.createElement('div');
    oppTitle.classList.add('title');
    oppTitle.textContent = data['results'][i]['title'];
    oppArticle.appendChild(oppTitle);
    const oppDate = document.createElement('div');
    oppDate.classList.add('date');
    oppDate.textContent = data['results'][i]['pubDate'];
    oppArticle.appendChild(oppDate);
    const oppDesc = document.createElement('div');
    oppDesc.classList.add('description');
    oppDesc.textContent = data['results'][i]['description'];
    oppArticle.appendChild(oppDesc);
    const oppLink = document.createElement('div');
    oppLink.classList.add('link');
    oppLink.textContent = data['results'][i]['source_id'];
    oppArticle.appendChild(oppLink);
  }
  return {
    clearDOM: clearDOM,
    displayCountryArticles: displayCountryArticles,
    displayOppositeArticles: displayOppositeArticles,
  };
})();
