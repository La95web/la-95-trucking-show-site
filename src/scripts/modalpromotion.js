document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('promoModal');
  const closeButton = modal.querySelector('.promo-modal__close');

  if (modal) {
    modal.classList.add('promo-modal--open');
  }

  closeButton.addEventListener('click', () => {
    modal.classList.remove('promo-modal--open');
  });

  modal.addEventListener('click', event => {
    if (event.target === modal) {
      modal.classList.remove('promo-modal--open');
    }
  });
});