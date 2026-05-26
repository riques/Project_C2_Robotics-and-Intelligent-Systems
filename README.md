# Detecção de Objetos com IA - SSD MobileNet
Projeto da disciplina de Robótica e Sistemas Inteligentes. 

Alunos: 

Henrique De Nadai Salvador

Jeferson Moraes Pereira de Sousa

Nesta etapa, o projeto evoluiu da simples classificação de imagens para o **reconhecimento e detecção de objetos** utilizando o algoritmo SSD acoplado ao MobileNet.

## Tecnologias Utilizadas
* HTML5, CSS3, JavaScript
* TensorFlow.js
* Modelo Pré-treinado: COCO-SSD (MobileNet)

## Funcionalidades
* **Detecção em Fotos Estáticas:** Permite o upload de uma imagem onde a rede neural desenha *bounding boxes* (caixas delimitadoras) ao redor dos objetos identificados, exibindo a classe e a porcentagem de confiança da predição.
* **Detecção em Tempo Real (Webcam):** Captura o feed de vídeo da câmera e realiza inferências frame a frame para detecção simultânea, demonstrando a leveza e eficiência do algoritmo rodando no navegador do cliente (*Edge Computing*).

## Como executar o projeto localmente
1. Faça o clone deste repositório ou baixe o arquivo ZIP.
2. Abra a pasta do projeto em um editor de código, como o **VS Code**.
3. Instale a extensão **Live Server** (caso não a tenha instalada).
4. Clique com o botão direito no arquivo `index.html` e selecione **"Open with Live Server"**. 
5. O projeto abrirá no seu navegador padrão e já estará pronto para testes.
