const handleRemove = async(id)=>{

    try {
        const response =  await fetch("http://localhost:3000/cinema/"+id,{
            method:"DELETE"
        });
        
    } catch (error) {
        console.log(error.massage);
        
    }
}

const  handleEdit = async(id)=>{
    
    const response =  await fetch("http://localhost:3000/cinema");
    const data = await response.json();

    const obj = data.find((d) => d.id === id);

    document.getElementById("id").value = obj.id;
  
    document.getElementById("cinemaName").value = obj. cinemaName;
    document.getElementById("cinemaEmail").value = obj.email;
    document.getElementById("phone-number").value = obj.phone; 
    document.getElementById("address").value = obj.address;
     document.getElementById("status").value = obj.status;
    document.getElementById("imageCinema").src = "../assets/image/" +obj.cinemaImage;
    document.getElementById("imageCinema").alt = obj.cinemaImage;
}

const handleDisplay = async () => {

    try {
        const response = await fetch("http://localhost:3000/cinema");
        const data = await response.json();
        console.log(data);

     

        let print = "";

        print += "<table border = '1'><tr><th>Name</th><th>Cinema Image</th><th>Email</th><th>Phone No</th><th>Address</th><th>Stuatus</th><th>Action</th><tr>";
  
        data.map((v)=>{
            print+= "<tr>" 
            print+= `<td>${v.cinemaName}</td>
            <td><img src="../assets/image/${v.cinemaImage}" width=100px,height=100px /></td><td>${v.email}</td></td><td>${v.phone}</td></td><td>${v.address}</td></td><td>${v.status}</td>`
            print += `<td><i onclick=handleEdit('${v.id}') class="fa-solid fa-pen-to-square"></i><i onclick="handleRemove('${v.id}')" class="fa-regular fa-trash-can"></i></td>`;
            print+= "</tr>"
            // console.log(v.cinemaImage);
        })  
    
      
    
        document.getElementById("disp").innerHTML = print;
    } catch (error) {
        console.log(error);
    }
}

const handleImg =()=>{
    
    const updateimg = document.getElementById("cinemaImage").value;
    const img= document.getElementById("imageCinema");

   const src = img.src = updateimg;
    console.log(src);

    let arr = updateimg.split("\\");

    document.getElementById("imageCinema").alt ="cinema-img/"+arr[arr.length -1];
    document.getElementById("imageCinema").src = "../assets/image/cinema-img/"+arr[arr.length -1];    




}


const handleCinema = async () => {

    try {
        const id = document.getElementById("id").value;
        const status = document.getElementById("status").value;
        const  cinemaName= document.getElementById("cinemaName").value;
        const email = document.getElementById("cinemaEmail").value;
        const phone = document.getElementById("phone-number").value;
        const address = document.getElementById("address").value;
        const cinemaImage = document.getElementById("cinemaImage").value;
        const photo =document.getElementById("imageCinema").alt;

        let arr = cinemaImage.split("\\");
        console.log(arr[arr.length - 1]);

        let obj = {
            status,
            cinemaName,
            email,
            phone,
            address,
            cinemaImage: photo,
            updatedAt: new Date().toString(),
            createAt:new Date().toString()
        };

        console.log(obj);
console.log(id);

        if(id){
            try {
                const response = await fetch("http://localhost:3000/cinema/" + id, {
                    method:"PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj),
                })
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
            }
            console.log("update");
        }else{
            try {
                const response = await fetch("http://localhost:3000/cinema/", {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj),
                });
                console.log(response);
            } catch (error) {
                console.log(error);
            }
            console.log("add");
        }
        
    } catch (error) {
        console.error(error);
    }
       


       

     

};



const cinemaForm = document.getElementById("cinemaForm");
cinemaForm.addEventListener("submit", handleCinema);

window.onload = handleDisplay;