import { useState } from 'react';
import styles from './RealstateForm.module.scss';
import create from '../../../scripts/api/create';
import update from '../../../scripts/api/update';

const RealstateForm = ({ realstate = null, onCancel = null }) => {
  const [formState, setFormState] = useState(realstate ? {
    uploaded_at: realstate.uploaded_at,
    price: realstate.price,
    description: realstate.description,
    rooms: realstate.rooms,
    internet: realstate.internet,
    furniture: realstate.furniture,
    parking: realstate.parking,
    location: realstate.location,
    language: realstate.language,
  } : {
    uploaded_at: '',
    price: '',
    description: '',
    rooms: '',
    internet: '',
    furniture: '',
    parking: '',
    location: '',
    language: 'spanish',
  });

  const handleDataChange = (event) =>
    setFormState({ ...formState, [event.target.name]: event.target.value });

  const handleFileChange = (event) =>
    setFormState({ ...formState, [event.target.name]: event.target.files[0] });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('realstate[price]', formState.price);
    formData.append('realstate[description]', formState.description);
    formData.append('realstate[rooms]', formState.rooms);
    formData.append('realstate[internet]', formState.internet);
    formData.append('realstate[furniture]', formState.furniture);
    formData.append('realstate[parking]', formState.parking);
    formData.append('realstate[location]', formState.location);
    formData.append('realstate[language]', formState.language);
    formData.append('owner[uploaded_at]', formState.uploaded_at);
    if (formState.main_image) formData.append('realstate[main_image]', formState.main_image);
    if (formState.thumbnail) formData.append('realstate[thumbnail]', formState.thumbnail);

    if (realstate) {
      update(`realstates/${realstate.id}/`, formData)
        .then(() => window.location.reload())
        .catch((error) => alert(error));
    } else {
      create('realstates/', formData)
        .then(() => window.location.reload())
        .catch((error) => alert(error));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        price:<br />
        <input type="text" name="price" value={formState.price} onChange={handleDataChange} /><br />
      </label>

      <label>
        Description:<br />
        <textarea name="description" value={formState.description} onChange={handleDataChange} /><br />
      </label>

      <label>
        Location:<br />
        <input type="text" name="location" value={formState.location} onChange={handleDataChange} /><br />
      </label>

      <label>
        Rooms:<br />
        <input type="text" name="rooms" value={formState.rooms} onChange={handleDataChange} /><br />
      </label>

      <label>
        Internet:<br />
        <input type="text" name="internet" value={formState.internet} onChange={handleDataChange} /><br />
      </label>

      <label>
        Furniture:<br />
        <textarea name="furniture" value={formState.furniture} onChange={handleDataChange} /><br />
      </label>

      <label>
        Parking:<br />
        <textarea name="parking" value={formState.parking} onChange={handleDataChange} /><br />
      </label>

      <label>
        Uploaded At:<br />
        <input type="date" name="uploaded_at" value={formState.uploaded_at} onChange={handleDataChange} /><br />
      </label>
       <label>
        Main Image:<br />
        <input type="file" name="main_image" onChange={handleFileChange} /><br />
      </label>
      <label>
        Thumbnail:<br />
        <input type="file" name="thumbnail" onChange={handleFileChange} /><br />
      </label>

      {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      <button type="submit">Subir</button>
    </form>
  );
};

export default RealstateForm;