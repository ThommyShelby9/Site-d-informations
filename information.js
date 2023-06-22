const weatherApiKey = 'ZHWHKTHEYCQUWQ7V3LZL7RAKK';
const newsApiKey = 'pub_24905321b23568021b1a3feb861cdde051905';

function getWeatherAndNews(location) {
  let weatherUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}/?key=${weatherApiKey}&lang=fr`;

  fetch(weatherUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(data.currentConditions.temp);
      document.querySelector('#condition').innerHTML = data.currentConditions.conditions;
      document.getElementById('temp').innerHTML = data.currentConditions.temp + "°";
      document.querySelector('#humidity').innerHTML = data.currentConditions.humidity + "%";
      document.querySelector('#name').innerHTML= data.address;
      document.querySelector('#long').innerHTML= data.description;
      document.querySelector('#lat').innerHTML= data.latitude; 
      document.querySelector('#localisation').innerHTML =data.resolvedAddress;
    })
    .catch(err => console.log('Erreur : ' + err));
}

const url= `https://newsdata.io/api/1/news?q=${encodeURIComponent(location)}&apikey=${newsApiKey}&language=fr`;
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let news = '';
    data.results.forEach(results => {
      news += `
        <div class="art">
          <div class="art_nom">
            <h3>${results.title}</h3>
          </div>
          <div class="art_img">
            <img src="${results.image}" alt="" width="300px">
          </div>
          <div class="art_content">
            <p>${results.description}</p>
          </div>
          <div class="url">
            <a href="${results.url}">En savoir plus...</a>
          </div>
        </div>
      `;
    });
    document.getElementById('arts').innerHTML = news;
  })
  .catch(error => console.error(error));

document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
  const location = document.querySelector('#ville').value;
  getWeatherAndNews(location);
});

function affichage(location) {
  getWeatherAndNews(location);
}

affichage();

let urlapi = `https://newsdata.io/api/1/news?&apikey=${newsApiKey}&language=fr`;

function actualites() {
  fetch(urlapi)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(data.results);
      if (data.results) {
        let newsItems = '';
        data.results.forEach(results => {
          newsItems += `
            <div class="art">
              <div class="art_nom">
                <h3>${results.title}</h3>
              </div>
              <div class="art_img">
                <img src="${results.image}" alt="" width="300px">
              </div>
              <div class="art_content">
                <p>${results.description}</p>
              </div>
              <div class="url">
                <a href="${results.link}">En savoir plus...</a>
              </div>
            </div>
          `;
        });
        document.getElementById('art').innerHTML = newsItems;
      }
    })
    .catch(err => console.log('Erreur : ' + err));
}

document.getElementById('global').addEventListener('click', function(e) {
  e.preventDefault();
  actualites();
  var bossart = document.querySelector('#bossart');
});
