const perguntas = [
  { pergunta: "1. Data do meu aniversário (formato: 00/00/0000)", resposta: "03/08/1999" },
  { pergunta: "2. Anime favorito.", resposta: "One Piece" },
  { pergunta: "3. Comida favorita", resposta: "Sushi" },
  { pergunta: "4. Comida que mais odeia", resposta: "Azeitona" },
  { pergunta: "5. Personagem favorito (formato: Sobrenome Nome)", resposta: "Roronoa Zoro" },
  { pergunta: "6. Qual foi o elo mais alto que seu amigo conseguiu no League of Legends?", resposta: "Mestre" },
  { pergunta: "7. Qual foi a patente mais alta que seu amigo conseguiu no Valorant", resposta: "Diamante" },
  { pergunta: "8. Qual personagem feminino seu amigo mais usa no Dead by Daylight (formato: Apenas Nome)", resposta: "Nea" },
  { pergunta: "9. Em qual ano seu amigo começou a jogar League of Legends?", resposta: "2010" },
  { pergunta: "10. Qual o nick do seu amigo no Habbo?", resposta: "Saax" },
  { pergunta: "11. Qual Pokémon seu amigo está tentando capturar no PXG?", resposta: "Smeargle 8" },
  { pergunta: "12. Qual curso (faculdade) seu amigo é formado?", resposta: "Publicidade e Propaganda" },
  { pergunta: "13. Quantas tatuagens o seu amigo tem?", resposta: "3" },
  { pergunta: "14. Qual o nome do animal de estimação do seu amigo?", resposta: "Safira" },
  { pergunta: "15. Qual amigo do seu amigo mais morre no PXG?", resposta: "Ph" },
  { pergunta: "16. Qual amigo do seu amigo mais chora no DBD?", resposta: "Livia" },
  { pergunta: "17. Qual amigo do seu amigo passa fome pra sair do Gold no LoL?", resposta: "Teteu" },
  { pergunta: "18. Qual amigo do seu amigo não nasceu pra jogar de ADC no ARAM?", resposta: "Junin" }
];

let perguntaAtual = 0;
let tempoRestante = 120;

const perguntaTexto = document.getElementById("question-text");
const respostaInput = document.getElementById("answer-input");
const botaoEnviar = document.getElementById("submit-btn");
const timerDisplay = document.getElementById("timer-fixed");

function atualizarPergunta() {
  if (perguntaAtual < perguntas.length) {
    perguntaTexto.textContent = perguntas[perguntaAtual].pergunta;
    respostaInput.value = "";
    respostaInput.placeholder = "Digite sua resposta...";
  } else {
    perguntaTexto.textContent = "Seu amigo foi salvo. Protocol0 Zero finalizado.";
    respostaInput.style.display = "none";
    botaoEnviar.style.display = "none";
    clearInterval(intervalo);
  }
}

function glitchErro() {
  respostaInput.classList.add("error-glitch");
  setTimeout(() => respostaInput.classList.remove("error-glitch"), 400);
}


function verificarResposta() {
  const respostaUsuario = respostaInput.value.trim();
  const respostaCorreta = perguntas[perguntaAtual].resposta;

  if (respostaUsuario.toLowerCase() === respostaCorreta.toLowerCase()) {
    perguntaAtual++;
    atualizarPergunta();
  } else {
    glitchErro();
    respostaInput.value = "";
  }
}

botaoEnviar.addEventListener("click", verificarResposta);
respostaInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    verificarResposta();
  }
});

function atualizarTimer() {
  const minutos = Math.floor(tempoRestante / 60);
  const segundos = tempoRestante % 60;
  timerDisplay.textContent = `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;

  if (tempoRestante === 30) {
    timerDisplay.classList.add("red");
  }

  if (tempoRestante === 10) {
    timerDisplay.classList.add("blink");
  }

  if (tempoRestante <= 0) {
    clearInterval(intervalo);
    perguntaTexto.textContent = "Vai toma no cu carai, morri. Protocol0 Zero finalizado.";
    respostaInput.style.display = "none";
    botaoEnviar.style.display = "none";
  }

  tempoRestante--;
}

atualizarPergunta();
const intervalo = setInterval(atualizarTimer, 1000);


