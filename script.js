let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);

  if (!desc || isNaN(amount)) {
    alert("Enter valid data");
    return;
  }

  transactions.push({
    id: Date.now(),
    desc,
    amount
  });

  saveAndRender();

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateUI();
}

function updateUI() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  let income = 0;
  let expense = 0;

  let filtered = [...transactions];

  // 🔍 Search
  const search = document.getElementById("search").value.toLowerCase();
  filtered = filtered.filter(t => t.desc.toLowerCase().includes(search));

  // 🎯 Filter
  const filter = document.getElementById("filter").value;
  if (filter === "income") filtered = filtered.filter(t => t.amount > 0);
  if (filter === "expense") filtered = filtered.filter(t => t.amount < 0);

  // 🔄 Sort
  const sort = document.getElementById("sort").value;
  if (sort === "high") filtered.sort((a, b) => b.amount - a.amount);
  if (sort === "low") filtered.sort((a, b) => a.amount - b.amount);

  filtered.forEach(t => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${t.desc} 
      <span>₹${t.amount}</span>
      <button onclick="deleteTransaction(${t.id})">X</button>
    `;

    list.appendChild(li);

    if (t.amount > 0) income += t.amount;
    else expense += t.amount;
  });

  document.getElementById("income").innerText = "₹" + income;
  document.getElementById("expense").innerText = "₹" + Math.abs(expense);
  document.getElementById("balance").innerText = "₹" + (income + expense);
}

updateUI();