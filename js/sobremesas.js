document.addEventListener('DOMContentLoaded', () => {
  const container    = document.getElementById('menu');
  const detailView   = document.getElementById('detail-view');
  const finalizarBtn = document.getElementById('finalizar-pedido');
  const qtdEl        = document.getElementById('quantidade-itens');
  const valEl        = document.getElementById('valor-total');
  const pedido       = [];

  const menu = [ 
    { nome: "🍰 Bolo de Chocolate – Chakra do Anoitecer", descricao: "Quatro fatias de bolo macio sabor chocolate com diamante negro, creme de leite, leite condensado da melhor qualidade e uma calda de chocolate temperado.", observacao: "👤👤👤👤 Serve até quatro pessoas.", preco: 22.50, imagem: "../imagens/bolochocolate.png.png" },
    { nome: "🍨 Taça Colegial – Equipe 7", descricao: "Duas bolas de sorvete sabor creme, cobertas com calda de morango e finalizadas com duas cerejas e confetes coloridos.", observacao: "👤👤Serve até duas pessoas.", preco: 15.90, imagem: "../imagens/tacacolegial.png.png" },
    { nome: "🍮 Pudim – Técnica Secreta do Clã Nara", descricao: "Pudim cremoso de doce de leite com calda de caramelo macio e textura aveludada.", observacao: "👤👤👤Serve até três pessoas.", preco: 12.50, imagem: "../imagens/pudim.png.png" },
    { nome: "🥤 Milk-Shake – Onda de Chakra Rosa", descricao: "Milk-shake cremoso de morango com essência natural e chantilly por cima.", observacao: "👤Serve uma pessoa.", preco: 18.00, imagem: "../imagens/milkshake.png" },
    { nome: "🧁 Cupcake – Estilo Sakura Blossom", descricao: "Cupcake de limão com cobertura de calda de morango e confetes coloridos.", observacao: "👤Serve uma pessoa.", preco: 10.90, imagem: "../imagens/cupcake.png" },
    { nome: "🥐 Croissant – Golpe Sombrio do Uchiha", descricao: "Croissant folhado recheado com chocolate ao leite derretido e pincelado com calda especial.", observacao: "👤Serve uma pessoa.", preco: 8.50, imagem: "../imagens/croissant.png" },
    { nome: "🦄 Taça Infantil Unicórnio – Invocação de Gamakichi", descricao: "Sorvete de morango com calda de amora, decoração de pasta americana em forma de unicórnio e MM's.", observacao: "👤👤Serve até duas crianças.", preco: 20.00, imagem: "../imagens/tacaunicornio.png.png" },
    { nome: "🍫 Petit Gateau – Jutsu do Dragão Negro", descricao: "Bolinhas de massa de chocolate quente com sorvete de creme ao lado e calda quente.", observacao: "👤Serve uma pessoa.", preco: 19.90, imagem: "../imagens/petitgateau.png.png" },
    { nome: "🍩 Sonho – Sonho do Tsukuyomi Infinito", descricao: "Sonho frito recheado com leite condensado e polvilhado com açúcar e canela.", observacao: "👤Serve uma pessoa.", preco: 7.00, imagem: "../imagens/doce.png.png" },
    { nome: "☕ Café – Chakra da Madrugada", descricao: "Café Jamaica Blue Mountain, adoçado na medida com leite semidesnatado.", observacao: "👤Serve uma pessoa.", preco: 7.50, imagem: "../imagens/cafe.png.png" },
    { nome: "🍰 Bolo de Morango – Chakra do Amanhecer", descricao: "Bolo de morango macio com cobertura de morangos frescos...", observacao: "👤👤👤👤Serve até quatro pessoas.", preco: 22.00, imagem: "../imagens/bolomorango.png.png" }
  ];

  function mostrarErro(msg) {
    const msgEl = document.createElement('div');
    msgEl.className = 'error-temp';
    msgEl.textContent = msg;
    container.prepend(msgEl);
    setTimeout(() => msgEl.remove(), 2000);
  }

  function atualizarResumoRodape() {
    const totalItens = pedido.length;
    const totalValor = pedido.reduce((sum, i) => sum + i.preco, 0);
    qtdEl.textContent = `${totalItens} item${totalItens !== 1 ? 's' : ''}`;
    valEl.textContent = `R$ ${totalValor.toFixed(2)}`;
  }

  // Renderiza os cards
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
    card.addEventListener('click', () => detalheItem(i));
  });

  // Inicializa o rodapé
  atualizarResumoRodape();

  function detalheItem(idx) {
    const item = menu[idx];
    detailView.innerHTML = `
      <div class="box">
        <span class="close-hint">✖</span>
        <h2><em>${item.nome}</em></h2>
        <img src="${item.imagem}" alt="${item.nome}">
        <p>${item.descricao}</p>
        <p><strong>R$ ${item.preco.toFixed(2)}</strong></p>
        <textarea id="obs-detail" rows="5" maxlength="50" placeholder="Obs (Opcional)" style="width:100%"></textarea>
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
      const exists = pedido.find(p => p.nome === item.nome && p.observacao === obs);
      if (!exists && pedido.length < 10) {
        pedido.push({ nome: item.nome, preco: item.preco, observacao: obs });
        atualizarResumoRodape();
      } else if (exists) {
        mostrarErro('Este item já foi adicionado com essa observação!');
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

  // Finalizar pedido — exibe resumo no mesmo modal
  finalizarBtn.onclick = () => {
    if (!pedido.length) {
      mostrarErro('Nenhuma sobremesa adicionada...');
      return;
    }

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
    html += '</div>';

    detailView.innerHTML = html;
    detailView.classList.remove('hidden');
    detailView.querySelector('.close-hint').onclick = () => detailView.classList.add('hidden');

    detailView.querySelectorAll('.actions button').forEach(btn => {
      btn.onclick = () => {
        const i = +btn.dataset.idx;
        const delta = +btn.dataset.delta;
        const count = pedido.filter(p => p.nome === pedido[i].nome).length;
        if (count + delta >= 1 && count + delta <= 10) {
          if (delta > 0) {
            const obs = pedido[i].observacao;
            pedido.push({ nome: pedido[i].nome, preco: pedido[i].preco, observacao: obs });
          } else {
            const rem = pedido.findIndex(p => p.nome === pedido[i].nome);
            pedido.splice(rem, 1);
          }
          atualizarResumoRodape();
          finalizarBtn.onclick();  // reabre o resumo atualizado
        }
      };
    });
  };
});
