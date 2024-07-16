
document.addEventListener('DOMContentLoaded', function() {
    const filmList = document.getElementById('films');
    const movieTitle = document.getElementById('movie-title');
    const movieDetails = document.getElementById('movie-details');

    
    function fetchAndDisplayMovies() {
        fetch('http://localhost:3000/films')
        .then(res => res.json())
        .then(data => {
            
            filmList.innerHTML = '';

            data.forEach(film => {
                const li = document.createElement('li');
                li.classList.add('film', 'item');
                li.textContent = film.title;
                li.addEventListener('click', () => displayMovieDetails(film));
                filmList.appendChild(li);
            });
            if (data.length > 0) {
                displayMovieDetails(data[0]);
            }
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
    }

    function displayMovieDetails(movie) {
        movieTitle.textContent = movie.title;

        const ticketsAvailable = movie.capacity - movie.tickets_sold;

        movieDetails.innerHTML = `
            <img src="${movie.poster}" alt="Movie Poster">
            <p>Runtime: ${movie.runtime} minutes</p>
            <p>Showtime: ${movie.showtime}</p>
            <p>Available Tickets: ${ticketsAvailable}</p>
            <button id="buy-ticket-btn">Buy Ticket</button>
        `;

        const buyTicketBtn = document.getElementById('buy-ticket-btn');
        buyTicketBtn.addEventListener('click', () => {
            if (ticketsAvailable > 0) {
                
                movie.tickets_sold++;
                displayMovieDetails(movie);
            } else {
                alert('Tickets are sold out for this showing.');
            }
        });
    }

    fetchAndDisplayMovies();
});