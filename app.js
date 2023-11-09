let listaDeNumerosSorteados = [];
let dificuldade = 100;
let paragrafo = `Escolha um número entre 1 e ${dificuldade}`;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let palavraTentativa = tentativas > 1 ? 'tentativa' : 'tentativas';

function exibirTexto(tag, texto) {
 let campo = document.querySelector(tag);
 campo.innerHTML = texto;
 responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibeMensagenInicial() {
  exibirTexto('h1', 'Jogo do número secreto')
  exibirTexto('p', paragrafo)
}

exibeMensagenInicial()

function verificarChute() {
  let chute = document.querySelector('input').value;
  if(chute == numeroSecreto){
    exibirTexto('h1','Acertou!')
    exibirTexto('p',`Você descobrio o número secreto com ${tentativas} ${palavraTentativa}!`)
    document.getElementById('reiniciar').removeAttribute('disabled');
  } else {
    if(chute > numeroSecreto) {
      exibirTexto('p','O número secreto é menor')
    } else {
      exibirTexto('p','O número secreto é maior')
    }
    tentativas++;
    limparCampo()
  };
}

function gerarNumeroAleatorio() {
  let numeroEscolhido = parseInt(Math.random() * dificuldade + 1);
  let quantidadeDeNumeros = listaDeNumerosSorteados.length;
  if (quantidadeDeNumeros == 10) {
    listaDeNumerosSorteados = [];
  }
  if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  } else {
    listaDeNumerosSorteados.push(numeroEscolhido);
    return numeroEscolhido
  }
}

function limparCampo() {
  chute = document.querySelector('input');
  chute.value = ''
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  limparCampo();
  tentativas = 1;
  exibeMensagenInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true)
}