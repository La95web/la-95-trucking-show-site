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
  const modal = document.getElementById('myModal');
  const btns = document.querySelectorAll('.openModal');
  const span = document.getElementsByClassName('close')[0];

  btns.forEach(btn => {
    btn.onclick = function() {
      modal.style.display = 'block';
    };
  });

  span.onclick = function() {
    modal.style.display = 'none';
  };

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
});
  