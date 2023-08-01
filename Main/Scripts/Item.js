// Retrieve the selected item from session storage
const selectedItem = JSON.parse(sessionStorage.getItem("SelectedItem"));

// Populate the item details on the page
document.getElementById("Item-Username").innerHTML = "Hello! I'm " + selectedItem.Username;
document.getElementById("Item-Role").innerHTML = "I'm looking for a " + selectedItem.Role;
document.getElementById("Item-Worker").innerHTML = "I am a " + selectedItem.Worker;
document.getElementById("Item-Notes").innerHTML = selectedItem.Notes;
document.getElementById("Item-location").innerHTML = "Our location is: " + selectedItem.Location;
document.getElementById("Item-Date").innerHTML = "Start Date: " + selectedItem.date;
document.getElementById("Item-Duration").innerHTML = "Duration: " + selectedItem.duration + " day(s)";
document.getElementById("Item-Pay").innerHTML = "Our hourly rate is: £" + selectedItem.payPerHour + " per hour";
document.getElementById("Item-Email").innerHTML = "Email: " + selectedItem.Email;