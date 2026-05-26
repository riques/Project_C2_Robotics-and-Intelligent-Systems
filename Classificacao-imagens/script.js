let model;
let video = document.getElementById('webcam');
let detectandoWebcam = false;

// ---------------------------------------------------
// 1. DETECÇÃO POR FOTO (PREFERÊNCIA DO PROFESSOR)
// ---------------------------------------------------
document.getElementById('uploadFoto').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const statusEl = document.getElementById('status');
  statusEl.innerText = "Carregando modelo SSD MobileNet. Aguarde...";
  detectandoWebcam = false; // Para a webcam se estiver rodando

  // Ajusta a interface
  document.getElementById('containerWebcam').style.display = 'none';
  const containerFoto = document.getElementById('containerFoto');
  containerFoto.style.display = 'inline-block';

  const img = document.getElementById('imgEstatica');
  img.src = URL.createObjectURL(file);

  img.onload = async () => {
    // Carrega o modelo apenas se ainda não foi carregado
    if (!model) model = await cocoSsd.load();
    
    statusEl.innerText = "Analisando a imagem...";

    const canvas = document.getElementById('canvasFoto');
    const context = canvas.getContext('2d');
    
    // Ajusta o canvas para o tamanho da foto renderizada
    canvas.width = img.width;
    canvas.height = img.height;

    // Faz a detecção
    const predicoes = await model.detect(img);

    // Limpa desenhos anteriores
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha as caixas (Bounding Boxes)
    predicoes.forEach(predicao => {
      const [x, y, width, height] = predicao.bbox;
      
      context.strokeStyle = "#e74c3c"; // Vermelho
      context.lineWidth = 4;
      context.strokeRect(x, y, width, height);
      
      context.fillStyle = "#e74c3c";
      context.fillRect(x, y - 24, width, 24);
      
      context.fillStyle = "#FFFFFF";
      context.font = "18px Arial";
      context.fillText(`${predicao.class} - ${Math.round(predicao.score * 100)}%`, x + 5, y - 5);
    });

    statusEl.innerText = `Análise concluída! ${predicoes.length} objeto(s) encontrado(s).`;
  };
});

// ---------------------------------------------------
// 2. DETECÇÃO POR WEBCAM (EM TEMPO REAL)
// ---------------------------------------------------
async function iniciarReconhecimento() {
  const statusEl = document.getElementById('status');
  statusEl.innerText = "Carregando modelo. Aguarde...";

  document.getElementById('containerFoto').style.display = 'none';
  const containerWebcam = document.getElementById('containerWebcam');
  containerWebcam.style.display = 'inline-block';

  try {
    if (!model) model = await cocoSsd.load();
    
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { width: 640, height: 480 } 
    });
    video.srcObject = stream;
    
    video.onloadedmetadata = () => {
      const canvas = document.getElementById('canvasWebcam');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      statusEl.innerText = "Webcam Ativa! Aponte objetos para a câmera.";
      detectandoWebcam = true;
      detectarFrameWebcam(canvas);
    };
  } catch (err) {
    statusEl.innerText = "Erro ao carregar câmera.";
  }
}

async function detectarFrameWebcam(canvas) {
  if (!detectandoWebcam) return;
  const context = canvas.getContext('2d');
  
  const predicoes = await model.detect(video);
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  predicoes.forEach(predicao => {
    const [x, y, width, height] = predicao.bbox;
    
    context.strokeStyle = "#2ecc71"; // Verde
    context.lineWidth = 4;
    context.strokeRect(x, y, width, height);
    
    context.fillStyle = "#2ecc71";
    context.fillRect(x, y - 24, width, 24);
    
    context.fillStyle = "#000000";
    context.font = "18px Arial";
    context.fillText(`${predicao.class} - ${Math.round(predicao.score * 100)}%`, x + 5, y - 5);
  });

  requestAnimationFrame(() => detectarFrameWebcam(canvas));
}