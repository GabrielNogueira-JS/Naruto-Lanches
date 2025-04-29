document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('menu');
  const detailView = document.getElementById('detail-view');
  const finalizarBtn = document.getElementById('finalizar-pedido');
  const qtdEl = document.getElementById('quantidade-itens');
  const valEl = document.getElementById('valor-total');

  const pedido = [];

  const menu = [
    { nome: "🍰 Bolo de Chocolate – Chakra do Anoitecer", descricao: "Quatro fatias de bolo macio sabor chocolate com diamante negro...", observacao: "👤👤👤👤 Serve até quatro pessoas.", preco: 22.50, imagem: "../imagens/bolochocolate.png.png" },
    { nome: "🍨 Taça Colegial – Equipe 7", descricao: "Duas bolas de sorvete sabor creme, cobertas com calda de morango...", observacao: "👤👤Serve até duas pessoas.", preco: 15.90, imagem: "../imagens/tacacolegial.png.png" },
    { nome: "🍮 Pudim – Técnica Secreta do Clã Nara", descricao: "Pudim cremoso de doce de leite com calda de caramelo...", observacao: "👤👤👤Serve até três pessoas.", preco: 12.50, imagem: "../imagens/pudim.png.png" },
    { nome: "🥤 Milk-Shake – Onda de Chakra Rosa", descricao: "Milk-shake cremoso de morango com essência natural...", observacao: "👤Serve uma pessoa.", preco: 18.00, imagem: "../imagens/milkshake.png" },
    { nome: "🧁 Cupcake – Estilo Sakura Blossom", descricao: "Cupcake de limão com cobertura de calda de morango...", observacao: "👤Serve uma pessoa.", preco: 10.90, imagem: "../imagens/cupcake.png" },
    { nome: "🥐 Croissant – Golpe Sombrio do Uchiha", descricao: "Croissant folhado recheado com chocolate ao leite...", observacao: "👤Serve uma pessoa.", preco: 8.50, imagem: "../imagens/croissant.png" },
    { nome: "🦄 Taça Infantil Unicórnio – Invocação de Gamakichi", descricao: "Sorvete de morango com calda de amora...", observacao: "👤👤Serve até duas crianças.", preco: 20.00, imagem: "../imagens/tacaunicornio.png.png" },
    { nome: "🍫 Petit Gateau – Jutsu do Dragão Negro", descricao: "Bolinhas de massa de chocolate quente com sorvete...", observacao: "👤Serve uma pessoa.", preco: 19.90, imagem: "../imagens/petitgateau.png.png" },
    { nome: "🍩 Sonho – Sonho do Tsukuyomi Infinito", descricao: "Sonho frito recheado com leite condensado...", observacao: "👤Serve uma pessoa.", preco: 7.00, imagem: "../imagens/doce.png.png" },
    { nome: "☕ Café – Chakra da Madrugada", descricao: "Café Jamaica Blue Mountain, adoçado na medida...", observacao: "👤Serve uma pessoa.", preco: 7.50, imagem: "../imagens/cafe.png.png" },
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

  function adicionarItem(item) {
    const existe = pedido.find(p => p.nome === item.nome && p.observacao === '');
    if (!existe && pedido.length < 10) {
      pedido.push({ nome: item.nome, preco: item.preco, observacao: '' });
      atualizarResumoRodape();
    } else if (existe) {
      mostrarErro('Esse item já está no pedido!');
    }
  }

  function removerItem(item) {
    const idx = pedido.findIndex(p => p.nome === item.nome && p.observacao === '');
    if (idx > -1) {
      pedido.splice(idx, 1);
      atualizarResumoRodape();
    } else {
      mostrarErro('Esse item não está no pedido!');
    }
  }

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
        <img src="${item.imagem}" alt="${item.nome}" width="80" height="80"/>
      </div>
    `;
    container.appendChild(card);

    card.addEventListener('click', () => {
      // Mostrar detalhes ao tocar no card
      if (detailView.classList.contains('hidden')) {
        detailView.classList.remove('hidden');
        detailView.innerHTML = `
          <h3>${item.nome}</h3>
          <p>${item.descricao}</p>
          <p>Preço: R$ ${item.preco.toFixed(2)}</p>
          <p>${item.observacao}</p>
        `;
      } else {
        detailView.classList.add('hidden');
      }
    });
  });

  finalizarBtn.addEventListener('click', () => {
    // Finalizar pedido e talvez mostrar alguma tela de confirmação
    alert('Pedido finalizado!');
  });

  atualizarResumoRodape();
});
