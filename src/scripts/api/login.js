const loginUser = async (email, password) => {
  return await fetch('http://localhost:3000/v1/users/log_in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      }
    }),
  })
    .then(response => {
      if (response.ok) {
        const token = response.headers.get('Authorization');
        sessionStorage.setItem('token', token);
      }

      return response.json();
    })
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }

      sessionStorage.setItem('user', JSON.stringify(data));
    });
};

export default loginUser;