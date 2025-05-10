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

        const spanPercentual = document.createElement("span");
        spanPercentual.textContent = `${prato.percentual}%`;
        spanPercentual.className = "font-bold";

        if (prato.percentual >= 30) {
          spanPercentual.classList.add("text-red-600");
        } else if (prato.percentual >= 20) {
          spanPercentual.classList.add("text-yellow-500");
        } else {
          spanPercentual.classList.add("text-green-600");
        }

        li.appendChild(spanNome);
        li.appendChild(spanPercentual);
        lista.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Erro:", error);
      lista.innerHTML = "<li class='text-red-600'>Erro ao carregar os dados.</li>";
    });
}
