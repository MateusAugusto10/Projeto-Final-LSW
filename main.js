// main.js

// Variáveis globais
let currentUser = null;
let expenses = [];
let income = 0;
let userData = {};

// Verificar se há um usuário logado ao carregar a página
window.onload = function () {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showApp();
    }
};
