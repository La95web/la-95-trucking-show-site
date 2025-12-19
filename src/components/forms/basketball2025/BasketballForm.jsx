import { useState } from "react";
import styles from './Baketball2025Form.module.scss';
import create from "../../../scripts/api/create";
import update from "../../../scripts/api/update";

const Basketball2025Form = ({ basketball2025 = null, onCancel = null }) => {
  const [formState, setFormState] = useState(basketball2025 ? {
    uploaded_at: basketball2025.uploaded_at,
    video: [],
    thumbnail: [],
    gallery: []
  } : {
    uploaded_at: '',
    video: [],
    thumbnail: [],
    gallery: []
  });

  const handleDataChange = (event) =>
    setFormState({ ...formState, [event.target.name]: event.target.value });

  const handleFileChange = (event) =>
    setFormState({ ...formState, [event.target.name]: event.target.files });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('basketball2025[uploaded_at]', formState.uploaded_at);

    if (formState.video && formState.video.length > 0) {
      Array.from(formState.video).forEach((file) => {
        formData.append('basketball2025[video][]', file);
      });
    }

    if (formState.poster && formState.poster.length > 0) {
      Array.from(formState.poster).forEach((file) => {
        formData.append('basketball2025[poster]', file);
      });
    }

    if (formState.thumbnail && formState.thumbnail.length > 0) {
      Array.from(formState.thumbnail).forEach((file) => {
        formData.append('basketball2025[thumbnail][]', file);
      });
    }

    if (formState.gallery && formState.gallery.length > 0) {
      Array.from(formState.gallery).forEach((file) => {
        formData.append('basketball2025[gallery][]', file);
      });
    }

    if (basketball2025) {
      update(`basketball2025s/${basketball2025.id}/`, formData)
        .then(() => window.location.reload())
        .catch((error) => alert(error));
    } else {
      create('basketball2025s/', formData)
        .then(() => window.location.reload())
        .catch((error) => alert(error));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Videos:<br />
        <input type='file' name='video' multiple onChange={handleFileChange} /><br />
        Subir poster:
        <input type="file" name="poster" onChange={handleFileChange} /><br />
      </label>

      <label>
        Imágenes destacadas:<br />
        <input type="file" name="thumbnail" multiple onChange={handleFileChange} /><br />
      </label>

      <label>
        Galería de imágenes:<br />
        <input type="file" name="gallery" multiple onChange={handleFileChange} /><br />
      </label>

      <label>
        Fecha de subida:<br />
        <input type="date" name="uploaded_at" value={formState.uploaded_at} onChange={handleDataChange} /><br />
      </label>

      {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      <button type="submit">Subir</button>
    </form>
  );
};

export default Basketball2025Form;