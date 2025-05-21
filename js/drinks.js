document.addEventListener('DOMContentLoaded', () => {
  const menuContainer   = document.getElementById('menu');
  const detailView      = document.getElementById('detail-view');
  const summaryView     = document.getElementById('summary-view');
  const btnConfirmar    = document.getElementById('confirmar-pedido');
  const btnCloseSummary = document.getElementById('close-summary');
  const pedido          = [];

 const drinks = [
    { nome: "🍍 Piña Colada", descricao: "Rum, leite de coco e suco de abacaxi gelado.", observacao: "👤 Serve uma pessoa.", preco: 20.00, imagem: "../imagens/pinacolada.png.png" },
    { nome: "🍸 Margarita", descricao: "Tequila, licor de laranja e suco de limão.", observacao: "👤 Serve uma pessoa.", preco: 22.00, imagem: "../imagens/margarita.png.jpeg" },
    { nome: "🌿 Mojito", descricao: "Rum branco, hortelã, açúcar, limão e água com gás.", observacao: "👤 Serve uma pessoa.", preco: 18.50, imagem: "../imagens/mojito.png.jpeg" },
    { nome: "🍋 Caipirinha", descricao: "Cachaça, açúcar e limão fresco.", observacao: "👤 Serve uma pessoa.", preco: 15.00, imagem: "../imagens/caipirosca.png" },
    { nome: "🍹 Daiquiri", descricao: "Rum branco, suco de limão e açúcar.", observacao: "👤 Serve uma pessoa.", preco: 19.00, imagem: "../imagens/daiquiri.png.jpeg" },
    { nome: "🌅 Tequila Sunrise", descricao: "Tequila, suco de laranja e groselha.", observacao: "👤 Serve uma pessoa.", preco: 21.00, imagem: "../imagens/tequila.png" },
    { nome: "🍊 Negroni", descricao: "Gin, vermute rosso e campari.", observacao: "👤 Serve uma pessoa.", preco: 25.00, imagem: "../imagens/negroni.png" },
    { nome: "🍅 Bloody Mary", descricao: "Vodka, suco de tomate, molho inglês, pimenta e suco de limão.", observacao: "👤 Serve uma pessoa.", preco: 23.00, imagem: "../imagens/bm.jpeg" },
    { nome: "🌴 Mai Tai", descricao: "Rum, licor de laranja, suco de limão e xarope de amêndoa.", observacao: "👤 Serve uma pessoa.", preco: 24.00, imagem: "../imagens/maitai.png" }
];

  detailView.classList.add('hidden');
  summaryView.classList.add('hidden');

  function agruparPedido() {
    return Object.values(pedido.reduce((map, p) => {
      const key = p.nome + '||' + p.obs;
      if (!map[key]) map[key] = { ...p, qtd: 0 };
      map[key].qtd++;
      return map;
    }, {}));
  }
  function exibirPedidoConsole(){

    const agrupamento = agruparPedido()
    console.log(agrupamento);
  }
  function setPedidoSession(){
    const pedidoAgrupado = agruparPedido();
    localStorage.setItem("pedido",JSON.stringify(pedidoAgrupado));
  }

  function renderizarResumo() {
    const lista = document.getElementById('lista-pedido');
    lista.innerHTML = '';
    let soma = 0;
    let totalItens = 0;

    agruparPedido().forEach((g, idx) => {
      lista.innerHTML += `
        <li>
          ${g.nome} x${g.qtd} - R$ ${(g.preco * g.qtd).toFixed(2)}
          <div style="font-style:italic; margin-left:10px">${g.obs}</div>
          <div class="buttons">
            <button class="decrement" data-index="${idx}">-</button>
            <button class="increment" data-index="${idx}">+</button>
          </div>
        </li>
      `;
      soma += g.preco * g.qtd;
      totalItens += g.qtd;
    });

    document.getElementById('total-pedido').textContent = soma.toFixed(2);
    document.getElementById('total-itens').textContent = totalItens;

    // Substitui ouvintes
    document.querySelectorAll('.increment').forEach(btn => {
      const clone = btn.cloneNode(true);
      btn.replaceWith(clone);
      clone.addEventListener('click', e => {
        e.stopPropagation();
        const item = agruparPedido()[e.target.dataset.index];
        console.log(item);
        pedido.push({ nome: item.nome, preco: item.preco, obs: item.obs });
        renderizarResumo();
      });
    });
    document.querySelectorAll('.decrement').forEach(btn => {
      const clone = btn.cloneNode(true);
      btn.replaceWith(clone);
      clone.addEventListener('click', e => {
        e.stopPropagation();
        const item = agruparPedido()[e.target.dataset.index];
        const i = pedido.findIndex(p => p.nome === item.nome && p.obs === item.obs);
        if (i > -1) pedido.splice(i, 1);
        renderizarResumo();
      });
    });
  }

  // Renderiza cards e configura detalhes
  drinks.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = idx;
    card.innerHTML = `
      <div class="card-left">
        <h3 class="item-name">${item.nome}</h3>
        <p class="desc">${item.descricao}</p>
        <div class="observacao">${item.observacao}</div>
        <p class="price">R$ ${item.preco.toFixed(2)}</p>
      </div>
      <div class="card-right">
        <img src="${item.imagem}" alt="${item.nome}">
      </div>
    `;
    document.getElementById('menu').appendChild(card);

    card.addEventListener('click', () => {
      detailView.innerHTML = `
        <div class="box">
          <button class="close-detail" aria-label="Fechar detalhe">❌</button>
          <h2>${item.nome}</h2>
          <img src="${item.imagem}" alt="${item.nome}">
          <p>${item.descricao}</p>
          <p><strong>R$ ${item.preco.toFixed(2)}</strong></p>
          <label for="obs-detail">Observação:</label>
          <textarea id="obs-detail" rows="5" placeholder="Observação?" style="width: 100%;"></textarea>
          <div class="actions">
            <button id="add-detail">Adicionar</button>
            <button id="remove-detail">Remover</button>
          </div>
        </div>
      `;
      detailView.classList.remove('hidden');

      detailView.querySelector('.close-detail').onclick = () => detailView.classList.add('hidden');
      detailView.querySelector('#add-detail').onclick = () => {
        const obs = detailView.querySelector('#obs-detail').value.trim() || item.observacao;
        pedido.push({ nome: item.nome, preco: item.preco, obs });
        detailView.classList.add('hidden');
      };
      detailView.querySelector('#remove-detail').onclick = () => {
        const obs = detailView.querySelector('#obs-detail').value.trim() || item.observacao;
        const i = pedido.findIndex(p => p.nome === item.nome && p.obs === obs);
        if (i > -1) pedido.splice(i, 1);
        detailView.classList.add('hidden');
      };
    });
  });

  btnConfirmar.onclick = () => {
    renderizarResumo();

    summaryView.classList.remove('hidden');
  };

  document.getElementById("button-finsh").addEventListener('click', () => {
    exibirPedidoConsole();

    setPedidoSession();
  })


  btnCloseSummary.onclick = () => summaryView.classList.add('hidden');
});
document.querySelector("#return-button").classList.add("hide");


