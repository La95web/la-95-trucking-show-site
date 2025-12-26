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

function mostrarComentario({ id, name, content, createdAt, likes= 0, hearts=0, fires=0 }) {
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
    <div class="reactions" data-id="${id}">
      <button class="reaction" data-type="like">👍 <span>${likes}</span></button>
      <button class="reaction" data-type="heart">❤️ <span>${hearts}</span></button>
      <button class="reaction" data-type="fire">🔥 <span>${fires}</span></button>
    </div>
  `;
  container.prepend(div);
}
document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('reaction')) {
    const button = e.target;
    const span = button.querySelector('span');
    const type = button.dataset.type;
    const commentId = button.closest('.reactions').dataset.id;

    try {
      const API_URL = `${import.meta.env.PUBLIC_JOB_BASE_URL}/comments/${commentId}/reaction`;
      const response = await fetch(API_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });

      if (!response.ok) throw new Error('Error al actualizar reacción');

      const updatedComment = await response.json();

      // Actualizar contador según el tipo
      if (type === 'like') span.textContent = updatedComment.likes;
      if (type === 'heart') span.textContent = updatedComment.hearts;
      if (type === 'fire') span.textContent = updatedComment.fires;
    } catch (error) {
      console.error(error);
      alert('No se pudo actualizar la reacción front.');
    }
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