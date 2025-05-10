// script.js
function alertaBoasVindas() {
  alert("Bem-vindo ao Desperdício Zero! Explore os relatórios e reduza o desperdício.");
}

function carregarRelatorio() {
  const lista = document.getElementById("lista-despesas");
  if (!lista) return;

  fetch("dados.json")
    .then(response => {
      if (!response.ok) throw new Error("Erro ao carregar dados");
      return response.json();
    })
    .then(pratos => {
      pratos.forEach(prato => {
        const li = document.createElement("li");
        li.className = "flex justify-between";

        const spanNome = document.createElement("span");
        spanNome.textContent = prato.nome;

        const spanRetornos = document.createElement("span");
        spanRetornos.textContent = `${prato.Retornos}`;
        spanRetornos.className = "font-bold";

        if (prato.Retornos >= 30) {
          spanRetornos.classList.add("text-red-600");
        } else if (prato.Retornos >= 20) {
          spanRetornos.classList.add("text-yellow-500");
        } else {
          spanRetornos.classList.add("text-green-600");
        }

        li.appendChild(spanNome);
        li.appendChild(spanRetornos);
        lista.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Erro:", error);
      lista.innerHTML = "<li class='text-red-600'>Erro ao carregar os dados.</li>";
    });
}

async function carregarCardapio() {
  const container = document.getElementById("cardapio-container");
  if (!container) return;

  try {
    const [porcoesResp, retornosResp] = await Promise.all([
      fetch("porcoes.json"),
      fetch("retornos.json")
    ]);

    if (!porcoesResp.ok || !retornosResp.ok) {
      throw new Error("Erro ao carregar os arquivos JSON");
    }

    const porcoes = await porcoesResp.json();
    const retornos = await retornosResp.json();

    container.innerHTML = ""; // Limpa conteúdo anterior

    porcoes.forEach(itemPorcao => {
      const itemRetorno = retornos.find(r => r.item === itemPorcao.item);
      if (!itemRetorno) return;

      const taxaRetorno = itemRetorno.retornadosSemana / itemRetorno.vendidosSemana;
      const novaPorcao = Math.round(itemPorcao.porcaoAtual * (1 - taxaRetorno));

      const card = document.createElement("div");
      card.className = "bg-white p-4 rounded shadow";

      const titulo = document.createElement("h3");
      titulo.className = "text-lg font-semibold";
      titulo.textContent = itemPorcao.item;

      const porcaoTexto = document.createElement("p");
      porcaoTexto.textContent = `Porção atual: ${itemPorcao.porcaoAtual}g`;

      const sugestaoTexto = document.createElement("p");
      sugestaoTexto.textContent =
        novaPorcao < itemPorcao.porcaoAtual
          ? `Sugestão: reduzir para ${novaPorcao}g`
          : "Sugestão: manter";

      card.appendChild(titulo);
      card.appendChild(porcaoTexto);
      card.appendChild(sugestaoTexto);

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Erro ao carregar dados:", error);
    container.innerHTML = "<p class='text-red-600'>Erro ao carregar o cardápio.</p>";
  }
}
