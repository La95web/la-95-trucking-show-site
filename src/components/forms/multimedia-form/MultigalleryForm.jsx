import { useState } from "react";
import styles from './MultigalleryForm.module.scss';
import create from "../../../scripts/api/create";
import update from "../../../scripts/api/update";

const MultigalleryForm = ({ multigallery = null, onCancel = null }) => {
  const [formState, setFormState] = useState(multigallery ? {
    uploaded_at: multigallery.uploaded_at,
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
    formData.append('multigallery[uploaded_at]', formState.uploaded_at);

    if (formState.video && formState.video.length > 0) {
      Array.from(formState.video).forEach((file) => {
        formData.append('multigallery[video][]', file);
      });
    }

    if (formState.thumbnail && formState.thumbnail.length > 0) {
      Array.from(formState.thumbnail).forEach((file) => {
        formData.append('multigallery[thumbnail][]', file);
      });
    }

    if (formState.gallery && formState.gallery.length > 0) {
      Array.from(formState.gallery).forEach((file) => {
        formData.append('multigallery[gallery][]', file);
      });
    }

    if (multigallery) {
      update(`multigallerys/${multigallery.id}/`, formData)
        .then(() => window.location.reload())
        .catch((error) => alert(error));
    } else {
      create('multigallerys/', formData)
        .then(() => window.location.reload())
        .catch((error) => alert(error));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Videos:<br />
        <input type='file' name='video' multiple onChange={handleFileChange} /><br />
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

export default MultigalleryForm;
