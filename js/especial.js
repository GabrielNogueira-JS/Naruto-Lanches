const lanches = [
  { name: "🥓X-Bacon", ingredients: ["Pão de hambúrguer", "Bacon", "Queijo", "Hambúrguer", "Maionese"], price: 15.90, imagem: '../imagens/bacon.png' },
  { name: "🥒X-Salada", ingredients: ["Pão de hambúrguer", "Queijo", "Hambúrguer", "Alface", "Tomate", "Maionese"], price: 13.50, imagem: '../imagens/bacon.png' },
  { name: "🍱X-Tudo", ingredients: ["Pão de hambúrguer", "Hambúrguer", "Queijo", "Presunto", "Bacon", "Ovo", "Alface", "Tomate", "Maionese"], price: 18.00,  imagem: '../imagens/bacon.png' },
  { name: "🐔X-Frango", ingredients: ["Pão de hambúrguer", "Frango desfiado", "Queijo", "Alface", "Tomate", "Maionese"], price: 14.50, imagem: '../imagens/bacon.png' },
  { name: "🫑X-Calabresa", ingredients: ["Pão de hambúrguer", "Calabresa", "Queijo", "Tomate", "Maionese"], price: 16.00, imagem: '../imagens/bacon.png' },
  { name: "🍳X-Egg", ingredients: ["Pão de hambúrguer", "Ovo", "Queijo", "Hambúrguer", "Maionese"], price: 14.00, imagem: '../imagens/bacon.png' },
  { name: "🍖X-Picanha", ingredients: ["Pão de hambúrguer", "Picanha", "Queijo", "Alface", "Tomate", "Maionese"], price: 19.90,  imagem: '../imagens/bacon.png' },
  { name: "🌱X-Vegano", ingredients: ["Pão integral", "Hambúrguer de soja", "Queijo vegano", "Alface", "Tomate", "Maionese vegana"], price: 17.50, imagem: '../imagens/bacon.png' }
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
  // --- subpágina de detalhe ---
const detailView = document.getElementById('detail-view');

// Exibe o modal de detalhe
function showDetail(idx) {
  const item = lanches[idx];
  detailView.innerHTML = `
    <div class="detail-box">
      <span class="close-hint">✖</span>
      <div class="detail-left">
        <img src="${item.imagem}" alt="${item.name}" class="detail-img">
        <h3>${item.name}</h3>
        <p>${item.ingredients.join(', ')}</p>
        <label for="obs-detail">Observação:</label>
        <input type="text" id="obs-detail" placeholder="Ex: sem maionese">
      </div>
      <div class="detail-right">
        <button id="add-detail">Adicionar</button>
        <button id="remove-detail">Remover</button>
      </div>
    </div>
  `;
  detailView.classList.remove('hidden');

  // fechar no "✖"
  detailView.querySelector('.close-hint').onclick = hideDetail;

  // adicionar ao pedido
  detailView.querySelector('#add-detail').onclick = () => {
    updateCount(item.name, 1);
    hideDetail();
  };

  // remover do pedido
  detailView.querySelector('#remove-detail').onclick = () => {
    updateCount(item.name, -1);
    hideDetail();
  };
}

// Esconde o modal
function hideDetail() {
  detailView.classList.add('hidden');
  detailView.innerHTML = '';
}

// Ao criar cada contador de lanche, também anexamos o evento de abrir/fechar detalhe:
function createLancheCounters() {
  const container = document.getElementById("lanches-container");
  container.innerHTML = "";

  lanches.forEach((lanche, idx) => {
    const div = document.createElement("div");
    div.classList.add("ingredient");
    div.innerHTML = `
      <span><strong>${lanche.name}</strong> (R$ ${lanche.price.toFixed(2)}):</span>
      <p class="ingredients">${lanche.ingredients.join(", ")}</p>
      <div class="buttons">
        <button class="decrement" onclick="updateCount('${lanche.name}', -1)">-</button>
        <span id="${lanche.name}-count">${lancheCounts[lanche.name]}</span>
        <button class="increment" onclick="updateCount('${lanche.name}', 1)">+</button>
      </div>
    `;
    container.appendChild(div);

    // Clique no nome do lanche para abrir detalhe
    div.querySelector('span strong').addEventListener('click', () => {
      if (detailView.classList.contains('hidden')) showDetail(idx);
      else hideDetail();
    });
  });

  updateTotal();
}


// Espera o DOM e inicializa tudo
document.addEventListener("DOMContentLoaded", () => {
  initLanches();
  createLancheCounters();
});

