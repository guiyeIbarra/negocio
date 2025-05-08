

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyC4ryvVdLvpP8pFThyIuwILGVzZzH4YCi4",
    authDomain: "iris-regalos.firebaseapp.com",
    projectId: "iris-regalos",
    storageBucket: "iris-regalos.firebasestorage.app",
    messagingSenderId: "237353631928",
    appId: "1:237353631928:web:a66d26a08bc307b176744d",
    measurementId: "G-J499EWH4ML"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Mostrar productos desde Firestore
async function cargarProductos() {
  const snapshot = await getDocs(collection(db, "productos"));
  const productos = [];
  snapshot.forEach(doc => {
    productos.push({ id: doc.id, ...doc.data() });
  });
  renderProductos(productos); // Usa tu función para mostrar en pantalla
}
window.cargarProductos = cargarProductos;

// Login del administrador
window.loginAdmin = function () {
  const email = document.getElementById("admin-email").value;
  const pass = document.getElementById("admin-pass").value;
  signInWithEmailAndPassword(auth, email, pass)
    .then(() => {
      document.getElementById("admin-panel").classList.remove("oculto");
    })
    .catch(() => alert("Credenciales incorrectas"));
};

// Agregar producto nuevo
document.getElementById("form-agregar-producto").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nuevo-nombre").value;
  const precio = parseFloat(document.getElementById("nuevo-precio").value);
  const imagen = document.getElementById("nueva-imagen").value;

  await addDoc(collection(db, "productos"), { nombre, precio, imagen });
  alert("Producto agregado");
  e.target.reset();
  cargarProductos(); // recargar lista
});

// Cargar productos al iniciar
cargarProductos();

/*
// Mostrar productos al cargar la página
async function cargarProductos() {
    const snapshot = await getDocs(collection(db, "productos"));
    const productos = [];
    snapshot.forEach(doc => {
      productos.push({ id: doc.id, ...doc.data() });
    });
    renderProductos(productos);
  }
  window.cargarProductos = cargarProductos;
  
  // Renderizar productos en la web
  function renderProductos(productos) {
    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";
  
    productos.forEach(producto => {
      const div = document.createElement("div");
      div.classList.add("producto");
  
      div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button onclick="agregarAlPresupuesto('${producto.id}', '${producto.nombre}', ${producto.precio})">
          Agregar
        </button>
      `;
  
      contenedor.appendChild(div);
    });
  }
  

  // Importar Firebase desde CDN (si no está en tu HTML)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// 🔐 Tu configuración de Firebase

const firebaseConfig = {
  apiKey: "AIzaSyC4ryvVdLvpP8pFThyIuwILGVzZzH4YCi4",
  authDomain: "iris-regalos.firebaseapp.com",
  projectId: "iris-regalos",
  storageBucket: "iris-regalos.firebasestorage.app",
  messagingSenderId: "237353631928",
  appId: "1:237353631928:web:a66d26a08bc307b176744d",
  measurementId: "G-J499EWH4ML"
};
// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Función para cargar los productos desde Firestore
async function cargarProductos() {
  const snapshot = await getDocs(collection(db, "productos"));
  const productos = [];
  snapshot.forEach(doc => {
    productos.push({ id: doc.id, ...doc.data() });
  });
  renderProductos(productos);
}

// ✅ Función para mostrar los productos en la página
function renderProductos(productos) {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";

  productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <button onclick="agregarAlPresupuesto('${producto.id}', '${producto.nombre}', ${producto.precio})">
        Agregar
      </button>
    `;

    contenedor.appendChild(div);
  });
}

// 🔁 Ejecutar al cargar la página
cargarProductos();

*/
