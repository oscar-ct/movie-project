

//////////////////////////////////////////  OMDb  ////////////////////////////////////////////////////////

const thisIsATest = '0011011000110110001100100011000100110100011001010110001000111001';
const mapTitleSearchToDiv = (movie) => `<div onclick="getTitle('${movie.imdbID}')" class="movie-card">
            <div><img class="img-sm" src="${movie.Poster}"></div>
            <div class="date">${movie.Year}</div>
        </div>`;
document.querySelector('.searchButton').addEventListener('click', function () {
    const titleSearched = document.querySelector('.searchTerm').value;
    getSearchTitle(titleSearched);

});
function getSearchTitle (search) {
    fetch("https://omdbapi.com/?apikey=" + [money(thisIsATest)] + "&s" + "=" + search, {
    }).then(resp => resp.json()).then(function (data) {
        document.querySelector('#output').innerHTML = data.Search.map(mapTitleSearchToDiv).join('');
        console.log(data.Search);
    });
}
function getTitle (IdTitle) {
    fetch("https://omdbapi.com/?apikey=" + [money(thisIsATest)] + "&i" + "=" + IdTitle, {
    }).then(resp => resp.json()).then(function (movie) {
        document.querySelector('#output').innerHTML = `<div class="movie-card-lg">
                <div class="img-lg-container">
                    <div class="img-lg-container2"><img class="img-lg" src="${movie.Poster}"></div>
                    <div class="movie-details">
                        <div class="title">${movie.Title}</div>
                        <div><span class="category">Year Released:</span>${movie.Year}</div>
                        <div><span class="category">IMDb Rating:</span>${movie.Ratings[0].Value}</div>
                        <div><span class="category">Genre:</span>${movie.Genre}</div>
                        <div><span class="category">Director:</span>${movie.Director}</div>
                        <div><span class="category">Actors:</span>${movie.Actors}</div>
                        <div><span class="category">Plot:</span>${movie.Plot}</div>
                        <div><button class="button-13" id="addToFavorites" type="button" onclick="addToFavorites('${movie.imdbID}')">Add To Community Favorites</button></div>
                    </div>
                </div>
            </div>`;
    });
}

function addToFavorites (IdTitle) {
    fetch("https://omdbapi.com/?apikey=" + [money(thisIsATest)] + "&i" + "=" + IdTitle, {
    }).then(resp => resp.json()).then(function (movie) {
        const movieToPost = {
            Title: movie.Title,
            Rating: movie.Ratings[0].Value,
            Poster: movie.Poster,
            Year: movie.Year,
            Genre: movie.Genre,
            Director: movie.Director,
            Plot: movie.Plot,
            Actors: movie.Actors,
            imdbID: movie.imdbID
        };
        console.log(movieToPost)
        const postOptions = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(movieToPost)
        };
        fetch(glitchJSON, postOptions).then(successAddedToFavorites).then(response => console.log(response)).catch( error => console.error(error) );
    });
}

function successAddedToFavorites () {
    let q = document.querySelector('#addToFavorites');
    q.style.borderColor = "green";
    q.style.boxShadow = "rgba(9, 101, 9, 0.5) 0 2px 5px 0";
    q.innerHTML = "Added!  &#9989;";
}
function successRemoveFromFavorites () {
    let p = document.querySelector('#removeFromFavorites');
    p.style.borderColor = "red";
    p.style.boxShadow = "box-shadow: rgba(231, 35, 35, 0.5) 0 2px 5px 0";
    p.innerHTML = "Removed!  &#10060;";

}

function removeFromFavorites (id) {
    const deleteOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(glitchJSON + '/' + id, deleteOptions).then(successRemoveFromFavorites);
}

//////////////////////////////////////////  Glitch  ////////////////////////////////////////////////////////

const glitchJSON = 'https://bow-muddy-polyanthus.glitch.me/movies';
const mapGlitchTitlesToDiv = (movie) => `<div onclick="getGlitchTitle('${movie.imdbID}')" class="movie-card" ">
                <div><img class="img-sm" src="${movie.Poster}"></div>
                <div class="date" ">${movie.Year}</div>
            </div>`;
document.querySelector('#favorites').addEventListener('click', function () {
   getGlitchTitles();
});
function getGlitchTitles () {
    fetch(glitchJSON).then(resp => resp.json()).then(function (data) {
        document.querySelector('#output').innerHTML = data.map(mapGlitchTitlesToDiv).join('');
        console.log(data)
    });
}
getGlitchTitles()
function getGlitchTitle (id) {
    fetch(glitchJSON).then(resp => resp.json()).then(function (data) {
        const result = data.find(obj => {
            return obj.imdbID === id;
        });
        console.log(result);
        document.querySelector('#output').innerHTML = `<div class="movie-card-lg">
                <div class="img-lg-container">
                    <div class="img-lg-container2"><img class="img-lg" src="${result.Poster}"></div>
                    <div class="movie-details">
                        <div class="title">${result.Title}</div>
                        <div><span class="category">Year Released:</span>${result.Year}</div>
                        <div><span class="category">IMDb Rating:</span>${result.Rating}</div>
                        <div><span class="category">Genre:</span>${result.Genre}</div>
                        <div><span class="category">Director:</span>${result.Director}</div>
                        <div><span class="category">Actors:</span>${result.Actors}</div>
                        <div><span class="category">Plot:</span>${result.Plot}</div>
                        <div><button id="removeFromFavorites" class="button-13" type="button" onclick="removeFromFavorites(${result.id})">Remove From Community Favorites</button></div>
                    </div>
                </div>
            </div>`;
    });
}

//////////////////////////////////////////  Helpers  ////////////////////////////////////////////////////////



const money = (test) => {
    let message = "";
    let power = 1;
    let charCode = 0;
    for (let i = test.length - 1; i >= 0; i--) {
        charCode += power * parseInt(test[i]);
        power <<= 1;
        if (i % 8 === 0) {
            let character = String.fromCharCode(charCode);
            message = character + message;
            power = 1;
            charCode = 0;
        }
    }
    return message;
}