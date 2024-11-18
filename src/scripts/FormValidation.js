document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    let isValid = true;

    const name = document.getElementById('name');
    if (name.value.trim() === '') {
      isValid = false;
      alert('Por favor, ingrese su nombre.');
      name.focus();
    }

    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      isValid = false;
      alert('Por favor, ingrese un correo electrónico válido.');
      email.focus();
    }

    const message = document.getElementById('message');
    if (message.value.trim() === '') {
      isValid = false;
      alert('Por favor, ingrese su mensaje.');
      message.focus();
    }

    if (!isValid) {
      event.preventDefault();
    }
  });
});
