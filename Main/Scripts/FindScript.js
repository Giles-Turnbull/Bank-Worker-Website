
function find(){
    // Get the value of the input field with
    let location = document.querySelector("#Location-item").value;
    let Role = document.querySelector("#Role-item").value;
    let Worker = document.querySelector("#Worker-item").value;
    
    //write to session storage
    sessionStorage.setItem("Location", location);
    sessionStorage.setItem("Role", Role);
    sessionStorage.setItem("Worker", Worker);
    //redirect Browse page
    window.location.href = "Browse.html";
}