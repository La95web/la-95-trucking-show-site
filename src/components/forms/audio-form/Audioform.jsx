import { useState } from 'react';
import create from '../../../scripts/api/create';
import update from '../../../scripts/api/update';

const AudioForm = ({ audio = null, onCancel = null }) => {
    const [formState, setFormState] = useState(audio ? {
      title: audio.title,
      uploaded_at: audio.uploaded_at,
    } : {
      title: '',
      uploaded_at: '',
    });
  
    const handleDataChange = (event) => setFormState({ ...formState, [event.target.name]: event.target.value });
    const handleFileChange = (event) => setFormState({ ...formState, [event.target.name]: event.target.files[0] });
    const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('audio[title]', formState.title);
    formData.append('audio[uploaded_at]', formState.uploaded_at);
    if (formState.main_audio) {
      formData.append('audio[main_audio]', formState.main_audio);
    }

    if (audio && onCancel) update(`audios/${audio.id}/`, formData)
      .then(() => window.location.reload())
      .catch((error) => alert(error));

    else create('audios/', formData)
      .then(() => window.location.reload())
      .catch((error) => alert(error));
    };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:<br />
        <input type="text" name="title" value={formState.title} onChange={handleDataChange} /><br />
      </label>
      <label>
        Upload Audio:<br />
        <input type='file' accept='audio/mpeg' name='main_audio' onChange={handleFileChange} /><br />
      </label>
      <label>
        Uploaded At:<br />
        <input type="date" name="uploaded_at" value={formState.uploaded_at} onChange={handleDataChange} /><br />
      </label>
      {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      <button type="submit">Subir</button>
    </form>
  );
};

export default AudioForm;