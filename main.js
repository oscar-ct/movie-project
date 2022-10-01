const glitchJSON = 'https://bow-muddy-polyanthus.glitch.me/movies'
const thisIsATest = '0011011000110110001100100011000100110100011001010110001000111001'
const mapMovieSearchToDiv = (movie) => `<div onclick="getMovie('${movie.Id}')">
            <div>${movie.Title}</div>
            <div><img src="${movie.Poster}"></div>
            </div>
            <div><button type="button">add to favorites</button></div>`;



function getSearchMovies (search) {
    fetch("https://omdbapi.com/?apikey=" + [money(thisIsATest)] + "&s" + "=" + search, {
    }).then(resp => resp.json()).then(function (data) {
        const moviesData = data.Search.map(function(movie) {
            return {
                Title: movie.Title,
                Poster: movie.Poster,
                Id: movie.imdbID,
                Year: movie.Year
            };
        });
        document.querySelector('#output').innerHTML = moviesData.map(mapMovieSearchToDiv);
        console.log(moviesData);
        // console.log(data.Search);
    });
}


function getMovie (IdTitle) {
    fetch("https://omdbapi.com/?apikey=" + [money(thisIsATest)] + "&i" + "=" + IdTitle, {
    }).then(resp => resp.json()).then(function (movie) {
        const movieData = `<div>
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
        document.querySelector('#output').innerHTML = movieData;
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