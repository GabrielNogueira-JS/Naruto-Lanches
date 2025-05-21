document.addEventListener('DOMContentLoaded', () => {
  // ELEMENTOS
  const menuContainer   = document.getElementById('menu');
  const detailView      = document.getElementById('detail-view');
  const summaryView     = document.getElementById('summary-view');
  const btnConfirmar    = document.getElementById('confirmar-pedido');
  const btnCloseSummary = document.getElementById('close-summary');
  const pedido          = [];

  // CARDÁPIO DE LANCHES
  const lanches = [
    { name: "🥓X-Bacon",     ingredients: ["Pão", "Bacon", "Queijo", "Hambúrguer", "Maionese"], price: 15.90, imagem: "../imagens/bacon.png" },
    { name: "🥒X-Salada",    ingredients: ["Pão", "Queijo", "Hambúrguer", "Alface", "Tomate"], price: 13.50, imagem: "../imagens/salada.png" },
    { name: "🍱X-Tudo",      ingredients: ["Pão", "Hambúrguer", "Queijo", "Presunto", "Bacon", "Ovo", "Alface", "Tomate"], price: 18.00, imagem: "../imagens/xtudo.png" },
    { name: "🐔X-Frango",    ingredients: ["Pão", "Frango desfiado", "Queijo", "Alface", "Tomate"], price: 14.50, imagem: "../imagens/frango.png" },
    { name: "🫑X-Calabresa", ingredients: ["Pão", "Calabresa", "Queijo", "Tomate"], price: 16.00, imagem: "../imagens/calabresa.png" },
    { name: "🍳X-Egg",       ingredients: ["Pão", "Ovo", "Queijo", "Hambúrguer"], price: 14.00, imagem: "../imagens/egg.png" },
    { name: "🍖X-Picanha",   ingredients: ["Pão", "Picanha", "Queijo", "Alface", "Tomate"], price: 19.90, imagem: "../imagens/picanha.png" },
    { name: "🌱X-Vegano",    ingredients: ["Pão integral", "Hambúrguer de soja", "Queijo vegano", "Alface", "Tomate"], price: 17.50, imagem: "../imagens/vegano.png" },
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
          <textarea id="obs-detail" rows="5" placeholder="Observação?"></textarea>
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
