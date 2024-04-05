const handleCinema = async () => {
    try {
        const response = await fetch("http://localhost:3000/cinema");
        const data = await response.json();

        let print = "<option value='0'>select--option</option>";
        data.forEach((v) => {
            print += `<option value="${v.id}">${v.cinemaName}</option>`;
        });

        document.getElementById("select").innerHTML = print;
    } catch (error) {
        console.error(error);
    }
};

const handleMovie = async () => {
    try {
        const cinemaId = document.getElementById("select").value;

        const response = await fetch("http://localhost:3000/movie");
        const data = await response.json();
        const filteredData = data.filter((v) => v.cinema_id === cinemaId);

        let print = "<select name='' id='cenimaedit'><option value='0'>select--option</option>";
        filteredData.forEach((v) => {
            print += `<option value="${v.id}">${v.movieName}</option>`;
        });
        print += "</select>";

        document.getElementById("selectMovie").innerHTML = print;
    } catch (error) {
        console.error(error);
    }
};

const handleTime = async () => {
    try {
        const movieId = document.getElementById("selectMovie").value;

        const response = await fetch("http://localhost:3000/time");
        const data = await response.json();
        const filteredData = data.filter((v) => v.movie_id === movieId);

        let print = "<option value='0'>select--option</option>";
        filteredData[0].arrTime.forEach((v) => {
            print += `<option value="${v}">${v}</option>`;
        });

        document.getElementById("selectTime").innerHTML = print;
    } catch (error) {
        console.error(error);
    }
};

const handleRemove = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/sheat/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error.message);
    }
};

const handleEdit = async (id) => {
    try {
        const response = await fetch("http://localhost:3000/sheat");
        const data = await response.json();
        const obj = data.find((d) => d.id === id);

        document.getElementById("id").value = obj.id;
        document.getElementById("select").value = obj.cinema_id;
        await handleMovie();
        document.getElementById("selectMovie").value = obj.movie_id;

        await handleTime();
        document.getElementById("selectTime").value = obj.time_id;
        document.getElementById("expDate").value = obj.expDate;
        document.getElementById("moviePrice").value = obj.moviePrice;
        document.getElementById("movieSeat").value = obj.seats && obj.seats[0] ? obj.seats[0].seat.length : 0;

    } catch (error) {
        console.error(error.message);
    }
};

const handleDisplay = async () => {
    try {
        const movieResponse = await fetch("http://localhost:3000/movie");
        const cinemaResponse = await fetch("http://localhost:3000/cinema");
        const sheatResponse = await fetch("http://localhost:3000/sheat");
        const timeResponse = await fetch("http://localhost:3000/time");

        const movieData = await movieResponse.json();
        const cinemaData = await cinemaResponse.json();
        const sheatData = await sheatResponse.json();

        let print = "<table border='1'><tr><th>Cinema Name</th><th>Movie Name</th><th>Movie Time</th><th>Expire Date</th><th>Seat</th><th>Price</th><th>Action</th></tr>";

        sheatData.forEach((v) => {
            const cinema = cinemaData.find((c) => c.id === v.cinema_id);
            const movie = movieData.find((m) => m.id === v.movie_id);

            print += "<tr>";
            print += `<td>${cinema ? cinema.cinemaName : 'N/A'}</td>`;
            print += `<td>${movie ? movie.movieName : 'N/A'}</td>`;
            print += `<td>${v.time_id}</td>`;
            print += `<td>${v.expDate}</td>`;
            print += `<td>${v.seats && v.seats[0] ? v.seats[0].seat.length : 'N/A'}</td>`;
            print += `<td>${v.moviePrice}</td>`;
            print += `<td><i onclick="handleEdit('${v.id}')" class="fa-solid fa-pen-to-square"></i>`;
            print += `<i onclick="handleRemove('${v.id}')" class="fa-regular fa-trash-can"></i></td>`;
            print += "</tr>";
        });

        print += "</table>";

        document.getElementById("disp").innerHTML = print;
    } catch (error) {
        console.error(error.message);
    }
};

const userSeat = async () => {
    const id = document.getElementById("id").value;
    const cinemaId = document.getElementById("select").value;
    const movieId = document.getElementById("selectMovie").value;
    const movieSeat = document.getElementById("movieSeat").value;
    const moviePrice = document.getElementById("moviePrice").value;
    const timeId = document.getElementById("selectTime").value;
    const expDate = document.getElementById("expDate").value;

    const seat = new Array(parseInt(movieSeat)).fill(0);

    let seats = [];

    let obj = {
        time_id: timeId,
        cinema_id: cinemaId,
        movie_id: movieId,
        seats: seats,
        moviePrice: moviePrice,
        expDate: expDate,
        updatedAt: new Date().toString(),
        createdAt: new Date().toString(),
    };

    const currentDate = new Date(); 
    const expireDate = new Date(expDate);
    
    while (currentDate <= expireDate) {
        const dayObject = {
            date: currentDate.toISOString().split('T')[0],
            seat: seat
        };

        seats.push(dayObject);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/sheat/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    } else {
        try {
            const response = await fetch("http://localhost:3000/sheat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }
};

const handleSeatForm = document.getElementById("seatForm");
handleSeatForm.addEventListener("submit", () => {
    // event.preventDefault();
    userSeat();
});

const selectElement = document.getElementById("select");
selectElement.addEventListener("change", handleMovie);

const selectElementMovie = document.getElementById("selectMovie");
selectElementMovie.addEventListener("change", handleTime);

window.onload = function () {
    handleCinema();
    handleDisplay();
};
