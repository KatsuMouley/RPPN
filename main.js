const panoramaImage = new PANOLENS.ImagePanorama("images/panorama.jpeg");
const imageContainer = document.querySelector(".image-container");

const viewer = new PANOLENS.Viewer({
  container: imageContainer,
  autoRotate: true,
  autoRotateSpeed: 0.3,
  controlBar: false,
});

viewer.add(panoramaImage);

//---- CRIANDO GALERIA DE IMAGENS

function carregarImagens() {
  const pastaImagens = "GALERIA"; // Nome da pasta que contém as imagens
  const gridContainer = document.querySelector(".grid-container"); // Seleciona o container do grid

  // Fetch a lista de imagens da pasta
  fetch(`/${pastaImagens}`)
    .then((response) => response.json()) // Converte a resposta para JSON
    .then((imagens) => {
      // Processa cada imagem
      imagens.forEach((imagem) => {
        criarBlocoImagem(imagem); // Função para criar e exibir cada bloco de imagem
      });
    })
    .catch((error) => console.error("Erro ao carregar imagens:", error)); // Trata erros
}


function criarBlocoImagem(imagem) {
  const caminhoImagem = `/${pastaImagens}/${imagem}`; // Caminho completo da imagem
  const block = document.createElement("div"); // Cria um novo elemento div
  block.classList.add("block"); // Adiciona a classe CSS "block"

  // Cria e configura a imagem
  const img = document.createElement("img");
  img.src = caminhoImagem;
  img.alt = imagem; // Define o atributo alt da imagem
  img.style.width = "100%"; // Ajusta a largura da imagem
  img.style.height = "auto"; // Ajusta a altura automaticamente

  // Adiciona a imagem ao bloco
  block.appendChild(img);

  // Adiciona o bloco ao grid container
  gridContainer.appendChild(block);
}

window.addEventListener("load", carregarImagens); // Executa a função carregarImagens quando a página carregar