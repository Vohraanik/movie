const handleTime = async () => {
    const movie_id = localStorage.getItem("movie_id");
    const cinema_id = localStorage.getItem("cinema_id");
    console.log(movie_id, cinema_id);

    try {
        const response = await fetch("http://localhost:3000/movie");
        const movieData = await response.json();

        const filteredMovies = movieData.filter((v) => v.id === movie_id);
        

        let print = "";

        filteredMovies.forEach((v) => {
            print += `
            <div class="main">
                <div class="img">
                    <a href=""><img src="./assets/image/${v.movieImage}" alt=""></a>
                    <i class="fa-regular fa-circle-play"></i>
                </div>
                <div class="content">
                    <strong>New Episodes</strong>
                    <h4>${v.movieName}</h4>
                    <div class="badge-genre">
                        <div class="badge">
                            <span>PG 13</span>
                            <span>HD</span>
                        </div>
                        <div class="genre">
                            <a href="">Comedy</a>,
                            <a href="">Action</a>,
                            <a href="">Adventure</a>,
                            <a href="">Science Fiction</a>
                        </div>
                    </div>
                    <div class="date-time">
                        <span><i class="fa-regular fa-calendar-days"></i> 2021</span>
                        <span><i class="fa-regular fa-clock"></i> 115 min</span>
                    </div>
                    <p>A bank teller called Guy realizes he is a background character in an open world video game called Free City that will soon go offline.</p>
                </div>
            </div>`;
            handleTimePage(v.id);
        });
        document.getElementById("movieList").innerHTML = print;
    } catch (error) {
        console.error(error);
    }
};

const handleTimePage = async (id) => {
    try {
        const response = await fetch("http://localhost:3000/time");
        const timeData = await response.json();

        const filteredTime = timeData.filter((v) => v.movie_id === id);

        let print = "";

        filteredTime.forEach((v) => {
            print += `<span class="available-time">Till Date : </span>${v.date}`;
            print += `<input type="date" id="admin_date" name="admin_date" value="${v.date}" hidden>
                    <span class="details_divices-tittle"> Select Date:</span>
                    <input type="date" id="selectDate" name="selectDate" value="">  
                    <ul class="details_divices-list donate-now" id="time">`;
            v.arrTime.forEach((t) => {
                print += `<li><input class="btn" type="radio" name="time" id="${t}" value="${t}"><label for="${t}">${t}</label></li>`;
            });
            print += '</ul><li><input type="submit" value="next" class="btn"></li>';
        });

        document.getElementById("handle_sumbit").innerHTML = print;
    } catch (error) {
        console.error(error);
    }
};
const handleSubmit = async () => {
    event.preventDefault();
    const adminDate = document.getElementById("admin_date").value;
    const selectDate = document.getElementById("selectDate").value;
    const adminTime = document.querySelector("input[name='time']:checked").value;

    if (adminDate < selectDate) {
        alert("hey select valid date");
        return;
    } else {
        localStorage.setItem("time", adminTime);
        localStorage.setItem("date", selectDate);
       
        alert("time and date added successfully");
       window.location.href="./Movie-seat.html";
    }
};

const ref = document.getElementById("handle_sumbit");
ref.addEventListener("submit", handleSubmit);

window.onload = async () => {
    await handleTime();
};