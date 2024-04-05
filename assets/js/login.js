
const handleLogin = async () => {
    // console.log("sdafd");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username, password);




    try {
        response = await fetch("http://localhost:3000/user");
        const data = await response.json();
        console.log(data);

        // const obj = data.find((d) => d.email === username && d.password === password && d.status === "active");
        // console.log(obj);

        // if(obj){
        //     alert("login successfully");
        //     window.location.href = "./index.html";


        // }else{
        //     alert("invalid username or password");
        // }
        let flag = 0;

        data.map((v) => {
            if (v.email === username && v.password === password) {
                if (v.status === "active") {
                    flag = 1;
                   
                } else {
                    flag = 2
                }
            }
        });

        if(flag===1){
            alert("login successfully");
            window.location.href = "./index.html";
        }else if(flag ===2){
            alert("your account is not active");
        }else {
            alert("invalid username or password");
        }

    } catch (error) {
        console.log("error", error);
    }

}
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", handleLogin);