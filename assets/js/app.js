const buttons = document.querySelectorAll('.card button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        
        alert('Thank you! This item has been added to your cart. ☕');
        
        button.innerText = "Added ✅";
        button.style.backgroundColor = "#27ae60"; 
        
        setTimeout(() => {
            button.innerText = "Add to Cart";
            button.style.backgroundColor = "#4b3621"; 
        }, 2000);
        
    });
});


let cart = JSON.parse(localStorage.getItem('myCart')) || [];

if (document.querySelector('.menu-grid')) { 
    const buttons = document.querySelectorAll('.card button');

    buttons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const card = button.parentElement;
            const name = card.querySelector('h3').innerText;
            const priceText = card.querySelector('.price').innerText; 
            const price = parseFloat(priceText.replace('$', ''));

            cart.push({ name, price });
            localStorage.setItem('myCart', JSON.stringify(cart)); 

            button.innerText = "Added ✅";
            button.style.backgroundColor = "#27ae60";
            setTimeout(() => {
                button.innerText = "Add to Cart";
                button.style.backgroundColor = "#4b3621";
            }, 1000);
        });
    });
}

const cartTableBody = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');

if (cartTableBody) { 
    displayCart();
}

function displayCart() {
    cartTableBody.innerHTML = ''; 
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        
       
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><button class="btn-remove" onclick="removeItem(${index})">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    totalPriceEl.innerText = total.toFixed(2);
}

function removeItem(index) {
    cart.splice(index, 1); 
    localStorage.setItem('myCart', JSON.stringify(cart)); 
    displayCart(); 
}

const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Thank you for your order! ☕ We will deliver soon.");
            cart = [];
            localStorage.setItem('myCart', JSON.stringify(cart));
            displayCart();
            window.location.href = "index.html";
        }
    });
}