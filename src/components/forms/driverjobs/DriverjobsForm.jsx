import { useState } from 'react';
import styles from './DriverjobsForm.module.scss';
import create from '../../../scripts/api/create';
import update from '../../../scripts/api/update';

const DriverForm = ({ trucker = null, onCancel = null }) => {
  const [formState, setFormState] = useState(trucker ? {
    uploaded_at: trucker.uploaded_at,
    company: trucker.company,
    description: trucker.description,
    location: trucker.location,
    salary: trucker.salary,
    experience: trucker.experience,
    requirements: trucker.requirements,
    qualities: trucker.qualities,
    language: trucker.language,
  } : {
    uploaded_at: '',
    company: '',
    description: '',
    location: '',
    salary: '',
    experience: '',
    requirements: '',
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
    formData.append('trucker[company]', formState.company);
    formData.append('trucker[description]', formState.description);
    formData.append('trucker[location]', formState.location);
    formData.append('trucker[salary]', formState.salary);
    formData.append('trucker[experience]', formState.experience);
    formData.append('trucker[requirements]', formState.requirements);
    formData.append('trucker[qualities]', formState.qualities);
    formData.append('trucker[uploaded_at]', formState.uploaded_at);
    if (formState.main_image) formData.append('trucker[main_image]', formState.main_image);
    if (formState.thumbnail) formData.append('trucker[thumbnail]', formState.thumbnail);

    if (trucker) {
      update(`truckers/${trucker.id}/`, formData)
        .then(() => window.location.reload())
        .catch((error) => alert(error));
    } else {
      create('truckers/', formData)
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
        Requirements:<br />
        <textarea name="requirements" value={formState.requirements} onChange={handleDataChange} /><br />
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

export default DriverForm;