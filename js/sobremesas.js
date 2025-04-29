document.addEventListener('DOMContentLoaded', () => {
  const container    = document.getElementById('menu');
  const detailView   = document.getElementById('detail-view');
  const finalizarBtn = document.getElementById('finalizar-pedido');
  const resumoBox    = document.getElementById('resumo-pedido');
  const pedido       = [];

  const menu = [ 
    // ... (mantém o seu array menu original aqui)
  ];

  function mostrarErro(msg) {
    const msgEl = document.createElement('div');
    msgEl.className = 'error-temp';
    msgEl.textContent = msg;
    container.prepend(msgEl);
    setTimeout(() => msgEl.remove(), 2000);
  }

  function atualizarRodape() {
    const totalItens = pedido.length;
    const totalValor = pedido.reduce((soma, item) => soma + item.preco, 0);
    resumoBox.innerHTML = `
      <p><strong>Total de itens:</strong> ${totalItens}</p>
      <p><strong>Valor total:</strong> R$ ${totalValor.toFixed(2)}</p>
    `;
  }

  menu.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    card.innerHTML = `
      <div class="card-left">
        <h3 class="item-title"><strong><em>${item.nome}</em></strong></h3>
        <p class="desc">${item.descricao}</p>
        <div class="observacao"><span class="icon-users">👤</span><span>${item.observacao}</span></div>
        <p class="price">R$ ${item.preco.toFixed(2)}</p>
      </div>
      <div class="card-right">
        <img src="${item.imagem}" class="sobremesa-img" alt="${item.nome}">
      </div>
    `;
    container.appendChild(card);

    card.addEventListener('click', () => {
      if (!detailView.classList.contains('hidden')) hideDetail();
      showDetail(index);
    });
  });

  function showDetail(idx) {
    const item = menu[idx];
    detailView.innerHTML = `
      <div class="box">
        <span class="close-hint">✖</span>
        <h2><em>${item.nome}</em></h2>
        <img src="${item.imagem}" alt="${item.nome}">
        <p>${item.descricao}</p>
        <p><strong>R$ ${item.preco.toFixed(2)}</strong></p>
        <label for="obs-detail">Observação:</label>
        <textarea id="obs-detail" rows="4" maxlength="50" placeholder="Retirar algo?" style="width:100%;"></textarea>
        <div class="actions">
          <button id="add-detail" class="botao-padrao">Adicionar</button>
          <button id="remove-detail" class="botao-padrao">Remover</button>
        </div>
      </div>
    `;
    detailView.classList.remove('hidden');
    detailView.querySelector('.close-hint').onclick = hideDetail;

    detailView.querySelector('#add-detail').onclick = () => {
      const obsText = detailView.querySelector('#obs-detail').value.trim();
      pedido.push({ nome: item.nome, preco: item.preco, observacao: obsText });
      atualizarRodape();
      hideDetail();
    };

    detailView.querySelector('#remove-detail').onclick = () => {
      const i = pedido.findIndex(p => p.nome === item.nome);
      if (i > -1) {
        pedido.splice(i, 1);
        atualizarRodape();
      } else mostrarErro('Nada desse item no pedido!');
      hideDetail();
    };
  }

  function hideDetail() {
    detailView.classList.add('hidden');
    detailView.innerHTML = '';
  }

  function agruparPedido() {
    const mapa = {};
    pedido.forEach(({ nome, preco, observacao }) => {
      if (!mapa[nome]) mapa[nome] = { nome, preco, observacoes: [], qtd: 0 };
      mapa[nome].qtd++;
      if (observacao) mapa[nome].observacoes.push(observacao);
    });
    return Object.values(mapa);
  }

  finalizarBtn.onclick = () => {
    const lista = agruparPedido();
    if (lista.length === 0) return mostrarErro('Nenhuma sobremesa adicionada...');
    let html = '<h3>Resumo do Pedido:</h3><ul>';
    lista.forEach(item => {
      html += `<li><strong>${item.nome}</strong> x${item.qtd} - R$ ${(item.qtd * item.preco).toFixed(2)}`;
      if (item.observacoes.length) {
        html += `<br><em>Observações:</em><ul>${item.observacoes.map(o => `<li>${o}</li>`).join('')}</ul>`;
      }
      html += '</li>';
    });
    html += '</ul>';
    resumoBox.innerHTML = html;
  };
});
