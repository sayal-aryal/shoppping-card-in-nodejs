let cart=[];
let products=[];
const API_URL = 'http://localhost:3300';
window.onload=function(){
 const username=JSON.parse(sessionStorage.getItem('authToken')).username;
 const welcomeMessage=`Welcome ${username}`;
 document.getElementById('display-username').textContent=welcomeMessage;
 document.getElementById('logout').addEventListener('click', async function() {
    localStorage.removeItem('cart'); // clear the cart key from local storage
     window.location.href = 'index.html';      
  });

  //Get product list from backend and display in frontend
  // Fetch products data from backend
  fetch(`${API_URL}/products`)
  .then(response => response.json())
  .then(productsData => {
    products=productsData;

    renderProducts(productsData);
  })
  .catch(error => console.error(error));

//Function to render product objects in a table

function renderProducts(products){
    const tableBody = document.getElementById('table-body');
    products.forEach(product => {
      const row = document.createElement('tr');
      const productName = document.createElement('td');
      productName.textContent = product.name;
      row.appendChild(productName);

      const price = document.createElement('td');
      price.textContent = product.price;
      row.appendChild(price);

      const imageCell = document.createElement('td');
      const imageElement = document.createElement('img');
      imageElement.src = product.image_url;
      imageElement.alt = product.name;
      imageElement.width = 50;
      imageElement.height = 50;
      imageCell.appendChild(imageElement);
      row.appendChild(imageCell);

      const stock = document.createElement('td');
      stock.textContent = product.stock_quantity;
      row.appendChild(stock);

      const addButton = document.createElement('td');
      const addButtonElement = document.createElement('button');
      addButtonElement.type="button";
      const icon = document.createElement("i");
      icon.classList.add("fa", "fa-cart-plus");
      addButtonElement.appendChild(icon);
      
      addButtonElement.addEventListener('click', () => {
      let item=
        {
            name:product.name,
            price:product.price,
            quantity:1,
        }
      let cartFromStorage=localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart').toString()) : [];
      const itemIndex=  cartFromStorage.findIndex(item=>item.name===product.name);
      if (itemIndex !== -1) {
        if (cartFromStorage[itemIndex].quantity < product.stock_quantity) {
          cartFromStorage[itemIndex].quantity++;
          localStorage.setItem('cart',JSON.stringify(cartFromStorage));
          window.location.reload();
        } else {
          alert('Stock quantity exceeded');
        }
      } else {
        cartFromStorage.push(item);
        localStorage.setItem('cart',JSON.stringify(cartFromStorage));
        window.location.reload();
      }
    });

      addButton.appendChild(addButtonElement);
      row.appendChild(addButton);
      tableBody.appendChild(row);
    })
  };
  
// Function to render cart object in a table
function renderCart() {
  let cart=localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart').toString()) : [];
  let cartTable = document.getElementById("cart-table");
  let tbody = cartTable.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  // Check if cart is empty
  if (cart.length === 0) {
    let emptyRow = document.createElement("tr");
    let emptyCell = document.createElement("td");
    emptyCell.colSpan = 5;
    emptyCell.textContent = "There is no item in your shopping cart.";
    emptyRow.appendChild(emptyCell);
    tbody.appendChild(emptyRow);
  } else {
    // Iterate through cart items and render rows
    for (let i = 0; i < cart.length; i++) {
      let row = document.createElement("tr");

      let nameCell = document.createElement("td");
      nameCell.textContent = cart[i].name;

      let priceCell = document.createElement("td");
      priceCell.textContent = "$" + cart[i].price;

      let quantityCell = document.createElement("td");

      let quantityContainer = document.createElement("div");
      quantityContainer.style.display = "flex";
      
      let minusButton = document.createElement("button");
      minusButton.textContent = "-";
      minusButton.addEventListener("click", function() {
        let product=products.find(product=>product.name===cart[i].name);
        if(cart[i].quantity>1){
          cart[i].quantity--;
          localStorage.setItem('cart',JSON.stringify(cart));
          window.location.reload();
        }
      });
      quantityContainer.appendChild(minusButton);
      
      let quantityText = document.createElement("span");
      quantityText.textContent = cart[i].quantity;
      quantityContainer.appendChild(quantityText);
      
      let plusButton = document.createElement("button");
      plusButton.textContent = "+";
      plusButton.addEventListener("click", function() {
        let product=products.find(product=>product.name===cart[i].name);
        if(cart[i].quantity+1<=product.stock_quantity){
          cart[i].quantity++;
        }
        localStorage.setItem('cart',JSON.stringify(cart));
        window.location.reload();
      });
      quantityContainer.appendChild(plusButton);
      
      quantityCell.appendChild(quantityContainer);
      
      // Append the cell to the row and the row to the cart table
      

      let totalCell = document.createElement("td");
      totalCell.textContent = "$" + (cart[i].price * cart[i].quantity).toFixed(2);
      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(quantityCell);
      row.appendChild(totalCell);
    

      tbody.appendChild(row);
    }

    // Render "Total" row
    let totalRow = document.createElement("tr");
    let totalCell = document.createElement("td");
    totalCell.colSpan = 3;
    totalCell.textContent = "Total";
    totalRow.appendChild(totalCell);

    let totalValueCell = document.createElement("td");
    let total = cart.reduce(function(acc, item) {
      return acc + item.price*item.quantity;
    }, 0);
    totalValueCell.textContent = "$" + total.toFixed(2);
    totalRow.appendChild(totalValueCell);

    tbody.appendChild(totalRow);
  }
}

//Calling Render Cart Function
renderCart();

//Place Order 

document.getElementById("place-order-button").addEventListener("click", function() {
  let cart = localStorage.getItem('cart');
  cart = cart ? JSON.parse(cart) : [];
  const formattedCart = cart.map(item => ({
  name: item.name,
  price: item.price,
  image_url: item.image_url,
  stock_quantity: item.quantity
}));
fetch(`${API_URL}/products/place-order`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    cart: formattedCart
  })
})
.then(response => {
  if (response.ok) {
    return response.json(); 
  } else {
    throw new Error('Failed to place order. Please try again later.');
  }
})
.then(updatedProducts => {
  products = updatedProducts; 
  localStorage.removeItem('cart');
  renderCart(); 
  alert('Your order has been placed. Thank you for shopping with us!');
})
.then(()=>{
  window.location.reload();
})
.catch(error => {
  console.error('Error placing order:', error);
  alert(error.message);
});  
});
}















