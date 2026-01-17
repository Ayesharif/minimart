document.addEventListener("DOMContentLoaded",(e)=>{

    e.preventDefault();
const navbar=document.getElementById('navbar-placeholder');

        fetch('nav.html')
            .then(response => response.text())
            .then(html => {
                navbar.innerHTML = html;
                loadUser();
            });

const loader=document.getElementById("loader");
const loaderOff=()=>{
    loader.style.visibility="hidden";
}
const loaderOn=()=>{
    loader.style.visibility="visible";
}

loaderOff()

        function addToCart(product) {

            
            try {
                const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
                const user = JSON.parse(sessionStorage.getItem('user') );
                if(!user){
                    window.location.href="login.html"
                }
                const cartItem = {
                    _id:product._id,
                    title:product.title,
                    price:product.price,
                    image:product.images[0].imageUrl,
                    quantity:1
                };
                console.log(cartItem);
                
                // Check if item already exists in cart
                const existingIndex = cart.findIndex(item => 
                    item._id === cartItem._id 
                );
                
                if (existingIndex > -1) {
                    cart[existingIndex].quantity += quantity;
                } else {
                    cart.push(cartItem);
                }
                                sessionStorage.setItem('cart', JSON.stringify(cart));
                // alert(`Added ${quantity} item(s) to cart!`);
setTimeout(() => {
    window.location.href="cart.html";
}, 2000);
            } catch (e) {
                console.error('Error adding to cart:', e);
                alert('Error adding to cart. Please try again.');
            }
        }
const productContainer = document.getElementById('product-container');

// --- Helper function to create one card ---
function createProductCard(product) {

    const originalPriceHTML = product.originalPrice 
        ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>`
        : '';
        
    const newBadgeHTML = product.isNew
        ? '<div class="badge new">NEW</div>'
        : '';

    const cardHTML = `
        <div class="product-image" >
            <img src="${product.images[0].imageUrl}" class="card-image" alt="${product.title}">
            
        </div>
        <div class="product-content">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            
            <div class="product-footer">
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${originalPriceHTML}
                </div>
                <button class="add-to-cart" ">Add to Cart</button>
            </div>
        </div>
    `;

    // 2. Create the main card element
    const cardElement = document.createElement('div');
    cardElement.classList.add('product-card');
    cardElement.innerHTML = cardHTML; // Insert the content HTML string
    
    // 3. Find the image element inside the newly created card
    const cardImage = cardElement.querySelector('.card-image');
cardImage.addEventListener("click",(e)=>{
    e.preventDefault()
    // localStorage.setItem("currentProduct", JSON.stringify(product));
window.location.href = `/detailPage.html?id=${product._id}`;

})
    // 4. Attach the event listeners (The solution for hover!)
    if (product.images.length > 1) {
        // Event fires when the mouse enters the card (or the element you attach it to)
        cardElement.addEventListener('mouseenter', () => {
            cardImage.src = product.images[1].imageUrl; // Change to the second image
        });

        // Event fires when the mouse leaves the card
        cardElement.addEventListener('mouseleave', () => {
            cardImage.src = product.images[0].imageUrl; // Change back to the primary image
        });
    }

    // 5. Insert the fully-configured element into the container
    productContainer.appendChild(cardElement);

    const addToCartBtn = cardElement.querySelector('.add-to-cart');
addToCartBtn.addEventListener('click', () => {
    addToCart(product);
});
}



function loadProducts() {
    loaderOn()
    fetch("https://minimart-backend-nine.vercel.app/products")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch products: ${response.status}`);
            }
            return response.json();
        })
        .then(productsData => {
            loaderOff()
            // productsData is the array of product objects
            console.log(productsData.data);
            
            // Loop through the array and call the function to create a card for each product
            productsData.data.forEach(product => {
                createProductCard(product);
            });
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
            // Display an error message to the user
            productContainer.innerHTML = '<p class="error">Could not load products at this time.</p>';
        });


}

// Call the main function to start the process
loadProducts();




            })