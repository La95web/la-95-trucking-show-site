document.getElementsByClassName('traffic-light')[0].addEventListener('click', () => {
  document.getElementsByClassName('navlinks')[0].classList.toggle('expanded');
  document.getElementById('close-menu').classList.toggle('show');
  document.getElementsByClassName('blur-background')[0].classList.toggle('active');
  console.log('Menu toggled');
});

document.getElementById('close-menu').addEventListener('click', () => {
  document.getElementsByClassName('navlinks')[0].classList.remove('expanded');
  document.getElementById('close-menu').classList.remove('show');
  document.getElementsByClassName('blur-background')[0].classList.remove('active');
  console.log('Menu closed');
});

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
    currentIndex = index;
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

  // animation

  document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('animation');
    
    function handleScroll() {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
  
        if (sectionTop < windowHeight) {
            section.classList.add('animate');
        }
    }
  
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
  });
