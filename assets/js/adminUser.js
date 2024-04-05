
const handleRemove = async(id)=>{
// console.log(id);

try {
    const response =  await fetch("http://localhost:3000/user/"+id,{
        method:"DELETE"
    });
    
} catch (error) {
    console.log(error.massage);
    
}

}



const handleEdit = async(id)=>{
    // const data = JSON.parse(obj);   
       

    const response =  await fetch("http://localhost:3000/user");
    const data = await response.json();

    const obj = data.find((d) => d.id === id);

    console.log(obj);
    document.getElementById("id").value = obj.id;
  
    document.getElementById("fname").value = obj.fname;
    document.getElementById("email").value = obj.email;
    document.getElementById("age").value = obj.age; 
    document.getElementById("status").value = obj.status;
    // document.getElementById("Profile_img").value =obj.Profile_img;
    // console.log(obj.Profile_img);

  
    

}
const handleUser= async()=>{
    // console.log("ads");

   try {

    const response =  await fetch("http://localhost:3000/user");
    const data = await response.json();
    // console.log(data);

    let print ="";

    print += "<table border = '1'><tr><th>Name</th><th>Profile Image</th><th>Email</th><th>Age</th><th>Status</th><th>Action</th><tr>";
  
    data.map((v)=>{
        print+= "<tr>"
        print+= `<td>${v.fname}</td><td><img src="../assets/image/${v.Profile_img}" width=100px,height=100px /></td><td>${v.email}</td></td><td>${v.age}</td></td><td>${v.status}</td>`
        print += `<td><i onclick=handleEdit('${v.id}') class="fa-solid fa-pen-to-square"></i><i onclick="handleRemove('${v.id}')" class="fa-regular fa-trash-can"></i></td>`;
        print+= "</tr>"
    //    console.log(`${v.Profile_img}`);
    })  

  

    document.getElementById("disp").innerHTML = print;

    
   } catch (error) {
        console.log(error.massage);
   }

}

const userform = async()=>{

//    const id = document.getElementById("id").value;
//     const fname = document.getElementById("fname").value;
//     const email = document.getElementById("email").value;
//     const age = document.getElementById("age").value; 
//     const status = document.getElementById("status").value;
//     // const profile_img = document.getElementById("Profile_img").value;


//     let obj = {
//         status,
//         id,
//         fname,
//         email,
//         age,
      
//     }
//     console.log(obj);

try {

    const id = document.getElementById("id").value;
    console.log(id);
    const status = document.getElementById("status").value;

    const response =  await fetch("http://localhost:3000/user");
    const data = await response.json();

    const obj = data.find((d) => d.id === id);

    const newData = {...obj,status:status};
    console.log(newData);

    


     await fetch("http://localhost:3000/user/"+ id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
     body: JSON.stringify(newData),
    });
    
} catch (error) {
    console.log(error);
}

    

  
}



const userRegister = document.getElementById("register");
userRegister.addEventListener("submit",userform)


window.onload = handleUser;
