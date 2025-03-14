// user.js

// Exibir interface do aplicativo após login
function showApp() {
    if (!currentUser) return;

    document.getElementById("authContainer").style.display = "none";
    document.getElementById("appContent").style.display = "block";

    document.getElementById("name").textContent = currentUser.name;
    document.getElementById("email").textContent = currentUser.email;
    document.getElementById("username").textContent = currentUser.username;
    
    document.getElementById("income").value = currentUser.income || "";
    expenses = currentUser.expenses || [];
    updateExpenses();
}

// Atualizar a renda
function updateIncome() {
    const newIncome = parseFloat(document.getElementById("income").value) || 0;
    currentUser.income = newIncome;
    saveUserData();
}

// Salvar dados do usuário no localStorage
function saveUserData() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users = users.map(user => (user.username === currentUser.username ? currentUser : user));
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
}

// Logout do usuário
function logout() {
    localStorage.removeItem("currentUser");
    currentUser = null;
    document.getElementById("authContainer").style.display = "block";
    document.getElementById("appContent").style.display = "none";
}

// Verificar se há um usuário logado ao carregar a página
window.onload = function () {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showApp();
    }
};
