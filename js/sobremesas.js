// sobremesas.js
document.addEventListener('DOMContentLoaded', () => {
  const container     = document.getElementById('menu');
  const detailView    = document.getElementById('detail-view');
  const summaryView   = document.getElementById('summary-view');
  const finalizarBtn  = document.getElementById('finalizar-pedido');
  const closeSummary  = document.getElementById('close-summary');
  const pedido        = [];

  const menu = [
    { nome: "🍰 Bolo de Chocolate – Chakra do Anoitecer", descricao: "...", observacao: "👤👤👤 Serve até quatro pessoas.", preco: 22.50, imagem: "../imagens/bolochocolate.png" },
    { nome: "🍨 Taça Colegial – Equipe 7",              descricao: "...", observacao: "👤Serve até duas pessoas.",          preco: 15.90, imagem: "../imagens/tacacolegial.png" },
    { nome: "🍮 Pudim – Técnica Secreta do Clã Nara",   descricao: "...", observacao: "👤👤Serve até três pessoas.",         preco: 12.50, imagem: "../imagens/pudim.png" },
    /* ... demais itens com extensão .png única ... */
  ];

  detailView.classList.add('hidden');
  summaryView.classList.add('hidden');

  function mostrarErro(msg) {
    const msgEl = document.createElement('div');
    msgEl.className = 'error-temp';
    msgEl.textContent = msg;
    container.prepend(msgEl);
    setTimeout(() => msgEl.remove(), 2000);
  }

  function atualizarRodape() {
    document.getElementById('total').textContent = `Total de Sobremesas: ${pedido.length}`;
    const valor = pedido.reduce((sum, p) => sum + p.preco, 0);
    document.getElementById('valor-total').textContent = `Total em Dinheiro: R$ ${valor.toFixed(2)}`;
  }

  menu.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = idx;
    card.innerHTML = `
      <div class="card-left">
        <h3 class="item-title"><strong><em>${item.nome}</em></strong></h3>
        <p class="desc">${item.descricao}</p>
        <div class="observacao"><span>👤</span>${item.observacao}</div>
        <p class="price">R$ ${item.preco.toFixed(2)}</p>
      </div>
      <div class="card-right">
        <img src="${item.imagem}" alt="${item.nome}">
      </div>
    `;
    container.appendChild(card);

    card.addEventListener('click', () => {
      detailView.innerHTML = `
        <div class="box">
          <span class="close-hint">✖</span>
          <h2><em>${item.nome}</em></h2>
          <img src="${item.imagem}" alt="${item.nome}">
          <p>${item.descricao}</p>
          <p><strong>R$ ${item.preco.toFixed(2)}</strong></p>
          <label>Observação:</label>
          <textarea id="obs-detail" rows="5" placeholder="Retirar algo?"></textarea>
          <div class="actions">
            <button id="add-detail" class="botao-padrao">Adicionar</button>
            <button id="remove-detail" class="botao-padrao">Remover</button>
          </div>
        </div>
      `;
      detailView.classList.remove('hidden');
      detailView.querySelector('.close-hint').onclick = () => detailView.classList.add('hidden');

      detailView.querySelector('#add-detail').onclick = () => {
        const obs = detailView.querySelector('#obs-detail').value.trim() || item.observacao;
        pedido.push({ nome: item.nome, preco: item.preco, obs });
        atualizarRodape();
        detailView.classList.add('hidden');
      };

      detailView.querySelector('#remove-detail').onclick = () => {
        const obs = detailView.querySelector('#obs-detail').value.trim() || item.observacao;
        const i = pedido.findIndex(p => p.nome === item.nome && p.obs === obs);
        if (i > -1) pedido.splice(i, 1), atualizarRodape();
        else mostrarErro('Nada desse item+obs no pedido!');
        detailView.classList.add('hidden');
      };
    });
  });

  function agruparPedido() {
    const mapa = {};
    pedido.forEach(p => {
      const key = `${p.nome}||${p.obs}`;
      if (!mapa[key]) mapa[key] = { ...p, qtd: 0 };
      mapa[key].qtd++;
    });
    return Object.values(mapa);
  }

  function renderizarResumo() {
    const lista = document.getElementById('lista-pedido');
    const totalE = document.getElementById('total-pedido');
    const grupos = agruparPedido();
    let soma = 0;
    lista.innerHTML = '';

    grupos.forEach(g => {
      const li = document.createElement('li');
      const spanNome  = document.createElement('span');
      const spanQtd   = document.createElement('span');
      const spanPreco = document.createElement('span');
      const btnMais   = document.createElement('button');
      const btnMenos  = document.createElement('button');

      spanNome.textContent  = g.nome;
      spanQtd.textContent   = ` x${g.qtd} `;
      spanPreco.textContent = `- R$ ${(g.preco * g.qtd).toFixed(2)}`;
      btnMais.textContent   = '+';
      btnMenos.textContent  = '-';

      btnMais.onclick = () => { pedido.push({ nome: g.nome, preco: g.preco, obs: g.obs }); atualizarRodape(); renderizarResumo(); };
      btnMenos.onclick = () => {
        const i = pedido.findIndex(p => p.nome === g.nome && p.obs === g.obs);
        if (i > -1) pedido.splice(i,1), atualizarRodape(), renderizarResumo();
      };

      li.append(spanNome, btnMenos, spanQtd, btnMais, spanPreco);
      if (g.obs) {
        const obsEl = document.createElement('div');
        obsEl.textContent = `Obs: ${g.obs}`;
        obsEl.style.fontStyle = 'italic';
        obsEl.style.marginLeft = '20px';
        li.appendChild(obsEl);
      }
      lista.appendChild(li);
      soma += g.preco * g.qtd;
    });

    totalE.textContent = soma.toFixed(2);
  }

  finalizarBtn.addEventListener('click', () => {
    renderizarResumo();
    summaryView.classList.remove('hidden');
  });

  closeSummary.addEventListener('click', () => {
    summaryView.classList.add('hidden');
  });

  atualizarRodape();
});
// Fim do código
