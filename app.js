const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c"; // örnek anahtar
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

// İlk olarak popüler filmleri getir
getMovies(API_URL);

async function getMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      showMovies(data.results);
    } else {
      main.innerHTML = "<p style='color: white;'>Film bulunamadı.</p>";
    }
  } catch (error) {
    console.error("Hata oluştu:", error);
    main.innerHTML = "<p style='color: white;'>Veriler yüklenemedi.</p>";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (searchTerm) {
    getMovies(SEARCH_API + encodeURIComponent(searchTerm));
    search.value = "";
  } else {
    window.location.reload();
  }
});

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img
        src="${
          poster_path
            ? IMG_PATH + poster_path
            : "https://via.placeholder.com/300x450?text=No+Image"
        }"
        alt="Poster of ${title}"
      />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>${title} <small>Overview</small></h3>
        <p>${overview}</p>
      </div>
    `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
