const handleTimePage = async(id)=>{
    localStorage.setItem("movie_id", id);
    window.location.href = "./time-detail.html";
}

const handleCinema = async () => {
    try {
         const cinema_id = localStorage.getItem("cinema_id");

        const response = await fetch("http://localhost:3000/cinema");
        const cinemaData = await response.json();

        const filteredCinema = cinemaData.find((v) => v.id === cinema_id);


        let print = "";

        print += `<div class="main">
                <div class="img">
                    <a href="#"><img src="./assets/image/${filteredCinema.cinemaImage}" alt=""></a>
                </div>
                <div class="content">
                    <strong>${filteredCinema.status}</strong>
                    <h4>${filteredCinema.cinemaName}</h4>
                    <div class="badge-genre">
                        <!-- Add more details as needed -->
                        <div class="badge">
                            <span>Email: ${filteredCinema.email}</span>
                            <span>Phone: ${filteredCinema.phone}</span>
                        </div>
                        <div class="genre">
                            <span>Address: ${filteredCinema.address}</span>
                        </div>
                    </div>
                </div>
            </div>`;


        document.getElementById("cinema").innerHTML = print;


        if (filteredCinema) {
            await handleMovieList(filteredCinema.id);
        }

    } catch (error) {
        console.error(error);
    }
};

const handleMovieList = async (cinemaId) => {
    try {
        const response = await fetch("http://localhost:3000/movie");
        const movieData = await response.json();
        console.log("Data from API:", movieData);


        const filteredMovies = movieData.filter((v) => v.cinema_id === cinemaId);
        console.log("Filtered Movies:", filteredMovies);
        console.log(filteredMovies);

        let print = "";

        filteredMovies.forEach((v) => {

            print += ` <li class="card">
                    <div class="img">
                        <a href="./time-detail.html" onclick="handleTimePage('${v.id}')"><img src="../assets/image/${v.movieImage}" alt="" /></a>
                    </div>
                    <div class="title">
                        <a href=""  ><h4>${v.movieName}</h4></a>
                        <span>${v.status}</span>
                    </div>
                    <div class="footer">
                        <span>HD</span>
                        <div class="time-rating">
                            <span><i class="fa-regular fa-clock"></i> 90 min</span>
                            <span><i class="fa-solid fa-star"></i>3.9 </span>
                        </div>
                    </div>
                </li>`;
        });


        document.getElementById("movie_list").innerHTML = print;

    } catch (error) {
        console.error(error);
    }
}




window.onload = async () => {
    await handleCinema();

};

