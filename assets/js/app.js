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


// Cart එකේ දත්ත තියාගන්න Array එකක් (Storage එකෙන් ගන්නවා, නැත්නම් හිස් එකක්)
let cart = JSON.parse(localStorage.getItem('myCart')) || [];

// --- 1. HOME PAGE LOGIC (Add to Cart) ---
if (document.querySelector('.menu-grid')) { 
    const buttons = document.querySelectorAll('.card button');

    buttons.forEach((button, index) => {
        button.addEventListener('click', function() {
            // බොත්තම තියෙන Card එක හොයාගැනීම
            const card = button.parentElement;
            const name = card.querySelector('h3').innerText;
            const priceText = card.querySelector('.price').innerText; // $4.50
            const price = parseFloat(priceText.replace('$', '')); // $ අකුර අයින් කරලා අංකය ගන්නවා

            // Cart එකට එකතු කිරීම
            cart.push({ name, price });
            localStorage.setItem('myCart', JSON.stringify(cart)); // Save to Storage

            // බොත්තම වෙනස් කිරීම
            button.innerText = "Added ✅";
            button.style.backgroundColor = "#27ae60";
            setTimeout(() => {
                button.innerText = "Add to Cart";
                button.style.backgroundColor = "#4b3621";
            }, 1000);
        });
    });
}

// --- 2. CART PAGE LOGIC (Display Items) ---
const cartTableBody = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');

if (cartTableBody) { // මේක Cart Page එක නම් විතරක් වැඩ කරන්න
    displayCart();
}

function displayCart() {
    cartTableBody.innerHTML = ''; // මුලින් Table එක හිස් කරන්න
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        
        // අලුත් පේළියක් (Row) හැදීම
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><button class="btn-remove" onclick="removeItem(${index})">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    // Total එක පෙන්වීම
    totalPriceEl.innerText = total.toFixed(2);
}

// Item එකක් අයින් කරන Function එක
function removeItem(index) {
    cart.splice(index, 1); // Array එකෙන් අයින් කරනවා
    localStorage.setItem('myCart', JSON.stringify(cart)); // Update Storage
    displayCart(); // Table එක Refresh කරනවා
}

// Checkout Button Logic
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            alert("Your cart is empty!");
        } else {
            alert("Thank you for your order! ☕ We will deliver soon.");
            cart = []; // Cart එක හිස් කරනවා
            localStorage.setItem('myCart', JSON.stringify(cart));
            displayCart();
            window.location.href = "index.html"; // ආපහු Home එකට යවනවා
        }
    });
}