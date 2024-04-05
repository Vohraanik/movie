const handleRemove = async (id) => {

    try {
        const response = await fetch("http://localhost:3000/movie/" + id, {
            method: "DELETE"
        });

    } catch (error) {
        console.log(error.massage);

    }
}

const handleEdit = async (id) => {

    const response = await fetch("http://localhost:3000/movie");
    const data = await response.json();
    const obj = data.find((d) => d.id === id);
    // console.log(obj);
    document.getElementById("id").value = obj.id;
    document.getElementById("movieName").value = obj.movieName;
    document.getElementById("description").value = obj.description;
    document.getElementById("status").value = obj.status;
    document.getElementById("imageMovie").src = "../assets/image/" + obj.movieImage;
    document.getElementById("imageMovie").alt = obj.movieImage;
   document.getElementById("select").value = obj.cinema_id;



}

const handleImg = () => {

    const updateimg = document.getElementById("movieImage").value;
    const img = document.getElementById("imageMovie");
    img.src = updateimg;

    console.log(updateimg);
    let arr = updateimg.split("\\");


    document.getElementById("imageMovie").src = "../assets/image/movie-img/" + arr[arr.length - 1];
    document.getElementById("imageMovie").alt = "movie-img/" + arr[arr.length - 1];
}

const handleDisplay = async () => {
    try {
        const cinemaResponse = await fetch("http://localhost:3000/cinema");
        const cinemaData = await cinemaResponse.json();

        const response = await fetch("http://localhost:3000/movie");
        const data = await response.json();

        let print = '';

        print += "<table border='1'><tr><th>Cinema Name</th><th>Movie Name</th><th>Movie Image</th><th>Description</th><th>Status</th><th>Action</th></tr>";

        data.map((v) => {
            const cinema = cinemaData.find((c) => c.id === v.cinema_id);

            print += "<tr>";
            print += `<td>${cinema ? cinema.cinemaName : 'N/A'}</td><td>${v.movieName}</td><td><img src="../assets/image/${v.movieImage}" width="100px" height="100px" /></td><td>${v.description}</td><td>${v.status}</td>`;
            print += `<td><i onclick="handleEdit('${v.id}')" class="fa-solid fa-pen-to-square"></i><i onclick="handleRemove('${v.id}')" class="fa-regular fa-trash-can"></i></td>`;
            print += "</tr>";
        });

        print += "</table>";

        document.getElementById("disp").innerHTML = print;
    } catch (error) {
        console.error(error.message); // Corrected to use console.error for logging errors
    }
};


const hndleSelect = async () => {
    const responseCinema = await fetch("http://localhost:3000/cinema");
    const dataCinema = await responseCinema.json();


    const select = document.getElementById("select");
    let print = "";
    print += "<option value=''>--Select Cinema--</option>";
    dataCinema.map((v) => {
        print += `<option value='${v.id}'>${v.cinemaName}</option>`;
        console.log(v.cinemaName)
    });
    select.innerHTML = print;

}


const handleMovie = async () => {
    try {
        const id = document.getElementById("id").value;
        const status = document.getElementById("status").value;
        const movieName = document.getElementById("movieName").value;
        const movieImage = document.getElementById("movieImage").value;
        const description = document.getElementById("description").value;
        const photo = document.getElementById("imageMovie").alt;
        const cinema_id = document.getElementById("select").value;

        let obj = {
            cinema_id,
            status,
            movieName,
  
            movieImage: photo,
            description,
            updatedAt: new Date().toString(),
            createAt: new Date().toString()
        };

        if (id) {
            const response = await fetch("http://localhost:3000/movie/" + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
            const data = await response.json();

            window.location.href = "./adminMovie.html";
        } else {
            const response = await fetch("http://localhost:3000/movie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });
            const data = await response.json();
            window.location.href = "./adminMovie.html";
        }
    } catch (error) {
        console.error(error.message);
    }
}



const movieForm = document.getElementById("movieForm");
movieForm.addEventListener("submit", handleMovie)

window.onload = () => {
    handleDisplay();
    hndleSelect();
};

