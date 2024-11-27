const productos = [
  { id: "1", nombre: "Iphone 11", precio: 360, imagen: "foto1.jpeg" },
  { id: "2", nombre: "Iphone 11 Pro Max", precio: 420, imagen: "foto2.jpeg" },
  { id: "3", nombre: "Iphone 13", precio: 630, imagen: "foto3.jpeg" }
];

const productosContainer = document.getElementById("productos");
const carritoContainer = document.getElementById("lista-carrito");
const totalContainer = document.getElementById("total");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((producto) => {
  const productoHTML = document.createElement("div");
  productoHTML.classList.add("producto");
  productoHTML.innerHTML = `
    <img src="img/${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>$${producto.precio}</p>
    <button data-id="${producto.id}">Agregar al Carrito</button>
  `;
  productosContainer.appendChild(productoHTML);
});

document.querySelectorAll(".producto button").forEach((btn) =>
  btn.addEventListener("click", agregarAlCarrito)
);

function agregarAlCarrito(e) {
  const id = e.target.getAttribute("data-id");
  const producto = carrito.find((prod) => prod.id === id);

  if (producto) {
    producto.cantidad++;
  } else {
    const productoAgregado = productos.find((prod) => prod.id === id);
    carrito.push({ ...productoAgregado, cantidad: 1 });
  }

  actualizarCarrito();
}

function actualizarCarrito() {
  carritoContainer.innerHTML = "";
  let total = 0;

  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;

    const li = document.createElement("li");
    li.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
    carritoContainer.appendChild(li);
  });

  totalContainer.textContent = total;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

vaciarCarritoBtn.addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});



