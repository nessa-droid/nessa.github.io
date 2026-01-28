const registros = [];
let logueado = false; // Control de sesión

// Espera a que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {

    // Mostrar inicio al cargar
    showScreen('start-screen');

    // ======================
    // LOGIN
    // ======================
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if(username === "Usuario" && password === "123456789") {
            logueado = true; // Ahora el usuario puede acceder al formulario
            showScreen('form-screen');
        }
    });

    // ======================
    // REGISTRO
    // ======================
    const regForm = document.getElementById('registration-form');
    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value.trim();
        const raza = document.getElementById('raza').value.trim();
        const edad = document.getElementById('edad').value.trim();
        const adulto = document.getElementById('adulto').value.trim();
        const telefono = document.getElementById('telefono').value.trim();

        if(!nombre || !raza || !edad || !adulto || !telefono) return;

        registros.push({
            nombre, raza, edad, adulto, telefono,
            fecha: new Date().toLocaleString()
        });

        regForm.reset();
    });

    // ======================
    // MODAL DE CONTRASEÑA
    // ======================
    const passwordModal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('password-input');
    const errorMessage = document.getElementById('error-message');

    document.getElementById('password-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if(passwordInput.value === "Petcare") {
            closePasswordModal();
            showScreen('records-screen');
        } else {
            errorMessage.style.display = 'block';
        }
    });

    passwordInput.addEventListener('input', () => {
        errorMessage.style.display = 'none';
    });
});

// ==============================
// FUNCIONES GLOBALES
// ==============================

// Mostrar pantalla y ocultar otras
function showScreen(screenId) {

    // ======================
    // BLOQUEO FORMULARIO SI NO HAY LOGIN
    // ======================
    if(screenId === 'form-screen' && !logueado) return;

    // Oculta todas las pantallas
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));

    // Muestra la pantalla seleccionada
    document.getElementById(screenId).classList.add('active');

    // ======================
    // MOSTRAR U OCULTAR BLOQUE DE INICIO
    // ======================
    const startScreen = document.getElementById('start-screen');
    const loginSection = document.getElementById('login-section');

    if(screenId === 'start-screen') {
        startScreen.style.display = 'block';
        loginSection.style.display = 'flex';
    } else {
        startScreen.style.display = 'none';
        loginSection.style.display = 'none';
    }

    // ======================
    // CARGAR REGISTROS SI ESTAMOS EN ESA PANTALLA
    // ======================
    if(screenId === 'records-screen') cargarRegistros();
}

// ==============================
// MODAL CONTRASEÑA
// ==============================
function showPasswordPrompt() {
    document.getElementById('password-modal').style.display = 'flex';
    document.getElementById('password-input').value = '';
    document.getElementById('error-message').style.display = 'none';
}

function closePasswordModal() {
    document.getElementById('password-modal').style.display = 'none';
    document.getElementById('password-input').value = '';
    document.getElementById('error-message').style.display = 'none';
}

// ==============================
// CARGAR REGISTROS
// ==============================
function cargarRegistros() {
    const lista = document.getElementById('records-list');
    lista.innerHTML = '';

    registros.forEach((r,i) => {
        const div = document.createElement('div');
        div.className = 'registro';
        div.innerHTML = `
            <h4>Registro #${i+1}</h4>
            <p class="fecha">${r.fecha}</p>
            <div><strong>Nombre:</strong> ${r.nombre}</div>
            <div><strong>Raza:</strong> ${r.raza}</div>
            <div><strong>Edad:</strong> ${r.edad}</div>
            <div><strong>Adulto Responsable:</strong> ${r.adulto}</div>
            <div><strong>Teléfono:</strong> ${r.telefono}</div>
            <hr>
        `;
        lista.appendChild(div);
    });
}

// ==============================
// BOTONES MENÚ
// ==============================
function showDiagnostico() {
    showScreen('diagnostico-screen');
}

function showTeachableMachine() {
    window.open("https://oetz6z0enunfj3vkxicpha.on.drv.tw/PetCare%20-%20copia/TC.html", "_blank");
}
