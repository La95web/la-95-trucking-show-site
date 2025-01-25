//modal

document.addEventListener('DOMContentLoaded', () => {
  const openModalButtons = document.querySelectorAll('.openModal');
  const modals = document.querySelectorAll('.modal');
  const closeModalButtons = document.querySelectorAll('.close');

  openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'block';
      } else {
        console.error(`Modal con ID ${modalId} no encontrado.`);
      }
    });
  });

  closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });

  window.addEventListener('click', (event) => {
    modals.forEach(modal => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
});

