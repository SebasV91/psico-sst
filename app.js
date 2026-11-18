// Función robusta para alternar entre los módulos de la aplicación
function switchTab(tabId, event) {
  if (event) {
    event.preventDefault();
  }

  // Ocultar todas las secciones de contenido
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.classList.remove('active');
  });

  // Remover la clase active de todos los botones de navegación
  const buttons = document.querySelectorAll('.nav-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
  });

  // Mostrar el módulo seleccionado
  const targetTab = document.getElementById(tabId);
  if (targetTab) {
    targetTab.classList.add('active');
  }

  // Marcar el botón actual como activo de manera visual
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
}

// Lógica del Visor de Imágenes (Zoom Modal)
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImg');
  const closeBtn = document.querySelector('.modal-close');

  // Seleccionar todas las imágenes con zoom
  const zoomImages = document.querySelectorAll('.zoomable-img');

  zoomImages.forEach(img => {
    img.addEventListener('click', function() {
      modal.style.display = 'block';
      modalImg.src = this.src;
    });
  });

  // Cerrar modal al hacer clic en la X
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  // Cerrar modal al hacer clic fuera de la imagen
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// Escala de puntuación Likert (1 al 4) para las mediciones grupales
const scaleScores = {
  "Siempre": 4,
  "Casi siempre": 3,
  "Casi nunca": 2,
  "Nunca": 1
};

// Procesamiento y envío de la encuesta anónima
const psicoForm = document.getElementById('psicoForm');
if (psicoForm) {
  psicoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const payload = {
      timestamp: new Date().toISOString(),
      answers: {},
      scores: {},
      totalScore: 0
    };

    let sum = 0;
    let count = 0;

    formData.forEach((value, key) => {
      payload.answers[key] = value;
      const score = scaleScores[value] || 0;
      payload.scores[key] = score;
      sum += score;
      count++;
    });

    payload.totalScore = sum;
    payload.averageScore = (sum / count).toFixed(2);

    // Registro del objeto anónimo listo para integrarse con Supabase
    console.log('Payload anónimo capturado:', payload);

    const feedback = document.getElementById('surveyFeedback');
    if (feedback) {
      feedback.style.color = '#0F766E';
      feedback.style.marginTop = '20px';
      feedback.innerText = '¡Tus respuestas han sido enviadas de forma 100% anónima! Gracias por contribuir a la salud mental en tu empresa.';
    }

    this.reset();
  });
}