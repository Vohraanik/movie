const displayCinema = async () => {
    try {

        const movieName = localStorage.getItem("movie Name");
        console.log(movieName);


        const response = await fetch("http://localhost:3000/movie");
        const data = await response.json();
        console.log(data);


        const filteredCinema = data.filter((v) => v.movieName === movieName);
        console.log(filteredCinema);

        const cinemaResponse = await fetch("http://localhost:3000/cinema");
        const cinemaData = await cinemaResponse.json();
        console.log(cinemaData);

        let cinemaList = []

        filteredCinema.map((v) => {

            const filteredCinema = cinemaData.find((c) => c.id === v.cinema_id);
            console.log(filteredCinema);
            cinemaList.push(filteredCinema);
        })

        console.log(cinemaList);


        let print = "";

        cinemaList.map((v) => {

            print += ` <li class="card">
                    <div class="img">
                        <a href="#" onclick="handleTimePage('${v.id}')"><img src="../assets/image/${v.cinemaImage}" alt="" /></a>
                    </div>
                    <div class="title">
                        <a href=""  ><h4>${v.cinemaName}</h4></a>
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
        console.log(error.message);
    }
}

const handleTimePage = async (id) => {

    try {
        localStorage.setItem("cinema_id", id);
        const movieName = localStorage.getItem("movie Name");

        console.log(movieName);

        const response = await fetch("http://localhost:3000/movie");
        const data = await response.json();
        console.log(data);

        const movie_id = data.find((v) => v.movieName === movieName).id;
        console.log(movie_id);

        localStorage.setItem("movie_id", movie_id);

        window.location.href = "./time-detail.html";
    } catch (error) {

    }
}

window.onload = async () => {
    displayCinema();
}