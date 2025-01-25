
// Gallery
document.addEventListener('DOMContentLoaded', () => {

  const sliderCart = document.getElementById('gallerySliderCart');
  const dotsCart = document.querySelectorAll('.dot-cart');
  let currentIndexCart = 0;

  function updateGalleryCart() {
    const width = sliderCart.clientWidth;
    sliderCart.style.transform = `translateX(-${currentIndexCart * width}px)`;

    dotsCart.forEach(dot => dot.classList.remove('active'));
    dotsCart[currentIndexCart].classList.add('active');

    if (window.innerWidth > 1024) {
      leftArrow.style.display = currentIndexCart === 0 ? 'none' : 'block';
      rightArrow.style.display = currentIndexCart === dotsCart.length - 1 ? 'none' : 'block';
    } else {
      leftArrow.style.display = 'none';
      rightArrow.style.display = 'none';
    }
  }

  function setIndexCart(index) {
    currentIndexCart = parseInt(index, 10); 
    updateGalleryCart();
  }

  dotsCart.forEach(dot => {
    dot.addEventListener('click', () => {
      setIndexCart(dot.getAttribute('data-index'));
    });
  });

  document.getElementById('leftArrow').addEventListener('click', () => {
    if (currentIndexCart > 0) {
      setIndexCart(currentIndexCart - 1);
    }
  });

  document.getElementById('rightArrow').addEventListener('click', () => { 
    if (currentIndexCart < dotsCart.length - 1) {
      setIndexCart(currentIndexCart + 1);
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;

  sliderCart.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  sliderCart.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleGesture();
  });

  function handleGesture() {
    if (touchEndX < touchStartX) {
      if (currentIndexCart < dotsCart.length - 1) {
        setIndexCart(currentIndexCart + 1);
      }
    }
    if (touchEndX > touchStartX) {
      if (currentIndexCart > 0) {
        setIndexCart(currentIndexCart - 1);
      }
    }
  }

  setInterval(() => {
    if (currentIndexCart < dotsCart.length - 1) {
      setIndexCart(currentIndexCart + 1);
    } else {
      setIndexCart(0);
    }
  } , 5000);

  updateGalleryCart();
});


// GALLERY MODAL SLIDER
document.addEventListener('DOMContentLoaded', () => {
  const sliderModal = document.getElementById('gallerySliderModal');
  const dotsModal = document.querySelectorAll('.dot-modal');
  let currentIndexModal = 0;

  function updateGallery() {
    const width = sliderModal.clientWidth;
    sliderModal.style.transform = `translateX(-${currentIndexModal * width}px)`;

    dotsModal.forEach(dot => dot.classList.remove('active'));
    dotsModal[currentIndexModal].classList.add('active');

    if (window.innerWidth > 1024) {
      leftArrowModal.style.display = currentIndexModal === 0 ? 'none' : 'block';
      rightArrowModal.style.display = currentIndexModal === dotsModal.length - 1 ? 'none' : 'block';
    } else {
      leftArrowModal.style.display = 'none';
      rightArrowModal.style.display = 'none';
    }
  }

  function setIndex(index) {
    currentIndexModal = parseInt(index, 10);
    updateGallery();
  }

  dotsModal.forEach(dot => {
    dot.addEventListener('click', () => {
      setIndex(dot.getAttribute('data-index'));
    });
  });

  document.getElementById('leftArrowModal').addEventListener('click', () => {
    if (currentIndexModal > 0) {
      setIndex(currentIndexModal - 1);
    }
  });

  document.getElementById('rightArrowModal').addEventListener('click', () => {
    if (currentIndexModal < dotsModal.length - 1) {
      setIndex(currentIndexModal + 1);
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
      if (currentIndexModal < dotsModal.length - 1) {
        setIndex(currentIndexModal + 1);
      }
    }
    if (touchEndX > touchStartX) {
      if (currentIndexModal > 0) {
        setIndex(currentIndexModal - 1);
      }
    }
  }

  updateGallery();
});
