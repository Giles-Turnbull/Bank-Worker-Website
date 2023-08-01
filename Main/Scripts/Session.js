//check session stroage for username
window.onload = function(){
    if(sessionStorage.getItem("Username") == null){
        sessionStorage.setItem("Username", "Guest");
        //redirect to the login page
        window.location.href = "/Main/Login.html";
    }
}