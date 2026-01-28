document.addEventListener("DOMContentLoaded", () => {
  const menuOpen = document.getElementsByClassName('menuOpen')[0];
  const navlinks = document.getElementsByClassName('navlinks')[0];
  const closeMenu = document.getElementById('close-menu');
  const blurBg = document.getElementsByClassName('blur-background')[0];

  // Abrir menú
  menuOpen.addEventListener('click', () => {
      navlinks.classList.add('expanded');
      closeMenu.classList.add('show');
      blurBg.classList.add('active');
  });

  // Cerrar menú con botón
  closeMenu.addEventListener('click', () => {
      navlinks.classList.remove('expanded');
      closeMenu.classList.remove('show');
      blurBg.classList.remove('active');
  });

  // Cerrar menú al hacer click en cualquier enlace
  document.querySelectorAll('.navlinks a').forEach(link => {
      link.addEventListener('click', () => {
      navlinks.classList.remove('expanded');
      closeMenu.classList.remove('show');
      blurBg.classList.remove('active');
      });
  });

  // Cerrar menú al presionar atrás en el navegador
  window.addEventListener('popstate', () => {
      navlinks.classList.remove('expanded');
      closeMenu.classList.remove('show');
      blurBg.classList.remove('active');
  });
});
