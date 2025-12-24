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