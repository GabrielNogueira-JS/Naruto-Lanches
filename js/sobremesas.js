document.addEventListener('DOMContentLoaded', () => {
  const container   = document.getElementById('menu');
  const detailView  = document.getElementById('detail-view');
  const finalizarBtn= document.getElementById('finalizar-pedido');
  const resumoBox   = document.getElementById('resumo-pedido');
  const pedido      = [];

  const menu = [
    { nome: "🍰 Bolo de Chocolate – Chakra do Anoitecer", descricao: "Quatro fatias de bolo macio sabor chocolate com diamante negro, creme de leite, leite condensado da melhor qualidade e uma calda de chocolate temperado.", observacao: "👤👤👤 Serve até quatro pessoas.", preco: 22.50, imagem: "../imagens/bolochocolate.png.png" },
    { nome: "🍨 Taça Colegial – Equipe 7", descricao: "Duas bolas de sorvete sabor creme, cobertas com calda de morango e finalizadas com duas cerejas e confetes coloridos.", observacao: "👤Serve até duas pessoas.", preco: 15.90, imagem: "../imagens/tacacolegial.png.png" },
    { nome: "🍮 Pudim – Técnica Secreta do Clã Nara", descricao: "Pudim cremoso de doce de leite com calda de caramelo macio e textura aveludada.", observacao: "👤👤Serve até três pessoas.", preco: 12.50, imagem: "../imagens/pudim.png.png" },
    { nome: "🥤 Milk-Shake – Onda de Chakra Rosa", descricao: "Milk-shake cremoso de morango com essência natural e chantilly por cima.", observacao: "Serve uma pessoa.", preco: 18.00, imagem: "../imagens/milkshake.png" },
    { nome: "🧁 Cupcake – Estilo Sakura Blossom", descricao: "Cupcake de limão com cobertura de calda de morango e confetes coloridos.", observacao: "Serve uma pessoa.", preco: 10.90, imagem: "../imagens/cupcake.png" },
    { nome: "🥐 Croissant – Golpe Sombrio do Uchiha", descricao: "Croissant folhado recheado com chocolate ao leite derretido e pincelado com calda especial.", observacao: "Serve uma pessoa.", preco: 8.50, imagem: "../imagens/croissant.png" },
    { nome: "🦄 Taça Infantil Unicórnio – Invocação de Gamakichi", descricao: "Sorvete de morango com calda de amora, decoração de pasta americana em forma de unicórnio e MM's.", observacao: "👤Serve até duas crianças.", preco: 20.00, imagem: "../imagens/tacaunicornio.png.png" },
    { nome: "🍫 Petit Gateau – Jutsu do Dragão Negro", descricao: "Bolinhas de massa de chocolate quente com sorvete de creme ao lado e calda quente.", observacao: "Serve uma pessoa.", preco: 19.90, imagem: "../imagens/petitgateau.png.png" },
    { nome: "🍩 Sonho – Sonho do Tsukuyomi Infinito", descricao: "Sonho frito recheado com leite condensado e polvilhado com açúcar e canela.", observacao: "Serve uma pessoa.", preco: 7.00, imagem: "../imagens/doce.png.png" },
    { nome: "☕ Café – Chakra da Madrugada", descricao: "Café Jamaica Blue Mountain, adoçado na medida com leite semidesnatado.", observacao: "Serve uma pessoa.", preco: 7.50, imagem: "../imagens/cafe.png.png" },
    { nome: "🍰 Bolo de Morango – Chakra do Amanhecer", descricao: "Bolo de morango macio com cobertura de morangos frescos...", observacao: "👤👤👤Serve até quatro pessoas.", preco: 22.00, imagem: "../imagens/bolomorango.png.png" }
  ];

  function mostrarErro(msg) {
    const msgEl = document.createElement('div');
    msgEl.className = 'error-temp';
    msgEl.textContent = msg;
    container.prepend(msgEl);
    setTimeout(() => msgEl.remove(), 2000);
  }

  function atualizarRodape() {
    // agora comentado, pois não usamos mais total estático
    // const totalElem = document.getElementById('total');
    // const valorElem = document.getElementById('valor-total');
    // const qtd = pedido.length;
    // const valor = pedido.reduce((sum, p) => sum + p.preco, 0);
    // totalElem.textContent = `Total de Itens: ${qtd}`;
    // valorElem.textContent = `Total em Dinheiro: R$ ${valor.toFixed(2)}`;
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
        <textarea id="obs-detail" rows="4" maxlength="50" placeholder="Retirar algo?" style="width: 100%;"></textarea>
        <div class="actions">
          <button id="add-detail" class="botao-padrao">Adicionar</button>
          <button id="remove-detail" class="botao-padrao">Remover</button>
        </div>
      </div>
    `;
    detailView.classList.remove('hidden');
    detailView.querySelector('.close-hint').onclick = hideDetail;
    detailView.querySelector('#add-detail').onclick = () => {
      pedido.push({ nome: item.nome, preco: item.preco });
      atualizarRodape();
      hideDetail();
    };
    detailView.querySelector('#remove-detail').onclick = () => {
      const i = pedido.findIndex(p => p.nome === item.nome);
      if (i > -1) pedido.splice(i, 1), atualizarRodape();
      else mostrarErro('Nada desse item no pedido!');
      hideDetail();
    };
  }

  function hideDetail() {
    detailView.classList.add('hidden');
    detailView.innerHTML = '';
  }

  // === NOVA PARTE: FINALIZAR PEDIDO E RESUMO DINÂMICO ===

  function agruparPedido() {
    const mapa = {};
    pedido.forEach(({ nome, preco }) => {
      if (!mapa[nome]) mapa[nome] = { nome, preco, qtd: 0 };
      mapa[nome].qtd++;
    });
    return Object.values(mapa);
  }

  function mostrarResumo() {
    const lista = agruparPedido();
    if (lista.length === 0) {
      mostrarErro('Nenhuma sobremesa adicionada!');
      return;
    }
    // salva na sessão
    sessionStorage.setItem('pedidoShinobi', JSON.stringify(lista));
    resumoBox.innerHTML = ''; // limpa antes

    lista.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = 'resumo-item';
      div.innerHTML = `
        <span>${item.nome} — Quant: <span id="qtd-${idx}">${item.qtd}</span></span>
        <button class="botao-padrao" data-idx="${idx}" data-delta="1">+</button>
        <button class="botao-padrao" data-idx="${idx}" data-delta="-1">−</button>
      `;
      resumoBox.appendChild(div);
    });

    // listeners dos botões +/−
    resumoBox.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx   = +btn.dataset.idx;
        const delta = +btn.dataset.delta;
        const lista = JSON.parse(sessionStorage.getItem('pedidoShinobi'));
        lista[idx].qtd = Math.max(1, lista[idx].qtd + delta);
        sessionStorage.setItem('pedidoShinobi', JSON.stringify(lista));
        document.getElementById(`qtd-${idx}`).textContent = lista[idx].qtd;
      });
    });
  }

  finalizarBtn.addEventListener('click', mostrarResumo);
});
