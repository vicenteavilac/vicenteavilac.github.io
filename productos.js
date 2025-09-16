document.addEventListener('DOMContentLoaded', () => {

    // 1. Datos de los productos
    const products = {
        'avocado': {
            name: 'Batido de Palta',
            price: 8000,
            description: 'Suave, cremoso y tropical. Una mezcla refrescante de aguacate, kiwi, mango y naranja. Perfecto para quienes buscan energía y un sabor exótico en cada sorbo.',
            image: 'images/Imagenes_Batidos/Avocado smoothie.png'
        },
        'banana-peanut': {
            name: 'Batido de Plátano y Maní',
            price: 7000,
            description: 'Dulce, cremoso e irresistible. Solo tres ingredientes: plátano, mantequilla de maní y leche. Energía y sabor intenso en cada sorbo. ¡Un clásico que no falla!',
            image: 'images/Imagenes_Batidos/Banana smoothie with peanut butter.png'
        },
        'berry': {
            name: 'Batido de Frutos Rojos',
            price: 8000,
            description: 'Colorido, fresco y lleno de sabor. Una mezcla perfecta de frutos rojos, naranja y un toque dulce. Ideal para refrescar y sorprender en cualquier ocasión.',
            image: 'images/Imagenes_Batidos/Berry smoothie.png'
        },
        'kale': {
            name: 'Batido de Col Rizada',
            price: 9000,
            description: 'Verde, fresco y nutritivo. Una mezcla de kale, manzana, aguacate y lima que combina dulzor y acidez. Energía natural y sabor vibrante para comenzar tu día.',
            image: 'images/Imagenes_Batidos/Kale smoothie.png'
        },
        'kiwi': {
            name: 'Batido de Kiwi',
            price: 7500,
            description: 'Refrescante y ligero. Una explosión de kiwi con un toque cítrico, perfecto para hidratar y revitalizar en cualquier momento del día.',
            image: 'images/Imagenes_Batidos/Kiwi fruit smoothie.png'
        },
        'pineapple-mango': {
            name: 'Batido de Piña y Mango',
            price: 9500,
            description: 'Tropical y dulce. Una mezcla jugosa de piña madura y mango fresco que te transporta directo al verano en cada sorbo.',
            image: 'images/Imagenes_Batidos/Pineapple and mango smoothie.png'
        },
        'protein': {
            name: 'Batido de Proteína',
            price: 10000,
            description: 'Potente y nutritivo. Con proteína natural, plátano y avena para quienes buscan energía sostenida después del entrenamiento.',
            image: 'images/Imagenes_Batidos/Protein smoothie.png'
        },
        'spinach': {
            name: 'Batido de Espinaca',
            price: 8500,
            description: 'Saludable y refrescante. Una combinación de espinaca, manzana verde y pepino que aporta frescura y vitalidad de manera natural.',
            image: 'images/Imagenes_Batidos/Spinach smoothie.png'
        }
    };

    // 2. Obtener los elementos HTML
    const mainProductImg = document.getElementById('main-product-img');
    const mainProductName = document.getElementById('main-product-name');
    const mainProductPrice = document.getElementById('main-product-price');
    const mainProductDescription = document.getElementById('main-product-description');
    const breadcrumbProductName = document.getElementById('breadcrumb-product-name');
    const relatedItems = document.querySelectorAll('.related-item');
    const quantitySelect = document.getElementById('cantidad');
    const cartCountElement = document.querySelector('.nav-link .bi-cart').nextSibling;

    // 3. Función para actualizar el contenido del producto
    function updateProductInfo(productId) {
        const product = products[productId];
        if (product) {
            mainProductImg.src = product.image;
            mainProductImg.alt = product.name;
            mainProductName.textContent = product.name;
            mainProductPrice.textContent = `$${product.price.toLocaleString('es-CL')}`;
            mainProductDescription.textContent = product.description;
            breadcrumbProductName.textContent = product.name;
        }
    }

    // 4. Agregar el 'event listener' a los productos relacionados
    relatedItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = item.dataset.productId;
            currentProductId = productId;
            updateProductInfo(productId);
        });
    });

// 5. Manejar el botón de añadir al carrito
const addToCartBtn = document.getElementById('add-to-cart-btn');
let currentProductId = 'berry'; // ID del producto inicial

// Función para actualizar el contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Suma la cantidad total de unidades
    const totalUnits = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = ` Cart (${totalUnits})`;
}

// Listener para actualizar el producto principal en base a la URL
function updateProductFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'berry'; // Valor por defecto
    currentProductId = productId;
    updateProductInfo(currentProductId);
}
updateProductFromURL();

if (addToCartBtn) {
    addToCartBtn.addEventListener('click', (event) => {
        event.preventDefault();

        const product = products[currentProductId];
        const quantity = parseInt(quantitySelect.value);

        if (product && !isNaN(quantity)) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Buscar si el producto ya está en el carrito
            const existingItem = cart.find(item => item.id === currentProductId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: currentProductId,
                    name: product.name,
                    price: product.price,
                    quantity: quantity,
                    image: product.image 
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            // Mensaje de confirmación
            const messageBox = document.createElement('div');
            messageBox.className = 'alert alert-success mt-3';
            messageBox.textContent = `${product.name} fue agregado al carrito.`;
            document.body.appendChild(messageBox);
            setTimeout(() => {
                messageBox.remove();
            }, 3000);

            updateCartCount();
        }
    });
}

// Inicializar el contador del carrito al cargar la página
updateCartCount();
});