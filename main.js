const glitchJSON = 'https://bow-muddy-polyanthus.glitch.me/movies';
const thisIsATest = '0011011000110110001100100011000100110100011001010110001000111001';
const mapTitleSearchToDiv = (movie) => `<div onclick="getTitle('${movie.imdbID}')">
            <div>${movie.Title}</div>
            <div>${movie.Year}</div>
            <div><img src="${movie.Poster}"></div>
        </div>`;
const mapGlitchTitlesToDiv = (movie) => `<div>
                <div><img src="${movie.Poster}"></div>
                <div>${movie.Title}</div>
                <div>Year: ${movie.Year}</div>
                <div>Rating: ${movie.Rating}</div>
                <div>Year: ${movie.Year}</div>
                <div>Genre: ${movie.Genre}</div>
                <div>Director: ${movie.Director}</div>
                <div>Actors: ${movie.Actors}</div>
                <div>Plot: ${movie.Plot}</div>
            </div>`;


document.querySelector('#searchTitleBtn').addEventListener('click', function () {
    const titleSearched = document.querySelector('#searchTitleInput').value;
    getSearchTitle(titleSearched);

});

function getSearchTitle (search) {
    fetch("https://omdbapi.com/?apikey=" + [money(thisIsATest)] + "&s" + "=" + search, {
    }).then(resp => resp.json()).then(function (data) {
        document.querySelector('#output').innerHTML = data.Search.map(mapTitleSearchToDiv).join('');
        console.log(data.Search.map(mapTitleSearchToDiv));
    });
}


function getTitle (IdTitle) {
    fetch("https://omdbapi.com/?apikey=" + [money(thisIsATest)] + "&i" + "=" + IdTitle, {
    }).then(resp => resp.json()).then(function (movie) {
        document.querySelector('#output').innerHTML = `<div>
                <div><img src="${movie.Poster}"></div>
                <div>${movie.Title}</div>
                <div>Year: ${movie.Year}</div>
                <div>Rating: ${movie.Ratings[0].Value}</div>
                <div>Year: ${movie.Year}</div>
                <div>Genre: ${movie.Genre}</div>
                <div>Director: ${movie.Director}</div>
                <div>Actors: ${movie.Actors}</div>
                <div>Plot: ${movie.Plot}</div>
                <div><button type="button">add to favorites</button></div>
            </div>`;
    });

}

document.querySelector('#favorites').addEventListener('click', function () {
   getGlitchTitles();
});
function getGlitchTitles () {
    fetch(glitchJSON).then(resp => resp.json()).then(function (data) {
        document.querySelector('#output').innerHTML = data.map(mapGlitchTitlesToDiv).join('');
        console.log(data)
    });
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