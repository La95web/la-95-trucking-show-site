import { io } from "socket.io-client";

// Conectar al backend (ajusta la URL según Railway o localhost)
const socket = io(import.meta.env.PUBLIC_JOB_BASE_URL, {
  transports: ["websocket"], // fuerza WebSocket para mayor estabilidad
});

// Escuchar nuevos comentarios desde el servidor
socket.on("newComment", (comment) => {
  mostrarComentario(comment);
});

// Escuchar actualizaciones de reacciones
socket.on("updateComment", (comment) => {
  const container = document.querySelector(
    `.reactions[data-id="${comment.id}"]`
  );
  if (container) {
    container.querySelector('[data-type="like"] span').textContent =
      comment.likes;
    container.querySelector('[data-type="heart"] span').textContent =
      comment.hearts;
    container.querySelector('[data-type="fire"] span').textContent =
      comment.fires;
  }
});

// ---------------- FORMULARIO ----------------
document.querySelector("#comment-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    comment: formData.get("comment"),
  };

  const API_URL = `${import.meta.env.PUBLIC_JOB_BASE_URL}/comments`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Error al guardar el comentario");

    // Ya no necesitas llamar mostrarComentario aquí,
    // porque el servidor emitirá "newComment" y el socket lo capturará
    await response.json();
    e.target.reset();
  } catch (error) {
    console.error(error);
    alert("Hubo un problema al enviar tu comentario.");
  }
});

// ---------------- RENDERIZAR COMENTARIOS ----------------
function mostrarComentario({
  id,
  name,
  content,
  createdAt,
  likes = 0,
  hearts = 0,
  fires = 0,
}) {
  const container = document.getElementById("comments-container");
  const date = new Date(createdAt).toLocaleString("es-VE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const div = document.createElement("div");
  div.classList.add("comment");
  div.innerHTML = `
    <p><strong>${name}:</strong> <em>${date}</em></p>
    <p>${content}</p>
    <div class="reactions" data-id="${id}">
      <button class="reaction" data-type="like">👍 <span>${likes}</span></button>
      <button class="reaction" data-type="heart">❤️ <span>${hearts}</span></button>
      <button class="reaction" data-type="fire">🔥 <span>${fires}</span></button>
    </div>
  `;
  container.prepend(div);
}

// ---------------- REACCIONES ----------------
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("reaction")) {
    const button = e.target;
    const type = button.dataset.type;
    const commentId = button.closest(".reactions").dataset.id;

    try {
      const API_URL = `${import.meta.env.PUBLIC_JOB_BASE_URL}/comments/${commentId}/reaction`;
      const response = await fetch(API_URL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });

      if (!response.ok) throw new Error("Error al actualizar reacción");

      // Ya no necesitas actualizar manualmente el contador aquí,
      // porque el servidor emitirá "updateComment" y el socket lo capturará
      await response.json();
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar la reacción front.");
    }
  }
});

// ---------------- CARGAR COMENTARIOS EXISTENTES ----------------
document.addEventListener("DOMContentLoaded", async function () {
  const API_URL = `${import.meta.env.PUBLIC_JOB_BASE_URL}/comments`;
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al cargar los comentarios");
    const comments = await response.json();
    comments.forEach(mostrarComentario);
  } catch (error) {
    console.error(error);
  }
});
