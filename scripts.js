const productos = [
    { id: 1, nombre: "Aros", precio: 120, imagen: "asset/image/aros.jpg" },
    { id: 2, nombre: "Pulseras", precio: 80, imagen: "asset/image/pulseras.jpg" },
    { id: 3, nombre: "Dijes", precio: 150, imagen: "asset/image/dijes.jpg" },
    { id: 4, nombre: "Kit de reventa", precio: 800, imagen: "asset/image/kit.jpg" }
  ];
  
  let presupuesto = [];
  
  const contenedor = document.getElementById("productos");
  const listaPresupuesto = document.getElementById("lista-presupuesto");
  const total = document.getElementById("total");
  const formulario = document.getElementById("formulario-pedido");
  
  productos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <h3>${prod.nombre}</h3>
      <p>Precio: $${prod.precio}</p>
      <button onclick="agregarAlPresupuesto(${prod.id})">Agregar</button>
    `;
    contenedor.appendChild(div);
  });
  
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
  
    total.textContent = totalPrecio;
  }
  
  formulario.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
  
    if (presupuesto.length === 0) {
      alert("El presupuesto está vacío. Agregá al menos un producto.");
      return;
    }
  
    const totalPedido = presupuesto.reduce((s, p) => s + p.precio, 0);
    const productosTexto = presupuesto.map(p => `- ${p.nombre}: $${p.precio}`).join('%0A');
  
    const mensaje = `Hola, soy ${nombre} (${correo}).%0AQuiero hacer este pedido:%0A${productosTexto}%0A%0ATotal: $${totalPedido}`;
  
    // 👉 Reemplazá este número por el tuyo
    const numeroWhatsApp = "3755585749";
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
  
    // 📱 Detectar si es móvil
    const esMovil = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  
    if (esMovil) {
      // En móvil: redirigir directamente a WhatsApp
      window.location.href = url;
    } else {
      // En escritorio: abrir nueva pestaña
      window.open(url, "_blank");
    }
  
    // Resetear formulario y presupuesto
    formulario.reset();
    presupuesto = [];
    actualizarPresupuesto();
  });
  