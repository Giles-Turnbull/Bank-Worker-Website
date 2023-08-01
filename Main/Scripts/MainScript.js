// Function to redirect to the target page with item information
function redirectToItem(item) {
    sessionStorage.setItem("SelectedItem", JSON.stringify(item));
    window.location.href = 'Item.html';
  }
  
  //fetching data from the json file and displaying it in the correct format
  fetch("/Main/Data/Items.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (items) {
      // Initialize the output data
      let outputdata = "";
      let temp = document.querySelector("#data-output");
  
      // Counter variable to limit the results to 3
      let counter = 0;
  
      // Loop through the items and generate the first three results
      for (let item of items) {
        // Generate the card HTML
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
  
        // Increment the counter
        counter++;
  
        // Break the loop if the counter reaches three
        if (counter === 3) {
          break;
        }
      }
  
      // Output the data to the table
      temp.innerHTML = outputdata;
  
      // Event listener for card click
      document.querySelectorAll('.card.h-100.btn').forEach(button => {
        button.addEventListener('click', function () {
          const item = JSON.parse(this.getAttribute('data-item'));
          redirectToItem(item);
        });
      });
  });