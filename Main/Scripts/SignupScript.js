//initialize input variables and indicators
const inputPass = document.querySelector("#inputPass");
const indicator = document.querySelector(".indicator");
const message = document.querySelector(".strength");

const indiWeak = document.querySelector(".weak");
const indiMedium = document.querySelector(".medium");
const indiStrong = document.querySelector(".strong");

//initialize content check variables
let WeakCont = /[a-z]/;
let MediumContent = /\d+/;   
let StrongContent = /.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/;

function typeTrigger() {
    if(inputPass.value != ""){
        //generic content check, isn't very reliable but it is simple and easy to implement
        //check if the password is weak
        if(inputPass.value.length <= 6 && (inputPass.value.match(WeakCont) || inputPass.value.match(MediumContent) || inputPass.value.match(StrongContent))){
            cont="weak";
        }
        //check if the password is medium
        if(inputPass.value.length >= 6 && ((inputPass.value.match(WeakCont) && inputPass.value.match(MediumContent)) || (inputPass.value.match(WeakCont) && inputPass.value.match(StrongContent)) || (inputPass.value.match(MediumContent) && inputPass.value.match(StrongContent)))){
            cont="medium";
        }
        //check if the password is strong
        if(inputPass.value.length >= 8 && inputPass.value.match(WeakCont) && inputPass.value.match(MediumContent) && inputPass.value.match(StrongContent)){
            cont="strong";
        }

        //if content is weak then add weak class in indicator
        if(cont == "weak"){
            indiWeak.classList.add("current");
            message.style.display = "block";
            message.textContent = "Your password is way too weak";
        }
        
        //if content is medium then add medium class in indicator
        if(cont == "medium"){
            message.textContent = "Your password is kinda mid";
            indiMedium.classList.add("current");
        }else indiMedium.classList.remove("current");
        
        //if content is strong then add strong class in indicator
        if(cont == "strong"){
            message.textContent = "Your password is a strong boi";
            indiWeak.classList.add("current");
            indiMedium.classList.add("current");
            indiStrong.classList.add("current");
        }else indiStrong.classList.remove("current");
    //if password field is empty
    }else{
        message.style.display = "none";
        indiWeak.classList.remove("current");
        indiMedium.classList.remove("current");
        indiStrong.classList.remove("current");
    }
    return cont;
}


function Register(){
    let Username = document.querySelector("#Username-item");
    let Email = document.querySelector("#Email-item");
    let PasswordOne = document.querySelector("#inputPass");
    let PasswordTwo = document.querySelector("#PasswordTwo-item");
    let Worker = document.querySelector("#Worker-item");

    //check if any of the any of the fields are empty
    if(Username.value == "" || Email.value == "" || PasswordOne.value == "" || PasswordTwo.value == "") alert("Please fill in all the fields");
    //check if the passwords match
    else if(PasswordOne.value != PasswordTwo.value) alert("Passwords do not match");
    //check if the email is valid
    else if(Email.value.includes("@") == false) alert("Please enter a valid email");
    //check if the password is strong
    else if(typeTrigger() != "strong") alert("Please enter a strong password");
    //check if the username has already been taken from the json file
    else{
        fetch("/Main/Data/users.json")
        .then(function(response){
            return response.json();
        })
        .then(function(users){
            //loop through the users and check if the username has already been taken
            for(let user of users){
                if(user.Username == Username.value || user.Email == Email.value){
                    alert("Username or Email has already been taken");
                    return;
                }
            }
            //add the new user to the json file
            let newUser = {
                "Username": Username.value,
                "Email": Email.value,
                "Password": PasswordOne.value,
                "Worker": Worker.checked
            }

            users.push(newUser);
            //This would append to a json file if the json file was on a server and had code to handle the post request
            fetch("/Main/Data/users.json", {
                method: "POST",
                body:   JSON.stringify(users)
            })
            //redirect to the login page
            window.location.href = "Login.html";
            alert("Account created");

        })

    }
}