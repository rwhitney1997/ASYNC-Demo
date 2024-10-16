let myForm = document.querySelector('.my-form');
let output = document.querySelector('.movie-info');
let movieList = document.querySelector('#movie-list') //use # because it's an "id" in html

async function getMovies(){
     const response = await fetch('https://ghibliapi.vercel.app/films');
     const data = await response.json();
     console.log(data);

     //the movie.url is the API selector while movie.title is the list of movies itself
     data.forEach(movie => {
          movieList.insertAdjacentHTML('beforeend', `
                    <option value="${movie.url}">${movie.title}</option>
               `)
     })
}

myForm.addEventListener('submit', (e) => {
     e.preventDefault(); /* prevents reloading the page when submitted */
     let formData = new FormData(myForm); /* formData is its own object created in JS, not our function */
     let movieID = formData.get('movie-list');
     console.log(movieID);

     getOneFilm(movieID);

})

async function getOneFilm(url) { /* url that gets passed into this function will get fetched when function is called */
     const response = await fetch(url);
     const data = await response.json();

     console.log(data);

     /* all "data" objects are selected from respective API docs */
     output.innerHTML = `
          <div class="movie">
               <div class="movie-img">
                    <img src="${data.image}" alt="${data.title} movie image">
               </div>
               <div class="movie-text">
                    <h2>${data.title} (${data.original_title})</h2>
                    <p><strong>Release Date:</strong> ${data.release_date}</p>
                    <p><strong>Director: </strong> ${data.director} </p>
                    <p>${data.description}</p>
               </div>
          </div>
     `

}

getMovies(); //don't forget to call the async function