
const handleRemove = async (id) => {
    console.log(id);
    try {
        const response = await fetch("http://localhost:3000/time/" + id, {
            method: "DELETE",
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
};

const handleEdit = async (id, event) => {
    const response = await fetch("http://localhost:3000/time");
    const data = await response.json();
    const obj = data.find((d) => d.id === id);


    document.getElementById("id").value = obj.id;
    document.getElementById("select").value = obj.cinema_id;
    await handlemovie();
    document.getElementById("selectMovie").value = obj.movie_id;
    document.getElementById("SelectDate").value = obj.date;




    //handle time
    document.getElementById("idallTime").innerHTML = "";

    for (let i = 0; i < obj.arrTime.length; i++) {
        handleAddTime(event, obj.arrTime[i]);
    }


}


const handleDisplayTime = async () => {
    try {
        const timeResponse = await fetch("http://localhost:3000/time");
        const movieResponse = await fetch("http://localhost:3000/movie");
        const cinemaResponse = await fetch("http://localhost:3000/cinema");

        const timeData = await timeResponse.json();
        const movieData = await movieResponse.json();
        const cinemaData = await cinemaResponse.json();

        let print = '';
        print += "<table border='1'><tr><th>Cinema Name</th><th>Movie Name</th><th>Movie Date</th><th>Movie Time</th><th>Action</th></tr>";

        timeData.map((v) => {
            const cinema = cinemaData.find((c) => c.id === v.cinema_id);
            const movie = movieData.find((m) => m.id === v.movie_id);

            print += "<tr>";
            print += `<td>${cinema ? cinema.cinemaName : 'N/A'}</td><td>${movie ? movie.movieName : 'N/A'}</td><td>${v.date}</td><td>${v.arrTime}</td>`;
            print += `<td><i onclick="handleEdit('${v.id}',event)" class="fa-solid fa-pen-to-square"></i><i onclick="handleRemove('${v.id}')" class="fa-regular fa-trash-can"></i></td>`;

            print += "</tr>";
        });

        print += "</table>";

        document.getElementById("disp").innerHTML = print;
    } catch (error) {
        console.error(error.message);
    }
};

const handlecinema = async () => {
    try {
        const response = await fetch("http://localhost:3000/cinema");
        const data = await response.json();

        let print = "<option value='0'>select--option</option>";
        data.forEach((v) => {
            print += `<option value="${v.id}">${v.cinemaName}</option>`;
        });

        document.getElementById("select").innerHTML = print;
    } catch (error) {
        console.log(error);
    }
};

const handlemovie = async (cinema_id) => {
    var cinema_id = document.getElementById("select").value;

    const response = await fetch("http://localhost:3000/movie");
    const data = await response.json();
    const newdata = data.filter((v) => v.cinema_id === cinema_id);

    let print = "<option value='0'>select--option</option>";
    newdata.forEach((v) => {
        print += `<option value="${v.id}">${v.movieName}</option>`;
    });

    document.getElementById("selectMovie").innerHTML = print;
};


const handleRemoveTime = async (id) => {
    document.getElementById("row-" + id).remove();
}

const handleAddTime = (event, value = "") => {
    event.preventDefault();

    const rNo = Math.floor(Math.random() * 10000);
    const divElm = document.createElement("div");
    divElm.setAttribute("id", "row-" + rNo);

    const inElm = document.createElement("input");
    inElm.setAttribute("type", "time");
    inElm.setAttribute("name", "movie_time");
    inElm.setAttribute("value", value);

    const plusElm = document.createElement("button");
    plusElm.setAttribute("onclick", "handleAddTime(event)");
    const plusTxt = document.createTextNode("+");
    plusElm.appendChild(plusTxt);



    divElm.appendChild(inElm);
    divElm.appendChild(plusElm);

    if (document.getElementById("idallTime").children.length > 0) {
        const minusElm = document.createElement("button");
        minusElm.setAttribute("onclick", `handleRemoveTime(${rNo})`);
        const minusTxt = document.createTextNode("-");
        minusElm.appendChild(minusTxt);
        divElm.appendChild(minusElm);
    }

    const div = document.getElementById("idallTime");
    div.appendChild(divElm);

};

const handleTime = async () => {
    const id = document.getElementById("id").value;
    const movie_id = document.getElementById("selectMovie").value;
    const cinema_id = document.getElementById("select").value;
    const date = document.getElementById("SelectDate").value;
    const time = document.getElementsByName("movie_time");

    // console.log(time);

    let arrTime = [];

    time.forEach((v) => {
        arrTime.push(v.value);
    });

    console.log(arrTime);



    let obj = {
        movie_id,
        cinema_id,
        date,
        arrTime,
        updatedAt: new Date().toString(),
        createAt: new Date().toString()

    }
    console.log(obj);

    if (id) {
        try {
            const response = await fetch(`http://localhost:3000/time/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });

        } catch (error) {
            console.log(error.message);
        }

    } else {
        try {
            const response = await fetch("http://localhost:3000/time", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
    };
}





const timeForm = document.getElementById("timeForm");
timeForm.addEventListener("submit", handleTime);

const selectElement = document.getElementById("select");
selectElement.addEventListener("change", handlemovie);

window.onload = function () {
    handlecinema();
    handleDisplayTime();
};
