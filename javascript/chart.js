// Atualizar lista de despesas e o gráfico
function updateExpenses() {
    const expensesList = document.getElementById("expensesList");
    expensesList.innerHTML = "";

    let total = 0;

    expenses.forEach((expense, index) => {
        total += expense.amount;

        const expenseItem = document.createElement("div");
        expenseItem.classList.add("expense");

        // Criar uma data a partir do valor de 'expense.date' e formatá-la
        const expenseDate = new Date(expense.date);
        const formattedDate = expenseDate.toLocaleDateString('pt-BR') + ' ' + expenseDate.toLocaleTimeString('pt-BR');

        // Corrigir interpolação de strings com crase (template literals)
        expenseItem.innerHTML = `
            <span>${expense.name} - R$ ${expense.amount.toFixed(2)} (${expense.category})</span>
            <span> - ${formattedDate}</span>
            <button onclick="removeExpense(${index})">X</button>
        `;
        expensesList.appendChild(expenseItem);
    });

    document.getElementById("totalAmount").textContent = total.toFixed(2);
    document.getElementById("percentage").textContent = currentUser.income
        ? `${((total / currentUser.income) * 100).toFixed(2)}% da renda`
        : "";

    // Atualizar gráfico de despesas
    updateChart();
}

// Variável global para armazenar o gráfico
let expenseChart = null;

function updateChart() {
    const ctx = document.getElementById("expenseChart").getContext("2d");

    // Agrupar as despesas por categoria
    const categoryTotals = {};
    expenses.forEach(expense => {
        if (categoryTotals[expense.category]) {
            categoryTotals[expense.category] += expense.amount;
        } else {
            categoryTotals[expense.category] = expense.amount;
        }
    });

    const categories = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);

    // Se já houver um gráfico, destruí-lo antes de criar um novo
    if (expenseChart) {
        expenseChart.destroy();
    }

    // Criar um novo gráfico de pizza
    expenseChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: categories,
            datasets: [{
                label: "Despesas por Categoria",
                data: values,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800", "#9C27B0"],
                borderWidth: 1
            }]
        }
    });
}
