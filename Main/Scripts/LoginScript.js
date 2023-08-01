//set the session storage user to guest
sessionStorage.setItem("Username", "Guest");

//function to log the user in
function login(){
    let Username = document.querySelector("#Username-item");
    let Password = document.querySelector("#Password-item");
    //fetch the data from the json file
    fetch("/Main/Data/users.json")
    .then(function(response){
        return response.json();
    })
    .then(function(users){
        //loop through the users and check if the username and password match
        for(let user of users){
            if(user.Username == Username.value && user.Password == Password.value){
                //set the session storage to the username
                sessionStorage.setItem("Username", user.Username);
                //redirect to the homepage
                window.location.href = "index.html";
                return;
            }
        }
        //if the username and password do not match then alert the user
        alert("Username or Password is incorrect");
    }
    )
}

//function to log the user out
function logout(){
    //set the session storage to guest
    sessionStorage.setItem("Username", "Guest");
    //redirect to the homepage
    window.location.href = "Main/Pages/Home.html";
}