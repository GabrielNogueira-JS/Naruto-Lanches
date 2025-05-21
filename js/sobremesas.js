document.addEventListener('DOMContentLoaded', () => {
  // ELEMENTOS
  const menuContainer   = document.getElementById('menu');
  const detailView      = document.getElementById('detail-view');
  const summaryView     = document.getElementById('summary-view');
  const btnConfirmar    = document.getElementById('confirmar-pedido');
  const btnCloseSummary = document.getElementById('close-summary');
  const pedido          = [];

  // MENU
  const menu = [
    {
      nome:      "🍰 Bolo de Chocolate – Chakra do Anoitecer",
      descricao: "Quatro fatias de bolo macio sabor chocolate com diamante negro, creme de leite, leite condensado e calda temperada.",
      observacao:"👤👤👤👤 Serve até quatro pessoas.",
      preco:     22.50,
      imagem:    "../imagens/bolochocolate.png.png"
    },
    {
      nome: "🍨 Taça Colegial – Equipe 7",
      descricao: "Duas bolas de sorvete sabor creme, cobertas com calda de morango e finalizadas com duas cerejas e confetes coloridos.",
      observacao: "👤👤Serve até duas pessoas.",
      preco: 15.90,
      imagem: "../imagens/tacacolegial.png.png"
    },
    {
      nome: "🍮 Pudim – Técnica Secreta do Clã Nara",
      descricao: "Pudim cremoso de doce de leite com calda de caramelo macio e textura aveludada.",
      observacao: "👤👤👤Serve até três pessoas.",
      preco: 12.50,
      imagem: "../imagens/pudim.png.png"
    },
    {
      nome: "🥤 Milk-Shake – Onda de Chakra Rosa",
      descricao: "Milk-shake cremoso de morango com essência natural e chantilly por cima.",
      observacao: "👤Serve uma pessoa.",
      preco: 18.00,
      imagem: "../imagens/milkshake.png"
    },
    {
      nome: "🧁 Cupcake – Estilo Sakura Blossom",
      descricao: "Cupcake de limão com cobertura de calda de morango e confetes coloridos.",
      observacao: "👤Serve uma pessoa.",
      preco: 10.90,
      imagem: "../imagens/cupcake.png"
    },
    {
      nome: "🥐 Croissant – Golpe Sombrio do Uchiha",
      descricao: "Croissant folhado recheado com chocolate ao leite derretido e pincelado com calda especial.",
      observacao: "👤Serve uma pessoa.",
      preco: 8.50,
      imagem: "../imagens/croissant.png"
    },
    {
      nome: "🦄 Taça Infantil Unicórnio – Invocação de Gamakichi",
      descricao: "Sorvete de morango com calda de amora, decoração de pasta americana em forma de unicórnio e MM's.",
      observacao: "👤👤Serve até duas crianças.",
      preco: 20.00,
      imagem: "../imagens/tacaunicornio.png.png"
    },
    {
      nome: "🍫 Petit Gateau – Jutsu do Dragão Negro",
      descricao: "Bolinhas de massa de chocolate quente com sorvete de creme ao lado e calda quente.",
      observacao: "👤Serve uma pessoa.",
      preco: 19.90,
      imagem: "../imagens/petitgateau.png.png"
    },
    {
      nome: "🍩 Sonho – Sonho do Tsukuyomi Infinito",
      descricao: "Sonho frito recheado com leite condensado e polvilhado com açúcar e canela.",
      observacao: "👤Serve uma pessoa.",
      preco: 7.00,
      imagem: "../imagens/doce.png.png"
    },
    {
      nome: "☕ Café – Chakra da Madrugada",
      descricao: "Café Jamaica Blue Mountain, adoçado na medida com leite semidesnatado.",
      observacao: "👤Serve uma pessoa.",
      preco: 7.50,
      imagem: "../imagens/cafe.png.png"
    },
    {
      nome:      "🍰 Bolo de Morango – Chakra do Amanhecer",
      descricao: "Bolo de morango macio com cobertura de morangos frescos...",
      observacao:"👤👤👤👤 Serve até quatro pessoas.",
      preco:     22.00,
      imagem:    "../imagens/bolomorango.png.png"
    }
  ];

  // Inicia modais ocultos
  detailView.classList.add('hidden');
  summaryView.classList.add('hidden');

  // Atualiza contador e total
  

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

    // Adiciona ouvintes nos botões de + e -
    document.querySelectorAll('.increment').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const item = agruparPedido()[e.target.dataset.index];
        pedido.push({ nome: item.nome, preco: item.preco, obs: item.obs });
        renderizarResumo();
      
      });
    });

    document.querySelectorAll('.decrement').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const item = agruparPedido()[e.target.dataset.index];
        const i = pedido.findIndex(p => p.nome === item.nome && p.obs === item.obs);
        if (i > -1) pedido.splice(i, 1);
        renderizarResumo();
    
      });
    });
  }

  // Renderiza cards e detalhe
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

    card.addEventListener('click', () => {
      detailView.innerHTML = `
        <div class="box">
          <button class="close-detail" aria-label="Fechar detalhe">❌</button>
          <h2>${item.nome}</h2>
          <img src="${item.imagem}" alt="${item.nome}">
          <p>${item.descricao}</p>
          <p><strong>R$ ${item.preco.toFixed(2)}</strong></p>
          <label for="obs-detail">Observação:</label>
          <textarea id="obs-detail" rows="5" placeholder="Observação?"></textarea>
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

  // Abre e fecha modal de resumo
  btnConfirmar.onclick = () => {
    renderizarResumo();
    summaryView.classList.remove('hidden');
  };

  btnCloseSummary.onclick = () => {
    summaryView.classList.add('hidden');
  };

  // Inicializa rodapé
 
}); 
document.getElementById('botao-finalizar').addEventListener('click', () => {
  finalizarPedido();

});
function finalizarPedido() {
    pedido.forEach((item) => {
      console.log(`Item: ${item.nome}, Preço: R$ ${item.preco.toFixed(2)}, Observação: ${item.obs}`);
    });
}
document.getElementById('botao-finalizar')
  .addEventListener('click', () => {
    const total = parseFloat(document.getElementById('total-pedido').textContent);
    const pedidoId = String(Math.floor(Math.random() * 900) + 100); // ex: 123
    window.location.href = `pagamento.html?order=${pedidoId}&total=${total.toFixed(2)}`;
  });