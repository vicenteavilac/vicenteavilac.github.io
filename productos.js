// Objeto que almacena los datos de cada producto
const products = { // <-- Se cambió "productos" a "products" aquí
    '1': {
        name: 'Batido Verde',
        price: '$3.990',
        image: 'images/batidoverde.webp',
        description: 'Un batido refrescante y lleno de energía con espinaca, manzana verde y kiwi. Perfecto para empezar el día.'
    },
    '2': {
        name: 'Batido de Limón y Jengibre',
        price: '$2.990',
        image: 'images/LimonJengibre.webp',
        description: 'Una mezcla revitalizante de limón y jengibre, ideal para una digestión saludable y un impulso natural.'
    },
    '3': {
        name: 'Batido "Perro Presidente"',
        price: '$4.500',
        image: 'images/perropresidente.jpeg',
        description: 'La famosa receta secreta de "Perro Presidente" con plátano, avena y un toque de canela. ¡Espectacular!'
    },
    '4': {
        name: 'Batido de Vainilla',
        price: '$2.500',
        image: 'images/batido4.webp',
        description: 'Suave y cremoso batido de vainilla, perfecto para una tarde de relajo. Puedes añadirle tu topping favorito.'
    },
    '5': {
        name: 'Batido de Mango',
        price: '$3.200',
        image: 'images/batido5.webp',
        description: 'Un batido tropical de mango dulce y jugoso, ideal para refrescarse en días de calor.'
    }
};

// Función para actualizar el contenido principal de la página
function updatePageContent(productId) {
    const product = products[productId]; // <-- Y aquí también, para que coincida
    if (!product) {
        console.error('Producto no encontrado para el ID:', productId);
        return;
    }

    // Actualiza los elementos con los datos del producto
    document.querySelector('.product-name').textContent = product.name;
    document.querySelector('.product-price').textContent = product.price;
    document.querySelector('.product-description').textContent = product.description;

    const mainImage = document.querySelector('.product-images img');
    mainImage.src = product.image;
    mainImage.alt = product.name;
}

// Escucha los clics en los enlaces de productos relacionados
document.addEventListener('DOMContentLoaded', () => {
    const relatedItems = document.querySelectorAll('.related-item');

    relatedItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // Evita que la página se recargue
            const productId = item.dataset.productId;
            updatePageContent(productId);
        });
    });
});