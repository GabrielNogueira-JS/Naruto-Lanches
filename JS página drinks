const drinks = [
    { name: "Piña Colada", emoji: "🍍", ingredients: ["Rum", "Leite de Coco", "Suco de Abacaxi"] },
    { name: "Margarita", emoji: "🍸", ingredients: ["Tequila", "Licor de Laranja", "Suco de Limão"] },
    { name: "Mojito", emoji: "🌿", ingredients: ["Rum Branco", "Hortelã", "Açúcar", "Suco de Limão", "Água com Gás"] },
    { name: "Caipirinha", emoji: "🍋", ingredients: ["Cachaça", "Açúcar", "Limão"] },
    { name: "Daiquiri", emoji: "🍹", ingredients: ["Rum Branco", "Suco de Limão", "Açúcar"] },
    { name: "Tequila Sunrise", emoji: "🌅", ingredients: ["Tequila", "Suco de Laranja", "Groselha"] },
    { name: "Negroni", emoji: "🍊", ingredients: ["Gin", "Vermute Rosso", "Campari"] },
    { name: "Bloody Mary", emoji: "🍅", ingredients: ["Vodka", "Suco de Tomate", "Molho Inglês", "Pimenta", "Suco de Limão"] },
    { name: "Mai Tai", emoji: "🌴", ingredients: ["Rum", "Licor de Laranja", "Suco de Limão", "Xarope de Amêndoa"] }
];

const precoPorBebida = 20.00;
let drinkCounts = {};

drinks.forEach(drink => {
    drinkCounts[drink.name] = 0;
});

function createDrinkCounters() {
    const container = document.getElementById("drinks-container");
    if (!container) {
        console.error("Erro: Elemento #drinks-container não encontrado.");
        return;
    }
    container.innerHTML = ""; // Limpa antes de adicionar
    
    drinks.forEach(drink => {
        const drinkDiv = document.createElement("div");
        drinkDiv.classList.add("ingredient");

        drinkDiv.innerHTML = `
            <span><strong>${drink.emoji} ${drink.name}</strong> (R$ ${precoPorBebida.toFixed(2)}):</span>
            <p class="ingredients">${drink.ingredients.join(", ")}</p>
            <button class="decrement" data-drink="${drink.name}">-</button>
            <span id="${drink.name}-count">0</span>
            <button class="increment" data-drink="${drink.name}">+</button>
        `;

        container.appendChild(drinkDiv);
    });
    
    attachEventListeners();
}

function attachEventListeners() {
    document.querySelectorAll(".increment").forEach(button => {
        button.addEventListener("click", () => updateCount(button.dataset.drink, 1));
    });
    
    document.querySelectorAll(".decrement").forEach(button => {
        button.addEventListener("click", () => updateCount(button.dataset.drink, -1));
    });
}

function updateCount(drink, change) {
    if (!(drink in drinkCounts)) return;
    
    let newValue = drinkCounts[drink] + change;
    if (newValue < 0) newValue = 0;
    if (newValue > 10) newValue = 10;
    
    drinkCounts[drink] = newValue;
    document.getElementById(`${drink}-count`).textContent = newValue;
    updateTotal();
}

function updateTotal() {
    let totalBebidas = Object.values(drinkCounts).reduce((sum, value) => sum + value, 0); 
    let totalDinheiro = totalBebidas * precoPorBebida;

    document.getElementById("total").textContent = `Total de bebidas: ${totalBebidas}`;
    document.getElementById("valor-total").textContent = `Total em dinheiro: R$ ${totalDinheiro.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", createDrinkCounters);
