const create = async (endpoint, data) => {
  return await fetch(import.meta.env.PUBLIC_API_BASE_URL.concat(endpoint), {
    method: 'POST',
    headers: {
      'Authorization': sessionStorage.getItem('token'),
    },
    body: data,
  })
    .then(response => response.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }

      return data
    });
};

export default create;