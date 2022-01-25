// API links to movies database and movie posters
const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=47ebae28457dd9eb6fee910bfa2868a3&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=47ebae28457dd9eb6fee910bfa2868a3&query=";

//accessing DOM objects to be edited
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

//Gets movies from API database
const getMovies = async (url) => {
  const resp = await fetch(url);
  const respData = await resp.json();

  console.log(respData);

  showMovies(respData.results);
};


//shows movies posters, creates a div with appropriate movie poster and title
const showMovies = (movies) => {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img
        src="${IMGPATH + poster_path}"
        alt="${title}"
      />
      <div class="movie-info">
        <h3>${title}</h3>
      </div>`;
    main.appendChild(movieEl);
  });
};


//Gets movies based on users input
getMovies(APIURL);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});
