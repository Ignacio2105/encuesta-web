function mostrarPregunta() {
  const carta = document.getElementById('carta');
  const pregunta = document.getElementById('pregunta');

  carta.style.transform = 'rotateY(180deg)';

  setTimeout(() => {
    carta.style.display = 'none';
    pregunta.style.display = 'block';

    setTimeout(() => {
      pregunta.style.transform = 'rotateY(0deg)';
      configurarBotonNo();
    }, 50);
  }, 400);
}

function configurarBotonNo() {
  const btnNo = document.getElementById('btnNo');
  const container = document.querySelector('.btn-container');
  const containerRect = container.getBoundingClientRect();

  // Configurar posición inicial
  btnNo.style.position = 'absolute';
  btnNo.style.left = '50%';
  btnNo.style.top = '50%';
  btnNo.style.transform = 'translate(-50%, -50%)';

  // Función para mover el botón a posición aleatoria
  function moverBoton() {
    const maxX = containerRect.width - btnNo.offsetWidth;
    const maxY = containerRect.height - btnNo.offsetHeight;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    btnNo.style.left = `${newX}px`;
    btnNo.style.top = `${newY}px`;
    btnNo.style.transform = 'none';

    // Pequeño efecto visual
    btnNo.style.opacity = 0.8 + Math.random() * 0.2;
  }

  // Mover el botón cuando el mouse entra
  btnNo.addEventListener('mouseenter', function () {
    moverBoton();
  });

  // Para móviles: mover al tocar
  btnNo.addEventListener('touchstart', function (e) {
    e.preventDefault();
    moverBoton();
  }, { passive: false });

  // Prevenir cualquier acción al hacer clic
  btnNo.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    moverBoton();
    return false;
  });
}

function enviarRespuesta(respuesta) {
  // Solo funciona para el botón Sí
  if (respuesta === 'Sí') {
    fetch('https://api-encuesta.onrender.com/guardar_respuesta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ respuesta })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Respuesta guardada:', data);
        document.getElementById('mensaje').style.display = 'block';
      })
      .catch(error => console.error('Error al guardar la respuesta:', error));
  }
}