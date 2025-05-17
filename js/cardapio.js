document.addEventListener('DOMContentLoaded', () => {
  // ELEMENTOS
  const menuContainer   = document.getElementById('menu');
  const detailView      = document.getElementById('detail-view');
  const summaryView     = document.getElementById('summary-view');
  const btnConfirmar    = document.getElementById('confirmar-pedido');
  const btnCloseSummary = document.getElementById('close-summary');
  const pedido          = [];

  // CARDÁPIO DE LANCHES
  const menuItems = [
    { name: "🍜 Lámen Ichiraku - Ramen do Naruto", ingredients: ["Macarrão", "Caldo de Porco", "Ovo", "Cebolinha", "Chashu"], price: 39.90, image: "../images/ramen.jpeg" },
    { name: "🍙 Bola de Arroz Onigiri - Missão Rápida", ingredients: ["Arroz Japonês", "Alga Nori", "Recheio Variado"], price: 9.50, image: "../images/onigiri.jpeg" },
    { name: "🍙 Onigiri da Hinata", ingredients: ["Arroz Japonês", "Alga Nori", "Salmão Grelhado", "Gergelim"], price: 17.50, image: "../images/oniguiri.jpeg" },   
    { name: "🍢 Dango - Doce Favorito dos Ninjas", ingredients: ["Massa de Arroz", "Molho de Soja Doce"], price: 12.50, image: "../images/dango.jpeg" },
    { name: "🍛 Curry Japonês - Chakra Picante", ingredients: ["Carne", "Cenoura", "Batata", "Arroz", "Molho Curry"], price: 34.00, image: "../images/curry.jpg" },
    { name: "🐙 Takoyaki - Jutsu do Polvo Flamejante", ingredients: ["Massa", "Polvo", "Molho Takoyaki", "Cebolinha", "Katsuobushi"], price: 29.90, image: "../images/takoyaki.jpeg" },
    { name: "🦐 Tempurá - Defesa Perfeita do Byakugan", ingredients: ["Camarão", "Legumes", "Massa Crocante"], price: 28.50, image: "../images/tempura.jpeg" },
    { name: "🍢 Churrasquinho Yakitori - Espetos de Chakra", ingredients: ["Frango", "Molho Tarê"], price: 8.90, image: "../images/yakitori.jpg" },
    { name: "🥩 Churrasquinho Uchiha - Espetos do Sasuke", ingredients: ["Fraudinha", "Molho Shoyu", "Maionese de Alho"], price: 12.90, image: "../images/churrasquinho-uchiha.jpg" },
    { name: "🐟 Sashimi - Técnica do Estilo Água", ingredients: ["Peixe Cru", "Shoyu", "Gengibre"], price: 32.00, image: "../images/sashimi.jpeg" },
    { name: "🍗 Karaage (Frango Frito Japonês) - Golpe Rápido de Taijutsu", ingredients: ["Frango", "Molho de Soja", "Gengibre", "Farinha de Batata"], price: 25.00, image: "../images/karage.jpeg" },
    { name: "🥞 Okonomiyaki - Jutsu Secreto de Osaka", ingredients: ["Massa", "Repolho", "Carne de Porco", "Molho Okonomiyaki"], price: 27.90, image: "../images/okono.jpeg" },
    { name: "🌱 Edamame (Soja Cozida) - Chakra Verde", ingredients: ["Soja", "Sal Grosso"], price: 10.75, image: "../images/edamame.jpeg" },
    { name: "🍟 Batata Frita - Jutsu das Lâminas Douradas", ingredients: ["Batata (500 gramas)", "Sal"], price: 25.50, image: "../images/btt.jpeg" },
    { name: "🍟 Batata Frita com Cheddar e Bacon- Jutsu das Lâminas Douradas Cremosas", ingredients: ["Batata (600 gramas)", "Sal"], price: 29.90, image: "../images/bttcb.jpg" },
    { name: "💧 Água Mineral - Fonte de Energia Natural", ingredients: ["Água Mineral (500ml)"], price: 5, image: "../images/agua.jpg" },
    { name: "💦 Água com Gás - Técnica Borbulhante", ingredients: ["Água Gasificada (500ml)"], price: 6, image: "../images/agua-gas.jpg" },
    { name: "🥤 Coca-Cola - Chakra Explosivo", ingredients: ["Refrigerante de Cola (600ml Tradicional ou zero)"], price: 10, image: "../images/coca.jpg" },
    { name: "🍊 Fanta Laranja - Modo Kurama", ingredients: ["Refrigerante de Laranja (600ml) Tradicional ou zero"], price: 7, image: "../images/fanta-laranja.jpg" },
    { name: "🍇 Fanta Uva - Genjutsu Roxo", ingredients: ["Refrigerante de Uva (600ml) Tradicional ou zero"], price: 7, image: "../images/fanta-uva.jpg" },
    { name: "🌿 Kuat - Força do País do Chá", ingredients: ["Refrigerante de Guaraná (600ml) Tradicional ou zero"], price: 5, image: "../images/kuat.jpg" },
    { name: "🍹 Suco de Laranja - Jutsu da Vitalidade", ingredients: ["Laranja", "Açúcar", "Água"], price: 8, image: "../images/suco-laranja.jpg" },
    { name: "🍇 Suco de Uva - Uvas da floresta Shinobi", ingredients: ["Uva", "Açúcar", "Água"], price: 8, image: "../images/suco-uva.jpg" },
    { name: "🍷 Vinho Tinto (1 Litro)- Sangue de Shinobi", ingredients: ["Uvas Cabernet", "Água", "Açucar Da Uva"], price: 49.90, image: "../images/vinho.jpg" }
];


  // Inicia modais ocultos
  detailView.classList.add('hidden');
  summaryView.classList.add('hidden');

  // Agrupa itens iguais no pedido
  function agruparPedido() {
    return Object.values(pedido.reduce((map, p) => {
      const key = p.name + '||' + p.obs;
      if (!map[key]) map[key] = { ...p, qtd: 0 };
      map[key].qtd++;
      return map;
    }, {}));
  }

  // Renderiza resumo de pedido
  function renderizarResumo() {
    const lista = document.getElementById('lista-pedido');
    lista.innerHTML = '';
    let soma = 0;

    agruparPedido().forEach((g, idx) => {
      lista.innerHTML += `
        <li>
          ${g.name} x${g.qtd} - R$ ${(g.price * g.qtd).toFixed(2)}
          ${g.obs ? `<div style="font-style:italic; margin-left:20px">Obs: ${g.obs}</div>` : ''}
          <div class="buttons">
            <button class="decrement" data-index="${idx}">-</button>
            <button class="increment" data-index="${idx}">+</button>
          </div>
        </li>
      `;
      soma += g.price * g.qtd;
    });

    document.getElementById('total-pedido').textContent = soma.toFixed(2);

    // Clona e substitui botões para evitar múltiplos ouvintes
    document.querySelectorAll('.increment').forEach((btn) => {
      const clone = btn.cloneNode(true);
      btn.replaceWith(clone);
    });
    document.querySelectorAll('.decrement').forEach((btn) => {
      const clone = btn.cloneNode(true);
      btn.replaceWith(clone);
    });

    // Adiciona ouvintes nos botões de + e -
    document.querySelectorAll('.increment').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const item = agruparPedido()[e.target.dataset.index];
        pedido.push({ name: item.name, price: item.price, obs: item.obs });
        renderizarResumo();
      });
    });
    document.querySelectorAll('.decrement').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const item = agruparPedido()[e.target.dataset.index];
        const i = pedido.findIndex(p => p.name === item.name && p.obs === item.obs);
        if (i > -1) pedido.splice(i, 1);
        renderizarResumo();
      });
    });
  }

  // Renderiza cards e detalhe dos lanches
  lanches.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = idx;
    card.innerHTML = `
      <div class="card-left">
        <h3><strong>${item.name}</strong></h3>
        <p class="desc">Ingredientes: ${item.ingredients.join(', ')}</p>
        <p class="price">R$ ${item.price.toFixed(2)}</p>
      </div>
      <div class="card-right">
        <img src="${item.imagem}" alt="${item.name}">
      </div>
    `;
    menuContainer.appendChild(card);

    card.addEventListener('click', () => {
      detailView.innerHTML = `
        <div class="box">
          <button class="close-detail" aria-label="Fechar detalhe">❌</button>
          <h2>${item.name}</h2>
          <img src="${item.imagem}" alt="${item.name}">
          <p>Ingredientes: ${item.ingredients.join(', ')}</p>
          <p><strong>R$ ${item.price.toFixed(2)}</strong></p>
          <label for="obs-detail">Observação:</label>
          <textarea id="obs-detail" rows="2" placeholder="Ex: sem maionese"></textarea>
          <div class="actions">
            <button id="add-detail">Adicionar</button>
            <button id="remove-detail">Remover</button>
          </div>
        </div>
      `;
      detailView.classList.remove('hidden');

      detailView.querySelector('.close-detail').onclick = () => detailView.classList.add('hidden');

      detailView.querySelector('#add-detail').onclick = () => {
        const obs = detailView.querySelector('#obs-detail').value.trim();
        pedido.push({ name: item.name, price: item.price, obs });
        detailView.classList.add('hidden');
      };

      detailView.querySelector('#remove-detail').onclick = () => {
        const obs = detailView.querySelector('#obs-detail').value.trim();
        const i = pedido.findIndex(p => p.name === item.name && p.obs === obs);
        if (i > -1) pedido.splice(i, 1);
        detailView.classList.add('hidden');
      };
    });
  });

  // Abre e fecha modal de resumo do pedido
  btnConfirmar.onclick = () => {
    renderizarResumo();
    summaryView.classList.remove('hidden');
  };
  btnCloseSummary.onclick = () => summaryView.classList.add('hidden');

});
