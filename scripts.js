  
  


  let productos = [];
let presupuesto = [];

const contenedor = document.getElementById("productos");
const listaPresupuesto = document.getElementById("lista-presupuesto");
const total = document.getElementById("total");
const formulario = document.getElementById("formulario-pedido");

// Cargar productos desde tu API backend
async function cargarProductos() {
  try {
    const res = await fetch("http://localhost:3000/productos");
    productos = await res.json();

    contenedor.innerHTML = "";

    productos.forEach(prod => {
      const div = document.createElement("div");
      div.classList.add("producto");
      div.innerHTML = `
        <img src="${prod.imagen_url}" alt="${prod.nombre}">
        <h3>${prod.nombre}</h3>
        <p> $${prod.precio}</p>
        <button onclick="agregarAlPresupuesto(${prod.id})">Comprar</button><br><br><hr>
      `;
      contenedor.appendChild(div);
    });

  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

window.addEventListener("DOMContentLoaded", cargarProductos);

function agregarAlPresupuesto(id) {
  const producto = productos.find(p => p.id === id);
  presupuesto.push(producto);
  actualizarPresupuesto();
}

function actualizarPresupuesto() {
  listaPresupuesto.innerHTML = "";
  let totalPrecio = 0;

  presupuesto.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio}`;
    listaPresupuesto.appendChild(li);
    totalPrecio += item.precio;
  });

  total.innerHTML = `<h4><strong>Total: $${totalPrecio}</strong></h4>`;
  total.style.fontWeight = "bold";
  total.style.position = "absolute";
  total.style.left = "40%";
}

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;

  if (presupuesto.length === 0) {
    swal("El presupuesto está vacío. Agregá al menos un producto.");
    return;
  }

  const totalPedido = presupuesto.reduce((s, p) => s + p.precio, 0);
  const productosTexto = presupuesto.map(p => `- ${p.nombre}: $${p.precio}`).join('%0A');

  const mensaje = `Hola, soy ${nombre} (${telefono}).%0AQuiero hacer este pedido:%0A${productosTexto}%0A%0ATotal: $${totalPedido}`;

  const numeroWhatsApp = "3755585749";
  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.location.href = url;
  } else {
    window.open(url, "_blank");
  }

  formulario.reset();
  presupuesto = [];
  actualizarPresupuesto();
  swal("Pedido confirmado");
});
