const dessertCounts = {};
const precoPorSobremesa = {};

function createDessertCounters() {
  const leftContainer = document.getElementById("left-desserts");
  const rightContainer = document.getElementById("right-desserts");

  menu.forEach((item, index) => {
    dessertCounts[item.nome] = 0;
    precoPorSobremesa[item.nome] = item.preco;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("card");

    const errorMessageDiv = document.createElement("div");
    errorMessageDiv.id = `${item.nome}-error`;
    errorMessageDiv.classList.add("error-message");

    itemDiv.innerHTML = `
      <div class="card-left">
        <h4 class="item-name"><strong>${item.nome}</strong></h4>
        <p class="desc"><strong>${item.descricao}</strong></p>
        <p class="observacao">${item.observacao}</p>
        <p class="price"><strong>R$ ${item.preco.toFixed(2)}</strong></p>
        <div class="buttons">
          <button class="decrement" onclick="updateCount('${item.nome}', -1)">-</button>
          <span id="${item.nome}-count">0</span>
          <button class="increment" onclick="updateCount('${item.nome}', 1)">+</button>
        </div>
      </div>
      <div class="card-right">
        <img src="${item.imagem}" alt="${item.nome}">
      </div>
    `;
    itemDiv.appendChild(errorMessageDiv);

    if (index % 2 === 0) leftContainer.appendChild(itemDiv);
    else rightContainer.appendChild(itemDiv);
  });
}

function updateCount(sobremesa, change) {
  const errorDiv = document.getElementById(`${sobremesa}-error`);
  try {
    let newValue = dessertCounts[sobremesa] + change;

    if (newValue < 0) {
      errorDiv.textContent = "Você não pode ter menos de 0 sobremesas!";
      return;
    }

    if (newValue > 10) {
      errorDiv.textContent = "Limite por sobremesa atingido!";
      alert("Limite por mesa atingido!");
      return;
    }

    dessertCounts[sobremesa] = newValue;
    document.getElementById(`${sobremesa}-count`).textContent = newValue;
    updateTotal();
    errorDiv.textContent = ""; // Limpa mensagem de erro
  } catch (err) {
    console.error(err.message);
  }
}

function updateTotal() {
  let totalQty = 0, totalMoney = 0;
  for (let nome in dessertCounts) {
    totalQty += dessertCounts[nome];
    totalMoney += dessertCounts[nome] * precoPorSobremesa[nome];
  }
  document.getElementById("total").textContent = `Total de sobremesas: ${totalQty}`;
  document.getElementById("valor-total").textContent = `Total em dinheiro: R$ ${totalMoney.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", createDessertCounters);

class Item {
  constructor({ descricao, preco, nome, observacao, imagem }) {
    this.descricao = descricao;
    this.preco = preco;
    this.nome = nome;
    this.observacao = observacao;
    this.imagem = imagem;
  }
}
