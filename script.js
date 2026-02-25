// Address popup
const menuDots = document.getElementById('menuDots');
const addressPopup = document.getElementById('addressPopup');

menuDots.addEventListener('click', () => {
  addressPopup.style.display = addressPopup.style.display === 'block' ? 'none' : 'block';
});

// Product Data with Price
const products = {
  livestock: [
    {name: "Rode Island Chicken", stock: 40, sold: 12, price: 650, img: "rodeisland.jpg"}, // <-- added
    {name: "Turkey", stock: 10, sold: 3, price: 800, img: "turkey.jpg"}, 
  ],
  poultry: [
    {name: "Brown chicken eggs per tray (large size)", stock: 50, sold: 20, price: 180 , img: "brownegg.jpeg"},
    {name: "White chicken eggs per tray (Medium size)", stock: 30, sold: 10, price: 160, img: "whiteegg.jpg"}
  ],
  fertilizers: [
    {name: "Vermicast pero kilo (worms and mecrobes) ", stock: 100, sold: 25, price: 25, img: "vermicast.png"},
    {name: "Cow manure per kilo", stock: 50, sold: 15, price: 30, img: "cowmanure.jpeg"}
  ],
  vegetables: [
    {name: "Pechay per kilo", stock: 80, sold: 30, price: 120, img: "Native-Pechay.jpg"},
    {name: "Tomato per kilo", stock: 60, sold: 20, price: 80, img: "tomato.jpeg"}
  ],
  other: [
    {name: "Salabat", stock: 40, sold: 10, price: 70, img: "file.jpg"},
    {name: "White rice per kilo", stock: 200, sold: 50, price: 54, img: "bugas.jpg"}
  ]
};

// Elements
const categoryElements = document.querySelectorAll('.category');
const categoriesSection = document.getElementById('categories');
const productsSection = document.getElementById('products');
const productGrid = document.getElementById('productGrid');
const productsTitle = document.getElementById('productsTitle');
const backBtn = document.getElementById('backBtn');

// Track scroll position
let categoriesScrollPos = 0;
let lastSelectedCategory = null;

// Show products of selected category
categoryElements.forEach(cat => {
  cat.addEventListener('click', () => {
    // Save current scroll position
    categoriesScrollPos = categoriesSection.scrollLeft;
    lastSelectedCategory = cat;

    const category = cat.dataset.category;
    categoriesSection.style.display = 'none';
    productsSection.style.display = 'block';
    backBtn.style.display = 'inline-block';
    productsTitle.textContent = cat.querySelector('h3').textContent;
    productGrid.innerHTML = '';

    products[category].forEach(prod => {
      const card = document.createElement('div');
      card.classList.add('product-card');
      card.innerHTML = `
        <img src="${prod.img}" alt="${prod.name}">
        <h3>${prod.name}</h3>
        <p>Price: ₱${prod.price}</p>
        <p>Stock: ${prod.stock}</p>
        <p>Sold: ${prod.sold}</p>
        <button onclick="contactMessenger('${prod.name}')">Contact via Messenger</button>
      `;
      productGrid.appendChild(card);
    });
  });
});

// Back button
backBtn.addEventListener('click', () => {
  productsSection.style.display = 'none';
  categoriesSection.style.display = 'flex';
  backBtn.style.display = 'none';

  // Restore scroll position
  if(lastSelectedCategory) {
    // Scroll selected category to center
    const catRect = lastSelectedCategory.getBoundingClientRect();
    const containerRect = categoriesSection.getBoundingClientRect();
    const offset = (catRect.left + catRect.width / 2) - (containerRect.left + containerRect.width / 2);
    categoriesSection.scrollLeft += offset;

    lastSelectedCategory = null;
  } else {
    categoriesSection.scrollLeft = categoriesScrollPos;
  }
});

// Contact Messenger
function contactMessenger(productName){
  const messengerURL = "https://www.facebook.com/pagmayafoodfarm";
  window.open(messengerURL, '_blank');
}