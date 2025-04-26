// sobremesas.js - Atualizado: imagem já expandida por padrão e interações

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('menu');
  const pedido = [];

  // Array completo de sobremesas
  const menu = [
    { nome: "🍰 Bolo de Chocolate – Chakra do Anoitecer", descricao: "Quatro fatias de bolo macio sabor chocolate com diamante negro, creme de leite, leite condensado da melhor qualidade e uma calda de chocolate temperado.", observacao: "👥👥 Serve até quatro pessoas.", preco: 22.50, imagem: "../imagens/bolochocolate.png.png" },
    { nome: "🍨 Taça Colegial – Equipe 7", descricao: "Duas bolas de sorvete sabor creme, cobertas com calda de morango e finalizadas com duas cerejas e confetes coloridos.", observacao: "👥Serve até duas pessoas.", preco: 15.90, imagem: "../imagens/tacacolegial.png.png" },
    { nome: "🍮 Pudim – Técnica Secreta do Clã Nara", descricao: "Pudim cremoso de doce de leite com calda de caramelo macio e textura aveludada.", observacao: "👤👥Serve até três pessoas.", preco: 12.50, imagem: "../imagens/pudim.png.png" },
    { nome: "🥤 Milk-Shake – Onda de Chakra Rosa", descricao: "Milk-shake cremoso de morango com essência natural e chantilly por cima.", observacao: "👤Serve uma pessoa.", preco: 18.00, imagem: "../imagens/milkshake.png" },
    { nome: "🧁 Cupcake – Estilo Sakura Blossom", descricao: "Cupcake de limão com cobertura de calda de morango e confetes coloridos.", observacao: "👤Serve uma pessoa.", preco: 10.90, imagem: "../imagens/cupcake.png" },
    { nome: "🥐 Croissant – Golpe Sombrio do Uchiha", descricao: "Croissant folhado recheado com chocolate ao leite derretido e pincelado com calda especial.", observacao: "👤Serve uma pessoa.", preco: 8.50, imagem: "../imagens/croissant.png" },
    { nome: "🦄 Taça Infantil Unicórnio – Invocação de Gamakichi", descricao: "Sorvete de morango com calda de amora, decoração de pasta americana em forma de unicórnio e MM's.", observacao: "Serve até duas crianças.", preco: 20.00, imagem: "../imagens/tacaunicornio.png.png" },
    { nome: "🍫 Petit Gateau – Jutsu do Dragão Negro", descricao: "Bolinhas de massa de chocolate quente com sorvete de creme ao lado e calda quente.", observacao: "👤Serve uma pessoa.", preco: 19.90, imagem: "../imagens/petitgateau.png.png" },
    { nome: "🍩 Sonho – Sonho do Tsukuyomi Infinito", descricao: "Sonho frito recheado com leite condensado e polvilhado com açúcar e canela.", observacao: "👤Serve uma pessoa.", preco: 7.00, imagem: "../imagens/doce.png.png" },
    { nome: "☕ Café – Chakra da Madrugada", descricao: "Café Jamaica Blue Mountain, adoçado na medida com leite semidesnatado.", observacao: "👤Serve uma pessoa.", preco: 7.50, imagem: "../imagens/cafe.png.png" },
    { nome: "🍰 Bolo de Morango – Chakra do Amanhecer", descricao: "Bolo de morango macio com cobertura de morangos frescos e creme chantilly.", observacao: " 👥👥Serve até quatro pessoas.", preco: 22.00, imagem: "../imagens/bolomorango.png.png" }
  ];

  // Mostra erro temporário
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
    const qtd = pedido.length;
    const valor = pedido.reduce((sum, p) => sum + p.preco, 0);
    totalElem.textContent = `Total de sobremesas: ${qtd}`;
    valorElem.textContent = `Total em dinheiro: R$ ${valor.toFixed(2)}`;
  }

  // Renderiza cards com imagem expandida por padrão
  menu.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;
    card.innerHTML = `
      <div class="card-left">
        <h3 class="item-title"><strong><em>${item.nome}</em></strong></h3>
        <p class="desc">${item.descricao}</p>
        <div class="observacao"><span class="icon-users">👥</span><span>${item.observacao}</span></div>
        <p class="price">R$ ${item.preco.toFixed(2)}</p>
       
        <!-- <label for="obs-${index}"></label>
        <input type="text" id="obs-${index}" placeholder="Retirar algo?"> -->
      </div>
      <div class="card-right">
        <img src="${item.imagem}" class="sobremesa-img" alt="${item.nome}">
      </div>
    `;
    container.appendChild(card);

    // Expande imagem por padrão
    const imgEl = card.querySelector('.sobremesa-img');
    imgEl.style.width = '200px';
    imgEl.style.height = '200px';
  });

  // Delegação de clique
  container.addEventListener('click', (e) => {
    const el = e.target;

    // Adicionar item
    if (el.classList.contains('add-btn')) {
      const idx = +el.dataset.index;
      const item = menu[idx];
      pedido.push({ nome: item.nome, preco: item.preco });
      el.disabled = true;
      el.textContent = 'Adicionado ✅';
      setTimeout(() => {
        el.textContent = 'Adicionar';
        el.disabled = false;
      }, 1000);
      atualizarRodape();
      return;
    }

    // Expandir/contrair descrição
    if (el.classList.contains('desc')) {
      el.classList.toggle('expandida');
      return;
    }

    
    
  });
;
// <button class="add-btn" data-index="${index}">Adicionar</button>
  // --- Início do detalhe genérico ---
  const detailView = document.getElementById('detail-view');

  // Função para montar e exibir o modal de detalhe
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
        <input type="text" id="obs-detail" placeholder="Retirar algo?">
        <div class="actions">
          <button id="add-detail">Adicionar</button>
          <button id="remove-detail">Remover</button>
        </div>
      </div>
    `;
    detailView.classList.remove('hidden');

    // Eventos dos botões nesse modal
    detailView.querySelector('.close-hint').onclick = () => hideDetail();
    detailView.querySelector('#add-detail').onclick = () => {
      pedido.push({ nome: item.nome, preco: item.preco });
      atualizarRodape();
      hideDetail();
    };
    detailView.querySelector('#remove-detail').onclick = () => {
      // remove o **primeiro** item igual do pedido (se existir)
      const removeIdx = pedido.findIndex(p => p.nome === item.nome);
      if (removeIdx > -1) {
        pedido.splice(removeIdx, 1);
        atualizarRodape();
      } else {
        mostrarErro('Nada desse item no pedido!');
      }
      hideDetail();
    };
  }

  function hideDetail() {
    detailView.classList.add('hidden');
    detailView.innerHTML = '';
  }

  // Intercepta clique na imagem para abrir/fechar detalhe
  // (move isso pra cima ou ajuste sua delegação, mas garanta que venha após a definição de showDetail)
  container.addEventListener('click', e => {
    const el = e.target;
    if (el.classList.contains('sobremesa-img')) {
      const card = el.closest('.card');
      const idx = +card.dataset.index;
      // Se já estiver aberto, fecha. Se não, abre:
      if (detailView.classList.contains('hidden')) {
        showDetail(idx);
      } else {
        hideDetail();
      }
    }
  });
  // --- Fim do detalhe genérico ---

