const grupos = [
  {
    tema: "Nomes que iniciam com L",
    palavras: ["LIVIA", "LUIZ", "LEONARDO", "LUCAS"]
  },
  {
    tema: "Apelidos",
    palavras: ["PH", "JUNIN", "TETEU", "SAMUCA"]
  },
  {
    tema: "MC _______",
    palavras: ["CABELINHO", "LIVINHO", "DAVI", "PEDRINHO"]
  },
  {
    tema: "Jogadores e ex-jogadores de e-sports",
    palavras: ["MIMI", "BAIANO", "FALB", "CAUANZIN"]
  }
];

const todasPalavras = grupos.flatMap(g => g.palavras);
const embaralhadas = todasPalavras.sort(() => Math.random() - 0.5);

const grid = document.getElementById("grid-palavras");
const gruposResolvidos = document.getElementById("grupos-resolvidos");
const botaoAvancar = document.getElementById("btn-avancar");

let selecionadas = [];
let resolvidos = [];

embaralhadas.forEach(palavra => {
  const div = document.createElement("div");
  div.classList.add("palavra");
  div.innerText = palavra;
  div.onclick = () => selecionar(div);
  grid.appendChild(div);
});

function selecionar(div) {
  if (div.classList.contains("bloqueada")) return;

  if (div.classList.contains("selecionada")) {
    div.classList.remove("selecionada");
    selecionadas = selecionadas.filter(d => d !== div);
    return;
  }

  if (selecionadas.length >= 4) return;

  div.classList.add("selecionada");
  selecionadas.push(div);

  if (selecionadas.length === 4) {
    const palavras = selecionadas.map(d => d.innerText);
    const grupoEncontrado = grupos.find(
      g =>
        !resolvidos.includes(g.tema) &&
        g.palavras.every(p => palavras.includes(p))
    );

    if (grupoEncontrado) {
      selecionadas.forEach(d => {
        d.classList.remove("selecionada");
        d.classList.add("bloqueada");
      });

      resolvidos.push(grupoEncontrado.tema);
      mostrarTema(grupoEncontrado.tema);
      if (resolvidos.length === 4) {
        botaoAvancar.classList.remove("oculto");
      }
    } else {
      // Erro: efeito glitch
      selecionadas.forEach(d => {
        d.classList.add("erro");
        setTimeout(() => d.classList.remove("erro", "selecionada"), 400);
      });
    }

    selecionadas = [];
  }
}

function mostrarTema(tema) {
  const div = document.createElement("div");
  div.classList.add("grupo-tema");
  div.innerText = `Grupo resolvido: ${tema}`;
  gruposResolvidos.appendChild(div);
}
