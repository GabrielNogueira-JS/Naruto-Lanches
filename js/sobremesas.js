const dessertCounts = {}; 
const precoPorSobremesa = {}; 

const menu = [
     
    { name: "🍰 Bolo de Chocolate - Chakra do Anoitecer", ingredients: ["3 Ovos", "Açúcar", "Leite", "Óleo", "Trigo", "Fermento", "200gr Diamante Negro", "Leite Moça", "Manteiga", "Creme de leite"], price: 22.50 },
    { name: "🍨 Taça Colegial - Equipe 7", ingredients: ["Duas bolas de sorvete sabor creme", "Duas cerejas ao topo", "Calda de morango", "Confetes"], price: 15.90 },
    { name: "🍮 Pudim - Técnica Secreta do Clã Nara", ingredients: ["Leite condensado", "Licor de doce de leite", "Açúcar", "Leite", "Leite em pó"], price: 12.50 },
    { name: "🥤 Milk-Shake - Onda de Chakra Rosa", ingredients: ["Leite", "Morango", "Açúcar", "Essência de morango", "Canudos de morango"], price: 18.00 },
    { name: "🧁 Cupcake - Estilo Sakura Blossom", ingredients: ["Bolo de trigo", "Açúcar", "Limão", "Calda de morango", "Confetes"], price: 10.90 },
    { name: "🥐 Croissant - Golpe Sombrio do Uchiha", ingredients: ["Massa folhada", "Chocolate ao leite derretido", "Calda"], price: 8.50 },
    { name: "🦄 Taça Infantil Unicórnio - Invocação de Gamakichi", ingredients: ["Uma bola de sorvete sabor morango", "Calda de amora", "Unicórnio de pasta americana", "Fini minhocas cítricas", "MM’s variados"], price: 20.00 },
    { name: "🍫 Petit Gateau - Jutsu do Dragão Negro", ingredients: ["Uma bola de sorvete de creme", "Mini bolo de chocolate recheado", "Calda de chocolate"], price: 19.90 },
    { name: "🍩 Sonho - Sonho do Tsukuyomi Infinito", ingredients: ["Pão doce", "Leite condensado", "Açúcar refinado polvilhado", "Canela"], price: 7.00 },
    { name: "☕ Café - Chakra da Madrugada", ingredients: ["Selecionados grãos de Jamaica Blue Mountain Coffee (300ml)", "Açúcar", "Leite SemiDesnatado"], price: 7.50 },
    { name: "🍰 Bolo de Morango - Chakra do Amanhecer", ingredients: ["3 Ovos", "Açúcar", "Leite", "Óleo", "Trigo", "Fermento", "200gr Morango", "Leite Moça", "Manteiga", "Creme de leite"], price: 22.00 }
];

function createDessertCounters() {
    const leftContainer = document.getElementById("left-desserts");
    const rightContainer = document.getElementById("right-desserts");

    menu.forEach((sobremesa, index) => {
        dessertCounts[sobremesa.name] = 0;
        precoPorSobremesa[sobremesa.name] = sobremesa.price;

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        const ingredientes = sobremesa.ingredients;
        const preco = precoPorSobremesa[sobremesa.name];
        
        // Criando o div para mostrar o erro
        const errorMessageDiv = document.createElement("div");
        errorMessageDiv.id = `${sobremesa.name}-error`;
        errorMessageDiv.classList.add("error-message");

        itemDiv.innerHTML = `
            <span><strong>${sobremesa.name}</strong> (R$ ${preco.toFixed(2)}):</span>
            <p class="ingredients">${ingredientes.join(", ")}</p>
            <div class="buttons">
                <button class="decrement" onclick="updateCount('${sobremesa.name}', -1)">-</button>
                <span id="${sobremesa.name}-count">0</span>
                <button class="increment" onclick="updateCount('${sobremesa.name}', 1)">+</button>
            </div>
        `;

        // Adicionando a div de erro ao itemDiv
        itemDiv.appendChild(errorMessageDiv);

        // Colocando a sobremesa no container correspondente (esquerdo ou direito)
        if (index % 2 === 0) {
            leftContainer.appendChild(itemDiv);
        } else {
            rightContainer.appendChild(itemDiv);
        }
    });
}

function updateCount(sobremesa, change) {
    const errorMessageDiv = document.getElementById(`${sobremesa}-error`);

    try {
        let newValue = dessertCounts[sobremesa] + change;

        if (newValue < 0) {
            return;
        }

        if (newValue > 10) {
            alert("Limite por mesa atingido!"); // Alerta amigável, direto ao ponto
            throw new Error();
        }

        dessertCounts[sobremesa] = newValue;
        document.getElementById(`${sobremesa}-count`).textContent = newValue;
        updateTotal();
        errorMessageDiv.textContent = ''; // Limpa mensagens anteriores, mas não exibe nada no erro
    } catch (error) {
        console.error(error.message);
        // Aqui não atualizamos a mensagem de erro para o item
    }
}

function updateTotal() {
    let totalSobremesas = 0;
    let totalDinheiro = 0;

    for (const sobremesa in dessertCounts) {
        totalSobremesas += dessertCounts[sobremesa];
        totalDinheiro += dessertCounts[sobremesa] * precoPorSobremesa[sobremesa];
    }

    document.getElementById("total").textContent = `Total de sobremesas: ${totalSobremesas}`;
    document.getElementById("valor-total").textContent = `Total em dinheiro: R$ ${totalDinheiro.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", createDessertCounters);
