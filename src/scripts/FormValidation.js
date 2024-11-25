document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');

  form.addEventListener('submit', (event) => {
    let isValid = true;

    const existingMessage = document.querySelector('.confirmation-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const name = document.getElementById('name');
    if (name.value.trim() === '') {
      isValid = false;
      alert('Please, enter your name.');
      name.focus();
    } else if (name.value.trim().length < 5) {
      isValid = false;
      alert('your name must be at least 5 characters')
      name.focus();
    }

    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      isValid = false;
      alert('Please, enter a valid email address.');
      email.focus();
    }

    const message = document.getElementById('message');
    if (message.value.trim() === '') {
      isValid = false;
      alert('Please, enter your message');
      message.focus();
    } else if (message.value.trim().length < 20) {
      isValid = false;
      alert('your name must be at least 20 characters');
      message.focus();
    }

    if (!isValid) {
      event.preventDefault(); //api
      return;
    }

    const confirmationMessage = document.createElement('p');
    confirmationMessage.textContent = 'Your message has been sent successfully!';
    confirmationMessage.classList.add('confirmation-message');
    confirmationMessage.style.fontSize = '2rem';
    confirmationMessage.style.fontWeight = 'bold';
    confirmationMessage.style.marginTop = '1rem';
    confirmationMessage.style.textAlign = 'center';

    form.parentNode.appendChild(confirmationMessage); 

    form.reset();

    event.preventDefault(); // esto cambiara despues de tener la api
  });
});

