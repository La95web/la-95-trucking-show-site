import { useState } from 'react';
import styles from './Marketplaceform.module.scss';
import create from '../../../scripts/api/create';
import update from '../../../scripts/api/update';

const MarketplaceForm = ({ marketplace = null, onCancel = null }) => {
    const [formState, setFormState] = useState(marketplace ? {
      title: marketplace.title,
      content: marketplace.content,
      paragraphs: marketplace.paragraphs,
      uploaded_at: marketplace.uploaded_at,
      language: marketplace.language,
    } : {
      title: '',
      content: '',
      paragraphs: '',
      uploaded_at: '',
      language: 'spanish',
    });
  
    const handleDataChange = (event) => setFormState({ ...formState, [event.target.name]: event.target.value });
    const handleFileChange = (event) => setFormState({ ...formState, [event.target.name]: event.target.files[0] });
    const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('marketplace[title]', formState.title);
    formData.append('marketplace[content]', formState.content);
    formData.append('marketplace[paragraphs]', formState.paragraphs);
    formData.append('marketplace[uploaded_at]', formState.uploaded_at);
    formData.append('marketplace[language]', formState.language);
    if (formState.main_image) formData.append('marketplace[mail_image]', formState.image);
    if (formState.thumbnail) formData.append('marketplace[thumbnail]', formState.thumbnail);

    if (marketplace && onCancel) update(`marketplaces/${marketplace.id}/`, formData)
      .then(() => window.location.reload())
      .catch((error) => alert(error));

    else create('marketplaces/', formData)
      .then(() => window.location.reload())
      .catch((error) => alert(error));
    };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Title:<br />
        <input type="text" name="title" value={formState.title} onChange={handleDataChange} /><br />
      </label>
       <label>
        Subtitle:<br />
        <textarea className={styles.text} name="content" value={formState.content} onChange={handleDataChange} /><br />
      </label>
      <label>
        Content:<br />
        <textarea name="paragraphs" value={formState.paragraphs} onChange={handleDataChange} /><br />
      </label>
      <label>
        Main Image:<br />
        <input type="file" name="main_image" onChange={handleFileChange} /><br />
      </label>
      <label>
        Thumbnail:<br />
        <input type="file" name="thumbnail" onChange={handleFileChange} /><br />
      </label>
      <label>
        Uploaded At:<br />
        <input type="date" name="uploaded_at" value={formState.uploaded_at} onChange={handleDataChange} /><br />
      </label>
      <label>
        Lenguaje:<br />
        <select name="language" value={formState.language} onChange={handleDataChange}>
          <option value="spanish">Español</option>
          <option value="english">Inglés</option>
        </select>
        <br />
      </label>
      {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      <button type="submit">Subir</button>
    </form>
  );
};

export default MarketplaceForm;