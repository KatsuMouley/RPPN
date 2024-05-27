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

document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('ShowGaleria');
  const Show360 = document.getElementById('Show360');
  const galeria = document.getElementById('Galeria');

  toggleButton.addEventListener('click', function() {
    galeria.classList.toggle('visible');
    Show360.classList.toggle('visible');
  });
  Show360.addEventListener('click', function() {
    galeria.classList.toggle('visible');
    Show360.classList.toggle('visible');
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const gridContainer = document.getElementById("RowsGaleria");

  function imageExists(url, callback) {
      const img = new Image();
      img.onload = () => callback(true);
      img.onerror = () => callback(false);
      img.src = url;
  }

  function loadImages() {
      let i = 1;
      const folder = 'Gallery';

      function loadNextImage() {
          const imagePath = `${folder}/imagem (${i}).jpg`;
          imageExists(imagePath, (exists) => {
              if (exists) {
                  const block = `<div class="block"><img src="${imagePath}" alt="Image ${i}" loading="lazy"></div>`;
                  gridContainer.insertAdjacentHTML('beforeend', block);
                  i++;
                  loadNextImage();
              } else {
                  console.log("All images loaded or no more images found.");
                  adjustOpacity(); // Chamando após todas as imagens serem carregadas
              }
          });
      }

      loadNextImage();
  }

  loadImages();

});



// Sistema de opacidade, caso queira desabilitar, basta apenas colocar /**/ nesta função

  function calculateRows() {
      const blocks = document.querySelectorAll('.block');
      const rows = [];
      let currentRowTop = null;

      blocks.forEach(block => {
          const blockTop = block.getBoundingClientRect().top;

          if (currentRowTop === null || blockTop !== currentRowTop) {
              rows.push([]);
              currentRowTop = blockTop;
          }

          rows[rows.length - 1].push(block);
      });

      return rows;
  }

  function adjustOpacity() {
      const rows = calculateRows();
      const viewportHeight = window.innerHeight;

      rows.forEach((row, index) => {
          const rowTop = row[0].getBoundingClientRect().top;
          const rowBottom = row[0].getBoundingClientRect().bottom;

          if (rowTop < viewportHeight && rowBottom > 0) {
              // Calcula a opacidade com base na posição na tela
              const distanceFromTop = rowTop;
              const distanceFromBottom = viewportHeight - rowBottom;
              let opacity = 1;

              if (distanceFromTop > 0) {
                  opacity = 1 - (distanceFromTop / viewportHeight);
              } else if (distanceFromBottom > 0) {
                  opacity = 1 - (distanceFromBottom / viewportHeight);
              }

              // Garante que a opacidade não seja menor que 0.25 para as linhas visíveis
              opacity = Math.max(opacity, 0.75);

              row.forEach(block => {
                  block.style.opacity = opacity;
              });
          } else {
              // Linhas completamente fora da viewport terão opacidade 0
              row.forEach(block => {
                  block.style.opacity = 0.2;
              });
          }
      });
  }

  // Função para chamar adjustOpacity() constantemente
  function updateOpacity() {
      adjustOpacity();
      requestAnimationFrame(updateOpacity); // Chama a função novamente na próxima animação
  }

  // Chama a função updateOpacity() pela primeira vez
  requestAnimationFrame(updateOpacity);

 //Fim do sistema de opacidade