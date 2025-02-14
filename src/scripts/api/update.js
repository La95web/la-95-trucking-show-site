const update = async (endpoint, data) => {
  return await fetch(import.meta.env.PUBLIC_API_BASE_URL.concat(endpoint),{
    method: 'PUT',
    headers: {
      'Authorization': sessionStorage.getItem('token'),
    },
    body: data,
  })
    .then(response => {
      if (!response.ok) return response.json();
      return response;
    })
    .then((data) => {
      if (data.error) throw new Error(data.error);
    });
};

export default update;
