import { useState } from 'react';
import styles from './OwnerForm.module.scss';
import create from '../../../scripts/api/create';
import update from '../../../scripts/api/update';

const OwnerForm = ({ owner = null, onCancel = null }) => {
  const [formState, setFormState] = useState(owner ? {
    uploaded_at: owner.uploaded_at,
    company: owner.company,
    description: owner.description,
    location: owner.location,
    salary: owner.salary,
    experience: owner.experience,
    qualities: owner.qualities,
    language: owner.language,
  } : {
    uploaded_at: '',
    company: '',
    description: '',
    location: '',
    salary: '',
    experience: '',
    qualities: '',
    language: 'spanish',
  });

  const handleDataChange = (event) =>
    setFormState({ ...formState, [event.target.name]: event.target.value });

  const handleFileChange = (event) =>
    setFormState({ ...formState, [event.target.name]: event.target.files[0] });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('owner[company]', formState.company);
    formData.append('owner[description]', formState.description);
    formData.append('owner[location]', formState.location);
    formData.append('owner[salary]', formState.salary);
    formData.append('owner[experience]', formState.experience);
    formData.append('owner[qualities]', formState.qualities);
    formData.append('owner[uploaded_at]', formState.uploaded_at);
    if (formState.main_image) formData.append('owner[main_image]', formState.main_image);
    if (formState.thumbnail) formData.append('owner[thumbnail]', formState.thumbnail);

    if (owner) {
      update(`owners/${owner.id}/`, formData)
        .then(() => window.location.reload())
        .catch((error) => alert(error));
    } else {
      create('owners/', formData)
        .then(() => window.location.reload())
        .catch((error) => alert(error));
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Company:<br />
        <input type="text" name="company" value={formState.company} onChange={handleDataChange} /><br />
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
        Salary:<br />
        <input type="text" name="salary" value={formState.salary} onChange={handleDataChange} /><br />
      </label>

      <label>
        Experience:<br />
        <input type="text" name="experience" value={formState.experience} onChange={handleDataChange} /><br />
      </label>

      <label>
        Qualities:<br />
        <textarea name="qualities" value={formState.qualities} onChange={handleDataChange} /><br />
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

export default OwnerForm;