let booked = [];

const handleSeat = async () => {
    try {
        const movie_id = localStorage.getItem("movie_id");
        const cinema_id = localStorage.getItem("cinema_id");
        const time = localStorage.getItem("time");
        const date = localStorage.getItem("date");

        const response = await fetch("http://localhost:3000/sheat");
        const data = await response.json();

        const seatobj = data.find((v) => v.movie_id === movie_id && v.cinema_id === cinema_id && v.time_id === time);
        const userSheat = seatobj.seats.find((v) => date === v.date);

        const filterPrice = data.filter((v) => v.movie_id === movie_id && v.cinema_id === cinema_id && v.time_id === time);
        const amount = filterPrice[0].moviePrice;

        handleDisplay(userSheat, amount);

    } catch (error) {
        console.log(error.message);
    }
};

const handleDisplay = (data, amount) => {
    let print = '<div class="row">';

    data.seat.forEach((status, index) => {
        const seatStatus = status === 1 ? 'occupied' : 'unbooked';
        print += `<div class="col col-lg-1 place mx-auto ${seatStatus} seat" onclick="handleSelectSeat(${index},${amount})" id="seat-${index}">${index + 1}</div>`;

        if ((index + 1) % 10 === 0 && index !== data.seat.length - 1) {
            print += '</div><div class="row">';
        }
    });

    print += '</div>';

    document.getElementById("screen").innerHTML = print;
};

const handleSelectSeat = async (index, amount) => {
    event.preventDefault();
    try {
        const selectSeat = document.getElementById("seat-" + index);
        selectSeat.classList.toggle("selected");

        if (selectSeat.classList.contains("selected")) {
            const count = document.getElementById("count").innerText = parseInt(document.getElementById("count").innerText) + 1;

            if (count) {
                document.getElementById("price").innerText = parseInt(document.getElementById("price").innerText) + amount;
            }
            booked.push(index);
        } else {
            document.getElementById("count").innerText = parseInt(document.getElementById("count").innerText) - 1;
            document.getElementById("price").innerText = parseInt(document.getElementById("price").innerText) - amount;
            booked.splice(booked.indexOf(index), 1);
        }
    } catch (error) {
        console.error(error.message);
    }
};

const handleSubmit = async ()=>{
    event.preventDefault();
    // console.log("sd");

    try {
        const movie_id = localStorage.getItem("movie_id");
        const cinema_id = localStorage.getItem("cinema_id");
        const time = localStorage.getItem("time");
        const date = localStorage.getItem("date");

        const response = await fetch("http://localhost:3000/sheat");
        const data = await response.json();

        const seatobj = data.find((v) => v.movie_id === movie_id && v.cinema_id === cinema_id && v.time_id === time);
        const userSheat = seatobj.seats.find((v) => date === v.date);
        console.log(userSheat.seat);

        // console.log(movie_id,cinema_id,time,date,);
        // console.log(data);
        // console.log(seatobj);
        // console.log(userSheat.seat);
        // console.log(booked);

        userSheat.seat.map((v,i)=>{
           console.log(v);
        if(booked.includes(i)){
            userSheat.seat[i]=1;
            // console.log(i);
        }
        })
console.log(userSheat);

        if(userSheat){
        const response = await fetch("http://localhost:3000/sheat/"+seatobj.id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(seatobj),
        })
        const data = await response.json();
        console.log(data);
        window.location.href = "./final-movie.html";
        }
    } catch (error) {
        console.log(error.message);
    }
}

const handleBooking = document.getElementById("handleSumbit");
handleBooking.addEventListener("submit",handleSubmit);

window.onload = function () {
    handleSeat();
};
