

document.querySelector('#contact').addEventListener('click', function () {
    document.querySelector('#back-container').innerHTML = '';
let contact = `<div>
    <div class="contact text-color" style="color: ${setTextColors()}"><h3>Thank you for visiting my site, please feel free to reach out to me if you have any questions.</h3></div>
    <div class="contact text-color" style="color: ${setTextColors()}"><h3>Email: oscar.a.castro818@gmail.com</h3></div>
    <div class="contact text-color" style="color: ${setTextColors()}"><h3>Github: https://github.com/oscar-ct</h3></div>
    </div>`;
   document.querySelector('#output').innerHTML = contact;
});

function setTextColors () {
    const bgColor = document.querySelector('body').style.backgroundColor;
    if (bgColor === 'white') {
        console.log('black')
        return 'black';
    } else if (bgColor === 'rgb(31, 30, 30)') {
        console.log('white');
        return 'white';
    }

}
//////////////////////////////////////////  OMDb  ////////////////////////////////////////////////////////

const thisIsATest = '0011011000110110001100100011000100110100011001010110001000111001';
const mapTitleSearchToDiv = (movie) => `<div onclick="getTitle('${movie.imdbID}')" class="movie-card">
            <div><img class="img-sm" src="${movie.Poster}"></div>
            <div class="text-color date" style="color: ${setTextColors()}">${movie.Year}</div>
        </div>`;
document.querySelector('.searchButton').addEventListener('click', function () {
    const titleSearched = document.querySelector('.searchTerm').value;
    getSearchTitle(titleSearched);
});



$(document).on('keypress',function(e) {
    if(e.which === 13) {
        const titleSearched = document.querySelector('.searchTerm').value;
        getSearchTitle(titleSearched);
    }
});
function getSearchTitle (search) {
    fetch("https://omdbapi.com/?apikey=" + [money(thisIsATest)] + "&s" + "=" + search, {
    }).then(resp => resp.json()).then(function (data) {
        document.querySelector('#output').innerHTML = data.Search.map(mapTitleSearchToDiv).join('');
        console.log(data.Search);
    }).then(addSearchResultsLink).then(scrollToTop).catch(searchUndefined);

}
function getTitle (IdTitle) {
    fetch("https://omdbapi.com/?apikey=" + [money(thisIsATest)] + "&i" + "=" + IdTitle + '&plot=full', {
    }).then(resp => resp.json()).then(function (movie) {
        document.querySelector('#output').innerHTML = `<div class="movie-card-lg">
                <div class="img-lg-container">
                    <div class="img-lg-container2"><img class="img-lg" src="${movie.Poster}"></div>
                    <div class="movie-details text-color" style="color: ${setTextColors()}">
                        <div class="title">${movie.Title}</div>
                        <div><span class="category">Year Released:</span>${movie.Year}</div>
                        <div><span class="category">IMDb Rating:</span>${movie.Ratings[0].Value}</div>
                        <div><span class="category">Genre:</span>${movie.Genre}</div>
                        <div><span class="category">Director:</span>${movie.Director}</div>
                        <div><span class="category">Actors:</span>${movie.Actors}</div>
                        <div><span class="category">Plot:</span>${movie.Plot}</div>
                        <div class="btn-container"><button class="button-13" id="addToFavorites" type="button" onclick="addToFavorites('${movie.imdbID}')">Add To Favorites</button></div>
                    </div>
                </div>
            </div>`;
        addBackButtonFromOMBd();
    }).then(scrollToTop);

}

function addToFavorites (IdTitle) {
    fetch("https://omdbapi.com/?apikey=" + [money(thisIsATest)] + "&i" + "=" + IdTitle + '&plot=full', {
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
const mapGlitchTitlesToDiv = (movie) => `<div onclick="getGlitchTitle(${movie.id})" class="movie-card" ">
                <div><img class="img-sm" src="${movie.Poster}"></div>
                <div class="text-color date" style="color: ${setTextColors()}">${movie.Year}</div>
            </div>`;
document.querySelector('#favorites').addEventListener('click', function () {
   getGlitchTitles();
   addCommunityFavoritesLink();
});
function getGlitchTitles () {
    fetch(glitchJSON).then(resp => resp.json()).then(function (data) {
        document.querySelector('#output').innerHTML = data.reverse().map(mapGlitchTitlesToDiv).join('');
        console.log(data)
    }).then(scrollToTop).then(favoritesLink);
}
getGlitchTitles();
function getGlitchTitle (id) {
    fetch(glitchJSON).then(resp => resp.json()).then(function (data) {
        const result = data.find(obj => {
            return obj.id === id;
        });
        console.log(result);
        document.querySelector('#output').innerHTML = `<div class="movie-card-lg">
                <div class="img-lg-container">
                    <div class="img-lg-container2"><img class="img-lg" src="${result.Poster}"></div>
                    <div class="movie-details text-color" style="color: ${setTextColors()}">
                        <div class="title">${result.Title}</div>
                        <div><span class="category" >Year Released:</span>${result.Year}</div>
                        <div><span class="category">IMDb Rating:</span>${result.Rating}</div>
                        <div><span class="category">Genre:</span>${result.Genre}</div>
                        <div><span class="category">Director:</span>${result.Director}</div>
                        <div><span class="category">Actors:</span>${result.Actors}</div>
                        <div><span class="category">Plot:</span>${result.Plot}</div>
                        <div class="btn-container"><button id="removeFromFavorites" class="button-13" type="button" onclick="removeFromFavorites(${result.id})">Remove From Favorites</button></div>
                    </div>
                </div>
            </div>`;
        addBackButtonFromGlitch();
    }).then(scrollToTop);

}

//////////////////////////////////////////  Helpers  ////////////////////////////////////////////////////////
function setColor (element, color) {
    for (let i = 0; i < element.length; i++) {
        element[i].style.color = color;
    }
}


const textColorClass = document.getElementsByClassName('text-color');


document.querySelector('#mode').addEventListener('click', function () {
    const bodyBackgroundColor = document.querySelector('body').style.backgroundColor;
    let body = document.querySelector('body');
    let element = document.querySelector('#mode');
    // let span = `<span style="font-family: Arial,sans-serif; text-transform:lowercase; font-size: 12px; line-height: 10px; font-style: italic">(in testing)</span>`

    if (bodyBackgroundColor === 'white') {
        body.style.backgroundColor = 'rgb(31, 30, 30)';
        setColor(textColorClass, 'white');
        element.innerHTML = 'LIGHT MODE';
    } else if (bodyBackgroundColor === 'rgb(31, 30, 30)') {
        body.style.backgroundColor = 'white';
        setColor(textColorClass, 'black');
        element.innerHTML = 'DARK MODE';
    }

});






function searchUndefined () {
    alert('No results found, please be more specific.');
}
function scrollToTop () {
    window.scrollTo(0, 0);
}
function addBackButtonFromGlitch () {
    document.querySelector('#back-container').innerHTML = `<div style="color: ${setTextColors()}" class="back text-color" id="back-glitch" onclick="backButtonGlitch()">&lt;&lt;back</div>`;
}
function backButtonGlitch () {
    getGlitchTitles();
    addCommunityFavoritesLink();
}


function addBackButtonFromOMBd () {
    document.querySelector('#back-container').innerHTML = `<div style="color: ${setTextColors()}" class="back text-color" id="back-ombd" onclick="backButtonOMBd()">&lt;&lt;back</div>`;
}
function backButtonOMBd () {
        const titleSearched = document.querySelector('.searchTerm').value;
        getSearchTitle(titleSearched);
        addSearchResultsLink();
}

function addSearchResultsLink () {
    document.querySelector('#back-container').innerHTML = `<div style="color: ${setTextColors()}" class="search-results text-color">(search results)</div>`;
}
function favoritesLink () {
    document.querySelector('#back-container').innerHTML = `<div style="color: ${setTextColors()}" class="search-results text-color">Favorites</div>`;
}

function addCommunityFavoritesLink () {
    document.querySelector('#back-container').innerHTML = '';
}


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


