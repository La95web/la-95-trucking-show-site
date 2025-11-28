document.querySelector('#comment-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    comment: formData.get('comment')
  };

  const API_URL = `${import.meta.env.PUBLIC_JOB_BASE_URL}/comments`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!response.ok) throw new Error('Error al guardar el comentario');

    const savedComment = await response.json();
    mostrarComentario(savedComment); // función para renderizarlo en tiempo real
    e.target.reset();
  } catch (error) {
    console.error(error);
    alert('Hubo un problema al enviar tu comentario.');
  }
});

function mostrarComentario({ name, content, createdAt }) {
  const container = document.getElementById('comments-container');
  const date = new Date(createdAt).toLocaleString('es-VE', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
    const div = document.createElement('div');
  div.classList.add('comment');
  div.innerHTML = `
    <strong>${name}:</strong> <em>${date}</em>
    <p>${content}</p>
    <div class="reactions">
      <button class="reaction" data-type="like">👍 <span>0</span></button>
      <button class="reaction" data-type="heart">❤️ <span>0</span></button>
      <button class="reaction" data-type="fire">🔥 <span>0</span></button>
    </div>
  `;
  container.prepend(div);
}
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('reaction')) {
    const span = e.target.querySelector('span');
    let count = parseInt(span.textContent);
    span.textContent = count + 1;
  }
});

// Cargar comentarios existentes al iniciar
document.addEventListener("DOMContentLoaded", async function() {
  const API_URL = `${import.meta.env.PUBLIC_JOB_BASE_URL}/comments`;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Error al cargar los comentarios');
    const comments = await response.json();
    comments.forEach(mostrarComentario);
  } catch (error) {
    console.error(error);
  }
});