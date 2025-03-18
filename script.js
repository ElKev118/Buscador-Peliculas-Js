document.getElementById("searchButton").addEventListener("click", searchMovies);
let api_key = "api_key";
let urlBase = "https://api.themoviedb.org/3/search/movie";
let urlImg = "https://image.tmdb.org/t/p/w200";

let resultContainer = document.getElementById("results");

function searchMovies() {
  let searchInput = document.getElementById("searchInput").value;
  resultContainer.innerHTML = "Cargando...";
  fetch(`${urlBase}?api_key=${api_key}&query=${searchInput}`)
    .then((response) => response.json())
    .then((data) => displayMovies(data));
}

function displayMovies(movies) {
  resultContainer.innerHTML = "";
  if (movies.results.length === 0) {
    resultContainer.innerHTML = "<p> No se encontraron resultados </p>";
    return;
  }

  movies.results.forEach((movie) => {
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    let title = document.createElement("h2");
    title.textContent = movie.title;

    let releaseDate = document.createElement("p");
    releaseDate.textContent =
      "La fecha de lanzamiento fue: " + movie.release_date;

    let overview = document.createElement("p");
    overview.textContent = movie.overview;

    let valoracion = document.createElement("p");
    valoracion.textContent = "La valoración es: " + movie.vote_average;

    let posterPath = urlImg + movie.poster_path;
    let poster = document.createElement("img");
    poster.src = posterPath;

    movieDiv.appendChild(poster);
    movieDiv.appendChild(title);
    movieDiv.appendChild(releaseDate);
    movieDiv.appendChild(overview);
    movieDiv.appendChild(valoracion);

    resultContainer.appendChild(movieDiv);
  });
}
