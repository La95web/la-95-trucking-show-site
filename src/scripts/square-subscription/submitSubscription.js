document.getElementById('subscription-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = {
    name: formData.get('name'),
    lastname: formData.get('lastname'),
    email: formData.get('email'),
    phone: formData.get('phone')
  };

  try {
    const res = await fetch('http://localhost:4000/api/subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.qrImage) {
      window.location.href = `/success?qr=${encodeURIComponent(result.qrImage)}`;
    } else {
      alert('Suscripción creada, pero no se recibió QR.');
    }
  } catch (err) {
    console.error('Error al enviar suscripción:', err);
    alert('Hubo un problema al procesar tu suscripción.');
  }
});
