 const dessertCounts = {}; 
const precoPorSobremesa = {}; 

const menu = {
    "🍨 Taça Colegial - Equipe 7": ["Duas bolas de sorvete sabor creme", "Duas cerejas ao topo", "Calda de morango", "Confetes"],
    "🍮 Pudim - Técnica Secreta do Clã Nara": ["Leite condensado", "Licor de doce de leite", "Açúcar", "Leite", "Leite em pó"],
    "🥤 Milk-Shake - Onda de Chakra Rosa": ["Leite", "Morango", "Açúcar", "Essência de morango", "Canudos de morango"],
    "🧁 Cupcake - Estilo Sakura Blossom": ["Bolo de trigo", "Açúcar", "Limão", "Calda de morango", "Confetes"],
    "🥐 Croissant - Golpe Sombrio do Uchiha": ["Massa folhada", "Chocolate ao leite derretido", "Calda"],
    "🦄 Taça Infantil Unicórnio - Invocação de Gamakichi": ["Uma bola de sorvete sabor morango", "Calda de amora", "Unicórnio de pasta americana", "Fini minhocas cítricas", "MM’s variados"],
    "🍫 Petit Gateau - Jutsu do Dragão Negro": ["Uma bola de sorvete de creme", "Mini bolo de chocolate recheado", "Calda de chocolate"],
    "🍩 Sonho - Sonho do Tsukuyomi Infinito": ["Pão doce", "Leite condensado", "Açúcar refinado polvilhado", "Canela"],
    "☕ Café - Chakra da Madrugada": ["Café Árabe (200ml)", "Açúcar"]
};


function gerarPrecoAleatorio() {
    return (Math.random() * (18 - 10) + 10).toFixed(2);
}


function createDessertCounters() {
    const leftContainer = document.getElementById("left-desserts");
    const rightContainer = document.getElementById("right-desserts");

    const sobremesas = Object.keys(menu);
    sobremesas.forEach((sobremesa, index) => {
        dessertCounts[sobremesa] = 0;
        precoPorSobremesa[sobremesa] = parseFloat(gerarPrecoAleatorio());

        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        itemDiv.innerHTML = `
            <span>${sobremesa} - R$ ${precoPorSobremesa[sobremesa].toFixed(2)}</span>
            <button onclick="updateCount('${sobremesa}', -1)">-</button>
            <span id="${sobremesa}-count">0</span>
            <button onclick="updateCount('${sobremesa}', 1)">+</button>
        `;

        
        if (index % 2 === 0) {
            leftContainer.appendChild(itemDiv);
        } else {
            rightContainer.appendChild(itemDiv);
        }
    });
}


function updateCount(sobremesa, change) {
    try {
        let newValue = dessertCounts[sobremesa] + change;
        if (newValue < 0) {
            throw new Error(`Erro: ${sobremesa} não pode ser menor que 0.`);
        }
        if (newValue > 10) {
            throw new Error(`Erro: ${sobremesa} não pode ser maior que 10.`);
        }
        dessertCounts[sobremesa] = newValue;
        document.getElementById(`${sobremesa}-count`).textContent = newValue;
        updateTotal();
    } catch (error) {
        console.error(error.message);
        alert(error.message);
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
