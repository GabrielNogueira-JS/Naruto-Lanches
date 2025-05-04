document.addEventListener('DOMContentLoaded', () => {
  const container     = document.getElementById('menu');
  const detailView    = document.getElementById('detail-view');
  const summaryView   = document.getElementById('summary-view');
  const finalizarBtn  = document.getElementById('finalizar-pedido');
  const closeSummary  = document.getElementById('close-summary');
  const pedido        = [];

  // Menu com .png.png mantido
  const menu = [
    { nome: "🍰 Bolo de Chocolate – Chakra do Anoitecer", descricao: "Quatro fatias de bolo macio sabor chocolate com diamante negro, creme de leite, leite condensado da melhor qualidade e uma calda de chocolate temperado.", observacao: "👤👤👤 Serve até quatro pessoas.", preco: 22.50, imagem: "../imagens/bolochocolate.png.png" },
    { nome: "🍨 Taça Colegial – Equipe 7",              descricao: "Duas bolas de sorvete sabor creme, cobertas com calda de morango e finalizadas com duas cerejas e confetes coloridos.", observacao: "👤Serve até duas pessoas.",          preco: 15.90, imagem: "../imagens/tacacolegial.png.png" },
    { nome: "🍮 Pudim – Técnica Secreta do Clã Nara",   descricao: "Pudim cremoso de doce de leite com calda de caramelo macio e textura aveludada.", observacao: "👤👤Serve até três pessoas.",         preco: 12.50, imagem: "../imagens/pudim.png.png" },
    { nome: "🥤 Milk-Shake – Onda de Chakra Rosa",      descricao: "Milk-shake cremoso de morango com essência natural e chantilly por cima.", observacao: "Serve uma pessoa.",               preco: 18.00, imagem: "../imagens/milkshake.png" },
    { nome: "🧁 Cupcake – Estilo Sakura Blossom",      descricao: "Cupcake de limão com cobertura de calda de morango e confetes coloridos.", observacao: "Serve uma pessoa.",               preco: 10.90, imagem: "../imagens/cupcake.png" },
    { nome: "🥐 Croissant – Golpe Sombrio do Uchiha",   descricao: "Croissant folhado recheado com chocolate ao leite derretido e pincelado com calda especial.", observacao: "Serve uma pessoa.", preco: 8.50,  imagem: "../imagens/croissant.png" },
    { nome: "🦄 Taça Infantil Unicórnio – Invocação de Gamakichi", descricao: "Sorvete de morango com calda de amora, decoração de pasta americana em forma de unicórnio e MM's.", observacao: "👤Serve até duas crianças.", preco: 20.00, imagem: "../imagens/tacaunicornio.png.png" },
    { nome: "🍫 Petit Gateau – Jutsu do Dragão Negro", descricao: "Bolinhas de massa de chocolate quente com sorvete de creme ao lado e calda quente.", observacao: "Serve uma pessoa.", preco: 19.90, imagem: "../imagens/petitgateau.png.png" },
    { nome: "🍩 Sonho – Sonho do Tsukuyomi Infinito",  descricao: "Sonho frito recheado com leite condensado e polvilhado com açúcar e canela.", observacao: "Serve uma pessoa.", preco: 7.00,  imagem: "../imagens/doce.png.png" },
    { nome: "☕ Café – Chakra da Madrugada",           descricao: "Café Jamaica Blue Mountain, adoçado na medida com leite semidesnatado.", observacao: "Serve uma pessoa.", preco: 7.50,  imagem: "../imagens/cafe.png.png" },
    { nome: "🍰 Bolo de Morango – Chakra do Amanhecer", descricao: "Bolo de morango macio com cobertura de morangos frescos...", observacao: "👤👤👤Serve até quatro pessoas.", preco: 22.00, imagem: "../imagens/bolomorango.png.png" }
  ];

  // Esconde modais inicialmente
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
    const totalElem = document.getElementById('total');
    const valorElem = document.getElementById('valor-total');
    totalElem.textContent = `Total de Sobremesas: ${pedido.length}`;
    const valor = pedido.reduce((sum, p) => sum + p.preco, 0);
    valorElem.textContent = `Total em Dinheiro: R$ ${valor.toFixed(2)}`;
  }

  // Renderiza os cards do menu
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
          <textarea id="obs-detail" rows="3" placeholder="Retirar algo?"></textarea>
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

  // Agrupa por nome+obs
  function agruparPedido() {
    const mapa = {};
    pedido.forEach(p => {
      const key = `${p.nome}||${p.obs}`;
      if (!mapa[key]) mapa[key] = { ...p, qtd: 0 };
      mapa[key].qtd++;
    });
    return Object.values(mapa);
  }

  // Render do resumo no modal
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

  // Finalizar → abre o modal de resumo
finalizarBtn.addEventListener('click', () => {
  renderizarResumo(); // renderiza os itens
  summaryView.classList.remove('hidden'); // exibe o modal
});

// Fecha o modal de resumo
closeSummary.addEventListener('click', () => {
  summaryView.classList.add('hidden'); // esconde o modal
});
// Sem alterações 
  // Inicializa rodapé
  atualizarRodape();
});
