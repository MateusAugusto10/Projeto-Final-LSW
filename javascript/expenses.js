// expenses.js

// Adicionar despesa
function addExpense() {
    const nameInput = document.getElementById("expenseName");
    const amountInput = document.getElementById("expenseAmount");
    const categoryInput = document.getElementById("expenseCategory");

    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value) || 0;
    const category = categoryInput.value;

    if (!name || amount <= 0 || !category) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const date = new Date();  // Obter a data atual

    const expense = { 
        name, 
        amount, 
        category, 
        date: date.toISOString() // Armazenar a data no formato ISO
    };

    expenses.push(expense);
    currentUser.expenses = expenses;
    saveUserData();
    updateExpenses();

    // Limpar o formulário após adicionar a despesa
    nameInput.value = "";
    amountInput.value = "";
    categoryInput.value = "";
}

// Atualizar lista de despesas
function updateExpenses() {
    const expensesList = document.getElementById("expensesList");
    expensesList.innerHTML = "";

    let total = 0;

    expenses.forEach((expense, index) => {
        total += expense.amount;

        const expenseItem = document.createElement("div");
        expenseItem.classList.add("expense");
        expenseItem.innerHTML = `
            <span>${expense.name} - R$ ${expense.amount.toFixed(2)} (${expense.category})</span>
            <button onclick="removeExpense(${index})">X</button>
        `;
        expensesList.appendChild(expenseItem);
    });

    document.getElementById("totalAmount").textContent = total.toFixed(2);
    document.getElementById("percentage").textContent = currentUser.income
        ? `(${((total / currentUser.income) * 100).toFixed(2)}% da renda)`
        : "";
}

// Remover despesa
function removeExpense(index) {
    expenses.splice(index, 1);
    currentUser.expenses = expenses;
    saveUserData();
    updateExpenses();
}
