const destroy = async (endpoint) => {
  return await fetch(import.meta.env.PUBLIC_API_BASE_URL.concat(endpoint), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': sessionStorage.getItem('token'),
    },
  })
    .then(response => {
      if (!response.ok) return response.json();
      return response;
    })
    .then((data) => {
      if (data.error) throw new Error(data.error);
    });
};

export default destroy;