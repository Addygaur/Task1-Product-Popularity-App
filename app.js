// const axios = require('axios');

// Fetch JSON data from the provided URL
async function fetchData() {
  try {
    const response = await axios.get('https://s3.amazonaws.com/open-to-cors/assignment.json');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    process.exit(1); // Exit the process with an error code
  }
}

// Main function to process and display the data
async function main() {
  // Fetch data
  const jsonData = await fetchData();

  // Extract products from the JSON data
  const products = jsonData.products;

  // Convert the object to an array
  const productList = Object.keys(products).map((productId) => ({
    id: productId,
    ...products[productId],
  }));

  // Sort the array by popularity in descending order
  const sortedProducts = productList.sort((a, b) => b.popularity - a.popularity);

  // Display the sorted products in the HTML table
  const table = document.getElementById('productTable');
  sortedProducts.forEach((product) => {
    const row = table.insertRow(-1);
    const titleCell = row.insertCell(0);
    const priceCell = row.insertCell(1);
    titleCell.textContent = product.title;
    priceCell.textContent = product.price;
  });
}

// Run the main function when the DOM is ready
document.addEventListener('DOMContentLoaded', main);
