document.addEventListener('DOMContentLoaded', () => {
  const container    = document.getElementById('menu');
  const detailView   = document.getElementById('detail-view');
  const finalizarBtn = document.getElementById('finalizar-pedido');
  const qtdEl        = document.getElementById('quantidade-itens');
  const valEl        = document.getElementById('valor-total');
  const pedido       = [];

  // seu array menu permanece inalterado
  const menu = [ /* ... itens ... */ ];

  function mostrarErro(msg) {
    const msgEl = document.createElement('div');
    msgEl.className = 'error-temp';
    msgEl.textContent = msg;
    container.prepend(msgEl);
    setTimeout(() => msgEl.remove(), 2000);
  }

  function atualizarResumoRodape() {
    const totalItens = pedido.length;
    const totalValor = pedido.reduce((s, i) => s + i.preco, 0);
    qtdEl.textContent = `${totalItens} item${totalItens !== 1 ? 's' : ''}`;
    valEl.textContent = `R$ ${totalValor.toFixed(2)}`;
  }

  // cria os cards do menu
  menu.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = i;
    card.innerHTML = `
      <div class="card-left">
        <h3><em>${item.nome}</em></h3>
        <p class="desc">${item.descricao}</p>
        <div class="observacao">${item.observacao}</div>
        <p class="price">R$ ${item.preco.toFixed(2)}</p>
      </div>
      <div class="card-right">
        <img src="${item.imagem}" alt="${item.nome}">
      </div>
    `;
    container.appendChild(card);

    card.addEventListener('click', () => {
      detalheItem(i);
    });
  });

  // exibe modal de detalhe individual
  function detalheItem(idx) {
    const item = menu[idx];
    detailView.innerHTML = `
      <div class="box">
        <span class="close-hint">✖</span>
        <h2><em>${item.nome}</em></h2>
        <img src="${item.imagem}" alt="${item.nome}">
        <p>${item.descricao}</p>
        <p><strong>R$ ${item.preco.toFixed(2)}</strong></p>
        <textarea id="obs-detail" rows="2" maxlength="50" placeholder="Observação (opcional)" style="width:100%"></textarea>
        <div class="actions">
          <button id="add-detail" class="botao-padrao">Adicionar</button>
          <button id="remove-detail" class="botao-padrao">Remover</button>
        </div>
      </div>
    `;
    detailView.classList.remove('hidden');
    detailView.querySelector('.close-hint').onclick = () => detailView.classList.add('hidden');

    detailView.querySelector('#add-detail').onclick = () => {
      const obs = detailView.querySelector('#obs-detail').value.trim();
      if (pedido.length < 10) {
        pedido.push({ ...item, observacao: obs });
        atualizarResumoRodape();
      }
      detailView.classList.add('hidden');
    };

    detailView.querySelector('#remove-detail').onclick = () => {
      const idxRem = pedido.findIndex(p => p.nome === item.nome);
      if (idxRem > -1) {
        pedido.splice(idxRem, 1);
        atualizarResumoRodape();
      } else {
        mostrarErro('Nada desse item no pedido!');
      }
      detailView.classList.add('hidden');
    };
  }

  // ao clicar em Finalizar Pedido: exibe resumo dentro do mesmo modal
  finalizarBtn.onclick = () => {
    if (pedido.length === 0) {
      mostrarErro('Nenhuma sobremesa adicionada...');
      return;
    }
    // monta lista com + e − para cada item
    let html = `<div class="box"><span class="close-hint">✖</span><h2>Resumo do Pedido</h2>`;
    pedido.forEach((item, i) => {
      html += `
        <div class="resumo-item">
          <span>${item.nome} — R$ ${item.preco.toFixed(2)}</span>
          <div class="actions">
            <button data-idx="${i}" data-delta="-1" class="botao-padrao">−</button>
            <button data-idx="${i}" data-delta="1" class="botao-padrao">+</button>
          </div>
          ${item.observacao ? `<p class="obs-resumo">${item.observacao}</p>` : ''}
        </div>
      `;
    });
    html += `</div>`;
    detailView.innerHTML = html;
    detailView.classList.remove('hidden');

    // fecha
    detailView.querySelector('.close-hint').onclick = () => detailView.classList.add('hidden');

    // + e − no resumo
    detailView.querySelectorAll('.actions button').forEach(btn => {
      btn.onclick = () => {
        const i = +btn.dataset.idx;
        const delta = +btn.dataset.delta;
        const novaQtd = pedido.filter(p => p.nome === pedido[i].nome).length + delta;
        if (novaQtd >= 1 && novaQtd <= 10) {
          if (delta > 0) pedido.push({ ...pedido[i] });
          else {
            const rem = pedido.findIndex(p => p.nome === pedido[i].nome);
            pedido.splice(rem, 1);
          }
          atualizarResumoRodape();
          // reabrir resumo para atualizar quantidades
          finalizarBtn.onclick();
        }
      };
    });
  };
});
