document.addEventListener('DOMContentLoaded', () => {
  // ELEMENTOS
  const menuContainer   = document.getElementById('menu');
  const detailView      = document.getElementById('detail-view');
  const summaryView     = document.getElementById('summary-view');
  const btnFinalizar    = document.getElementById('finalizar-pedido');
  const btnCloseSummary = document.getElementById('close-summary');
  const pedido          = [];

  // MENU
  const menu = [
    {
      nome: "🍰 Bolo de Chocolate – Chakra do Anoitecer",
      descricao: "Quatro fatias de bolo macio sabor chocolate com diamante negro, creme de leite, leite condensado e calda temperada.",
      observacao: "👤👤👤👤 Serve até quatro pessoas.",
      preco: 22.50,
      imagem: "../imagens/bolochocolate.png.png"
    },
    // Outras opções do menu
  ];

  // Inicia modais ocultos
  detailView.classList.add('hidden');
  summaryView.classList.add('hidden');

  // Atualiza contador e total
  function atualizarRodape() {
    document.getElementById('total').textContent = `Total de sobremesas: ${pedido.length}`;
    document.getElementById('valor-total').textContent =
      `Total em dinheiro: R$ ${pedido.reduce((sum, p) => sum + p.preco, 0).toFixed(2)}`;
  }

  // Agrupa itens iguais
  function agruparPedido() {
    return Object.values(pedido.reduce((map, p) => {
      const key = p.nome + '||' + p.obs;
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
        ${g.nome} x${g.qtd} - R$ ${(g.preco * g.qtd).toFixed(2)}
        ${g.obs ? `<div style="font-style:italic; margin-left:20px">Obs: ${g.obs}</div>` : ''}
        <div class="buttons">
          <button class="decrement" data-index="${idx}">-</button>
          <button class="increment" data-index="${idx}">+</button>
        </div>
      </li>
    `;
    soma += g.preco * g.qtd;
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

  // Agora sim, adiciona os ouvintes de clique (sem duplicação)
  document.querySelectorAll('.increment').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = e.target.dataset.index;
      const item = agruparPedido()[index];
      pedido.push({ nome: item.nome, preco: item.preco, obs: item.obs });
      renderizarResumo();
      atualizarRodape();
    });
  });

  document.querySelectorAll('.decrement').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = e.target.dataset.index;
      const item = agruparPedido()[index];
      const i = pedido.findIndex(p => p.nome === item.nome && p.obs === item.obs);
      if (i > -1) pedido.splice(i, 1);
      renderizarResumo();
      atualizarRodape();
    });
  });
}


  // Renderiza cards (sem os botões de + e - nos cards)
  menu.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = idx;
    card.innerHTML = `
      <div class="card-left">
        <h3><strong>${item.nome}</strong></h3>
        <p class="desc">${item.descricao}</p>
        <div class="observacao">${item.observacao}</div>
        <p class="price">R$ ${item.preco.toFixed(2)}</p>
      </div>
      <div class="card-right">
        <img src="${item.imagem}" alt="${item.nome}">
      </div>
    `;
    menuContainer.appendChild(card);

    // Incrementa direto no pedido
    card.addEventListener('click', () => {
      pedido.push({ nome: item.nome, preco: item.preco, obs: item.observacao });
      atualizarRodape();
    });

    // Abre detalhe no card clicado
    card.addEventListener('click', () => {
      detailView.innerHTML = `
        <div class="box">
          <button class="close-detail" aria-label="Fechar detalhe">❌</button>
          <h2>${item.nome}</h2>
          <img src="${item.imagem}" alt="${item.nome}">
          <p>${item.descricao}</p>
          <p><strong>R$ ${item.preco.toFixed(2)}</strong></p>
          <label for="obs-detail">Observação:</label>
          <textarea id="obs-detail" rows="4" placeholder="Retirar algo?"></textarea>
          <div class="actions">
            <button id="add-detail">Adicionar</button>
            <button id="remove-detail">Remover</button>
          </div>
        </div>
      `;
      detailView.classList.remove('hidden');

      // Fecha o detail
      detailView.querySelector('.close-detail').onclick = () => detailView.classList.add('hidden');

      detailView.querySelector('#add-detail').onclick = () => {
        const obs = detailView.querySelector('#obs-detail').value.trim() || item.observacao;
        pedido.push({ nome: item.nome, preco: item.preco, obs });
        atualizarRodape();
        detailView.classList.add('hidden');
      };

      detailView.querySelector('#remove-detail').onclick = () => {
        const obs = detailView.querySelector('#obs-detail').value.trim() || item.observacao;
        const i = pedido.findIndex(p => p.nome === item.nome && p.obs === obs);
        if (i > -1) pedido.splice(i, 1);
        atualizarRodape();
        detailView.classList.add('hidden');
      };
    });
  });

  // Abre e fecha modal de resumo
  btnFinalizar.onclick = () => {
    renderizarResumo();
    summaryView.classList.remove('hidden');
  };

  btnCloseSummary.onclick = () => {
    summaryView.classList.add('hidden');
  };

  atualizarRodape();
});
