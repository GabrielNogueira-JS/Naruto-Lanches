const dessertCounts = {};
const precoPorSobremesa = {};
const container = document.querySelector("#menu");

const menu = [
  {
    nome: "🍰 Bolo de Chocolate – Chakra do Anoitecer",
    descricao: "Quatro fatias de bolo macio sabor chocolate com diamante negro, creme de leite, leite condensado da melhor qualidade e uma calda de chocolate temperado.",
    observacao: "Serve até quatro pessoas.",
    preco: 22.50,
    imagem: "../imagens/chococake.jpg"
    

    

  },
  {
    nome: "🍨 Taça Colegial – Equipe 7",
    descricao: "Duas bolas de sorvete sabor creme, cobertas com calda de morango e finalizadas com duas cerejas e confetes coloridos.",
    observacao: "Serve até duas pessoas.",
    preco: 15.90,
     imagem: "imagens/taca-colegial.jpg"
  },
  {
    nome: "🍮 Pudim – Técnica Secreta do Clã Nara",
    descricao: "Pudim cremoso de doce de leite com calda de caramelo macio e textura aveludada.",
    observacao: "Serve até três pessoas.",
    preco: 12.50,
     imagem: "imagens/pudim.jpg"
  },
  {
    nome: "🥤 Milk-Shake – Onda de Chakra Rosa",
    descricao: "Milk-shake cremoso de morango com essência natural e chantilly por cima.",
    observacao: "Serve uma pessoa.",
    preco: 18.00,
     imagem: "imagens/milkshake.jpg"
  },
  {
    nome: "🧁 Cupcake – Estilo Sakura Blossom",
    descricao: "Cupcake de limão com cobertura de calda de morango e confetes coloridos.",
    observacao: "Serve uma pessoa.",
    preco: 10.90,
     imagem: "imagens/cupcake.jpg"
  },
  {
    nome: "🥐 Croissant – Golpe Sombrio do Uchiha",
    descricao: "Croissant folhado recheado com chocolate ao leite derretido e pincelado com calda especial.",
    observacao: "Serve uma pessoa.",
    preco: 8.50,
    imagem: "imagens/croissant.jpg"
  },
  {
    nome: "🦄 Taça Infantil Unicórnio – Invocação de Gamakichi",
    descricao: "Sorvete de morango com calda de amora, decoração de pasta americana em forma de unicórnio e MM's.",
    observacao: "Serve até duas crianças.",
    preco: 20.00,
     imagem: "imagens/taca-unicornio.jpg"
  },
  {
    nome: "🍫 Petit Gateau – Jutsu do Dragão Negro",
    descricao: "Bolinhas de massa de chocolate quente com sorvete de creme ao lado e calda quente.",
    observacao: "Serve uma pessoa.",
    preco: 19.90,
     imagem: "imagens/petitgateau.jpg"
  },
  {
    nome: "🍩 Sonho – Sonho do Tsukuyomi Infinito",
    descricao: "Sonho frito recheado com leite condensado e polvilhado com açúcar e canela.",
    observacao: "Serve uma pessoa.",
    preco: 7.00,
     imagem: "imagens/sonho.jpg"
  },
  {
    nome: "☕ Café – Chakra da Madrugada",
    descricao: "Café Jamaica Blue Mountain, adoçado na medida com leite semidesnatado.",
    observacao: "Serve uma pessoa.",
    preco: 7.50,
     imagem: "imagens/cafe.jpg"
  },
  {
    nome: "🍰 Bolo de Morango – Chakra do Amanhecer",
    descricao: "Bolo de morango macio com cobertura de morangos frescos e creme chantilly.",
    observacao: "Serve até quatro pessoas.",
    preco: 22.00,
     imagem: "imagens/bolo-morango.jpg"
  }
];

menu.forEach((item, index) => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${item.imagem}" alt="${item.nome}">
    <h3>${item.nome}</h3>
    <p>${item.descricao}</p>
    <p>Preço: R$ ${item.preco.toFixed(2)}</p>

    <label for="obs-${index}">Remover algo?</label>
    <input type="text" id="obs-${index}" placeholder="Ex: sem calda">

    <button class="add-btn" data-index="${index}">Adicionar</button>
  `;

  container.appendChild(card);
});
const pedido = [];

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("add-btn")) {
    const index = e.target.dataset.index;
    const item = menu[index];
    const observacao = document.querySelector(`#obs-${index}`).value;

    pedido.push({
      nome: item.nome,
      preco: item.preco,
      observacao: observacao
    });
    e.target.disabled = true;
    e.target.textContent = "Adicionado ✅";
setTimeout(() => {
  e.target.textContent = "Adicionar";
}, 1000);
    e.target.disabled = false;



    console.log(pedido); // ou exibe no carrinho
  }
});

function createDessertCounters() {
  const leftContainer  = document.getElementById("left-desserts");
  const rightContainer = document.getElementById("right-desserts");

  menu.forEach((item, index) => {
    dessertCounts[item.nome]     = 0;
    precoPorSobremesa[item.nome] = item.preco;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("card");

    const errorMessageDiv = document.createElement("div");
    errorMessageDiv.id = `${item.nome}-error`;
    errorMessageDiv.classList.add("error-message");

    itemDiv.innerHTML = `
      <div class="card-left">
        <h4 class="item-name"><strong>${item.nome}</strong></h4>
        <p class="desc">${item.descricao}</p>
        <p class="observacao">${item.observacao}</p>
        <p class="price"><strong>R$ ${item.preco.toFixed(2)}</strong></p>
        <div class="buttons">
          <button class="decrement" onclick="updateCount('${item.nome}', -1)">-</button>
          <span id="${item.nome}-count">0</span>
          <button class="increment" onclick="updateCount('${item.nome}', 1)">+</button>
        </div>
      </div>
      <div class="card-right">
        <!-- <img src="${item.imagem}" alt="${item.nome}" /> -->
      </div>
    `;

    itemDiv.appendChild(errorMessageDiv);

    if (index % 2 === 0) {
      leftContainer.appendChild(itemDiv);
    } else {
      rightContainer.appendChild(itemDiv);
    }
  });
}

function updateCount(sobremesa, change) {
  const errorDiv = document.getElementById(`${sobremesa}-error`);
  try {
    let newValue = dessertCounts[sobremesa] + change;
    if (newValue < 0) return;
    if (newValue > 10) {
      alert("Limite por mesa atingido!");
      throw new Error("Limite atingido");
    }
    dessertCounts[sobremesa] = newValue;
    document.getElementById(`${sobremesa}-count`).textContent = newValue;
    updateTotal();
    errorDiv.textContent = "";
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
//fazer isso com imagen tambem expandir img
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("desc")) {
    e.target.classList.toggle("expandida");
  }
});

class Item { 
  constructor ({descricao, preco, nome, observacao, imagem}) {
  this.descricao = descricao;
  this.preco = preco;
 this.nome = nome;
  this.observacao = observacao;
  this.imagem = imagem;
 }
}
