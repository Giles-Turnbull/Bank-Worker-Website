// Function to handle the button click event
function postItem() {
    // Retrieve the input values
    const location = document.getElementById("Item-location").value;
    const role = document.getElementById("Item-Role").value;
    const pay = parseFloat(document.getElementById("Item-Pay").value);
    const notes = document.getElementById("Item-Notes").value;
    const duration = document.getElementById("Item-Duration").value;
    const startDate = document.getElementById("Item-Date").value;
    const worker = document.getElementById("Item-Worker").value;
  
    // Create an object with the input values
    const item = {
      Location: location,
      Role: role,
      Pay: pay,
      Notes: notes,
      Duration: duration,
      StartDate: startDate,
      Worker: worker
    };

    //THIS CODE WOULD ONLY WORK IF WE IF THE FILE WAS STORED ON A SERVER WITH POST HANDLING CODE
    fetch("/Main/Data/users.json")
        .then(function(response){
            return response.json();
    })
    .then(function(data){
        // Add the new item to the data
        data.push(item);
        //append the new item to the json file
        fetch("/Main/Data/items.json", {
            method: "POST",
            body:   JSON.stringify(data)
        })
        //redirect to the index page
        window.location.href = "index.html";
    })

}