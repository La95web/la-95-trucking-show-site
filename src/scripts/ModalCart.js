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

// Gallery
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('gallerySlider');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;

  function updateGallery() {
    const width = slider.clientWidth;
    slider.style.transform = `translateX(-${currentIndex * width}px)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  }

  function setIndex(index) {
    currentIndex = parseInt(index, 10);
    updateGallery();
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      setIndex(dot.getAttribute('data-index'));
    });
  });

  document.getElementById('leftArrow').addEventListener('click', () => {
    if (currentIndex > 0) {
      setIndex(currentIndex - 1);
    }
  });

  document.getElementById('rightArrow').addEventListener('click', () => {
    if (currentIndex < dots.length - 1) {
      setIndex(currentIndex + 1);
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });

  function handleGesture() {
    if (touchEndX < touchStartX) {
      if (currentIndex < dots.length - 1) {
        setIndex(currentIndex + 1);
      }
    }
    if (touchEndX > touchStartX) {
      if (currentIndex > 0) {
        setIndex(currentIndex - 1);
      }
    }
  }

  updateGallery();
});

// GALLERY MODAL SLIDER
document.addEventListener('DOMContentLoaded', () => {
  const sliderModal = document.getElementById('gallerySliderModal');
  const dotsModal = document.querySelectorAll('.dot-modal');
  let currentIndex = 0;

  function updateGallery() {
    const width = sliderModal.clientWidth;
    sliderModal.style.transform = `translateX(-${currentIndex * width}px)`;

    dotsModal.forEach(dot => dot.classList.remove('active'));
    dotsModal[currentIndex].classList.add('active');
  }

  function setIndex(index) {
    currentIndex = parseInt(index, 10);
    updateGallery();
  }

  dotsModal.forEach(dot => {
    dot.addEventListener('click', () => {
      setIndex(dot.getAttribute('data-index'));
    });
  });

  document.getElementById('leftArrowModal').addEventListener('click', () => {
    if (currentIndex > 0) {
      setIndex(currentIndex - 1);
    }
  });

  document.getElementById('rightArrowModal').addEventListener('click', () => {
    if (currentIndex < dotsModal.length - 1) {
      setIndex(currentIndex + 1);
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;

  sliderModal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  sliderModal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });

  function handleGesture() {
    if (touchEndX < touchStartX) {
      if (currentIndex < dotsModal.length - 1) {
        setIndex(currentIndex + 1);
      }
    }
    if (touchEndX > touchStartX) {
      if (currentIndex > 0) {
        setIndex(currentIndex - 1);
      }
    }
  }

  updateGallery();
});
