import update from "../../../scripts/api/update";
import create from "../../../scripts/api/create";
import { useState } from "react";

const SectionForm = ({section = null, articleId, onCancel = null}) => {
  const [formState, setFormState] = useState(section ? {
    heading: section.heading,
    body: section.body,
  } : {
    heading: '',
    body: '',
  });

  const handleDataChange = (event) => setFormState({ ...formState, [event.target.name]: event.target.value });
  const handleFileChange = (event) => setFormState({ ...formState, [event.target.name]: event.target.files[0] });
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('section[heading]', formState.heading);
    formData.append('section[body]', formState.body);
    if (formState.image) formData.append('section[image]', formState.image);

    if (section && onCancel) update(`sections/${section.id}`, formData)
      .then(() => window.location.reload())
      .catch((error) => alert(error));

    if (articleId) create(`articles/${articleId}/sections`, formData)
      .then(() => window.location.reload())
      .catch((error) => alert(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Encabezado:<br />
        <input type="text" name="heading" value={formState.heading} onChange={handleDataChange} /><br />
      </label>
      <label>
        Contenido:<br />
        <textarea name="body" value={formState.body} onChange={handleDataChange} /><br />
      </label>
      <label>
        Imagen:<br />
        <input type="file" name="image" onChange={handleFileChange} /><br />
      </label>
      {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default SectionForm;
