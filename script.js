const mensagens = [
    // A partir daqui, os momentos da história real:
  {
    texto: "Foi naquele ônibus... onde tudo começou a mudar dentro de mim. Comecei a te enxergar com outros olhos 💘",
    imagem: "foto_onibus1.jpeg"
  },
  {
    texto: "Lembro de como eu ia em palestras só pra te ver mais um pouquinho 😌",
    imagem: "foto_palestra.jpeg"
  },
  {
    texto: "Aquele dia em que te levei para comprar um tênis... parecia simples, mas pra mim foi especial 👟❤️",
    imagem: "foto_tenis.jpeg"
  },
  {
    texto: "Nos puffs da faculdade... saiu o primeiro 'eu te amo'. Te ver sorrindo naquele momento foi tudo pra mim 💬💗",
    imagem: "foto_puffs.jpeg"
  },
  {
    texto: "Nosso primeiro beijo... no meu carro. Mágico, inesquecível 💋🚗",
    imagem: "foto_beijo.jpeg"
  },
  {
    texto: "O pedido de namoro com flores... e toda minha verdade. Obrigado por dizer sim 🌹",
    imagem: "foto_pedidoNamoro.jpeg"
  },
  {
    texto: "E quando te chegou nossas alianças... Foi um dia muito especial para mim 🌹💍",
    imagem: "foto_alianca.jpeg"
  },
  {
    texto: "Teu abraço é meu lugar favorito 🥰",
    imagem: "foto_abracoLugarFavorito.jpeg"
  },
  {
    texto: "A cada dia eu tenho mais certeza: quero uma vida ao seu lado 💑",
    imagem: "foto_aoSeuLado.jpeg"
  },
  {
    texto: "Obrigado por ser tão incrível! 🌟",
    imagem: "foto_obrigadoAmor.png"
  }
];

let indice = 0;


// Música com Howler.js
const musica = new Howl({
  src: ['musica.mp3'],
  autoplay: true,
  loop: true,
  volume: 0.5
});
function comecar() {
  document.getElementById("tela-inicial").classList.add("d-none");
  document.getElementById("mensagens").classList.remove("d-none");
  mostrarMensagem();
}

function mostrarMensagem() {
  const atual = mensagens[indice];

  const titulo = document.getElementById("titulo");
  const texto = document.getElementById("mensagem");
  const foto = document.getElementById("foto");
  const loader = document.getElementById("loader");
  const containerMensagens = document.getElementById("mensagens");

  // Esconde a mensagem, mostra o loader
  containerMensagens.classList.add("d-none");
  loader.classList.remove("d-none");

  // Cria uma promessa que carrega a imagem
  const carregarImagem = new Promise((resolve) => {
    const imgTemp = new Image();
    imgTemp.onload = () => resolve();
    imgTemp.src = atual.imagem;
  });

  // Cria uma promessa de tempo mínimo de 2 segundos
  const tempoMinimo = new Promise((resolve) => setTimeout(resolve, 500));

  // Espera a imagem e o tempo mínimo
  Promise.all([carregarImagem, tempoMinimo]).then(() => {
    // Atualiza o conteúdo
    texto.innerText = atual.texto;
    foto.src = atual.imagem;

    // Esconde loader, mostra conteúdo
    loader.classList.add("d-none");
    containerMensagens.classList.remove("d-none");

    // Anima a entrada dos elementos
    anime({
      targets: [titulo, texto, foto],
      opacity: [0, 1],
      translateY: [-10, 0],
      duration: 600,
      easing: "easeOutExpo"
    });
  });
}


function mostrarProxima() {
  indice++;
  if (indice < mensagens.length) {
    mostrarMensagem();
  } else {
    document.getElementById("mensagens").classList.add("d-none");
    document.getElementById("final").classList.remove("d-none");

    anime({
      targets: "#final",
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1200,
      easing: "easeOutExpo"
    });
  }
}

// corações caindo
function criarCoração() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerText = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (Math.random() * 2 + 3) + "s";
  document.getElementById("hearts-container").appendChild(heart);

  setTimeout(() => heart.remove(), 5000);
}
setInterval(criarCoração, 300);

document.getElementById("input-foto").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const preview = document.getElementById("foto-preview");
    preview.src = URL.createObjectURL(file);
    preview.classList.remove("d-none");
  }
});
