const menuItems = [
    { name: "🍜 Lámen Ichiraku - Ramen do Naruto", ingredients: ["Macarrão", "Caldo de Porco", "Ovo", "Cebolinha", "Chashu"], price: Math.floor(Math.random() * 46) + 25 },
    { name: "🍙 Bola de Arroz Onigiri - Missão Rápida", ingredients: ["Arroz Japonês", "Alga Nori", "Recheio Variado"], price: Math.floor(Math.random() * 46) + 25 },
    { name: "🍢 Dango - Doce Favorito dos Ninjas", ingredients: ["Massa de Arroz", "Molho de Soja Doce"], price: Math.floor(Math.random() * 25) + 25 },
    { name: "🍛 Curry Japonês - Chakra Picante", ingredients: ["Carne", "Cenoura", "Batata", "Arroz", "Molho Curry"], price: Math.floor(Math.random() * 46) + 25 },
    { name: "🐙 Takoyaki - Jutsu do Polvo Flamejante", ingredients: ["Massa", "Polvo", "Molho Takoyaki", "Cebolinha", "Katsuobushi"], price: Math.floor(Math.random() * 46) + 25 },
    { name: "🦐 Tempurá - Defesa Perfeita do Byakugan", ingredients: ["Camarão", "Legumes", "Massa Crocante"], price: Math.floor(Math.random() * 19) + 25 },
    { name: "🍢 Churrasquinho Yakitori - Espetos de Chakra", ingredients: ["Frango", "Molho Tarê"], price: Math.floor(Math.random() * 19) + 25 },
    { name: "🥩 Churrasquinho Uchiha - Espetos do Sasuke", ingredients: ["Fraudinha", "Molho Shoyu","Maionese de Alho" ], price: Math.floor(Math.random() * 19) + 25 },
    { name: "🐟 Sashimi - Técnica do Estilo Água", ingredients: ["Peixe Cru", "Shoyu", "Gengibre"], price: Math.floor(Math.random() * 25) + 25 },
    { name: "🍗 Karaage (Frango Frito Japonês) - Golpe Rápido de Taijutsu", ingredients: ["Frango", "Molho de Soja", "Gengibre", "Farinha de Batata"], price: Math.floor(Math.random() * 46) + 25 },
    { name: "🥞 Okonomiyaki - Jutsu Secreto de Osaka", ingredients: ["Massa", "Repolho", "Carne de Porco", "Molho Okonomiyaki"], price: Math.floor(Math.random() * 46) + 25 },
    { name: "🌱 Edamame (Soja Cozida) - Chakra Verde", ingredients: ["Soja", "Sal Grosso"], price: Math.floor(Math.random() * 46) + 25 },
<<<<<<< HEAD
    { name: "🍟 Batata Frita - Jutsu das Lâminas Douradas", ingredients: ["Batata (500 gramas)", "Sal"], price: 25.50 },
    { name: "🍟 Batata Frita com Cheddar e Bacon- Jutsu das Lâminas Douradas Cremosas", ingredients: ["Batata (600 gramas)", "Sal"], price: 29.90 },
    { name: "💧 Água Mineral - Fonte de Energia Natural", ingredients: ["Água Mineral (500ml)"], price: 5 },
    { name: "💦 Água com Gás - Técnica Borbulhante", ingredients: ["Água Gasificada (500ml)"], price: 6 },
    { name: "🥤 Coca-Cola - Chakra Explosivo", ingredients: ["Refrigerante de Cola (600ml Tradicional ou zero)"], price: 10 },
    { name: "🍊 Fanta Laranja - Modo Kurama", ingredients: ["Refrigerante de Laranja (600ml) Tradicional ou zero"], price: 7 },
    { name: "🍇 Fanta Uva - Genjutsu Roxo", ingredients: ["Refrigerante de Uva (600ml) Tradicional ou zero"], price: 7 },
    { name: "🌿 Kuat - Força do País do Chá", ingredients: ["Refrigerante de Guaraná (600ml) Tradicional ou zero"], price: 5 },
    { name: "🍹 Suco de Laranja - Jutsu da Vitalidade", ingredients: ["Laranja", "Açúcar", "Água"], price: 8 },
    { name: "🍇 Suco de Uva - Uvas da floresta Shinobi", ingredients: ["Uva", "Açúcar", "Água"], price: 8 },
    { name: "🍷 Vinho Tinto (1 Litro)- Sangue de Shinobi", ingredients: ["Uvas Cabernet", "Água", "Açucar Da Uva"], price: 49.90}    

=======
    { name: "🍟 Batata Frita Com Cheddar e Bacon(600gramas)- Jutsu das Lâminas Douradas Cremosas", ingredients: ["Batata", "Sal"], price: Math.floor(Math.random() * 46) + 25 },
    { name: "🍟 Batata Frita (450gramas)- Jutsu das Lâminas Douradas", ingredients: ["Batata", "Sal"], price: Math.floor(Math.random() * 32) + 20 },
    { name: "💧 Água Mineral (500ml) - Fonte de Energia Natural", ingredients: ["Água Purificada"], price: 5 },
    { name: "💦 Água com Gás (500ml) - Técnica Borbulhante", ingredients: ["Água Gasificada"], price: 6 },
    { name: "🥤 Coca-Cola (2 Litros)- Chakra Explosivo", ingredients: ["Refrigerante de Cola"], price: 12.90 },
    { name: "🍊 Fanta Laranja (2 Litros) - Modo Kurama", ingredients: ["Refrigerante de Laranja"], price: 10.25 },
    { name: "🍇 Fanta Uva (2 Litros) - Genjutsu Roxo", ingredients: ["Refrigerante de Uva"], price: 10.25 },
    { name: "🌿 Kuat (2 Litros) - Força do País do Chá", ingredients: ["Refrigerante de Guaraná"], price: 8.50 },
    { name: "🍹 Suco de Laranja (600ml)- Jutsu da Vitalidade", ingredients: ["Laranja", "Açúcar", "Água"], price: 8 },
    { name: "🍇 Suco de Uva (600ml)- Jutso das Uvas", ingredients: ["Uva", "Açúcar", "Água"], price: 8 },
    { name: "🍷 Vinho Tinto (1 Litro)- Sangue de Shinobi", ingredients: ["Uva Fermentada", "Açúcar Natural (Frutose)", "Água", ], price: 49.90 }
>>>>>>> 09f1d98 (Adicionar um elemento para ficar a mesma quantidade de ambos os lados)
];

let menuCounts = {};

// Gera um id "seguro" para cada item removendo caracteres especiais
menuItems.forEach(item => {
    item.safeId = item.name.replace(/[^a-zA-Z0-9]/g, "-");
    menuCounts[item.safeId] = 0;
});

function createMenuCounters() {
    const leftContainer = document.getElementById("left-menu");
    const rightContainer = document.getElementById("right-menu");

    menuItems.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("ingredient");

        itemDiv.innerHTML = `
            <span><strong>${item.name}</strong> (R$ ${parseFloat(item.price).toFixed(2)}):</span>
            <p class="ingredients">${item.ingredients.join(", ")}</p>
            <button class="decrement" onclick="updateCount('${item.safeId}', -1)">-</button>
            <span id="${item.safeId}-count">0</span>
            <button class="increment" onclick="updateCount('${item.safeId}', 1)">+</button>
        `;

        // Distribui os itens: índices pares para a coluna esquerda, ímpares para a direita
        if (index % 2 === 0) {
            leftContainer.appendChild(itemDiv);
        } else {
            rightContainer.appendChild(itemDiv);
        }
    });
}

function updateCount(safeId, change) {
    try {
        let newValue = menuCounts[safeId] + change;
        if (newValue < 0) {
            throw new Error(`Erro: ${safeId} não pode ser menor que 0.`);
        }
        if (newValue > 10) {
            throw new Error(`Erro: ${safeId} não pode ser maior que 10.`);
        }
        menuCounts[safeId] = newValue;
        document.getElementById(`${safeId}-count`).textContent = newValue;
        updateTotal();
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
}

function updateTotal() {
    let totalItems = 0;
    let totalPrice = 0;
    menuItems.forEach(item => {
        totalItems += menuCounts[item.safeId];
        totalPrice += menuCounts[item.safeId] * item.price;
    });
    document.getElementById("total").textContent = `Total de Comidas e Petiscos: ${totalItems}`;
    document.getElementById("valor-total").textContent = `Total em dinheiro: R$ ${totalPrice.toFixed(2)}`;
}

createMenuCounters();

