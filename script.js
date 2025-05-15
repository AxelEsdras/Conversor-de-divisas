
import { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './firebaseConfig.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.7.3/+esm';

function isValidEmail(email) {
  if (!email.includes('@')) {
    Swal.fire("Error", "El correo debe contener un símbolo @", "error");
    return false;
  }

  const parts = email.split('@');
  if (parts.length !== 2 || !parts[1]) {
    Swal.fire("Error", "Formato inválido del correo después del @", "error");
    return false;
  }

  const domain = parts[1];
  if (!domain.includes('.')) {
    Swal.fire("Error", "El correo debe contener una extensión como .com, .mx, etc.", "error");
    return false;
  }

  const extension = domain.split('.').pop();
  const validExtensions = ['com', 'mx', 'es', 'net', 'org'];
  if (!validExtensions.includes(extension.toLowerCase())) {
    Swal.fire("Error", `Extensión inválida: .${extension}`, "error");
    return false;
  }

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|mx|es|net|org)$/;
  if (!regex.test(email)) {
    Swal.fire("Error", "Formato de correo inválido", "error");
    return false;
  }

  return true;
}

function isValidPassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?_+=-]).{8,}$/;
  if (!regex.test(password)) {
    Swal.fire("Error", "Contraseña inválida. Debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.", "error");
    return false;
  }
  return true;
}

// ================= REGISTRO =================

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!isValidEmail(email) || !isValidPassword(password)) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: email,
        role: "user",
      });

      Swal.fire("¡Éxito!", "¡Registro exitoso!", "success");
    } catch (error) {
      Swal.fire("Error", "Error al registrar: " + error.message, "error");
    }
  });
}


// ================= LOGIN =================

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Por favor, completa ambos campos.",
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "home.html";
      });
    } catch (error) {
      let errorMessage = "Usuario o contraseña incorrectos";
      if (error.code === "auth/user-not-found") {
        errorMessage = "El correo electrónico no está registrado.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "La contraseña es incorrecta.";
      }

      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: errorMessage,
      });
    }
  });
}


// ================= CONVERSOR DE MONEDAS =================

export const exchangeRates = {
  MXN: { USD: 0.0499, CAD: 0.079, EUR: 0.053, GBP: 0.045, JPY: 8.56 },
  USD: { MXN: 20.05, CAD: 1.36, EUR: 0.93, GBP: 0.79, JPY: 151 },
  CAD: { MXN: 14.74, USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 111 },
  EUR: { MXN: 21.54, USD: 1.07, CAD: 1.47, GBP: 0.85, JPY: 162 },
  GBP: { MXN: 25.23, USD: 1.26, CAD: 1.72, EUR: 1.18, JPY: 190 },
  JPY: { MXN: 0.13, USD: 0.0066, CAD: 0.0090, EUR: 0.0061, GBP: 0.0053 }
};

const convertForm = document.getElementById("convertForm");
if (convertForm) {
  convertForm.addEventListener("submit", (e) => {
    e.preventDefault();
    convertCurrency();
  });
}

function convertCurrency() {
  const amount = parseFloat(document.getElementById("amount").value);
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;
  const resultDiv = document.getElementById("result");

  if (isNaN(amount)) {
    Swal.fire("Error", "Por favor, introduce una cantidad válida.", "error");
    return;
  }

  if (from === to) {
    Swal.fire("Error", "Selecciona monedas diferentes.", "error");
    return;
  }

  const rate = exchangeRates[from][to];
  const result = (amount * rate).toFixed(2);
  resultDiv.textContent = `${amount} ${from} = ${result} ${to}`;
}

// ========== FUNCIONES PARA TESTS UNITARIOS ==========

function mxnToUsd(amount) { return +(amount * exchangeRates.MXN.USD).toFixed(2); }
function usdToMxn(amount) { return +(amount * exchangeRates.USD.MXN).toFixed(2); }
function eurToGbp(amount) { return +(amount * exchangeRates.EUR.GBP).toFixed(2); }
function jpyToCad(amount) { return +(amount * exchangeRates.JPY.CAD).toFixed(2); }
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await auth.signOut();
      Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        text: "Has cerrado sesión correctamente.",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.href = "index.html";
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cerrar sesión",
        text: error.message,
      });
    }
  });
}


module.exports = {
  isValidEmail,
  isValidPassword,
  mxnToUsd,
  usdToMxn,
  eurToGbp,
  jpyToCad,
  jpyToMxn,
  cadToEur
};


