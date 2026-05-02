document.addEventListener("DOMContentLoaded", (params) => {
  const expenseForm = document.querySelector("#expense-form");
  const expenseName = document.querySelector("#expense-name");
  const expenseAmount = document.querySelector("#expense-amount");
  const expenseList = document.querySelector("#expense-list");
  const totalAmount = document.querySelector("#total-amount");

  const expense = JSON.parse(localStorage.getItem("expense")) || [];
  renderExpense();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseName.value;
    const amount = expenseAmount.value;
    if (amount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }
    expenseName.value = "";
    expenseAmount.value = "";
    const obj = {
      id: Date.now(),
      name: name,
      amount: amount,
    };
    addExpense(obj);
  });
  function addExpense(obj) {
    expense.push(obj);
    localStorage.setItem("expense", JSON.stringify(expense));
    renderExpense();
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      deleteExpense(e.target.getAttribute("data-id"));
    }
  });

  function renderExpense() {
    expenseList.innerHTML = "";
    expense.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${item.name} - $${parseFloat(item.amount).toFixed(2)}</span><button data-id="${item.id}">Delete</button>`;
      expenseList.appendChild(li);
    });
    expenseCalc();
  }

  function expenseCalc() {
    let total = 0;
    expense.forEach((item) => {
      total += parseInt(item.amount);
    });
    totalAmount.textContent = total.toFixed(2);
  }
  function deleteExpense(id) {
    console.log(id);
    let index = expense.findIndex((item) => item.id === parseInt(id));
    if (index != -1) {
      expense.splice(index, 1);
      localStorage.setItem("expense", JSON.stringify(expense));
      renderExpense();
    }
  }
});
