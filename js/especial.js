const lanches = [
  { name: "🥓X-Bacon", ingredients: ["Pão de hambúrguer", "Bacon", "Queijo", "Hambúrguer", "Maionese"], price: 15.90 },
  { name: "🥒X-Salada", ingredients: ["Pão de hambúrguer", "Queijo", "Hambúrguer", "Alface", "Tomate", "Maionese"], price: 13.50 },
  { name: "🍱X-Tudo", ingredients: ["Pão de hambúrguer", "Hambúrguer", "Queijo", "Presunto", "Bacon", "Ovo", "Alface", "Tomate", "Maionese"], price: 18.00 },
  { name: "🐔X-Frango", ingredients: ["Pão de hambúrguer", "Frango desfiado", "Queijo", "Alface", "Tomate", "Maionese"], price: 14.50 },
  { name: "🫑X-Calabresa", ingredients: ["Pão de hambúrguer", "Calabresa", "Queijo", "Tomate", "Maionese"], price: 16.00 },
  { name: "🍳X-Egg", ingredients: ["Pão de hambúrguer", "Ovo", "Queijo", "Hambúrguer", "Maionese"], price: 14.00 },
  { name: "🍖X-Picanha", ingredients: ["Pão de hambúrguer", "Picanha", "Queijo", "Alface", "Tomate", "Maionese"], price: 19.90 },
  { name: "🌱X-Vegano", ingredients: ["Pão integral", "Hambúrguer de soja", "Queijo vegano", "Alface", "Tomate", "Maionese vegana"], price: 17.50 }
];

let lancheCounts = {};
let precoPorLanche = {};

// Inicializa contadores e tabela de preços
function initLanches() {
  lanches.forEach(lanche => {
    lancheCounts[lanche.name] = 0;
    precoPorLanche[lanche.name] = lanche.price;
  });
}

// Gera o HTML de cada lanche e insere no container
function createLancheCounters() {
  const container = document.getElementById("lanches-container");
  container.innerHTML = ""; // limpa antes de renderizar

  lanches.forEach(lanche => {
    const div = document.createElement("div");
    div.classList.add("ingredient");
    div.innerHTML = `
      <span><strong>${lanche.name}</strong> (R$ ${lanche.price.toFixed(2)}):</span>
      <p class="ingredients">${lanche.ingredients.join(", ")}</p>
      <div class="buttons">
        <button class="decrement" onclick="updateCount('${lanche.name}', -1)">-</button>
        <span id="${lanche.name}-count">0</span>
        <button class="increment" onclick="updateCount('${lanche.name}', 1)">+</button>
      </div>
    `;
    container.appendChild(div);
  });

  updateTotal();
}

// Ajusta a quantidade de um lanche
function updateCount(lanche, change) {
  let newValue = lancheCounts[lanche] + change;
  if (newValue < 0) newValue = 0;
  if (newValue > 10) newValue = 10;
  lancheCounts[lanche] = newValue;
  document.getElementById(`${lanche}-count`).textContent = newValue;
  updateTotal();
}

// Atualiza totais exibidos
function updateTotal() {
  const totalLanches = Object.values(lancheCounts).reduce((sum, v) => sum + v, 0);
  const totalDinheiro = Object.keys(lancheCounts)
    .reduce((sum, lanche) => sum + (lancheCounts[lanche] * precoPorLanche[lanche]), 0);

  document.getElementById("total").textContent       = `Total de lanches: ${totalLanches}`;
  document.getElementById("valor-total").textContent = `Total em dinheiro: R$ ${totalDinheiro.toFixed(2)}`;
}

// Espera o DOM e inicializa tudo
document.addEventListener("DOMContentLoaded", () => {
  initLanches();
  createLancheCounters();
});

