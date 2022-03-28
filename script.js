const groupA = ['us', 'gb', 'au'];
const groupB = ['cn', 'ru', 'pk'];
const url = 'https://api.thenewsapi.com/v1/news/top?api_token=6S27st87VnHLOxnpNTiFFOmDcVv0ZYOE5rkeQgCc';


const searchBar = document.querySelector('.search');
searchBar.addEventListener('focusin', (e) => {
  searchBar.classList.add('search-focus');
})

const input = document.querySelector('input#search-topic');
const dropdown = document.querySelector('select#search-country');
input.addEventListener('keydown', function(event) {
  if (event.keyCode === 9 && document.activeElement == input) {
    dropdown.style.outline = "none";
    input.style.outline = "1px solid #000";
  }
});

dropdown.addEventListener('keydown', function(event) {
  if (event.keyCode === 9 && document.activeElement == dropdown) {
    input.style.outline = "none";
    dropdown.style.outline = "1px solid #000";
  }
});

window.addEventListener('click', (e) => {
  if (!searchBar.contains(e.target)) {
    searchBar.classList.remove('search-focus');
    input.style.outline = "none";
    dropdown.style.outline = "none";
  }
})

const btn = document.getElementById('search-btn')
btn.addEventListener('click', () => {
  manipulateDOM.clearDOM();
  const lang = '&language=en';
  let country = '&locale=' + document.getElementById('search-country').value;
  let searchTerm = '&search=' + document.getElementById('search-topic').value;
  let fullURL = url + lang + country + searchTerm;
  console.log(fullURL)
  const req = new Request(fullURL);
  sendRequest(req);
  }
)

//mobile
btn.addEventListener('touchend', () => {
  manipulateDOM.clearDOM();
  const lang = '&language=en';
  let country = '&locale=' + document.getElementById('search-country').value;
  let searchTerm = '&search=' + document.getElementById('search-topic').value;
  let fullURL = url + lang + country + searchTerm;
  const req = new Request(fullURL);
  sendRequest(req);
  }
)

const sendRequest = (req) => {
  fetch(req , {
    mode: 'cors'
  })
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
        countryTitle.textContent = 'News from ' + '🇺🇸 United States';
        break;
      case 'cn':
        countryTitle.textContent = 'News from ' + '🇨🇳 China';
        break;
      case 'gb':
        countryTitle.textContent = 'News from ' + '🇬🇧 United Kingdom';
        break;
      case 'au':
        countryTitle.textContent = 'News from ' + '🇦🇺 Australia';
        break;
      case 'pk':
        countryTitle.textContent = 'News from ' + '🇵🇰 Pakistan';
        break;
      case 'ru':
        countryTitle.textContent = 'News from ' + '🇷🇺 Russia';
        break;
      }
  if (data['data'].length !== 0) {
    if (data['data'].length > 5) {
      for (let i = 0; i < 5; i++) {
        manipulateDOM.displayCountryArticles(i, data);
      }
    }
    else {
      for (let i = 0; i < data['data'].length; i++) {
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
  const lang = '&language=en';
  let oppCountry = '&locale=' + randomOpposite;
  let oppSearchTerm = '&search=' + document.getElementById('search-topic').value;
  let oppURL = url + lang + oppCountry + oppSearchTerm;
  console.log(oppURL);
  const oppReq = new Request(oppURL);
  sendOppositeRequest(oppReq);
}

const sendOppositeRequest = (oppReq) => {
  fetch(oppReq, {mode: 'cors'})
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
        oppCountryTitle.textContent = 'News from ' + '🇺🇸 United States';
        break;
      case 'cn':
        oppCountryTitle.textContent = 'News from ' + '🇨🇳 China';
        break;
      case 'gb':
        oppCountryTitle.textContent = 'News from ' + '🇬🇧 United Kingdom';
        break;
      case 'au':
        oppCountryTitle.textContent = 'News from ' + '🇦🇺 Australia';
        break;
      case 'pk':
        oppCountryTitle.textContent = 'News from ' + '🇵🇰 Pakistan';
        break;
      case 'ru':
        oppCountryTitle.textContent = 'News from ' + '🇷🇺 Russia';
        break;
    }
  if (data['data'].length !== 0) {
    if (data['data'].length > 5) {
      for (let i = 0; i < 5; i++) {
        manipulateDOM.displayOppositeArticles(i, data);
      }
    }
    else {
      for (let i = 0; i < data['data'].length; i++) {
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
    title.textContent = data['data'][i]['title'];
    article.appendChild(title);
    const desc = document.createElement('div');
    desc.classList.add('description');
    desc.textContent = data['data'][i]['snippet'];
    article.appendChild(desc);
    const date = document.createElement('div');
    date.classList.add('date');
    const rawDate = data['data'][i]['published_at'];
    const convDate = rawDate.slice(0, 10);
    date.textContent = convDate;
    article.appendChild(date);
    const link = document.createElement('div');
    link.classList.add('link');
    const click = document.createElement("a");
    click.setAttribute('href', data['data'][i]['url']);
    click.textContent = 'From ' + data['data'][i]['source'];
    link.appendChild(click);
    article.appendChild(link);
  }
  const displayOppositeArticles = (i, data) => {
    const oppositeDiv = document.querySelector('.opposite-results');
    const oppArticle = document.createElement('div');
    oppArticle.classList.add('article');
    oppositeDiv.appendChild(oppArticle);
    const oppTitle = document.createElement('div');
    oppTitle.classList.add('title');
    oppTitle.textContent = data['data'][i]['title'];
    oppArticle.appendChild(oppTitle);
    const oppDesc = document.createElement('div');
    oppDesc.classList.add('description');
    oppDesc.textContent = data['data'][i]['snippet'];
    oppArticle.appendChild(oppDesc);
    const oppDate = document.createElement('div');
    oppDate.classList.add('date');
    const oppRawDate = data['data'][i]['published_at'];
    const oppConvDate = oppRawDate.slice(0, 10);
    oppDate.textContent = oppConvDate;
    oppArticle.appendChild(oppDate);
    const oppLink = document.createElement('div');
    oppLink.classList.add('link');
    const click = document.createElement("a");
    click.setAttribute('href', data['data'][i]['url']);
    click.textContent = 'From ' + data['data'][i]['source'];
    oppLink.appendChild(click);
    oppArticle.appendChild(oppLink);
  }
  return {
    clearDOM: clearDOM,
    displayCountryArticles: displayCountryArticles,
    displayOppositeArticles: displayOppositeArticles,
  };
})();
