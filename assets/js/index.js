const handleMovie= async () => {
  try {
    const response = await fetch("http://localhost:3000/movie");
    const data = await response.json();

    const movie_list = data.filter((obj, i, self) =>
      i === self.findIndex((t) => (
        t.movieName === obj.movieName
      )));

    let print = "";

    movie_list.map((v) => {
      print += ` <li class="card">
            <div class="img">
              <a href="./cinema-movie.html" onclick="handleCinemaPage('${v.movieName}')"><img  src="../assets/image/${v.movieImage}" alt="" /></a>
            </div>
            <div class="title">
              <a href="./cinema-movie.html"><h4>${v.movieName}</h4></a>
              <span>2022</span>
            </div>
            <div class="footer">
              <span>HD</span>
              
              <div class="time-rating">
              <span><i class="fa-regular fa-clock"></i> 104 min</span>
              <span><i class="fa-solid fa-star"></i> 5.9</span>
            
              </div>
            </div>
          </li>`
    })
    document.getElementById("movieList").innerHTML = print;
  } catch (error) {
    console.log(error.message);
  }
}

const handleMoviePage = async (id) => {
  console.log(id);
localStorage.setItem("cinema_id", id);

window.location.href = "./movie-detail.html";
}



const  handleCinema = async () => {
  try {
   const response = await fetch("http://localhost:3000/cinema");
    const data = await response.json();

    const cinema_list = data.filter((obj, i, self) =>
      i === self.findIndex((t) => (
        t.cinemaName === obj.cinemaName
      )))

    let print = "";

    cinema_list.map((v) => {
      print += `<li class="card">
              <div class="img">
                <a href="./movie-detail.html" onclick="handleMoviePage('${v.id}')"><img src="../assets/image/${v.cinemaImage}" alt="" /></a>
              </div>
              <div class="title">
                <a href="./movie-detail.html"><h4>${v.cinemaName}</h4></a>
                <span>2022</span>
              </div>
              <div class="footer">
                <span>Email:${v.email}</span>
                <div class="time-rating">
                <span><i class="fa-solid fa-wifi"></i> WiFi</span>
                <span><i class="fa-solid fa-circle-parking"></i>Parking</span>
                </div>
              </div>
            </li>`;
    })
    document.getElementById("cinemaList").innerHTML = print;

  } catch (error) {
    console.error(error);
  }
}

const handleCinemaPage= async(id) =>{
  console.log(id);
  localStorage.setItem("movie Name",id)
}

window.onload = () => {
  handleMovie();
  handleCinema();
}




