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
  const dotsContainer = document.getElementById('galleryDots');
  const leftArrow = document.getElementById('leftArrow');
  const rightArrow = document.getElementById('rightArrow');

  const totalImages = slider.querySelectorAll('img').length;
  const MAX_DOTS = 7; // Número máximo de puntos visibles
  const totalDots = Math.min(MAX_DOTS, totalImages);

  // Crear puntos dinámicamente
  for (let i = 0; i < totalDots; i++) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.setAttribute('data-index', i);
    dotsContainer.appendChild(dot);
  }

  const dots = dotsContainer.querySelectorAll('.dot');
  let currentIndex = 0;

  function updateGallery() {
    const width = slider.clientWidth;
    slider.style.transform = `translateX(-${currentIndex * width}px)`;

    dots.forEach((dot, index) => {
      const dotIndex = (currentIndex + index) % totalDots;
      dot.setAttribute('data-index', dotIndex);
      dot.classList.remove('active');
      if (index === 0) dot.classList.add('active');
    });

    if (window.innerWidth > 1024) {
      leftArrow.style.display = currentIndex === 0 ? 'none' : 'block';
      rightArrow.style.display = currentIndex === totalImages - 1 ? 'none' : 'block';
    } else {
      leftArrow.style.display = 'none';
      rightArrow.style.display = 'none';
    }
  }

  function setIndex(index) {
    currentIndex = index;
    updateGallery();
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      setIndex(parseInt(dot.getAttribute('data-index')));
    });
  });

  document.getElementById('leftArrow').addEventListener('click', () => {
    if (currentIndex > 0) {
      setIndex(currentIndex - 1);
    }
  });

  document.getElementById('rightArrow').addEventListener('click', () => {
    if (currentIndex < totalImages - 1) {
      setIndex(currentIndex + 1);
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX) {
      // Swipe left
      if (currentIndex < totalImages - 1) {
        setIndex(currentIndex + 1);
      }
    }
    if (touchEndX > touchStartX) {
      // Swipe right
      if (currentIndex > 0) {
        setIndex(currentIndex - 1);
      }
    }
  }
  
  updateGallery(); // Actualiza la galería al cargar la página
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
