import { io } from "socket.io-client";

// =======================
// 1. SOCKET.IO
// =======================
const socket = io(import.meta.env.PUBLIC_JOB_BASE_URL, {
  transports: ["websocket"],
});

socket.on("commentDeleted", (id) => {
  document.querySelector(`[data-comment="${id}"]`)?.remove();
});

socket.on("newComment", (comment) => {
  mostrarComentario(comment);
});

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

// =======================
// 2. AUTENTICACIÓN
// =======================
let currentUser = null;

async function checkAuth() {
  try {
    const res = await fetch(
      `${import.meta.env.PUBLIC_JOB_BASE_URL}/auth/me`,
      { credentials: "include" }
    );

    if (!res.ok) {
      // Usuario NO autenticado
      currentUser = null;
      document.querySelector("#login-section").style.display = "flex";
      document.querySelector("#comment-form").style.display = "none";
      document.querySelector("#user-info").style.display = "none";
      return null;
    }

    // Usuario autenticado
    const user = await res.json();
    currentUser = user; 

    document.querySelector("#login-section").style.display = "none";
    document.querySelector("#comment-form").style.display = "block";

      document.querySelector("#user-info").innerHTML = `
      <div class="user-info-box">
        <p>Conectado como <strong>${user.name}</strong></p>
        <button id="logout-btn" class="logout-btn">Cerrar sesión</button>
      </div>
    `;

    document.querySelector("#user-info").style.display = "block";

    return user;

  } catch (err) {
    console.error("Error verificando autenticación", err);
  }
}

(async () => {
  await checkAuth();
})();


// =======================
// 3. FORMULARIO DE COMENTARIOS
// =======================
document.querySelector("#comment-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    comment: formData.get("comment"),
  };

  const API_URL = `${import.meta.env.PUBLIC_JOB_BASE_URL}/comments`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Error al guardar el comentario");

    e.target.reset();
  } catch (error) {
    console.error(error);
    alert("Hubo un problema al enviar tu comentario.");
  }
});

// =======================
// 4. RENDERIZAR COMENTARIOS
// =======================
function mostrarComentario({
  id,
  content,
  createdAt,
  likes = 0,
  hearts = 0,
  fires = 0,
  user,
}) {
  const container = document.getElementById("comments-container");
  const date = new Date(createdAt).toLocaleString("es-VE", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const div = document.createElement("div");
  div.classList.add("comment");
  div.dataset.comment = id;

  div.innerHTML = `
    <p><strong>${user?.name ?? "Usuario"}</strong> <em>${date}</em></p>
    <p>${content}</p>
    <div class="reactions" data-id="${id}">
      <button class="reaction" data-type="like">👍 <span>${likes}</span></button>
      <button class="reaction" data-type="heart">❤️ <span>${hearts}</span></button>
      <button class="reaction" data-type="fire">🔥 <span>${fires}</span></button>
    </div>

    ${currentUser && user && currentUser.id === user.id ? `
    <button class="delete-comment" data-id="${id}">🗑 Eliminar</button>
  ` : ""}

  `;

  container.prepend(div);
}

// =======================
// 5. LOGOUT
// =======================
document.addEventListener("click", async (e) => {
  if (e.target.id === "logout-btn") {
    await fetch(`${import.meta.env.PUBLIC_JOB_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    location.reload();
  }
});

// =======================
// 6. REACCIONES
// =======================
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

      await response.json();
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar la reacción.");
    }
  }
});

// =======================
// 7. CARGAR COMENTARIOS EXISTENTES
// =======================
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

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-comment")) {
    const id = e.target.dataset.id;

    const confirmDelete = confirm("¿Seguro que deseas eliminar este comentario?");
    if (!confirmDelete) return;

    const res = await fetch(`${import.meta.env.PUBLIC_JOB_BASE_URL}/comments/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      document.querySelector(`[data-comment="${id}"]`)?.remove();
    }
  }
});
