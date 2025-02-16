const formatDate = (date, language) => {
  console.log(language);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(`${language}-US`, options);
};

export default formatDate;
