document.querySelectorAll('#contact-form, #contact-form-b').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone')
    };

    fetch('http://localhost:3000/userRealState', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) throw new Error('Error en la respuesta del servidor');
      return response.json();
    })
    .then(result => {
      console.log('Registro exitoso:', result);
      form.reset();
    })
    .catch(error => {
      console.error('Error al enviar datos:', error);
      alert('Hubo un problema al enviar tu información. Intenta de nuevo.');
    });
  });
});