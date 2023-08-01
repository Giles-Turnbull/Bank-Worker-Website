// function to store item in session storage and redirect to item page
function redirectToItem(item) {
    sessionStorage.setItem("SelectedItem", JSON.stringify(item));
    window.location.href = 'Item.html';
}

//fetching data from the json file and displaying it in the correct format
fetch("/Main/Data/Items.json")
.then(function(response){
    return response.json();
})


.then(function(items) {
    // Initialize the output data
    let outputdata = "";
    let temp = document.querySelector("#data-output");

    // Check if Location, Role, and Worker session storage is set
    let locationFilter = sessionStorage.getItem("Location");
    let roleFilter = sessionStorage.getItem("Role");
    let workerFilter = sessionStorage.getItem("Worker");
    
    //workerFilter is "Either" then set the session storage to null
    if (workerFilter === "Either") workerFilter = null;

    // Loop through the users and apply the filters
    for (let item of items) {
        let shouldInclude = true;

        // Filter for Location
        if (locationFilter && locationFilter !== "All" && item.Location !== locationFilter) {
            shouldInclude = false;
        }

        // Filter for Role
        if (roleFilter && roleFilter !== "All" && item.Role !== roleFilter) {
            shouldInclude = false;
        }

        // Filter for Worker
        if (workerFilter && workerFilter !== "All" && item.Worker !== workerFilter) {
            shouldInclude = false;
        }

        // If the item should be included, generate the card HTML
        if (shouldInclude) {
            // choose the correct icon
            let icon = item.Worker === "Worker" ? "https://cdn-icons-png.flaticon.com/512/2815/2815428.png" : "https://cdn-icons-png.flaticon.com/512/2830/2830596.png";
            let cardHTML = `
                <div class="col-lg-4 col-md-6 col-12">
                    <button type="button" class="card h-100 btn" data-item='${JSON.stringify(item)}'>
                        <img src="${icon}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${item.Username}</h5>
                            <p class="card-text">${item.Role}</p>
                            <p class="card-text">I am looking in the ${item.Location} Area.</p>
                        </div>
                    </button>
                </div>
            `;

            // Append the card HTML to the output data
            outputdata += cardHTML;
        }
    }

    // Output the filtered data to the table
    temp.innerHTML = outputdata;

    // Event listener for card click
    document.querySelectorAll('.card.h-100.btn').forEach(button => {
        button.addEventListener('click', function() {
        const item = JSON.parse(this.getAttribute('data-item'));
        redirectToItem(item);
        });
    });

    // Display the filter message
    const location = sessionStorage.getItem("Location");
    const role = sessionStorage.getItem("Role");
    const worker = sessionStorage.getItem("Worker");
    let message = "";
  
    if (location !== null) {
        message += location + " ";
    }
    if (role !== null) {
        message += role + " ";
    }
    if (worker !== null) {
        message += worker;
    }
  
    //change data-review to the message
    document.getElementById("data-review").innerHTML = message;

});