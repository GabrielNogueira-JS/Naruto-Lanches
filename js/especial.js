const lanches = [
  { name: "🥓X-Bacon", ingredients: ["Pão de hambúrguer", "Bacon", "Queijo", "Hambúrguer", "Maionese"] },
  { name: "🥒X-Salada", ingredients: ["Pão de hambúrguer", "Queijo", "Hambúrguer", "Alface", "Tomate", "Maionese"] },
  { name: "🍱X-Tudo", ingredients: ["Pão de hambúrguer", "Hambúrguer", "Queijo", "Presunto", "Bacon", "Ovo", "Alface", "Tomate", "Maionese"] },
  { name: "🐔X-Frango", ingredients: ["Pão de hambúrguer", "Frango desfiado", "Queijo", "Alface", "Tomate", "Maionese"] },
  { name: "🫑X-Calabresa", ingredients: ["Pão de hambúrguer", "Calabresa", "Queijo", "Tomate", "Maionese"] },
  { name: "🍳X-Egg", ingredients: ["Pão de hambúrguer", "Ovo", "Queijo", "Hambúrguer", "Maionese"] },
  { name: "🍖X-Picanha", ingredients: ["Pão de hambúrguer", "Picanha", "Queijo", "Alface", "Tomate", "Maionese"] },
  { name: "🌱X-Vegano", ingredients: ["Pão integral", "Hambúrguer de soja", "Queijo vegano", "Alface", "Tomate", "Maionese vegana"] }
];

// Gera um preço aleatório para cada lanche entre R$15 e R$35
let precoPorLanche = {};
lanches.forEach(lanche => {
  precoPorLanche[lanche.name] = Math.floor(Math.random() * (35 - 15 + 1)) + 15;
});

let lancheCounts = {};
lanches.forEach(lanche => {
  lancheCounts[lanche.name] = 0;
});

function createLancheCounters() {
  const container = document.getElementById("lanches-container");
  container.innerHTML = ""; // Limpa o container
  lanches.forEach(lanche => {
    const lancheDiv = document.createElement("div");
    lancheDiv.classList.add("ingredient");

    lancheDiv.innerHTML = `
      <span><strong>${lanche.name}</strong> (R$ ${precoPorLanche[lanche.name].toFixed(2)}):</span>
      <p class="ingredients">${lanche.ingredients.join(", ")}</p>
      <button class="decrement" onclick="updateCount('${lanche.name}', -1)">-</button>
      <span id="${lanche.name}-count">0</span>
      <button class="increment" onclick="updateCount('${lanche.name}', 1)">+</button>
    `;

    container.appendChild(lancheDiv);
  });
}

function updateCount(lanche, change) {
  let newValue = lancheCounts[lanche] + change;
  if (newValue < 0) newValue = 0;
  if (newValue > 10) newValue = 10;

  lancheCounts[lanche] = newValue;
  document.getElementById(`${lanche}-count`).textContent = newValue;
  updateTotal();
}

function updateTotal() {
  let totalLanches = Object.values(lancheCounts).reduce((sum, value) => sum + value, 0);
  let totalDinheiro = Object.keys(lancheCounts).reduce((sum, lanche) => {
    return sum + (lancheCounts[lanche] * precoPorLanche[lanche]);
  }, 0);

  document.getElementById("total").textContent = `Total de lanches: ${totalLanches}`;
  document.getElementById("valor-total").textContent = `Total em dinheiro: R$ ${totalDinheiro.toFixed(2)}`;
}

// Inicializa os contadores ao carregar a página
createLancheCounters();

