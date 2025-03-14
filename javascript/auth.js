// auth.js

// Alterna entre formulários de login e registro
function toggleAuthForms() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    }
}

// Registrar novo usuário
function register() {
    const nameInput = document.getElementById("registerName");
    const emailInput = document.getElementById("registerEmail");
    const usernameInput = document.getElementById("registerUsername");
    const passwordInput = document.getElementById("registerPassword");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!name || !email || !username || !password) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.username === username)) {
        alert("Nome de usuário já está em uso!");
        return;
    }

    users.push({ name, email, username, password, income: 0, expenses: [] });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registro bem-sucedido! Faça login para continuar.");

    // Limpar os campos do formulário
    nameInput.value = "";
    emailInput.value = "";
    usernameInput.value = "";
    passwordInput.value = "";

    toggleAuthForms();
}

// Login do usuário
function login() {
    const usernameInput = document.getElementById("loginUsername");
    const passwordInput = document.getElementById("loginPassword");

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        alert("Usuário ou senha inválidos!");
        return;
    }

    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    showApp();

    // Limpar o formulário de login
    usernameInput.value = "";
    passwordInput.value = "";
}
function showApp() {
    // Supondo que o login seja bem-sucedido
    window.location.href = "perfil.html";
}

