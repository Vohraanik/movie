const registerForm= async()=>{
    const fname = document.getElementById("fname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value;
    const Profile_img = document.getElementById("Profile_img").value;

    console.log(Profile_img);

    const arr = Profile_img.split("\\");
    console.log(arr[arr.length -1]);
console.log(arr);

    let obj = {
        Profile_img:"user/"+arr[arr.length -1],
       createAt: new Date().toString(),
       updateAt: new Date().toString(),
        fname,
        email,
        password,
        age,
        "status":"panding"
    }
    console.log(obj);


   const response =await fetch("http://localhost:3000/user",{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
    })

    const data =  await response.json();
    console.log(data);

    window.location.href = "./login.html";
}



const handleRegister = document.getElementById("register");
handleRegister.addEventListener("submit",registerForm)