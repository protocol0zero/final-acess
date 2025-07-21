function verificarSenha() {
  const input = document.getElementById('senha');
  const senha = input.value.trim();
  const botao = document.querySelector('.formulario button');

  // Lista de senhas válidas
  const senhasValidas = ['3', '22/03/2022'];

  if (senhasValidas.includes(senha)) {
    window.location.href = 'desafio3.html';
  } else {
    botao.classList.add('glitch-btn');
    setTimeout(() => {
      botao.classList.remove('glitch-btn');
    }, 300);
  }
}

// Suporte à tecla Enter
document.getElementById('senha').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    verificarSenha();
  }
});



