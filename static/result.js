var HttpClient = function() {
  this.get = function(aUrl, aCallback) {
    var anHttpRequest = new XMLHttpRequest();
    anHttpRequest.onreadystatechange = function() {
      if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
        aCallback(anHttpRequest.responseText);
    };

    anHttpRequest.open("GET", aUrl, true);
    anHttpRequest.send(null);
  };
};

function template(data) {
  return `<li class="container">
    <div class="card"><li><img class="poster" src="${data.Poster}"></li>
    <li><div class="text"><p class="title">${data.Title}</p></br>
    <p class="year">Release Year : ${data.Year}</p></br>
    <p class="imdbid">IMDB ID : ${data.imdbID}</p></div></li></div>
  </li>`;
}

var client = new HttpClient();
client.get("http://www.omdbapi.com/?s=iron+man&apikey=3d25c8a8", function(
  response
) {
  var jsonResponse = JSON.parse(response);
  document.getElementById("result").innerHTML = `<h1>${
    jsonResponse.Search.length
  } Results found...</h1>
  <ul>${jsonResponse.Search.map(template).join("")}</ul>
  `;
});
