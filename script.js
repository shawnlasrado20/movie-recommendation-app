
const moodToGenreMap ={
    happy: 35,
    sad: 18,
    romantic: 10749,
    angry: 53,
    scary: 27,
    funny: 35,
    excited: 28,
    relaxed: 16
};

document.getElementById('MoodDropdown').addEventListener('change',function(event){
    const selectedMood = event.target.value;
    const genreId = moodToGenreMap[selectedMood];
    console.log(genreId);
});

document.getElementById('GetMovieRecommendation-btn').addEventListener('click', function(event) {
    const selectedMood = document.getElementById('MoodDropdown').value;
    const genreId = moodToGenreMap[selectedMood];

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=e1e9b904258e60f9b47946f5b4bb18a2&with_genres=${genreId}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('MovieRecommendation').innerHTML = '';

            data.results.forEach(function(movie) {
                let movieDiv = document.createElement('div');
                let title = document.createElement('h3');
                title.textContent = movie.title;

                let poster = document.createElement('img');
                poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

                let rating = document.createElement('p');
                rating.textContent = `Rating: ${movie.vote_average}`;

                movieDiv.appendChild(title);
                movieDiv.appendChild(poster);
                movieDiv.appendChild(rating);

                document.getElementById('MovieRecommendation').appendChild(movieDiv);
            });
        });
});
